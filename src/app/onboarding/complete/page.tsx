"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function OnboardingCompletePage() {
  return (
    <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E2E8F0] shadow-md space-y-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#EFF4FF] text-[#2E936F] font-bold flex items-center justify-center mx-auto border border-[#79d9b0]/40">
        <span className="material-symbols-outlined text-[36px]">verified</span>
      </div>

      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
          Onboarding Complete
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          Your Executive Workspace is Ready
        </h1>
        <p className="text-xs sm:text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
          ExecuAI has unified your connected mailboxes, initialized the Safety Gate protocol, and prepared your triage rules.
        </p>
      </div>

      {/* Setup Summary Card */}
      <div className="p-4 sm:p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-left space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] block border-b border-[#E2E8F0] pb-1">
          Configured Environment Summary
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-[#94A3B8]">Connected Mailboxes:</span>
            <p className="font-bold text-[#0F172A]">3 Accounts (Gmail #1, Gmail #2, Zoho #1)</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[#94A3B8]">Triage Sensitivity:</span>
            <p className="font-bold text-[#0F172A]">Balanced (3D Dimensions)</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[#94A3B8]">Safety Gate Status:</span>
            <p className="font-bold text-[#E11D48]">Active (Financial &gt;₹10L + Legal Blocked)</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[#94A3B8]">Writing Tone Profile:</span>
            <p className="font-bold text-[#2E936F]">Professional & Direct</p>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-[#EFF4FF] border border-[#79d9b0]/30 text-xs text-[#2E936F] text-center font-semibold">
        💡 Golden Rule Reminder: AI Can Prepare, AI Cannot Decide. You retain full control over all high-stakes communications.
      </div>

      <div className="pt-2 flex justify-center">
        <Link href="/">
          <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
            Launch Executive Workspace
            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
