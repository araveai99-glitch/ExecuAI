import { NextRequest, NextResponse } from "next/server";
import { authorizeRequest } from "@/lib/server/rbac";
import { OrganizationStore } from "@/lib/server/org-store";
import { AuditStore } from "@/lib/server/audit-store";

export async function POST(req: NextRequest) {
  try {
    const authResult = await authorizeRequest(req);
    if (!authResult.context) return authResult.errorResponse!;
    const context = authResult.context;

    const body = await req.json().catch(() => ({}));
    const { code } = body;

    if (!code || typeof code !== "string" || code.trim().length < 4) {
      return NextResponse.json({ error: "Invalid verification code. Please enter valid OTP." }, { status: 400 });
    }

    // Verify User Email
    const updatedUser = await OrganizationStore.updateUser(context.userId, {
      emailVerified: true,
    });

    if (updatedUser) {
      await AuditStore.recordEvent({
        organizationId: context.organization.id,
        userId: context.userId,
        actorName: context.user.fullName,
        actionEvent: "OTP Verified",
        resourceContext: `User: ${context.user.email}`,
        resultSummary: "SUCCESS: Email verification / OTP MFA completed successfully.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Email verified successfully!",
      user: updatedUser,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to verify OTP" }, { status: 500 });
  }
}
