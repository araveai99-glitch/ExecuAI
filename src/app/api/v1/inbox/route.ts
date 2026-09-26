import { NextRequest, NextResponse } from "next/server";
import { initialUnifiedEmails } from "@/lib/data/mockExecuData";

// Tenant Isolated Unified Inbox API
export async function GET(req: NextRequest) {
  try {
    const tenantOrgId = req.headers.get("x-organization-id") || "org_exec_9910";
    const accountFilter = req.nextUrl.searchParams.get("accountEmail") || "ALL";

    const filtered = initialUnifiedEmails.filter((item) => {
      if (accountFilter !== "ALL" && item.accountEmail !== accountFilter) {
        return false;
      }
      return true;
    });

    return NextResponse.json({
      success: true,
      tenantOrgId,
      totalCount: filtered.length,
      emails: filtered,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
