import { NextRequest, NextResponse } from "next/server";
import { ServerGmailTokenStore } from "@/lib/server/gmail-token-store";
import { getCanonicalUserId } from "@/lib/server/auth-session";

// Server-side Accounts API Route
export async function GET(req: NextRequest) {
  try {
    const canonicalSessionId = getCanonicalUserId(req);
    const searchUserId = req.nextUrl.searchParams.get("userId");
    const activeUserId = canonicalSessionId || searchUserId;

    if (!activeUserId) {
      return NextResponse.json(
        { success: false, error: "Unauthenticated session: Valid user session required." },
        { status: 401 }
      );
    }

    // PRIVACY SAFEGUARD: User-to-user data isolation
    if (canonicalSessionId && searchUserId && canonicalSessionId !== searchUserId) {
      console.warn(`[SECURITY AUDIT] Blocked cross-user accounts access attempt. Session: ${canonicalSessionId}, Target: ${searchUserId}`);
      return NextResponse.json(
        { success: false, error: "Access Denied: You cannot view another user's email accounts." },
        { status: 403 }
      );
    }

    const userEmailsParam = req.nextUrl.searchParams.get("userEmails") || "";
    const userEmails = userEmailsParam ? userEmailsParam.split(",").map((e) => e.trim()) : [];

    const credentials = await ServerGmailTokenStore.getAllUserCredentials(activeUserId, userEmails);

    const accounts = credentials.map((cred: any, idx: number) => ({
      id: `acc_g_${cred.email.replace(/[^a-z0-9]/gi, "_")}`,
      accountLabel: `Gmail (${cred.email})`,
      provider: "GMAIL",
      emailAddress: cred.email,
      status: cred.status || "CONNECTED",
      lastSync: cred.lastSyncedAt ? "Synced recently" : "Not synced",
      syncError: cred.syncError,
      connectedDate: "Connected",
      messagesCount: cred.messagesCount || 0,
    }));

    return NextResponse.json({
      success: true,
      accounts,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const canonicalSessionId = getCanonicalUserId(req);
    const searchUserId = req.nextUrl.searchParams.get("userId");
    const activeUserId = canonicalSessionId || searchUserId;
    const email = req.nextUrl.searchParams.get("email");

    if (!activeUserId || !email) {
      return NextResponse.json(
        { success: false, error: "Authenticated user session and email address are required" },
        { status: 400 }
      );
    }

    // PRIVACY SAFEGUARD: Prevent disconnecting another user's email account
    if (canonicalSessionId && searchUserId && canonicalSessionId !== searchUserId) {
      console.warn(`[SECURITY AUDIT] Blocked cross-user account disconnect attempt. Session: ${canonicalSessionId}, Target: ${searchUserId}`);
      return NextResponse.json(
        { success: false, error: "Access Denied: You cannot disconnect another user's email account." },
        { status: 403 }
      );
    }

    await ServerGmailTokenStore.removeCredential(activeUserId, email);

    return NextResponse.json({
      success: true,
      message: `Account ${email} disconnected cleanly for user ${activeUserId}.`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
