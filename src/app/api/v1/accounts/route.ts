import { NextRequest, NextResponse } from "next/server";
import { ServerGmailTokenStore } from "@/lib/server/gmail-token-store";

// Server-side Accounts API Route
export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId || userId === "usr_current_session") {
      return NextResponse.json({
        success: true,
        accounts: [],
      });
    }

    const credentials = await ServerGmailTokenStore.getAllUserCredentials(userId);

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
    const userId = req.nextUrl.searchParams.get("userId");
    const email = req.nextUrl.searchParams.get("email");

    if (!userId || !email) {
      return NextResponse.json(
        { success: false, error: "userId and email are required" },
        { status: 400 }
      );
    }

    await ServerGmailTokenStore.removeCredential(userId, email);

    return NextResponse.json({
      success: true,
      message: `Account ${email} disconnected successfully.`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

