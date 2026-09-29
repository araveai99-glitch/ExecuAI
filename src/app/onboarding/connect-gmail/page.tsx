"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth-context";
import { GmailApiService } from "@/lib/services/GmailApiService";

export default function ConnectGmailPage() {
  const router = useRouter();
  const { user, connectAccount } = useAuth();
  const [isAuthorizing, setIsAuthorizing] = React.useState(false);
  const [showTokenInput, setShowTokenInput] = React.useState(false);
  const [manualToken, setManualToken] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const handleOAuthConnect = () => {
    setIsAuthorizing(true);
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "998127389102-google-oauth-client-id.apps.googleusercontent.com";
    const redirectUri = `${window.location.origin}/auth/google-callback`;
    const scope = "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      googleClientId
    )}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=token&scope=${encodeURIComponent(scope)}&prompt=consent`;

    window.location.href = authUrl;
  };

  const handleManualTokenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualToken.trim()) return;

    setIsAuthorizing(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      // Fetch actual user profile using token
      const profile = await GmailApiService.fetchGoogleUserProfile(manualToken.trim());
      const cleanEmail = profile.email.toLowerCase();

      // Save credentials securely on the server
      await fetch("/api/v1/auth/google/save-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: manualToken.trim(),
          email: cleanEmail,
          userId: "usr_current_session",
        }),
      });

      // Connect account in AuthContext
      connectAccount("Gmail", cleanEmail);

      setSuccessMsg(`Successfully authenticated ${cleanEmail}`);
      setTimeout(() => {
        router.push(`/onboarding/gmail-success?email=${encodeURIComponent(cleanEmail)}`);
      }, 800);
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid Google Access Token or unable to connect Gmail API.");
      setIsAuthorizing(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E2E8F0] shadow-md space-y-6">
      <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
        <div className="w-10 h-10 rounded-xl bg-[#EA4335]/10 text-[#EA4335] font-bold flex items-center justify-center text-xl shrink-0">
          G
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E936F]">
            Step 2a: Provider Authentication
          </span>
          <h1 className="text-xl font-bold text-[#0F172A]">Connect Your Real Gmail Account</h1>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{successMsg}</span>
        </div>
      )}

      <div className="space-y-4 text-xs text-[#475569]">
        <p className="leading-relaxed">
          ExecuAI connects to your actual Gmail mailbox using Google&apos;s official OAuth 2.0 API. Clicking connect will authenticate your Google account and retrieve messages directly from your Gmail inbox.
        </p>

        {/* Permissions Requested Breakdown */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
          <span className="font-bold text-[#0F172A] uppercase tracking-wider text-[10px] block">
            Permissions Requested by ExecuAI:
          </span>
          <div className="space-y-2 text-[#0F172A]">
            <div className="flex items-start gap-2">
              <span className="text-[#2E936F] font-bold">•</span>
              <span><strong>Read Emails & Threads (INBOX):</strong> Used to fetch actual messages belonging ONLY to your authenticated Gmail mailbox.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#2E936F] font-bold">•</span>
              <span><strong>Create & Send Drafts:</strong> Used to prepare and dispatch replies directly through your Gmail account.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Token Option */}
      <div className="pt-2 border-t border-[#E2E8F0] space-y-3">
        <button
          type="button"
          onClick={() => setShowTokenInput(!showTokenInput)}
          className="text-xs font-bold text-[#F15E1C] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">key</span>
          {showTokenInput ? "Hide Google Access Token input" : "Or connect using direct Google OAuth Access Token"}
        </button>

        {showTokenInput && (
          <form onSubmit={handleManualTokenSubmit} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
            <label className="block text-xs font-bold text-[#0F172A]">
              Google OAuth 2.0 Access Token:
            </label>
            <input
              type="text"
              placeholder="Paste Google OAuth Access Token (ya29...)"
              value={manualToken}
              onChange={(e) => setManualToken(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#CBD5E1] bg-white text-xs text-[#0F172A] outline-none focus:border-[#F15E1C]"
            />
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              isLoading={isAuthorizing}
              className="w-full sm:w-auto"
            >
              Verify Token & Sync Gmail
            </Button>
          </form>
        )}
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => router.push("/app/dashboard")}
          className="text-xs text-[#475569] hover:text-[#0F172A] font-semibold"
        >
          Go to Dashboard →
        </button>

        <Button
          variant="primary"
          size="lg"
          isLoading={isAuthorizing}
          onClick={handleOAuthConnect}
          className="w-full sm:w-auto cursor-pointer"
        >
          <span className="font-bold">G</span>
          <span>Connect Gmail via Google OAuth</span>
        </Button>
      </div>
    </div>
  );
}
