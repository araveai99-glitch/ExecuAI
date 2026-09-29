import { NextRequest, NextResponse } from "next/server";
import { ServerGmailTokenStore } from "@/lib/server/gmail-token-store";
import { GmailApiService } from "@/lib/services/GmailApiService";

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
      redirect_uri: redirectUri || "http://localhost:3000/auth/google-callback",
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

    // 2. Identify actual Google user identity via Google OAuth UserInfo / Gmail Profile API
    let verifiedEmail = "";
    let name = "";

    try {
      const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (userInfoRes.ok) {
        const uInfo = await userInfoRes.json();
        verifiedEmail = (uInfo.email || "").toLowerCase();
        name = uInfo.name || "";
      }
    } catch (uiErr: any) {
      console.warn("[GOOGLE AUTH] Google userinfo fetch error:", uiErr.message);
    }

    if (!verifiedEmail) {
      try {
        const profile = await GmailApiService.fetchGmailProfile(accessToken);
        verifiedEmail = profile.emailAddress.toLowerCase();
      } catch (err: any) {
        console.error("[GOOGLE AUTH] Gmail profile fetch error:", err.message);
      }
    }

    if (!verifiedEmail) {
      return NextResponse.json(
        { success: false, error: "Failed to identify Google account email address." },
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

    // 4. Flow 2: Connect Gmail Mailbox Account
    // Strict validation: Require real user session ID (no fallback to "usr_current_session")
    if (!userId || userId === "usr_current_session") {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthenticated: Valid user session required to connect Gmail account.",
        },
        { status: 401 }
      );
    }

    // Securely save credentials on SERVER ONLY — Never expose accessToken or refreshToken to browser
    ServerGmailTokenStore.saveCredential({
      userId,
      email: verifiedEmail,
      name,
      accessToken,
      refreshToken,
      expiresAt: Date.now() + expiresIn * 1000,
      status: "CONNECTED",
      lastSyncedAt: new Date().toISOString(),
    });

    console.log(`[GMAIL AUTH] Credentials stored securely server-side for user ${userId} / email ${verifiedEmail}`);

    return NextResponse.json({
      success: true,
      flow: "connect_gmail",
      email: verifiedEmail,
      name,
      status: "CONNECTED",
      message: `Gmail account ${verifiedEmail} connected successfully.`,
    });
  } catch (error: any) {
    console.error("[GOOGLE AUTH Exchange Code Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

