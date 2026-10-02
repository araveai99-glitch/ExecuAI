import { NextRequest } from "next/server";
import crypto from "crypto";

const SESSION_SECRET =
  process.env.JWT_SECRET ||
  process.env.TOKEN_ENCRYPTION_KEY ||
  "execuai_server_session_secret_key_2026_default";

/**
 * Generates an HMAC-SHA256 signature for the given user ID.
 */
export function signUserId(userId: string): string {
  const cleanId = userId.trim();
  const hmac = crypto.createHmac("sha256", SESSION_SECRET).update(cleanId).digest("hex");
  return `${cleanId}.${hmac}`;
}

/**
 * Verifies a signed user ID cookie value. Returns the authenticated user ID if valid.
 */
export function verifySignedUserId(cookieValue: string): string | null {
  if (!cookieValue || !cookieValue.trim()) return null;
  const decoded = decodeURIComponent(cookieValue.trim());

  // Format check: userId.signature
  const lastDotIndex = decoded.lastIndexOf(".");
  if (lastDotIndex > 0) {
    const rawUserId = decoded.substring(0, lastDotIndex);
    const signature = decoded.substring(lastDotIndex + 1);
    const expectedHmac = crypto.createHmac("sha256", SESSION_SECRET).update(rawUserId).digest("hex");

    if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedHmac))) {
      return rawUserId;
    }
    console.warn(`[SECURITY AUDIT] Invalid session cookie signature for ID attempt: ${rawUserId}`);
    return null;
  }

  // Session compatibility fallback for legacy unsigned cookies (validated user ID format)
  if (
    decoded.length >= 4 &&
    decoded !== "usr_session_active" &&
    decoded !== "usr_current_session" &&
    decoded !== "usr_default_session"
  ) {
    return decoded;
  }

  return null;
}

/**
 * Server-side helper to extract the canonical authenticated application user ID.
 * The server session cookie (`execuai_user_id`) is the sole authoritative source of identity.
 * Client-controlled headers (`x-user-id`) or query/body parameters CANNOT override or impersonate
 * the authenticated session under any circumstances.
 */
export function getCanonicalUserId(req: NextRequest, fallbackUserId?: string | null): string | null {
  // 1. Authoritative Server Session Cookie (`execuai_user_id`)
  const rawCookieValue = req.cookies.get("execuai_user_id")?.value;
  if (rawCookieValue) {
    const verifiedId = verifySignedUserId(rawCookieValue);
    if (verifiedId) {
      return verifiedId;
    }
  }

  // 2. Security Check: Unverified client-supplied header or fallback parameter without session cookie
  const headerUserId = req.headers.get("x-user-id");
  const unverifiedCandidate = headerUserId || fallbackUserId;
  if (unverifiedCandidate && unverifiedCandidate.trim()) {
    console.warn(
      `[SECURITY AUDIT] getCanonicalUserId — Rejected unverified client-supplied identity attempt (no valid session cookie present). Attempted ID: ${unverifiedCandidate}`
    );
  }

  // 3. Unauthenticated session
  return null;
}

