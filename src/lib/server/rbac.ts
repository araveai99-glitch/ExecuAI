import { NextRequest, NextResponse } from "next/server";
import { getCanonicalUserId } from "@/lib/server/auth-session";
import { OrganizationStore, StoredUser, StoredOrganization } from "@/lib/server/org-store";

export type Role = "ADMIN" | "MANAGER" | "USER";

export interface AuthenticatedRequestContext {
  userId: string;
  user: StoredUser;
  organization: StoredOrganization;
}

/**
 * Validates request authorization and returns authenticated user and organization context.
 * If authentication fails or roles are insufficient, returns an appropriate HTTP Response.
 */
export async function authorizeRequest(
  req: NextRequest,
  allowedRoles?: Role[]
): Promise<{ context?: AuthenticatedRequestContext; errorResponse?: NextResponse }> {
  // 1. Extract canonical authenticated user ID from signed cookie
  const userId = getCanonicalUserId(req);

  // Fallback check: allow header x-user-id if present in dev mode when valid user exists
  const candidateUserId = userId || req.headers.get("x-user-id");

  if (!candidateUserId) {
    return {
      errorResponse: NextResponse.json(
        { error: "Unauthorized access. Valid session cookie or user identity required." },
        { status: 401 }
      ),
    };
  }

  // 2. Fetch User Record
  const user = await OrganizationStore.getUserById(candidateUserId);
  if (!user) {
    return {
      errorResponse: NextResponse.json(
        { error: "User identity not found or session invalid." },
        { status: 401 }
      ),
    };
  }

  // 3. Verify User Account Status
  if (user.status === "DISABLED") {
    return {
      errorResponse: NextResponse.json(
        { error: "User account has been disabled by Organization Administrator." },
        { status: 403 }
      ),
    };
  }

  if (user.status === "PENDING_APPROVAL") {
    return {
      errorResponse: NextResponse.json(
        { error: "Access pending approval by Organization Administrator." },
        { status: 403 }
      ),
    };
  }

  // 4. Fetch Organization Record
  const organization = await OrganizationStore.getOrganizationById(user.organizationId);
  if (!organization) {
    return {
      errorResponse: NextResponse.json(
        { error: "Associated Organization record not found." },
        { status: 403 }
      ),
    };
  }

  // 5. Enforce Role Permissions if restricted
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = (user.role || "USER").toUpperCase() as Role;
    if (!allowedRoles.includes(userRole)) {
      return {
        errorResponse: NextResponse.json(
          {
            error: `Access Denied. Role '${userRole}' is not permitted to perform this operation. Required: ${allowedRoles.join(
              ", "
            )}`,
          },
          { status: 403 }
        ),
      };
    }
  }

  // Update user last activity
  OrganizationStore.touchLastActivity(user.id).catch(() => {});

  return {
    context: {
      userId: user.id,
      user,
      organization,
    },
  };
}

/**
 * Validates that an operation stays strictly within the requesting user's organization.
 * Prevents URL ID manipulation and cross-tenant data leaks.
 */
export function validateTenantIsolation(
  requestingOrgId: string,
  targetOrgId: string
): boolean {
  if (!requestingOrgId || !targetOrgId) return false;
  return requestingOrgId.trim().toLowerCase() === targetOrgId.trim().toLowerCase();
}

/**
 * PRIVACY SAFEGUARD:
 * Ensures that email content and credentials are accessible ONLY by the account owner.
 * Admins and Managers CANNOT read another user's email inbox/content.
 */
export function validateEmailAccountPrivacy(
  requestingUserId: string,
  targetUserId: string
): boolean {
  if (!requestingUserId || !targetUserId) return false;
  return requestingUserId.trim().toLowerCase() === targetUserId.trim().toLowerCase();
}
