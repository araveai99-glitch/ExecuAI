import { NextRequest, NextResponse } from "next/server";

// Tenant Scoped Accounts API Route
export async function GET(req: NextRequest) {
  try {
    const tenantOrgId = req.headers.get("x-organization-id") || "org_exec_9910";

    return NextResponse.json({
      success: true,
      tenantOrgId,
      accounts: [],
      message: "Accounts endpoint active. Fetch connected accounts from user session or database.",
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

