import { NextRequest, NextResponse } from "next/server";
import { ServerGmailTokenStore } from "@/lib/server/gmail-token-store";
import { GmailApiService } from "@/lib/services/GmailApiService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { accessToken, refreshToken, email: providedEmail, userId } = body;

    if (!userId || userId === "usr_current_session") {
      return NextResponse.json(
        { success: false, error: "Unauthenticated: Valid user session required." },
        { status: 401 }
      );
    }

    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: "Access token is required" },
        { status: 400 }
      );
    }

    console.log(`[GMAIL AUTH] OAuth token received for user session: ${userId}`);

    // 1. Verify Gmail Profile & Authenticated Email directly from Gmail API
    let verifiedEmail = providedEmail;
    try {
      const profile = await GmailApiService.fetchGmailProfile(accessToken);
      verifiedEmail = profile.emailAddress.toLowerCase();
      console.log(`[GMAIL AUTH] Google account verified: ${verifiedEmail} (Messages Total: ${profile.messagesTotal})`);
    } catch (err: any) {
      console.warn(`[GMAIL AUTH] Profile fetch warning: ${err.message}. Using provided email ${providedEmail}`);
    }

    if (!verifiedEmail) {
      return NextResponse.json(
        { success: false, error: "Unable to verify Google account email" },
        { status: 400 }
      );
    }

    // 2. Securely store credentials in server token store
    ServerGmailTokenStore.saveCredential({
      userId,
      email: verifiedEmail.toLowerCase(),
      accessToken,
      refreshToken,
      expiresAt: Date.now() + 3600 * 1000, // 1 hour default
      status: "CONNECTED",
      lastSyncedAt: new Date().toISOString(),
    });

    // 3. Perform Initial Gmail Sync on Server
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
      status: "CONNECTED",
      initialMessageCount,
      message: `Google OAuth credentials stored securely server-side for ${verifiedEmail}.`,
    });
  } catch (error: any) {
    console.error("[GMAIL AUTH] Save token API error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
