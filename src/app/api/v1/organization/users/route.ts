import { NextRequest, NextResponse } from "next/server";
import { authorizeRequest } from "@/lib/server/rbac";
import { OrganizationStore } from "@/lib/server/org-store";
import { AuditStore } from "@/lib/server/audit-store";

export async function GET(req: NextRequest) {
  try {
    const authResult = await authorizeRequest(req, ["ADMIN", "MANAGER"]);
    if (!authResult.context) return authResult.errorResponse!;
    const context = authResult.context;

    let users = await OrganizationStore.getUsersByOrgId(context.organization.id);

    if (context.user.role === "MANAGER") {
      users = users.filter(
        (u) => u.managerId === context.userId || u.id === context.userId || u.role === "USER"
      );
    }

    const safeUsers = users.map((u) => ({
      id: u.id,
      organizationId: u.organizationId,
      name: u.fullName,
      email: u.email,
      role: u.role,
      status: u.status,
      managerId: u.managerId,
      emailVerified: u.emailVerified,
      lastActivityAt: u.lastActivityAt || u.createdAt,
      createdAt: u.createdAt,
    }));

    return NextResponse.json({ users: safeUsers });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch organization users" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await authorizeRequest(req, ["ADMIN", "MANAGER"]);
    if (!authResult.context) return authResult.errorResponse!;
    const context = authResult.context;

    const body = await req.json().catch(() => ({}));
    const { name, email, role, managerId } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "User Name is required" }, { status: 400 });
    }
    if (!email || !email.trim() || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email address is required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    const existing = await OrganizationStore.getUserByEmail(cleanEmail);
    if (existing) {
      return NextResponse.json(
        { error: "A user with this email address already exists in the system." },
        { status: 400 }
      );
    }

    let assignedRole: "ADMIN" | "MANAGER" | "USER" = "USER";
    if (context.user.role === "ADMIN") {
      assignedRole = (role || "USER").toUpperCase() as any;
    }

    const newUser = await OrganizationStore.createUser({
      organizationId: context.organization.id,
      email: cleanEmail,
      fullName: name.trim(),
      role: assignedRole,
      status: "ACTIVE",
      managerId: managerId || (context.user.role === "MANAGER" ? context.userId : undefined),
      emailVerified: true,
    });

    await AuditStore.recordEvent({
      organizationId: context.organization.id,
      userId: context.userId,
      actorName: context.user.fullName,
      actionEvent: "User invited",
      resourceContext: `User: ${newUser.fullName} (${newUser.email})`,
      resultSummary: `${context.user.fullName} (${context.user.role}) invited ${newUser.email} with role ${newUser.role}.`,
    });

    return NextResponse.json({
      success: true,
      message: `User ${newUser.email} added successfully`,
      user: {
        id: newUser.id,
        organizationId: newUser.organizationId,
        name: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to add user" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authResult = await authorizeRequest(req, ["ADMIN"]);
    if (!authResult.context) return authResult.errorResponse!;
    const context = authResult.context;

    const body = await req.json().catch(() => ({}));
    const { targetUserId, role, status, managerId } = body;

    if (!targetUserId) {
      return NextResponse.json({ error: "Target User ID is required" }, { status: 400 });
    }

    const targetUser = await OrganizationStore.getUserById(targetUserId);
    if (!targetUser) {
      return NextResponse.json({ error: "Target user not found" }, { status: 404 });
    }

    if (targetUser.organizationId !== context.organization.id) {
      return NextResponse.json({ error: "Access denied. Cannot modify user from another organization." }, { status: 403 });
    }

    const previousRole = targetUser.role;

    const updates: Partial<any> = {};
    if (role && ["ADMIN", "MANAGER", "USER"].includes(role.toUpperCase())) {
      updates.role = role.toUpperCase();
    }
    if (status && ["ACTIVE", "PENDING_APPROVAL", "INVITED", "DISABLED"].includes(status.toUpperCase())) {
      updates.status = status.toUpperCase();
    }
    if (managerId !== undefined) {
      updates.managerId = managerId || null;
    }

    const updatedUser = await OrganizationStore.updateUser(targetUserId, updates);

    if (updates.role && updates.role !== previousRole) {
      await AuditStore.recordEvent({
        organizationId: context.organization.id,
        userId: context.userId,
        actorName: context.user.fullName,
        actionEvent: "Role changed",
        resourceContext: `User: ${targetUser.fullName} (${targetUser.email})`,
        resultSummary: `${context.user.fullName} changed ${targetUser.email}'s role from ${previousRole} to ${updates.role}.`,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Updated user ${targetUser.email}`,
      user: updatedUser,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authResult = await authorizeRequest(req, ["ADMIN"]);
    if (!authResult.context) return authResult.errorResponse!;
    const context = authResult.context;

    const { searchParams } = new URL(req.url);
    const targetUserId = searchParams.get("userId");

    if (!targetUserId) {
      return NextResponse.json({ error: "userId parameter is required" }, { status: 400 });
    }

    const targetUser = await OrganizationStore.getUserById(targetUserId);
    if (!targetUser) {
      return NextResponse.json({ error: "Target user not found" }, { status: 404 });
    }

    if (targetUser.organizationId !== context.organization.id) {
      return NextResponse.json({ error: "Access denied. Cannot remove user from another organization." }, { status: 403 });
    }

    if (targetUser.id === context.userId) {
      return NextResponse.json({ error: "Cannot remove your own Admin account." }, { status: 400 });
    }

    await OrganizationStore.deleteUser(targetUserId);

    await AuditStore.recordEvent({
      organizationId: context.organization.id,
      userId: context.userId,
      actorName: context.user.fullName,
      actionEvent: "User removed",
      resourceContext: `User: ${targetUser.fullName} (${targetUser.email})`,
      resultSummary: `${context.user.fullName} removed user ${targetUser.email} from Organization ${context.organization.name}.`,
    });

    return NextResponse.json({
      success: true,
      message: `User ${targetUser.email} has been removed.`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to remove user" }, { status: 500 });
  }
}
