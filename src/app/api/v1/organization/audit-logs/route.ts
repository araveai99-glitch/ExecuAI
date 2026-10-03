import { NextRequest, NextResponse } from "next/server";
import { authorizeRequest } from "@/lib/server/rbac";
import { AuditStore } from "@/lib/server/audit-store";

export async function GET(req: NextRequest) {
  try {
    const authResult = await authorizeRequest(req, ["ADMIN", "MANAGER"]);
    if (!authResult.context) return authResult.errorResponse!;
    const context = authResult.context;

    const logs = await AuditStore.getLogsByOrgId(context.organization.id);
    return NextResponse.json({ auditLogs: logs });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch audit logs" }, { status: 500 });
  }
}
