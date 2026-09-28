"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AccountItem, AccountStatus } from "@/lib/types/execuai";

import { useAuth } from "@/lib/auth-context";

export default function AccountsManagementPage() {
  const { user, connectAccount, removeAccount } = useAuth();
  
  // Transform user's connected accounts to AccountItem format
  const dynamicAccounts = React.useMemo<AccountItem[]>(() => {
    if (!user || !user.connectedAccounts || user.connectedAccounts.length === 0) {
      const primary = user?.email || "user@example.com";
      return [
        {
          id: "ACC-101",
          accountLabel: "Primary Account",
          provider: "GMAIL",
          emailAddress: primary,
          status: "CONNECTED",
          lastSync: "Just now",
          scopes: ["https://www.googleapis.com/auth/gmail.readonly", "https://www.googleapis.com/auth/gmail.compose"],
          connectedDate: "Today",
          unreadCount: 4,
          totalSyncedThreads: 142,
        },
      ];
    }

    return user.connectedAccounts.map((acc, index) => {
      const provUpper = acc.provider.toUpperCase() as "GMAIL" | "ZOHO";
      return {
        id: `ACC-${101 + index}`,
        accountLabel: `${acc.provider} #${index + 1}`,
        provider: provUpper.includes("ZOHO") ? "ZOHO" : "GMAIL",
        emailAddress: acc.email,
        status: "CONNECTED" as AccountStatus,
        lastSync: "12s ago",
        scopes: provUpper.includes("ZOHO")
          ? ["ZohoMail.messages.READ", "ZohoMail.messages.CREATE"]
          : ["https://www.googleapis.com/auth/gmail.readonly", "https://www.googleapis.com/auth/gmail.compose"],
        connectedDate: new Date(acc.connectedAt || Date.now()).toLocaleDateString(),
        unreadCount: (index + 1) * 3,
        totalSyncedThreads: (index + 1) * 240,
      };
    });
  }, [user]);

  const [accounts, setAccounts] = React.useState<AccountItem[]>(dynamicAccounts);

  React.useEffect(() => {
    setAccounts(dynamicAccounts);
  }, [dynamicAccounts]);

  const [showAddModal, setShowAddModal] = React.useState(false);
  const [selectedRemoveAccount, setSelectedRemoveAccount] = React.useState<AccountItem | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [isSyncingAll, setIsSyncingAll] = React.useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Toggle Pause / Resume Sync
  const togglePause = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === id) {
          const nextStatus: AccountStatus = acc.status === "PAUSED" ? "CONNECTED" : "PAUSED";
          showToast(
            nextStatus === "PAUSED"
              ? `Synchronization paused for ${acc.emailAddress}.`
              : `Synchronization resumed for ${acc.emailAddress}.`
          );
          return { ...acc, status: nextStatus, lastSync: "Just now" };
        }
        return acc;
      })
    );
  };

  // Reconnect Handler
  const handleReconnect = (acc: AccountItem) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === acc.id ? { ...a, status: "CONNECTED", syncError: undefined, lastSync: "Just now" } : a))
    );
    showToast(`Successfully re-authenticated OAuth token for ${acc.emailAddress}.`);
  };

  // Manual Trigger Sync All
  const handleSyncAll = () => {
    setIsSyncingAll(true);
    setTimeout(() => {
      setAccounts((prev) =>
        prev.map((a) => (a.status === "CONNECTED" || a.status === "SYNCING" ? { ...a, status: "CONNECTED", lastSync: "Just now" } : a))
      );
      setIsSyncingAll(false);
      showToast("All connected mailboxes synchronized with unified stream.");
    }, 1200);
  };

  // Remove Account Handler
  const handleConfirmRemove = () => {
    if (!selectedRemoveAccount) return;
    const targetEmail = selectedRemoveAccount.emailAddress;
    removeAccount(targetEmail);
    setSelectedRemoveAccount(null);
    showToast(`Removed connected account ${targetEmail} from workspace.`);
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden pb-12">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="p-4 rounded-xl bg-[#2e936f] text-white text-xs font-bold shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-white hover:opacity-80">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Top Header & Global Actions */}
      <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight font-heading">Connected Accounts Studio</h1>
              <span className="bg-[#2e936f]/10 text-[#2e936f] text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#2e936f]/20">
                {accounts.length} Active Connectors
              </span>
              <span className="bg-[#f7d7b0]/50 text-[#0F172A] text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#f7d7b0]">
                OAuth 2.0 PKCE Enforced
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Manage multi-tenant Gmail and Zoho OAuth mailboxes feeding into your ExecuAI engine.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSyncAll}
              isLoading={isSyncingAll}
              leftIcon={<span className="material-symbols-outlined text-[16px]">sync</span>}
            >
              Sync All Accounts Now
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowAddModal(true)}
              leftIcon={<span className="material-symbols-outlined text-[16px]">add</span>}
            >
              Add Connected Account
            </Button>
          </div>
        </div>

        {/* Core Product Concept Banner (Unified Workspace Message) */}
        <div className="p-4 rounded-xl bg-[#f7d7b0]/30 border border-[#f15e1c]/20 space-y-1 text-xs">
          <div className="flex items-center gap-2 text-[#f15e1c] font-bold">
            <span className="material-symbols-outlined text-[18px]">hub</span>
            <span>Unified Workspace Architecture</span>
          </div>
          <p className="text-[#0F172A] leading-relaxed">
            All connected Gmail and Zoho mailboxes automatically feed into <span className="font-extrabold text-[#f15e1c]">ONE unified executive workspace</span>. Your Decision Center, Unified Inbox, and AI Draft Assistant operate seamlessly across all connected accounts without forcing context switching.
          </p>
        </div>
      </section>

      {/* Connected Accounts List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#64748B] px-1 font-semibold">
          <span>Connected Accounts ({accounts.length})</span>
          <span>Showing Real-Time Status</span>
        </div>

        {accounts.map((acc) => {
          return (
            <div
              key={acc.id}
              className={`p-5 rounded-2xl bg-white border transition-all shadow-xs space-y-4 ${
                acc.status === "ERROR" || acc.status === "RECONNECT_REQUIRED"
                  ? "border-[#FDA4AF]"
                  : acc.status === "PAUSED"
                  ? "border-[#CBD5E1]"
                  : "border-[#E2E8F0] hover:border-[#94A3B8]"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Provider Logo & Identity Details */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-2xl text-white font-extrabold flex items-center justify-center text-lg shrink-0 shadow-xs ${
                      acc.provider === "GMAIL" ? "bg-[#EA4335]" : "bg-[#2264E5]"
                    }`}
                  >
                    {acc.provider === "GMAIL" ? "G" : "Z"}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={`/app/accounts/${acc.id}`}
                        className="text-base font-bold text-[#0F172A] hover:text-[#2563EB] hover:underline truncate"
                      >
                        {acc.emailAddress}
                      </Link>

                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569]">
                        {acc.accountLabel}
                      </span>

                      {/* Status Badges for 5 Required States */}
                      {acc.status === "CONNECTED" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EFF4FF] text-[#2E936F] text-[10px] font-bold border border-[#79d9b0]/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2E936F]" />
                          Connected
                        </span>
                      )}

                      {acc.status === "SYNCING" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-[10px] font-bold border border-[#93C5FD]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-ping" />
                          Syncing Stream
                        </span>
                      )}

                      {acc.status === "PAUSED" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FEF7E6] text-[#795600] text-[10px] font-bold border border-[#FDE68A]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FAB60A]" />
                          Sync Paused
                        </span>
                      )}

                      {acc.status === "ERROR" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF1F2] text-[#E11D48] text-[10px] font-bold border border-[#FDA4AF]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse" />
                          Sync Error
                        </span>
                      )}

                      {acc.status === "RECONNECT_REQUIRED" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FEF7E6] text-[#795600] text-[10px] font-bold border border-[#FDE68A]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FAB60A] animate-ping" />
                          Reconnect Required
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#64748B] flex-wrap">
                      <span>Provider: {acc.provider === "GMAIL" ? "Google Workspace" : "Zoho Mail API"}</span>
                      <span>•</span>
                      <span>Last sync: {acc.lastSync}</span>
                      <span>•</span>
                      <span>{acc.unreadCount} Unread / {acc.totalSyncedThreads} Synced</span>
                    </div>
                  </div>
                </div>

                {/* Account Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
                  {acc.status === "RECONNECT_REQUIRED" || acc.status === "ERROR" ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleReconnect(acc)}
                      leftIcon={<span className="material-symbols-outlined text-[16px]">sync_problem</span>}
                    >
                      Reconnect Account
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={() => togglePause(acc.id)}>
                      {acc.status === "PAUSED" ? "Resume Sync" : "Pause Sync"}
                    </Button>
                  )}

                  <Link href={`/app/accounts/${acc.id}`}>
                    <Button variant="secondary" size="sm">
                      Details
                    </Button>
                  </Link>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setSelectedRemoveAccount(acc)}
                    leftIcon={<span className="material-symbols-outlined text-[16px]">link_off</span>}
                  >
                    Remove
                  </Button>
                </div>
              </div>

              {/* Sync Error Box (If Applicable) */}
              {acc.syncError && (
                <div className="p-3 rounded-xl bg-[#FFF1F2] border border-[#FDA4AF] text-xs text-[#9F1239] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#E11D48]">error</span>
                    <span className="font-semibold">{acc.syncError}</span>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleReconnect(acc)}
                  >
                    Fix Connection
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Connected Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2 text-[#0F172A] font-bold text-base">
                <span className="material-symbols-outlined text-[#2E936F]">add_link</span>
                <span>Connect Mailbox Provider</span>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-[#94A3B8] hover:text-[#0F172A]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-[#64748B]">
              ExecuAI uses OAuth 2.0 PKCE providers. <span className="font-bold text-[#0F172A]">Your email password is never stored or requested.</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <Link
                href="/onboarding/connect-gmail"
                className="p-5 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#EA4335] hover:bg-[#FFF1F2]/50 text-left transition-all space-y-2 block"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EA4335] text-white flex items-center justify-center font-bold text-lg">
                  G
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-sm">Google Workspace</h4>
                  <p className="text-[11px] text-[#64748B]">Connect Gmail or Google Workspace email address via OAuth 2.0.</p>
                </div>
              </Link>

              <Link
                href="/onboarding/connect-zoho"
                className="p-5 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#2264E5] hover:bg-[#EFF6FF]/50 text-left transition-all space-y-2 block"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2264E5] text-white flex items-center justify-center font-bold text-lg">
                  Z
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-sm">Zoho Mail API</h4>
                  <p className="text-[11px] text-[#64748B]">Connect Zoho Mail enterprise inbox via OAuth 2.0 PKCE.</p>
                </div>
              </Link>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Account Confirmation Modal */}
      {selectedRemoveAccount && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#E11D48]">link_off</span>
                Disconnect Mailbox Account
              </h3>
              <button onClick={() => setSelectedRemoveAccount(null)} className="text-[#94A3B8] hover:text-[#0F172A]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-[#0F172A] leading-relaxed">
              Are you sure you want to disconnect <span className="font-bold">{selectedRemoveAccount.emailAddress}</span> ({selectedRemoveAccount.accountLabel})?
            </p>
            <p className="text-xs text-[#64748B]">
              This will revoke OAuth access tokens and pause thread ingestion from this mailbox. Existing decision records and audit logs will remain archived.
            </p>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedRemoveAccount(null)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleConfirmRemove}>
                Disconnect & Remove Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
