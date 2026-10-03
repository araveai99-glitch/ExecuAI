import { NextRequest, NextResponse } from "next/server";
import { authorizeRequest } from "@/lib/server/rbac";
import { OrganizationStore } from "@/lib/server/org-store";
import { AuditStore } from "@/lib/server/audit-store";

export async function GET(req: NextRequest) {
  try {
    const authResult = await authorizeRequest(req);
    if (!authResult.context) return authResult.errorResponse!;
    const context = authResult.context;

    const users = await OrganizationStore.getUsersByOrgId(context.organization.id);
    const adminUser = users.find((u) => u.role === "ADMIN") || users[0];

    return NextResponse.json({
      organization: {
        id: context.organization.id,
        name: context.organization.name,
        slug: context.organization.slug,
        createdAt: context.organization.createdAt,
        owner: adminUser ? { id: adminUser.id, name: adminUser.fullName, email: adminUser.email } : null,
        totalUsers: users.length,
        activeUsers: users.filter((u) => u.status === "ACTIVE").length,
        managersCount: users.filter((u) => u.role === "MANAGER").length,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch organization details" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authResult = await authorizeRequest(req, ["ADMIN"]);
    if (!authResult.context) return authResult.errorResponse!;
    const context = authResult.context;

    const body = await req.json().catch(() => ({}));
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Organization Name is required" }, { status: 400 });
    }

    const cleanName = name.trim();
    context.organization.name = cleanName;

    await AuditStore.recordEvent({
      organizationId: context.organization.id,
      userId: context.userId,
      actorName: context.user.fullName,
      actionEvent: "Organization updated",
      resourceContext: `Organization: ${context.organization.id}`,
      resultSummary: `SUCCESS: Organization name updated to '${cleanName}' by Admin.`,
    });

    return NextResponse.json({
      success: true,
      message: "Organization updated successfully",
      organization: context.organization,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update organization" }, { status: 500 });
  }
}
