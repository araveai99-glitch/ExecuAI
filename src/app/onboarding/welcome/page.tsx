"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function WelcomeStepPage() {
  return (
    <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E2E8F0] shadow-md space-y-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#EFF4FF] text-[#2E936F] font-bold flex items-center justify-center mx-auto border border-[#79d9b0]/40">
        <span className="material-symbols-outlined text-[32px]">waving_hand</span>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
          Step 1: Introduction
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          Welcome to ExecuAI
        </h1>
        <p className="text-sm text-[#475569] max-w-lg mx-auto leading-relaxed">
          Let&apos;s connect your email accounts to create your unified executive workspace.
        </p>
      </div>

      {/* Safety Callout Box */}
      <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-left text-xs">
        <div className="flex items-center gap-2 font-bold text-[#0F172A]">
          <span className="material-symbols-outlined text-[#2E936F] text-[18px]">verified_user</span>
          <span>Zero Password Storage Guarantee</span>
        </div>
        <p className="text-[#475569]">
          You will <strong>never</strong> enter your Gmail or Zoho password into ExecuAI. Mailboxes are authorized securely through provider OAuth 2.0 PKCE with least-privilege Read & Draft permissions.
        </p>
      </div>

      {/* Account Provider Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-[#EA4335] text-white font-bold text-xs flex items-center justify-center">G</span>
            <span className="text-xs font-bold text-[#0F172A]">Gmail Connectors</span>
          </div>
          <p className="text-[11px] text-[#475569]">Connect work & personal Google Workspace inboxes.</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-[#226BBA] text-white font-bold text-xs flex items-center justify-center">Z</span>
            <span className="text-xs font-bold text-[#0F172A]">Zoho Connectors</span>
          </div>
          <p className="text-[11px] text-[#475569]">Connect board & subsidiary Zoho Mail accounts.</p>
        </div>
      </div>

      <div className="pt-4 flex justify-center">
        <Link href="/onboarding/connect-gmail" className="w-full sm:w-auto">
          <Button variant="primary" size="lg" className="w-full sm:w-auto">
            Let&apos;s Connect Your First Account
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
