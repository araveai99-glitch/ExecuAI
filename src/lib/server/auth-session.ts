import { NextRequest } from "next/server";

/**
 * Server-side helper to extract the canonical authenticated application user ID.
 * Priority order:
 * 1. Session Cookie (`execuai_user_id`)
 * 2. Request Header (`x-user-id`)
 * 3. Explicit Query / Body parameter (if valid non-temporary ID)
 */
export function getCanonicalUserId(req: NextRequest, fallbackUserId?: string | null): string | null {
  // 1. Check execuai_user_id session cookie
  const cookieUserId = req.cookies.get("execuai_user_id")?.value;
  if (
    cookieUserId &&
    cookieUserId.trim() &&
    cookieUserId !== "usr_session_active" &&
    cookieUserId !== "usr_current_session" &&
    cookieUserId !== "usr_default_session"
  ) {
    return cookieUserId.trim();
  }

  // 2. Check x-user-id request header
  const headerUserId = req.headers.get("x-user-id");
  if (
    headerUserId &&
    headerUserId.trim() &&
    headerUserId !== "usr_session_active" &&
    headerUserId !== "usr_current_session" &&
    headerUserId !== "usr_default_session"
  ) {
    return headerUserId.trim();
  }

  // 3. Check explicit fallback user ID
  if (
    fallbackUserId &&
    fallbackUserId.trim() &&
    fallbackUserId !== "usr_session_active" &&
    fallbackUserId !== "usr_current_session" &&
    fallbackUserId !== "usr_default_session"
  ) {
    return fallbackUserId.trim();
  }

  return null;
}
