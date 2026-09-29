import { NextRequest, NextResponse } from "next/server";
import { ServerGmailTokenStore } from "@/lib/server/gmail-token-store";
import { GmailApiService } from "@/lib/services/GmailApiService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, redirectUri, userId = "usr_current_session" } = body;

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

    console.log(`[GMAIL AUTH] Exchanging OAuth authorization code for tokens (userId: ${userId})...`);

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
      console.error("[GMAIL AUTH] Authorization code exchange failed:", tokenData);
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

    console.log(`[GMAIL AUTH] Access token received. Refresh token present: ${refreshToken ? "YES" : "NO"}`);

    // 2. Identify actual Google/Gmail account identity directly from Gmail API / Google UserInfo
    let verifiedEmail = "";
    let name = "";

    try {
      const profile = await GmailApiService.fetchGmailProfile(accessToken);
      verifiedEmail = profile.emailAddress.toLowerCase();
      console.log(`[GMAIL AUTH] Authenticated Gmail API profile verified: ${verifiedEmail}`);
    } catch (err: any) {
      console.warn(`[GMAIL AUTH] Gmail profile fetch failed: ${err.message}. Trying Google OAuth userinfo...`);
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
        console.error("[GMAIL AUTH] Google userinfo fetch failed:", uiErr);
      }
    }

    if (!verifiedEmail) {
      return NextResponse.json(
        { success: false, error: "Failed to identify Google account email address." },
        { status: 400 }
      );
    }

    // 3. Securely save credentials on SERVER
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

    // 4. Initial Gmail sync
    let initialMessageCount = 0;
    try {
      const initialMessages = await GmailApiService.fetchRealGmailMessages(accessToken, verifiedEmail, 25);
      initialMessageCount = initialMessages.length;
      console.log(`[GMAIL SYNC] Initial sync completed for ${verifiedEmail}: ${initialMessageCount} messages fetched`);
    } catch (syncErr: any) {
      console.error(`[GMAIL SYNC] Initial sync exception for ${verifiedEmail}:`, syncErr);
    }

    return NextResponse.json({
      success: true,
      email: verifiedEmail,
      name,
      accessToken,
      refreshTokenAvailable: !!refreshToken,
      status: "CONNECTED",
      initialMessageCount,
      message: `Google account ${verifiedEmail} successfully authenticated and server credentials saved.`,
    });
  } catch (error: any) {
    console.error("[GMAIL AUTH Exchange Code Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
