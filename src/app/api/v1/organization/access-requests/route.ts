import { NextRequest, NextResponse } from "next/server";
import { authorizeRequest } from "@/lib/server/rbac";
import { OrganizationStore } from "@/lib/server/org-store";
import { AuditStore } from "@/lib/server/audit-store";

export async function GET(req: NextRequest) {
  try {
    const authResult = await authorizeRequest(req, ["ADMIN", "MANAGER"]);
    if (!authResult.context) return authResult.errorResponse!;
    const context = authResult.context;

    const requests = await OrganizationStore.getAccessRequestsByOrgId(context.organization.id);
    return NextResponse.json({ accessRequests: requests });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch access requests" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await authorizeRequest(req, ["ADMIN", "MANAGER"]);
    if (!authResult.context) return authResult.errorResponse!;
    const context = authResult.context;

    const body = await req.json().catch(() => ({}));
    const { requestId, action, targetUserId } = body;

    if (!action || !["APPROVE", "REJECT"].includes(action.toUpperCase())) {
      return NextResponse.json({ error: "Action must be 'APPROVE' or 'REJECT'" }, { status: 400 });
    }

    const cleanAction = action.toUpperCase();

    if (targetUserId) {
      const user = await OrganizationStore.getUserById(targetUserId);
      if (!user) {
        return NextResponse.json({ error: "Target user not found" }, { status: 404 });
      }

      if (user.organizationId !== context.organization.id) {
        return NextResponse.json({ error: "Access denied. Cannot manage access request for another organization." }, { status: 403 });
      }

      const newStatus = cleanAction === "APPROVE" ? "ACTIVE" : "DISABLED";
      await OrganizationStore.updateUser(targetUserId, { status: newStatus });

      await AuditStore.recordEvent({
        organizationId: context.organization.id,
        userId: context.userId,
        actorName: context.user.fullName,
        actionEvent: cleanAction === "APPROVE" ? "User approved" : "User rejected",
        resourceContext: `User: ${user.fullName} (${user.email})`,
        resultSummary: `${context.user.fullName} ${cleanAction === "APPROVE" ? "approved" : "rejected"} ${user.email}'s access request.`,
      });

      return NextResponse.json({
        success: true,
        message: `User ${user.email} access request has been ${cleanAction === "APPROVE" ? "approved" : "rejected"}.`,
      });
    }

    if (requestId) {
      const statusArg = cleanAction === "APPROVE" ? "APPROVED" : "REJECTED";
      const updatedReq = await OrganizationStore.updateAccessRequestStatus(requestId, statusArg, context.userId);

      if (!updatedReq) {
        return NextResponse.json({ error: "Access request record not found" }, { status: 404 });
      }

      if (cleanAction === "APPROVE") {
        const existing = await OrganizationStore.getUserByEmail(updatedReq.email);
        if (!existing) {
          await OrganizationStore.createUser({
            organizationId: context.organization.id,
            email: updatedReq.email,
            fullName: updatedReq.fullName,
            role: updatedReq.role,
            status: "ACTIVE",
            emailVerified: true,
          });
        }
      }

      await AuditStore.recordEvent({
        organizationId: context.organization.id,
        userId: context.userId,
        actorName: context.user.fullName,
        actionEvent: cleanAction === "APPROVE" ? "User approved" : "User rejected",
        resourceContext: `Request: ${updatedReq.email}`,
        resultSummary: `${context.user.fullName} ${cleanAction === "APPROVE" ? "approved" : "rejected"} ${updatedReq.email}'s access request.`,
      });

      return NextResponse.json({
        success: true,
        message: `Access request for ${updatedReq.email} was ${cleanAction === "APPROVE" ? "approved" : "rejected"}.`,
      });
    }

    return NextResponse.json({ error: "Either requestId or targetUserId is required" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to process access request" }, { status: 500 });
  }
}
