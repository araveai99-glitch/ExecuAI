"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function StandaloneAccountDetailPage() {
  const params = useParams();
  const router = useRouter();
  const accountId = params?.id as string;

  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const mockAccount = React.useMemo(() => {
    return {
      id: accountId,
      accountLabel: accountId === "ACC-103" ? "Zoho #1" : "Gmail #1",
      provider: accountId === "ACC-103" ? "ZOHO" : "GMAIL",
      emailAddress: accountId === "ACC-103" ? "director@company.com" : "ceo@company.com",
      status: accountId === "ACC-103" ? "ERROR" : "CONNECTED",
      lastSync: accountId === "ACC-103" ? "14m ago" : "12s ago",
      syncError: accountId === "ACC-103" ? "TLS Handshake Timeout: Endpoint mx.zoho.com refused OAuth handshake retry." : undefined,
      scopes: [
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/gmail.compose",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
      connectedDate: "Aug 12, 2026",
      unreadCount: 14,
      totalSyncedThreads: 1240,
      quotaUsed: "4.2 GB of 30 GB",
      oauthClientApp: "ExecuAI Sovereign Agent v2.4",
      tokenExpiryDays: 88,
    };
  }, [accountId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden pb-12">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="p-4 rounded-xl bg-[#2E936F] text-white text-xs font-bold shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-white hover:opacity-80">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Navigation & Header */}
      <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/app/accounts"
            className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] hover:bg-[#E2E8F0] font-bold text-xs flex items-center gap-1 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>All Accounts</span>
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#0F172A]">{mockAccount.emailAddress}</h1>
              <span
                className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                  mockAccount.provider === "GMAIL"
                    ? "bg-[#FFF1F2] text-[#E11D48] border border-[#FDA4AF]"
                    : "bg-[#EFF6FF] text-[#2563EB] border border-[#93C5FD]"
                }`}
              >
                {mockAccount.accountLabel} ({mockAccount.provider})
              </span>
            </div>
            <p className="text-xs text-[#64748B]">
              OAuth 2.0 PKCE Account Telemetry & Synchronization Settings
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => showToast(`Executing manual telemetry sync for ${mockAccount.emailAddress}...`)}
            leftIcon={<span className="material-symbols-outlined text-[16px]">sync</span>}
          >
            Force Sync
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              showToast(`Disconnected ${mockAccount.emailAddress}.`);
              setTimeout(() => router.push("/app/accounts"), 1000);
            }}
          >
            Disconnect Account
          </Button>
        </div>
      </div>

      {/* Sync Error Alert Banner */}
      {mockAccount.syncError && (
        <div className="p-4 rounded-2xl bg-[#FFF1F2] border border-[#FDA4AF] space-y-2 text-xs">
          <div className="flex items-center gap-2 text-[#E11D48] font-bold text-sm">
            <span className="material-symbols-outlined text-[20px]">warning</span>
            <span>Active Sync Error Detected</span>
          </div>
          <p className="text-[#9F1239] leading-relaxed">{mockAccount.syncError}</p>
          <div className="pt-1 flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => showToast("Re-authenticating OAuth PKCE token...")}
            >
              Re-authenticate Account
            </Button>
          </div>
        </div>
      )}

      {/* Telemetry Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="default">
          <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Connection Status</span>
          <div className="text-lg font-bold text-[#2E936F] mt-1 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2E936F]" />
            {mockAccount.status}
          </div>
          <span className="text-xs text-[#64748B] mt-0.5 block">Last synced {mockAccount.lastSync}</span>
        </Card>

        <Card variant="default">
          <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Synced Thread Stream</span>
          <div className="text-lg font-bold text-[#0F172A] mt-1">{mockAccount.totalSyncedThreads} Threads</div>
          <span className="text-xs text-[#64748B] mt-0.5 block">{mockAccount.unreadCount} Unread Emails</span>
        </Card>

        <Card variant="default">
          <span className="text-[10px] font-bold text-[#94A3B8] uppercase">OAuth Scopes</span>
          <div className="text-lg font-bold text-[#2563EB] mt-1">Read & Draft Scopes</div>
          <span className="text-xs text-[#64748B] mt-0.5 block">Zero Send Permission</span>
        </Card>

        <Card variant="default">
          <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Storage & Quota</span>
          <div className="text-lg font-bold text-[#0F172A] mt-1">{mockAccount.quotaUsed}</div>
          <span className="text-xs text-[#64748B] mt-0.5 block">Connected {mockAccount.connectedDate}</span>
        </Card>
      </div>

      {/* Detailed OAuth Settings & Permissions */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#0F172A]">OAuth 2.0 PKCE Authorized Permissions</h2>
        <p className="text-xs text-[#64748B]">
          ExecuAI interacts with {mockAccount.emailAddress} using least-privilege tokens.
        </p>

        <div className="space-y-2">
          {mockAccount.scopes.map((scope, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs flex items-center justify-between font-mono">
              <span className="text-[#0F172A] font-bold">{scope}</span>
              <span className="text-[#2E936F] font-sans font-bold text-[10px] uppercase bg-[#EFF4FF] px-2 py-0.5 rounded border border-[#79d9b0]/30">
                Authorized
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
