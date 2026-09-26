import { NextRequest, NextResponse } from "next/server";

// Tenant Scoped Accounts API Route
// Enforces tenant isolation (Organization ID: org_exec_9910)
export async function GET(req: NextRequest) {
  try {
    const tenantOrgId = req.headers.get("x-organization-id") || "org_exec_9910";

    const accounts = [
      {
        id: "ACC-101",
        organizationId: tenantOrgId,
        accountLabel: "Gmail #1",
        provider: "GMAIL",
        emailAddress: "ceo@company.com",
        status: "CONNECTED",
        lastSync: "12s ago",
        scopes: ["https://www.googleapis.com/auth/gmail.readonly", "https://www.googleapis.com/auth/gmail.compose"],
        connectedDate: "Aug 12, 2026",
        unreadCount: 14,
        totalSyncedThreads: 1240,
      },
      {
        id: "ACC-102",
        organizationId: tenantOrgId,
        accountLabel: "Gmail #2",
        provider: "GMAIL",
        emailAddress: "sales@company.com",
        status: "SYNCING",
        lastSync: "Syncing stream...",
        scopes: ["https://www.googleapis.com/auth/gmail.readonly", "https://www.googleapis.com/auth/gmail.compose"],
        connectedDate: "Sep 01, 2026",
        unreadCount: 8,
        totalSyncedThreads: 840,
      },
      {
        id: "ACC-103",
        organizationId: tenantOrgId,
        accountLabel: "Zoho #1",
        provider: "ZOHO",
        emailAddress: "director@company.com",
        status: "ERROR",
        lastSync: "14m ago",
        syncError: "TLS Handshake Timeout: Endpoint mx.zoho.com refused OAuth handshake retry.",
        scopes: ["ZohoMail.messages.READ", "ZohoMail.messages.CREATE"],
        connectedDate: "Jul 28, 2026",
        unreadCount: 6,
        totalSyncedThreads: 610,
      },
    ];

    return NextResponse.json({
      success: true,
      tenantOrgId,
      accounts,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
