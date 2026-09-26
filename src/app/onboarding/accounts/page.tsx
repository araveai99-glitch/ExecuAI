"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AccountsSummaryPage() {
  const [accounts, setAccounts] = React.useState([
    { id: "1", provider: "GMAIL", email: "ceo@company.com", status: "CONNECTED", syncTime: "Just now" },
    { id: "2", provider: "GMAIL", email: "sales@company.com", status: "CONNECTED", syncTime: "2m ago" },
    { id: "3", provider: "ZOHO", email: "director@company.com", status: "CONNECTED", syncTime: "1m ago" },
  ]);

  const handleToggleSync = (id: string) => {
    setAccounts(
      accounts.map((acc) =>
        acc.id === id
          ? {
              ...acc,
              status: acc.status === "CONNECTED" ? "PAUSED" : "CONNECTED",
            }
          : acc
      )
    );
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E2E8F0] shadow-md space-y-6">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E936F]">
            Step 4: Multi-Mailbox Overview
          </span>
          <h1 className="text-xl font-bold text-[#0F172A]">Connected Mailboxes Summary</h1>
          <p className="text-xs text-[#475569]">
            ExecuAI has normalized these accounts into your unified executive workspace.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF4FF] border border-[#79d9b0]/30 text-xs font-semibold text-[#2E936F]">
          <span className="w-2 h-2 rounded-full bg-[#2E936F]" />
          <span>{accounts.filter((a) => a.status === "CONNECTED").length} Active Mailboxes</span>
        </div>
      </div>

      {/* Account Cards List */}
      <div className="space-y-3">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl text-white font-bold flex items-center justify-center text-sm ${
                  acc.provider === "GMAIL" ? "bg-[#EA4335]" : "bg-[#226BBA]"
                }`}
              >
                {acc.provider === "GMAIL" ? "G" : "Z"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#0F172A]">{acc.email}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      acc.status === "CONNECTED"
                        ? "bg-[#EFF4FF] text-[#2E936F]"
                        : "bg-[#FEF7E6] text-[#795600]"
                    }`}
                  >
                    {acc.status}
                  </span>
                </div>
                <p className="text-[11px] text-[#475569]">
                  {acc.provider === "GMAIL" ? "Google Workspace" : "Zoho Mail"} • Last synced {acc.syncTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleToggleSync(acc.id)}
              >
                {acc.status === "CONNECTED" ? "Pause Sync" : "Resume Sync"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Accounts Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Link href="/onboarding/connect-gmail">
          <Button variant="secondary" size="sm">
            + Add Another Gmail
          </Button>
        </Link>
        <Link href="/onboarding/connect-zoho">
          <Button variant="secondary" size="sm">
            + Add Another Zoho
          </Button>
        </Link>
      </div>

      <div className="pt-4 border-t border-[#E2E8F0] flex justify-end">
        <Link href="/onboarding/preferences">
          <Button variant="primary" size="lg">
            Proceed to Preferences
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
