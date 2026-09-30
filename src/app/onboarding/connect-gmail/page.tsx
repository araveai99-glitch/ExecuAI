"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth-context";
import { buildGoogleConnectUrl, isGoogleOAuthConfigured, getGoogleRedirectUri } from "@/lib/config/google-oauth";

export default function ConnectGmailPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isAuthorizing, setIsAuthorizing] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [serverConfigured, setServerConfigured] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    // Check server configuration status
    fetch("/api/v1/auth/google/url?flow=connect_gmail")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.isConfigured) {
          setServerConfigured(true);
        } else {
          setServerConfigured(false);
        }
      })
      .catch(() => setServerConfigured(null));
  }, []);

  const handleOAuthConnect = async () => {
    setIsAuthorizing(true);
    setErrorMsg(null);

    try {
      // 1. Try client-side configuration
      const authRes = buildGoogleConnectUrl();
      if (authRes.url) {
        window.location.href = authRes.url;
        return;
      }

      // 2. Try server-side endpoint configuration
      const apiRes = await fetch("/api/v1/auth/google/url?flow=connect_gmail");
      const apiData = await apiRes.json();

      if (apiData.success && apiData.url) {
        window.location.href = apiData.url;
        return;
      }

      setIsAuthorizing(false);
      setErrorMsg(
        apiData.error ||
          "Google OAuth Client ID is missing. Please set GOOGLE_CLIENT_ID or NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local with your active Google Cloud Console OAuth Client ID."
      );
    } catch (e: any) {
      setIsAuthorizing(false);
      setErrorMsg(e.message || "Unable to initialize Google OAuth session.");
    }
  };

  const showWarning = serverConfigured === false && !isGoogleOAuthConfigured();

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

      {showWarning && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-950">
            <span className="material-symbols-outlined text-[20px] text-amber-600">warning</span>
            <span>Google Cloud OAuth Setup Required</span>
          </div>
          <p>
            To authenticate with Google OAuth, set your active Google Cloud OAuth 2.0 Client ID in <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">.env.local</code> under <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> or <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">GOOGLE_CLIENT_ID</code>.
          </p>
          <div className="text-[11px] text-amber-800 space-y-1">
            <div><strong>Authorized Redirect URI:</strong> <code className="bg-white px-1.5 py-0.5 rounded border border-amber-300 font-mono text-[10px]">{getGoogleRedirectUri()}</code></div>
            <div>Configure this exact URI under Authorized Redirect URIs in your Google Cloud Console.</div>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{errorMsg}</span>
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

