/**
 * Centralized Google OAuth 2.0 Configuration Helper
 * Ensures consistent Client ID, Redirect URI, and Scope usage across frontend and backend.
 */

export const GOOGLE_OAUTH_SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
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
  if (!clientId) return false;
  if (clientId.includes("google-oauth-client-id.apps.googleusercontent.com")) {
    return false;
  }
  return true;
}

export function getGoogleRedirectUri(): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/auth/google-callback`;
  }
  return process.env.GOOGLE_REDIRECT_URI || process.env.GMAIL_REDIRECT_URI || "http://localhost:3000/auth/google-callback";
}

export function buildGoogleAuthUrl(): { url?: string; error?: string } {
  const clientId = getGoogleClientId();

  if (!isGoogleOAuthConfigured()) {
    return {
      error:
        "Google OAuth configuration is incomplete or invalid. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local with your active Google Cloud Console OAuth Client ID.",
    };
  }

  const redirectUri = getGoogleRedirectUri();
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=token&scope=${encodeURIComponent(
    GOOGLE_OAUTH_SCOPES
  )}&prompt=consent`;

  return { url: authUrl };
}
