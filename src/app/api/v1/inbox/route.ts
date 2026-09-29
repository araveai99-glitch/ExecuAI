import { NextRequest, NextResponse } from "next/server";

// Tenant Isolated Unified Inbox API
export async function GET(req: NextRequest) {
  try {
    const tenantOrgId = req.headers.get("x-organization-id") || "org_exec_9910";
    const accountFilter = req.nextUrl.searchParams.get("accountEmail") || "ALL";

    return NextResponse.json({
      success: true,
      tenantOrgId,
      accountFilter,
      totalCount: 0,
      emails: [],
      message: "Inbox endpoint active. Fetch messages directly via authenticated Gmail API provider session.",
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
