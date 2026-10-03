import { NextRequest, NextResponse } from "next/server";
import { authorizeRequest } from "@/lib/server/rbac";
import { OrganizationStore, StoredUser } from "@/lib/server/org-store";
import { AuditStore } from "@/lib/server/audit-store";

export async function POST(req: NextRequest) {
  try {
    const authResult = await authorizeRequest(req, ["ADMIN"]);
    if (!authResult.context) return authResult.errorResponse!;
    const context = authResult.context;

    const body = await req.json().catch(() => ({}));
    const { csvData, defaultRole = "USER" } = body;

    if (!csvData || typeof csvData !== "string" || !csvData.trim()) {
      return NextResponse.json({ error: "CSV data content is required" }, { status: 400 });
    }

    const lines = csvData
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) {
      return NextResponse.json({ error: "No valid rows found in CSV data" }, { status: 400 });
    }

    const createdUsers: StoredUser[] = [];
    const errors: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (i === 0 && (line.toLowerCase().includes("email") || line.toLowerCase().includes("name"))) {
        continue;
      }

      const parts = line.split(",").map((p) => p.trim().replace(/^["']|["']$/g, ""));
      if (parts.length < 1) continue;

      let name = "";
      let email = "";
      let role: "ADMIN" | "MANAGER" | "USER" = (defaultRole.toUpperCase() as any) || "USER";

      if (parts[0].includes("@")) {
        email = parts[0];
        name = parts[1] || email.split("@")[0];
        if (parts[2]) role = (parts[2].toUpperCase() as any) || role;
      } else {
        name = parts[0];
        email = parts[1] || "";
        if (parts[2]) role = (parts[2].toUpperCase() as any) || role;
      }

      if (!email || !email.includes("@")) {
        errors.push(`Row ${i + 1}: Invalid email address '${parts.join(",")}'`);
        continue;
      }

      const cleanEmail = email.toLowerCase();
      const existing = await OrganizationStore.getUserByEmail(cleanEmail);
      if (existing) {
        errors.push(`Row ${i + 1}: Email '${cleanEmail}' is already registered`);
        continue;
      }

      try {
        const newUser = await OrganizationStore.createUser({
          organizationId: context.organization.id,
          email: cleanEmail,
          fullName: name || cleanEmail.split("@")[0],
          role: ["ADMIN", "MANAGER", "USER"].includes(role) ? role : "USER",
          status: "ACTIVE",
          emailVerified: true,
        });

        createdUsers.push(newUser);
      } catch (err: any) {
        errors.push(`Row ${i + 1}: Failed to create user - ${err.message}`);
      }
    }

    if (createdUsers.length > 0) {
      await AuditStore.recordEvent({
        organizationId: context.organization.id,
        userId: context.userId,
        actorName: context.user.fullName,
        actionEvent: "User invited",
        resourceContext: `CSV Import (${createdUsers.length} users)`,
        resultSummary: `${context.user.fullName} uploaded CSV bulk invite: ${createdUsers.length} user(s) created successfully.`,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Bulk CSV invite processed. Successfully added ${createdUsers.length} user(s).`,
      count: createdUsers.length,
      users: createdUsers,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to process CSV invitation" }, { status: 500 });
  }
}
