"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { GmailApiService } from "@/lib/services/GmailApiService";
import { getGoogleRedirectUri } from "@/lib/config/google-oauth";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const { user, loginWithGoogle, connectAccount } = useAuth();
  const [status, setStatus] = React.useState("Completing Google OAuth 2.0 verification...");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function handleGoogleCallback() {
      try {
        const hash = window.location.hash.substring(1);
        const searchParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(hash);

        const code = searchParams.get("code");
        const accessToken = hashParams.get("access_token") || searchParams.get("access_token");

        // 1. Authorization Code Flow (Recommended — obtains Refresh Token)
        if (code) {
          setStatus("Exchanging Google authorization code for credentials...");
          const res = await fetch("/api/v1/auth/google/exchange-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              code,
              redirectUri: getGoogleRedirectUri(),
              userId: user?.id || "usr_current_session",
            }),
          });

          const data = await res.json();
          if (!res.ok || !data.success) {
            throw new Error(data.error || "Failed to exchange Google OAuth authorization code.");
          }

          const verifiedEmail = data.email;
          const accountName = data.name || verifiedEmail.split("@")[0];

          setStatus(`Successfully authenticated: ${verifiedEmail}`);

          // Update application session & connected accounts
          if (user) {
            connectAccount("Gmail", verifiedEmail);
          } else {
            await loginWithGoogle(verifiedEmail, accountName, data.accessToken);
          }

          setTimeout(() => {
            router.push(`/onboarding/gmail-success?email=${encodeURIComponent(verifiedEmail)}`);
          }, 600);
          return;
        }

        // 2. Direct Access Token Flow
        if (accessToken) {
          setStatus("Retrieving authenticated Google profile...");
          const profile = await GmailApiService.fetchGoogleUserProfile(accessToken);
          const cleanEmail = profile.email.toLowerCase();

          setStatus(`Saving server-side OAuth credentials for ${cleanEmail}...`);
          const saveRes = await fetch("/api/v1/auth/google/save-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              accessToken,
              email: cleanEmail,
              userId: user?.id || "usr_current_session",
            }),
          });

          const saveData = await saveRes.json();
          if (!saveRes.ok || !saveData.success) {
            throw new Error(saveData.error || "Failed to store server credentials.");
          }

          setStatus(`Verified Google Account: ${cleanEmail}`);

          if (user) {
            connectAccount("Gmail", cleanEmail);
          } else {
            await loginWithGoogle(cleanEmail, profile.name, accessToken);
          }

          setTimeout(() => {
            router.push(`/onboarding/gmail-success?email=${encodeURIComponent(cleanEmail)}`);
          }, 600);
          return;
        }

        // Check if error was returned by Google OAuth
        const oauthError = searchParams.get("error") || hashParams.get("error");
        if (oauthError) {
          setError(`Google OAuth Error: ${oauthError}`);
          return;
        }

        setError("No Google OAuth code or access token received in redirect response.");
      } catch (err: any) {
        console.error("Google OAuth error", err);
        setError(err.message || "Failed to complete Google OAuth authentication.");
      }
    }

    handleGoogleCallback();
  }, [user, loginWithGoogle, connectAccount, router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="w-16 h-16 rounded-2xl bg-white border border-[#E2E8F0] shadow-lg flex items-center justify-center mb-4">
        <svg className="w-8 h-8" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
          />
        </svg>
      </div>

      {error ? (
        <div className="space-y-4 max-w-md">
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold">
            {error}
          </div>
          <button
            onClick={() => router.push("/auth/login")}
            className="px-4 py-2 rounded-xl bg-[#F15E1C] text-white text-xs font-bold"
          >
            Return to Login
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold text-[#0F172A] font-heading">{status}</h2>
          <p className="text-xs text-[#64748B] mt-1">
            Establishing secure OAuth 2.0 session & syncing Gmail messages...
          </p>
        </>
      )}
    </div>
  );
}
