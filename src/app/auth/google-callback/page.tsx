"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { GmailApiService } from "@/lib/services/GmailApiService";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const { loginWithGoogle } = useAuth();
  const [status, setStatus] = React.useState("Completing Google OAuth 2.0 verification...");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function handleGoogleCallback() {
      try {
        // Parse access_token from hash or query parameters
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash || window.location.search);
        const accessToken = params.get("access_token");

        if (accessToken) {
          setStatus("Retrieving authenticated Google profile...");
          const profile = await GmailApiService.fetchGoogleUserProfile(accessToken);

          setStatus(`Verified Google Account: ${profile.email}`);
          await loginWithGoogle(profile.email, profile.name, accessToken);
          return;
        }

        // Check if an error was returned by Google OAuth
        const oauthError = params.get("error");
        if (oauthError) {
          setError(`Google OAuth Error: ${oauthError}`);
          return;
        }

        setError("No Google OAuth access token received in redirect response.");
      } catch (err: any) {
        console.error("Google OAuth error", err);
        setError(err.message || "Failed to complete Google OAuth authentication.");
      }
    }

    handleGoogleCallback();
  }, [loginWithGoogle]);

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
