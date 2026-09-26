"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { Input } from "@/components/ui/Input";

export default function SafetyRulesPage() {
  const [financialThreshold, setFinancialThreshold] = React.useState("1000000"); // ₹10 Lakhs
  const [blockContracts, setBlockContracts] = React.useState(true);
  const [blockLegal, setBlockLegal] = React.useState(true);
  const [blockHR, setBlockHR] = React.useState(true);
  const [blockOTPs, setBlockOTPs] = React.useState(true);

  return (
    <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E2E8F0] shadow-md space-y-6">
      <div className="border-b border-[#E2E8F0] pb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E936F]">
          Step 6: Governance & Safety Gate
        </span>
        <h1 className="text-xl font-bold text-[#0F172A]">Safety & Policy Rules Setup</h1>
        <p className="text-xs text-[#475569]">
          Enforce application-level safety rules that programmatically block autonomous replies on high-stakes communication.
        </p>
      </div>

      {/* Safety Gate Master Card */}
      <div className="p-4 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] space-y-2">
        <div className="flex items-center gap-2 font-bold text-[#E11D48] text-xs uppercase tracking-wider">
          <span className="material-symbols-outlined text-[18px]">gavel</span>
          <span>Safety Gate Protocol Active</span>
        </div>
        <p className="text-xs text-[#0F172A] leading-relaxed">
          The LLM operates strictly under read and draft generation scope. When a safety rule triggers, autonomous send APIs are locked, and the email is routed to the Decision Center.
        </p>
      </div>

      <div className="space-y-4">
        {/* Financial Threshold Rule */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
          <Input
            label="Financial Commitment Threshold (₹ INR)"
            type="number"
            value={financialThreshold}
            onChange={(e) => setFinancialThreshold(e.target.value)}
            hint="Emails mentioning pricing, quotations, or payments exceeding this amount trigger mandatory human approval."
          />
        </div>

        {/* Safety Rule Toggles */}
        <div className="space-y-3 pt-2">
          <Toggle
            label="Block Auto-Reply on Contracts & NDAs"
            description="Any email containing contract language, indemnities, or NDA attachments automatically engages the Safety Gate."
            checked={blockContracts}
            onChange={setBlockContracts}
          />
          <Toggle
            label="Block Auto-Reply on Legal Notices & Counsel Email"
            description="Messages from legal partners or containing terms like 'legal notice' require explicit executive clearance."
            checked={blockLegal}
            onChange={setBlockLegal}
          />
          <Toggle
            label="Block Auto-Reply on HR & Sensitive Employee Communication"
            description="Salary discussions, employee complaints, and termination notices require human review."
            checked={blockHR}
            onChange={setBlockHR}
          />
          <Toggle
            label="Block Security Credentials & OTP Messages"
            description="Never attempt AI parsing or reply generation on security codes, passwords, or authentication OTPs."
            checked={blockOTPs}
            onChange={setBlockOTPs}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
        <Link href="/onboarding/preferences">
          <Button variant="ghost" size="sm">
            ← Back to Preferences
          </Button>
        </Link>
        <Link href="/onboarding/writing-style">
          <Button variant="primary" size="lg">
            Proceed to Writing Style
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
