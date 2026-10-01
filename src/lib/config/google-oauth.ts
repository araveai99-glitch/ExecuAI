/**
 * Centralized Google OAuth 2.0 Configuration Helper
 * Ensures consistent Client ID, Redirect URI, and Scope usage across frontend and backend.
 */

// Scope 1: Normal Google Sign-In / Login (OIDC Identity only, no Gmail permissions)
export const GOOGLE_LOGIN_SCOPES = [
  "openid",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
].join(" ");

// Scope 2: Gmail Integration (Explicitly requested inside dashboard/onboarding)
export const GMAIL_CONNECT_SCOPES = [
  "openid",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/gmail.readonly",
].join(" ");

export function getGoogleClientId(): string {
  const envId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    process.env.GOOGLE_CLIENT_ID ||
    process.env.GMAIL_CLIENT_ID ||
    "";

  return envId.trim();
}

export function isGoogleOAuthConfigured(): boolean {
  const clientId = getGoogleClientId();
  return Boolean(clientId && clientId.trim().length > 0);
}

export function getGoogleRedirectUri(): string {
  if (process.env.GOOGLE_REDIRECT_URI) return process.env.GOOGLE_REDIRECT_URI.trim();
  if (process.env.GMAIL_REDIRECT_URI) return process.env.GMAIL_REDIRECT_URI.trim();
  if (typeof window !== "undefined") {
    return `${window.location.origin}/auth/google-callback`;
  }
  const port = process.env.PORT || "3000";
  return `http://localhost:${port}/auth/google-callback`;
}

/**
 * Builds Google Sign-In / Login OAuth URL (OIDC Identity only)
 */
export function buildGoogleLoginUrl(): { url?: string; error?: string } {
  const clientId = getGoogleClientId();
  const redirectUri = getGoogleRedirectUri();

  if (!clientId) {
    return {
      error:
        "Google OAuth configuration is missing. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local with your active Google Cloud Console OAuth Client ID.",
    };
  }

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=${encodeURIComponent(
    GOOGLE_LOGIN_SCOPES
  )}&prompt=select_account&state=login`;

  return { url: authUrl };
}

/**
 * Builds Connect Gmail OAuth URL (Full Mailbox permissions + Offline refresh token)
 */
export function buildGoogleConnectUrl(): { url?: string; error?: string } {
  const clientId = getGoogleClientId();
  const redirectUri = getGoogleRedirectUri();

  if (!clientId) {
    return {
      error:
        "Google OAuth configuration is missing. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local with your active Google Cloud Console OAuth Client ID.",
    };
  }

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=${encodeURIComponent(
    GMAIL_CONNECT_SCOPES
  )}&access_type=offline&prompt=consent&state=connect_gmail`;

  return { url: authUrl };
}

export function buildGoogleAuthUrl(flow: "login" | "connect_gmail" = "connect_gmail"): { url?: string; error?: string } {
  if (flow === "login") {
    return buildGoogleLoginUrl();
  }
  return buildGoogleConnectUrl();
}



