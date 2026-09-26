"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function ConnectZohoPage() {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = React.useState(false);

  const handleOAuthConnect = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      router.push("/onboarding/zoho-success");
    }, 1200);
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E2E8F0] shadow-md space-y-6">
      <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
        <div className="w-10 h-10 rounded-xl bg-[#226BBA]/10 text-[#226BBA] font-bold flex items-center justify-center text-xl shrink-0">
          Z
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E936F]">
            Step 3a: Provider Authentication
          </span>
          <h1 className="text-xl font-bold text-[#0F172A]">Connect Your Zoho Mail Account</h1>
        </div>
      </div>

      <div className="space-y-4 text-xs text-[#475569]">
        <p className="leading-relaxed">
          ExecuAI connects to Zoho Mail via official Zoho OAuth 2.0 API protocol. Clicking connect will redirect you to Zoho&apos;s authorization portal to select your board or subsidiary email account.
        </p>

        {/* Permissions Requested Breakdown */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
          <span className="font-bold text-[#0F172A] uppercase tracking-wider text-[10px] block">
            Permissions Requested by ExecuAI:
          </span>
          <div className="space-y-2 text-[#0F172A]">
            <div className="flex items-start gap-2">
              <span className="text-[#2E936F] font-bold">•</span>
              <span><strong>Zoho Mail Ingestion:</strong> Fetch and normalize incoming messages into the unified email model.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#2E936F] font-bold">•</span>
              <span><strong>Zoho Draft Creation:</strong> Prepare AI draft replies directly in your Zoho account.</span>
            </div>
          </div>
        </div>

        {/* Safety Callout */}
        <div className="p-3 rounded-xl bg-[#EFF4FF] border border-[#79d9b0]/30 text-[#2E936F] text-[11px] font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">shield</span>
          <span>Zero Password Storage: Authenticated directly via official Zoho OAuth token authorization.</span>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => router.push("/onboarding/accounts")}
          className="text-xs text-[#475569] hover:text-[#0F172A] font-semibold"
        >
          Skip for now → Proceed to Summary
        </button>

        <Button
          variant="primary"
          size="lg"
          isLoading={isAuthorizing}
          onClick={handleOAuthConnect}
          className="w-full sm:w-auto"
        >
          <span className="font-bold">Z</span>
          <span>Connect Zoho via Zoho OAuth</span>
        </Button>
      </div>
    </div>
  );
}
