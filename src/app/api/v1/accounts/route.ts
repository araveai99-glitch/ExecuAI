import { NextRequest, NextResponse } from "next/server";
import { ServerGmailTokenStore } from "@/lib/server/gmail-token-store";
import { getCanonicalUserId } from "@/lib/server/auth-session";

// Server-side Accounts API Route
export async function GET(req: NextRequest) {
  try {
    const searchUserId = req.nextUrl.searchParams.get("userId");
    const activeUserId = getCanonicalUserId(req, searchUserId);

    if (!activeUserId) {
      return NextResponse.json(
        { success: false, error: "Unauthenticated session: Valid user session required." },
        { status: 401 }
      );
    }

    const userEmailsParam = req.nextUrl.searchParams.get("userEmails") || "";
    const userEmails = userEmailsParam ? userEmailsParam.split(",").map((e) => e.trim()) : [];

    const credentials = await ServerGmailTokenStore.getAllUserCredentials(activeUserId, userEmails);
    console.log(`[ACCOUNTS API] GET /api/v1/accounts — userId: ${activeUserId}, userEmails: [${userEmails.join(", ")}] -> Found ${credentials.length} credential(s)`);

    const accounts = credentials.map((cred: any, idx: number) => ({
      id: `acc_g_${idx + 1}`,
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
    const searchUserId = req.nextUrl.searchParams.get("userId");
    const activeUserId = getCanonicalUserId(req, searchUserId);
    const email = req.nextUrl.searchParams.get("email");

    if (!activeUserId || !email) {
      return NextResponse.json(
        { success: false, error: "Authenticated user session and email are required" },
        { status: 400 }
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

