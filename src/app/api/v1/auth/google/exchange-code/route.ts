import { NextRequest, NextResponse } from "next/server";
import { ServerGmailTokenStore } from "@/lib/server/gmail-token-store";
import { GmailApiService } from "@/lib/services/GmailApiService";
import { getGoogleRedirectUri } from "@/lib/config/google-oauth";
import { getCanonicalUserId } from "@/lib/server/auth-session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, redirectUri, userId, flow = "connect_gmail" } = body;

    if (!code) {
      return NextResponse.json(
        { success: false, error: "Authorization code is required" },
        { status: 400 }
      );
    }

    const clientId =
      process.env.GMAIL_CLIENT_ID ||
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      process.env.GOOGLE_CLIENT_ID ||
      "";

    const clientSecret =
      process.env.GMAIL_CLIENT_SECRET ||
      process.env.GOOGLE_CLIENT_SECRET ||
      "";

    if (!clientId) {
      return NextResponse.json(
        { success: false, error: "Server missing Google Client ID configuration" },
        { status: 400 }
      );
    }

    console.log(`[GOOGLE AUTH] Exchanging OAuth authorization code (flow: ${flow}, userId: ${userId || "N/A"})...`);

    // 1. Exchange authorization code for Google tokens
    const tokenParams = new URLSearchParams({
      client_id: clientId.trim(),
      code: code.trim(),
      grant_type: "authorization_code",
      redirect_uri: redirectUri || getGoogleRedirectUri(),
    });

    if (clientSecret) {
      tokenParams.append("client_secret", clientSecret.trim());
    }

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams,
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.access_token) {
      console.error("[GOOGLE AUTH] Authorization code exchange failed:", tokenData);
      return NextResponse.json(
        {
          success: false,
          error:
            tokenData.error_description ||
            tokenData.error ||
            "Failed to exchange Google authorization code for access tokens.",
        },
        { status: 400 }
      );
    }

    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;
    const expiresIn = tokenData.expires_in || 3600;

    // 2. VERIFY TOKEN: Call Gmail API users.getProfile to confirm token & retrieve Gmail identity + historyId
    let gmailProfile: { emailAddress: string; historyId?: string; messagesTotal?: number } | null = null;
    let verifiedEmail = "";
    let name = "";

    // Fetch userinfo for display name
    try {
      const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (userInfoRes.ok) {
        const uInfo = await userInfoRes.json();
        name = uInfo.name || "";
        if (uInfo.email) verifiedEmail = uInfo.email.toLowerCase();
      }
    } catch (uiErr: any) {
      console.warn("[GOOGLE AUTH] Google userinfo fetch warning:", uiErr.message);
    }

    // MANDATORY STEP: Call users.getProfile to verify Gmail API token validity & account identity
    try {
      gmailProfile = await GmailApiService.fetchGmailProfile(accessToken);
      console.log(`[GOOGLE AUTH VERIFICATION SUCCESS] Gmail API users.getProfile succeeded for: ${gmailProfile.emailAddress} (historyId: ${gmailProfile.historyId})`);
      
      const profileEmail = gmailProfile.emailAddress.toLowerCase();
      if (verifiedEmail && verifiedEmail !== profileEmail) {
        console.warn(`[GOOGLE AUTH IDENTITY MISMATCH] OIDC email (${verifiedEmail}) != Gmail profile (${profileEmail}). Using verified Gmail identity: ${profileEmail}`);
      }
      verifiedEmail = profileEmail;
    } catch (profileErr: any) {
      console.error("[GOOGLE AUTH VERIFICATION FAILED] Gmail API users.getProfile failed:", profileErr.message);
      return NextResponse.json(
        {
          success: false,
          error: `Gmail API Token Verification Failed: ${profileErr.message}. Ensure https://www.googleapis.com/auth/gmail.readonly scope is granted in Google Cloud Console.`,
        },
        { status: 400 }
      );
    }

    if (!verifiedEmail) {
      return NextResponse.json(
        { success: false, error: "Failed to identify Google account email address via users.getProfile." },
        { status: 400 }
      );
    }

    // 3. Flow 1: Normal Google Login / OIDC Identity verification ONLY
    if (flow === "login") {
      console.log(`[GOOGLE LOGIN] Successfully verified Google Sign-In identity: ${verifiedEmail}`);
      return NextResponse.json({
        success: true,
        flow: "login",
        email: verifiedEmail,
        name: name || verifiedEmail.split("@")[0],
        message: "Google login identity verified successfully.",
      });
    }

    // 4. Flow 2: Connect Gmail Mailbox Account — Resolve Canonical Authenticated User ID
    const targetUserId = getCanonicalUserId(req, userId);

    console.log(`[DIAGNOSTIC LOG] OAuth Exchange — authenticated userId: ${targetUserId || "UNAUTHENTICATED"}, OAuth exchange userId parameter: ${userId || "N/A"}`);

    if (!targetUserId) {
      console.warn("[GOOGLE AUTH] Failed to resolve canonical authenticated user ID for Gmail connection");
      return NextResponse.json(
        {
          success: false,
          error: "Unauthenticated session: Valid authenticated application user required to connect Gmail account.",
        },
        { status: 401 }
      );
    }

    console.log(`[GMAIL AUTH] Connecting Gmail ${verifiedEmail} to canonical userId: ${targetUserId}`);

    // Perform initial fetch to verify token & ingest messages
    let initialMessagesCount = 0;
    try {
      const initialFetchRes = await GmailApiService.fetchRealGmailMessages(accessToken, verifiedEmail, 25);
      const fetchedMessages = initialFetchRes.messages || [];
      initialMessagesCount = fetchedMessages.length;
      console.log(`[GMAIL AUTH] Initial fetch retrieved ${initialMessagesCount} real messages for ${verifiedEmail}`);

      // Save initial messages into persistent Email Store (DB + disk cache)
      if (fetchedMessages.length > 0) {
        const { ServerEmailStore } = await import("@/lib/server/gmail-email-store");
        await ServerEmailStore.saveEmails(targetUserId, verifiedEmail, fetchedMessages);
      }
    } catch (fetchErr: any) {
      console.warn(`[GMAIL AUTH] Initial fetch warning for ${verifiedEmail}: ${fetchErr.message}`);
    }

    // Securely save credentials on SERVER ONLY into Database — include historyId
    await ServerGmailTokenStore.saveCredential({
      userId: targetUserId,
      email: verifiedEmail,
      name,
      accessToken,
      refreshToken,
      expiresAt: Date.now() + expiresIn * 1000,
      status: "CONNECTED",
      historyId: gmailProfile?.historyId,
      lastSyncedAt: new Date().toISOString(),
      messagesCount: initialMessagesCount,
    });

    console.log(`[GMAIL AUTH] Credentials stored securely in database server-side for canonical user ${targetUserId} / email ${verifiedEmail} (historyId: ${gmailProfile?.historyId || "N/A"})`);

    return NextResponse.json({
      success: true,
      flow: "connect_gmail",
      email: verifiedEmail,
      name,
      status: "CONNECTED",
      messagesCount: initialMessagesCount,
      historyId: gmailProfile?.historyId || null,
      message: `Gmail account ${verifiedEmail} connected successfully.`,
    });
  } catch (error: any) {
    console.error("[GOOGLE AUTH Exchange Code Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


