"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { RadioGroup } from "@/components/ui/Radio";
import { Toggle } from "@/components/ui/Toggle";
import { Input } from "@/components/ui/Input";

export default function PreferencesPage() {
  const [sensitivity, setSensitivity] = React.useState("balanced");
  const [dailyDigest, setDailyDigest] = React.useState(true);
  const [criticalNotifications, setCriticalNotifications] = React.useState(true);
  const [vipDomains, setVipDomains] = React.useState("apexlaw.com, company.com");

  return (
    <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E2E8F0] shadow-md space-y-6">
      <div className="border-b border-[#E2E8F0] pb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E936F]">
          Step 5: Executive Preferences
        </span>
        <h1 className="text-xl font-bold text-[#0F172A]">Communication & Triage Preferences</h1>
        <p className="text-xs text-[#475569]">
          Customize how ExecuAI categorizes incoming emails and alerts your executive desk.
        </p>
      </div>

      <div className="space-y-6">
        {/* Sensitivity Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
            Triage Sensitivity Threshold
          </label>
          <RadioGroup
            name="sensitivity"
            value={sensitivity}
            onChange={setSensitivity}
            options={[
              {
                value: "conservative",
                label: "Conservative (Recommended for Legal/Finance)",
                description: "Flags any questionable email or contract term for human review.",
              },
              {
                value: "balanced",
                label: "Balanced (Recommended for CEOs)",
                description: "Drafts routine safe replies automatically; routes high-risk emails to Decision Center.",
              },
              {
                value: "streamlined",
                label: "Streamlined (High Volume Inboxes)",
                description: "Fast-tracks standard meeting requests and client acknowledgements to ready drafts.",
              },
            ]}
          />
        </div>

        {/* Toggles */}
        <div className="space-y-4 pt-2 border-t border-[#E2E8F0]">
          <Toggle
            label="Daily Executive Morning Summary Digest"
            description="Receive a 08:00 AM summary of critical decisions and safe drafts ready for dispatch."
            checked={dailyDigest}
            onChange={setDailyDigest}
          />
          <Toggle
            label="Real-Time Critical Notifications"
            description="Receive immediate browser alerts for Critical legal or financial items requiring clearance."
            checked={criticalNotifications}
            onChange={setCriticalNotifications}
          />
        </div>

        {/* VIP Domains Input */}
        <div className="pt-2 border-t border-[#E2E8F0]">
          <Input
            label="VIP Contact Domains (Comma Separated)"
            placeholder="apexlaw.com, company.com, board.io"
            value={vipDomains}
            onChange={(e) => setVipDomains(e.target.value)}
            hint="Emails from these domains will automatically elevate to Important/Critical priority."
          />
        </div>
      </div>

      <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
        <Link href="/onboarding/accounts">
          <Button variant="ghost" size="sm">
            ← Back to Accounts
          </Button>
        </Link>
        <Link href="/onboarding/safety-rules">
          <Button variant="primary" size="lg">
            Proceed to Safety Rules
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
