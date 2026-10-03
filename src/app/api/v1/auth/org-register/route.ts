import { NextRequest, NextResponse } from "next/server";
import { OrganizationStore } from "@/lib/server/org-store";
import { AuditStore } from "@/lib/server/audit-store";
import { signUserId } from "@/lib/server/auth-session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { orgName, adminName, adminEmail, password } = body;

    if (!orgName || !orgName.trim()) {
      return NextResponse.json({ error: "Organization Name is required" }, { status: 400 });
    }
    if (!adminName || !adminName.trim()) {
      return NextResponse.json({ error: "Admin Name is required" }, { status: 400 });
    }
    if (!adminEmail || !adminEmail.trim() || !adminEmail.includes("@")) {
      return NextResponse.json({ error: "Valid Admin Work Email is required" }, { status: 400 });
    }

    const cleanEmail = adminEmail.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await OrganizationStore.getUserByEmail(cleanEmail);
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please sign in." },
        { status: 400 }
      );
    }

    // 1. Create Organization
    const organization = await OrganizationStore.createOrganization(orgName, cleanEmail);

    // 2. Create Admin User Account
    const adminUser = await OrganizationStore.createUser({
      organizationId: organization.id,
      email: cleanEmail,
      fullName: adminName,
      role: "ADMIN",
      status: "ACTIVE",
      passwordHash: password || "password123",
      emailVerified: false, // OTP verification required
    });

    // 3. Record Audit Event
    await AuditStore.recordEvent({
      organizationId: organization.id,
      userId: adminUser.id,
      actorName: adminUser.fullName,
      actionEvent: "Organization registered",
      resourceContext: `Organization: ${organization.name} (${organization.id})`,
      resultSummary: `SUCCESS: Organization created and Admin account (${adminUser.email}) initialized. Pending OTP verification.`,
    });

    // 4. Set Session Cookie
    const signedToken = signUserId(adminUser.id);
    const response = NextResponse.json({
      success: true,
      message: "Organization created successfully. Please verify your email with OTP.",
      organization,
      user: {
        id: adminUser.id,
        organizationId: organization.id,
        organizationName: organization.name,
        name: adminUser.fullName,
        email: adminUser.email,
        role: adminUser.role,
        status: adminUser.status,
        emailVerified: adminUser.emailVerified,
      },
    });

    response.cookies.set("execuai_user_id", signedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("[ORG REGISTER API ERROR]", err);
    return NextResponse.json({ error: err.message || "Failed to register organization" }, { status: 500 });
  }
}
