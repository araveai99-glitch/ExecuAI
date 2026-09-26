"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function ConnectGmailPage() {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = React.useState(false);

  const handleOAuthConnect = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      router.push("/onboarding/gmail-success");
    }, 1200);
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
          <h1 className="text-xl font-bold text-[#0F172A]">Connect Your Gmail Account</h1>
        </div>
      </div>

      <div className="space-y-4 text-xs text-[#475569]">
        <p className="leading-relaxed">
          ExecuAI uses official Google OAuth 2.0 authentication. Clicking connect will redirect you to Google&apos;s secure authorization page to select your executive Gmail account.
        </p>

        {/* Permissions Requested Breakdown */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
          <span className="font-bold text-[#0F172A] uppercase tracking-wider text-[10px] block">
            Permissions Requested by ExecuAI:
          </span>
          <div className="space-y-2 text-[#0F172A]">
            <div className="flex items-start gap-2">
              <span className="text-[#2E936F] font-bold">•</span>
              <span><strong>Read Emails & Threads:</strong> Used to fetch and parse incoming messages into common email objects.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#2E936F] font-bold">•</span>
              <span><strong>Create & Save Drafts:</strong> Used to prepare personalized response drafts in your Gmail inbox.</span>
            </div>
          </div>
        </div>

        {/* Safety Callout */}
        <div className="p-3 rounded-xl bg-[#EFF4FF] border border-[#79d9b0]/30 text-[#2E936F] text-[11px] font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">shield</span>
          <span>Explicitly Excluded: ExecuAI does not request unrestricted auto-sending rights or password access.</span>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => router.push("/onboarding/connect-zoho")}
          className="text-xs text-[#475569] hover:text-[#0F172A] font-semibold"
        >
          Skip for now → Connect Zoho first
        </button>

        <Button
          variant="primary"
          size="lg"
          isLoading={isAuthorizing}
          onClick={handleOAuthConnect}
          className="w-full sm:w-auto"
        >
          <span className="font-bold">G</span>
          <span>Connect Gmail via Google OAuth</span>
        </Button>
      </div>
    </div>
  );
}
