"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AccountsPage() {
  const [accounts, setAccounts] = React.useState([
    { id: "1", provider: "GMAIL", email: "ceo@company.com", status: "CONNECTED", syncTime: "2m ago", type: "Google Workspace" },
    { id: "2", provider: "GMAIL", email: "sales@company.com", status: "CONNECTED", syncTime: "5m ago", type: "Google Workspace" },
    { id: "3", provider: "ZOHO", email: "director@company.com", status: "CONNECTED", syncTime: "1m ago", type: "Zoho Mail API" },
  ]);

  const toggleSync = (id: string) => {
    setAccounts(
      accounts.map((a) =>
        a.id === id ? { ...a, status: a.status === "CONNECTED" ? "PAUSED" : "CONNECTED" } : a
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Connected Accounts & Synchronization</h1>
          <p className="text-xs text-[#475569]">
            Manage OAuth 2.0 PKCE email connectors feeding into your ExecuAI unified workspace.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/onboarding/connect-gmail">
            <Button variant="secondary" size="sm">
              + Connect Gmail
            </Button>
          </Link>
          <Link href="/onboarding/connect-zoho">
            <Button variant="secondary" size="sm">
              + Connect Zoho
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-xl text-white font-bold flex items-center justify-center text-base shrink-0 ${
                  acc.provider === "GMAIL" ? "bg-[#EA4335]" : "bg-[#226BBA]"
                }`}
              >
                {acc.provider === "GMAIL" ? "G" : "Z"}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#0F172A]">{acc.email}</h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      acc.status === "CONNECTED"
                        ? "bg-[#EFF4FF] text-[#2E936F]"
                        : "bg-[#FEF7E6] text-[#795600]"
                    }`}
                  >
                    {acc.status}
                  </span>
                </div>
                <p className="text-xs text-[#475569] mt-0.5">
                  {acc.type} • OAuth 2.0 Read & Draft Scopes • Last synced {acc.syncTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => toggleSync(acc.id)}>
                {acc.status === "CONNECTED" ? "Pause Sync" : "Resume Sync"}
              </Button>
              <Button variant="danger" size="sm">
                Disconnect
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
