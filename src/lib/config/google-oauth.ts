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

export function sanitizeEnvVal(val?: string | null): string {
  if (!val) return "";
  let clean = val.trim();
  if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) {
    clean = clean.slice(1, -1).trim();
  }
  return clean;
}

export function getGoogleClientId(): string {
  const envId =
    process.env.GOOGLE_CLIENT_ID ||
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    process.env.GMAIL_CLIENT_ID ||
    "";

  return sanitizeEnvVal(envId);
}

export function getGoogleClientSecret(): string {
  const envSecret =
    process.env.GOOGLE_CLIENT_SECRET ||
    process.env.GMAIL_CLIENT_SECRET ||
    "";

  return sanitizeEnvVal(envSecret);
}

export function getGoogleOAuthDiagnostics(): {
  clientIdLast6: string;
  hasClientSecret: boolean;
  clientSecretLength: number;
  isSecretMasked: boolean;
  redirectUri: string;
} {
  const clientId = getGoogleClientId();
  const clientSecret = getGoogleClientSecret();
  const redirectUri = getGoogleRedirectUri();

  return {
    clientIdLast6: clientId.length >= 6 ? clientId.slice(-6) : clientId,
    hasClientSecret: Boolean(clientSecret && clientSecret.length > 0),
    clientSecretLength: clientSecret ? clientSecret.length : 0,
    isSecretMasked: clientSecret.includes("*"),
    redirectUri,
  };
}

export function isGoogleOAuthConfigured(): boolean {
  const clientId = getGoogleClientId();
  return Boolean(clientId && clientId.length > 0);
}

export function getGoogleRedirectUri(): string {
  if (process.env.GOOGLE_REDIRECT_URI) return sanitizeEnvVal(process.env.GOOGLE_REDIRECT_URI);
  if (process.env.GMAIL_REDIRECT_URI) return sanitizeEnvVal(process.env.GMAIL_REDIRECT_URI);
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



