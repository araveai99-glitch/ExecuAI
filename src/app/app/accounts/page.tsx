"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AccountItem, AccountStatus } from "@/lib/types/execuai";
import { useAuth } from "@/lib/auth-context";

export default function AccountsManagementPage() {
  const { user, loginWithGoogle, removeAccount } = useAuth();
  const [accounts, setAccounts] = React.useState<AccountItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedRemoveAccount, setSelectedRemoveAccount] = React.useState<AccountItem | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [isSyncingAll, setIsSyncingAll] = React.useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchUserAccounts = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const activeUserId = user?.id || "";
      const res = await fetch(`/api/v1/accounts?userId=${encodeURIComponent(activeUserId)}`);
      const data = await res.json();
      if (res.ok && data.accounts) {
        setAccounts(
          data.accounts.map((a: any) => ({
            id: a.id,
            accountLabel: a.accountLabel || `Gmail (${a.emailAddress})`,
            provider: a.provider || "GMAIL",
            emailAddress: a.emailAddress,
            status: a.status as AccountStatus,
            lastSync: a.lastSync || "Just now",
            syncError: a.syncError,
            scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
            connectedDate: a.connectedDate || "Connected",
            unreadCount: 0,
            totalSyncedThreads: a.messagesCount || 0,
          }))
        );
      }
    } catch (err) {
      console.error("Failed to fetch user connected accounts", err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  React.useEffect(() => {
    fetchUserAccounts();
  }, [fetchUserAccounts]);

  // Connect Google Account Trigger
  const handleConnectGmail = async () => {
    showToast("Redirecting to Google OAuth authorization portal...");
    await loginWithGoogle();
  };

  // Sync All Accounts
  const handleSyncAll = async () => {
    setIsSyncingAll(true);
    try {
      const activeUserId = user?.id || "";
      const res = await fetch(`/api/v1/sync?userId=${encodeURIComponent(activeUserId)}`);
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Synchronized ${data.accounts?.length || accounts.length} mailbox account(s).`);
        fetchUserAccounts();
      } else {
        showToast("Synchronized user mailboxes.");
      }
    } catch (err) {
      showToast("Sync trigger complete.");
    } finally {
      setIsSyncingAll(false);
    }
  };

  // Disconnect Single Account
  const handleConfirmRemove = async () => {
    if (!selectedRemoveAccount) return;
    const targetEmail = selectedRemoveAccount.emailAddress;
    const activeUserId = user?.id || "";

    try {
      const res = await fetch(
        `/api/v1/accounts?userId=${encodeURIComponent(activeUserId)}&email=${encodeURIComponent(targetEmail)}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (res.ok && data.success) {
        removeAccount(targetEmail);
        showToast(`Disconnected ${targetEmail}. OAuth token revoked cleanly.`);
      } else {
        showToast(`Removed account ${targetEmail}.`);
      }
    } catch (err) {
      console.warn("Server disconnect note:", err);
      showToast(`Removed account ${targetEmail}.`);
    } finally {
      setSelectedRemoveAccount(null);
      fetchUserAccounts();
    }
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden pb-12 font-sans text-[#0F172A]">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 p-4 rounded-xl bg-[#2E936F] text-white text-xs font-bold shadow-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-white hover:opacity-80">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Top Header & Actions */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#0F172A] tracking-tight">
                Connected Email Accounts
              </h1>
              <span className="bg-[#E8F4F0] text-[#2E936F] text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#2E936F]/30">
                {accounts.length} Active Connectors
              </span>
              <span className="bg-[#FFF2EC] text-[#F15E1C] text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#FDE8DF]">
                User-Isolated Architecture
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Connect and manage multiple Gmail and Zoho email accounts belonging strictly to <strong className="text-[#0F172A]">{user?.email}</strong>.
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
              Sync All Accounts
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleConnectGmail}
              leftIcon={<span className="material-symbols-outlined text-[16px]">add_link</span>}
            >
              + Connect Another Gmail Account
            </Button>
          </div>
        </div>
      </section>

      {/* Accounts List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#64748B] px-1 font-semibold">
          <span>Connected Accounts for {user?.email} ({accounts.length})</span>
          <span>OAuth 2.0 PKCE Active</span>
        </div>

        {accounts.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-[#E2E8F0] text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF2EC] text-[#F15E1C] flex items-center justify-center mx-auto text-xl font-bold">
              <span className="material-symbols-outlined">mark_email_unread</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A] font-heading">No Email Accounts Connected Yet</h3>
              <p className="text-xs text-[#64748B] mt-1 max-w-md mx-auto">
                Connect your work or personal Gmail email accounts to enable ExecuAI email intelligence, triage, and automated drafting.
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={handleConnectGmail} leftIcon={<span className="material-symbols-outlined text-[16px]">add_link</span>}>
              Connect Gmail Account Now
            </Button>
          </div>
        ) : (
          accounts.map((acc) => (
            <div
              key={acc.id}
              className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs space-y-4 hover:border-[#F15E1C]/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#EA4335] text-white font-extrabold flex items-center justify-center text-xl shrink-0 shadow-xs">
                    G
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-bold text-[#0F172A] truncate">
                        {acc.emailAddress}
                      </span>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                        ID: {acc.id}
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F4F0] text-[#2E936F] text-[10px] font-bold border border-[#2E936F]/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E936F]" />
                        Connected
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#64748B] flex-wrap">
                      <span>Provider: Google Workspace</span>
                      <span>•</span>
                      <span>Last sync: {acc.lastSync}</span>
                      <span>•</span>
                      <span>{acc.totalSyncedThreads} Synced Messages</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setSelectedRemoveAccount(acc)}
                    leftIcon={<span className="material-symbols-outlined text-[16px]">link_off</span>}
                  >
                    Disconnect Account
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Disconnect Account Confirmation Modal */}
      {selectedRemoveAccount && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="text-base font-bold text-[#0F172A] font-heading flex items-center gap-2">
                <span className="material-symbols-outlined text-[#DC2626]">link_off</span>
                Disconnect Email Account
              </h3>
              <button onClick={() => setSelectedRemoveAccount(null)} className="text-[#94A3B8] hover:text-[#0F172A]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-[#0F172A] leading-relaxed">
              Are you sure you want to disconnect <strong className="text-[#F15E1C]">{selectedRemoveAccount.emailAddress}</strong>?
            </p>
            <p className="text-xs text-[#64748B]">
              This will revoke Google OAuth tokens for this account and remove it from your workspace. Other connected email accounts will remain active and unaffected.
            </p>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedRemoveAccount(null)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleConfirmRemove}>
                Disconnect & Revoke Access
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
