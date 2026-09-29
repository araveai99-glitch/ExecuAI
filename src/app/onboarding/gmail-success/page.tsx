"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth-context";

function GmailSuccessContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const authenticatedEmail =
    searchParams.get("email") ||
    user?.connectedAccounts?.find((a) => a.provider.toUpperCase().includes("GMAIL"))?.email ||
    user?.email ||
    "authenticated.user@gmail.com";

  return (
    <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E2E8F0] shadow-md space-y-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[#EFF4FF] text-[#2E936F] font-bold flex items-center justify-center mx-auto border border-[#79d9b0]/40">
        <span className="material-symbols-outlined text-[32px]">check_circle</span>
      </div>

      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
          Gmail OAuth Authorized
        </span>
        <h1 className="text-2xl font-bold text-[#0F172A]">Gmail Account Connected Successfully</h1>
        <p className="text-xs text-[#475569]">
          ExecuAI has established secure OAuth 2.0 synchronization for your Gmail account.
        </p>
      </div>

      {/* Connected Account Card */}
      <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-left">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EA4335] text-white font-bold flex items-center justify-center text-sm">
            G
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#0F172A]">{authenticatedEmail}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#EFF4FF] text-[#2E936F] text-[10px] font-bold">
                Connected
              </span>
            </div>
            <p className="text-[11px] text-[#475569]">Google Workspace • OAuth 2.0 • Real Gmail API Stream</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-[#2E936F] text-[20px]">verified</span>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/onboarding/connect-gmail" className="w-full sm:w-auto">
          <Button variant="secondary" size="md" className="w-full sm:w-auto">
            + Connect Another Gmail Account
          </Button>
        </Link>
        <Link href="/app/dashboard" className="w-full sm:w-auto">
          <Button variant="primary" size="md" className="w-full sm:w-auto">
            Go to Executive Dashboard
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function GmailSuccessPage() {
  return (
    <React.Suspense fallback={<div className="p-12 text-center text-xs text-[#64748B]">Loading Gmail connection details...</div>}>
      <GmailSuccessContent />
    </React.Suspense>
  );
}
