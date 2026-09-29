"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { IntentBadge } from "@/components/ui/IntentBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/lib/auth-context";
import { useUserData, CategoryFilterType } from "@/lib/user-data-context";
import { UnifiedEmailItem } from "@/lib/types/execuai";

export default function DashboardPage() {
  const { user } = useAuth();
  const {
    connectedAccounts,
    selectedAccountFilter,
    setSelectedAccountFilter,
    selectedProviderFilter,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    isLoading,
    syncStatus,
    syncError,
    lastSyncedAgo,
    refreshGmailSync,
    filteredEmails,
    counts,
    toggleUnread,
    toggleFlagged,
    archiveEmail,
    saveDraftReply,
    sendReply,
  } = useUserData();

  const [activeEmail, setActiveEmail] = React.useState<UnifiedEmailItem | null>(null);
  const [isReplying, setIsReplying] = React.useState(false);
  const [replyText, setReplyText] = React.useState("");
  const [actionFeedback, setActionFeedback] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

  const userName = user?.name || "Executive";
  const primaryAccountEmail =
    selectedAccountFilter !== "ALL"
      ? selectedAccountFilter
      : connectedAccounts.find((a) => a.provider.toUpperCase().includes("GMAIL"))?.email || user?.email || "All Connected Mailboxes";

  const handleOpenEmail = (email: UnifiedEmailItem) => {
    setActiveEmail(email);
    setIsReplying(false);
    setReplyText("");
    setActionFeedback(null);
  };

  const handleSaveDraft = async () => {
    if (!activeEmail || !replyText.trim()) return;
    const res = await saveDraftReply(activeEmail.id, replyText);
    setActionFeedback({ type: res.success ? "success" : "error", text: res.message });
  };

  const handleSendReply = async () => {
    if (!activeEmail || !replyText.trim()) return;
    const res = await sendReply(activeEmail.id, replyText);
    setActionFeedback({ type: res.success ? "success" : "error", text: res.message });
    if (res.success) {
      setTimeout(() => {
        setIsReplying(false);
        setReplyText("");
      }, 1000);
    }
  };

  return (
    <div className="space-y-8 font-sans text-[#0F172A]">
      {/* Header Greeting & Dynamic Telemetry Summary */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFF2EC] text-[#F15E1C] border border-[#FDE8DF] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? "bg-[#F15E1C] animate-pulse" : "bg-[#2E936F]"}`} />
              Connected Gmail: <strong className="text-[#0F172A]">{primaryAccountEmail}</strong>
            </span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-xs text-[#475569] flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[14px] text-[#2E936F]">sync</span>
              {counts.syncedMailboxes} {counts.syncedMailboxes === 1 ? "Mailbox Synced" : "Mailboxes Synced"}
            </span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-xs text-[#64748B] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#64748B]">schedule</span>
              {isLoading ? "Syncing Gmail..." : lastSyncedAgo}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-[#0F172A] tracking-tight">
            Welcome, <span className="text-[#F15E1C]">{userName}</span>
          </h1>
          <p className="text-sm text-[#475569] font-medium">
            Real-time Gmail inbox telemetry & automated executive email triage.
          </p>
        </div>

        {/* Account Selector & Working Refresh Button */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs flex items-center gap-2 text-xs font-bold text-[#0F172A]">
            <span className="material-symbols-outlined text-[#F15E1C] text-[16px]">mail</span>
            <span>Account:</span>
            <select
              value={selectedAccountFilter}
              onChange={(e) => setSelectedAccountFilter(e.target.value)}
              className="bg-transparent font-bold text-[#0F172A] outline-none cursor-pointer"
            >
              <option value="ALL">All Accounts ({connectedAccounts.length})</option>
              {connectedAccounts.map((acc) => (
                <option key={acc.email} value={acc.email}>
                  {acc.provider}: {acc.email}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => refreshGmailSync()}
            disabled={isLoading}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] cursor-pointer flex items-center gap-1.5 text-xs font-bold transition-all"
            title="Fetch new/updated Gmail data"
          >
            <span className={`material-symbols-outlined text-[18px] ${isLoading ? "animate-spin text-[#F15E1C]" : ""}`}>
              sync
            </span>
            <span>{isLoading ? "Syncing..." : "↻ Sync"}</span>
          </button>
        </div>
      </div>

      {/* Sync Error Banner (if OAuth expired or API failed) */}
      {syncError && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-red-600">error</span>
            <span>Gmail sync failed: {syncError}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => refreshGmailSync()}>
              Retry Sync
            </Button>
            <Link href="/onboarding/connect-gmail">
              <Button variant="danger" size="sm">
                Reconnect Gmail
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Bento Telemetry Cards (Clickable Category Filters) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Critical Card */}
        <div
          onClick={() => setSelectedCategoryFilter(selectedCategoryFilter === "CRITICAL" ? "ALL" : "CRITICAL")}
          className="cursor-pointer transition-all hover:-translate-y-1"
        >
          <Card
            accentRailColor="danger"
            className={selectedCategoryFilter === "CRITICAL" ? "ring-2 ring-[#DC2626] bg-[#FEF2F2]/40" : ""}
            hoverable
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Critical</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FEF2F2] text-[#DC2626] text-[10px] font-bold">Urgent Action</span>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-[#0F172A]">{counts.critical}</span>
              <span className="text-xs text-[#475569]">{counts.critical === 1 ? "email" : "emails"}</span>
            </div>
            <Link
              href="/app/inbox?category=CRITICAL"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 text-xs font-semibold text-[#DC2626] flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-[14px]">priority_high</span>
              <span>Open Critical Feed →</span>
            </Link>
          </Card>
        </div>

        {/* Urgent Card */}
        <div
          onClick={() => setSelectedCategoryFilter(selectedCategoryFilter === "URGENT" ? "ALL" : "URGENT")}
          className="cursor-pointer transition-all hover:-translate-y-1"
        >
          <Card
            accentRailColor="warning"
            className={selectedCategoryFilter === "URGENT" ? "ring-2 ring-[#F15E1C] bg-[#FFF2EC]/40" : ""}
            hoverable
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Urgent</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FFF2EC] text-[#F15E1C] text-[10px] font-bold">Priority</span>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-[#0F172A]">{counts.urgent}</span>
              <span className="text-xs text-[#475569]">{counts.urgent === 1 ? "email" : "emails"}</span>
            </div>
            <Link
              href="/app/inbox?category=URGENT"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 text-xs font-semibold text-[#475569] flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span>Open Urgent Feed →</span>
            </Link>
          </Card>
        </div>

        {/* Need Review Card */}
        <div
          onClick={() => setSelectedCategoryFilter(selectedCategoryFilter === "NEED_REVIEW" ? "ALL" : "NEED_REVIEW")}
          className="cursor-pointer transition-all hover:-translate-y-1"
        >
          <Card
            accentRailColor="warning"
            className={selectedCategoryFilter === "NEED_REVIEW" ? "ring-2 ring-[#795600] bg-[#FEF6E0]/40" : ""}
            hoverable
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Need Review</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FEF6E0] text-[#795600] text-[10px] font-bold">Gated</span>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-[#0F172A]">{counts.needReview}</span>
              <span className="text-xs text-[#475569]">{counts.needReview === 1 ? "email" : "emails"}</span>
            </div>
            <Link
              href="/app/inbox?category=NEED_REVIEW"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 text-xs font-semibold text-[#795600] flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-[14px]">gavel</span>
              <span>Open Gated Feed →</span>
            </Link>
          </Card>
        </div>

        {/* Safe to Draft Card */}
        <div
          onClick={() => setSelectedCategoryFilter(selectedCategoryFilter === "SAFE_TO_DRAFT" ? "ALL" : "SAFE_TO_DRAFT")}
          className="cursor-pointer transition-all hover:-translate-y-1"
        >
          <Card
            accentRailColor="green"
            className={selectedCategoryFilter === "SAFE_TO_DRAFT" ? "ring-2 ring-[#2E936F] bg-[#E8F4F0]/40" : ""}
            hoverable
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Safe to Draft</span>
              <span className="px-2 py-0.5 rounded-full bg-[#E8F4F0] text-[#2E936F] text-[10px] font-bold">Ready</span>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-[#0F172A]">{counts.safeToDraft}</span>
              <span className="text-xs text-[#475569]">{counts.safeToDraft === 1 ? "email" : "emails"}</span>
            </div>
            <Link
              href="/app/inbox?category=SAFE_TO_DRAFT"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 text-xs font-semibold text-[#2E936F] flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Open Draft Feed →</span>
            </Link>
          </Card>
        </div>

        {/* Low Priority Card */}
        <div
          onClick={() => setSelectedCategoryFilter(selectedCategoryFilter === "LOW_PRIORITY" ? "ALL" : "LOW_PRIORITY")}
          className="cursor-pointer transition-all hover:-translate-y-1"
        >
          <Card
            accentRailColor="neutral"
            className={selectedCategoryFilter === "LOW_PRIORITY" ? "ring-2 ring-[#64748B] bg-[#F1F5F9]/50" : ""}
            hoverable
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Low Priority</span>
              <span className="px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569] text-[10px] font-bold">Filtered</span>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-[#475569]">{counts.lowPriority}</span>
              <span className="text-xs text-[#475569]">{counts.lowPriority === 1 ? "email" : "emails"}</span>
            </div>
            <Link
              href="/app/inbox?category=LOW_PRIORITY"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 text-xs text-[#94A3B8] flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-[14px]">archive</span>
              <span>Open Low Priority →</span>
            </Link>
          </Card>
        </div>
      </div>

      {/* EXECUTIVE QUICK ACTIONS */}
      <section className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
          Executive Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/app/inbox">
            <Button
              variant="secondary"
              className="w-full justify-start text-xs font-bold cursor-pointer"
              leftIcon={<span className="material-symbols-outlined text-[18px]">move_to_inbox</span>}
            >
              View Inbox ({filteredEmails.length})
            </Button>
          </Link>
          <Link href="/app/drafts">
            <Button
              variant="secondary"
              className="w-full justify-start text-xs font-bold cursor-pointer"
              leftIcon={<span className="material-symbols-outlined text-[18px]">edit_note</span>}
            >
              Review Drafts ({counts.totalDrafts})
            </Button>
          </Link>
          <Link href="/app/accounts">
            <Button
              variant="secondary"
              className="w-full justify-start text-xs font-bold cursor-pointer"
              leftIcon={<span className="material-symbols-outlined text-[18px]">supervisor_account</span>}
            >
              Manage Accounts ({connectedAccounts.length})
            </Button>
          </Link>
          <Link href="/app/rules">
            <Button
              variant="secondary"
              className="w-full justify-start text-xs font-bold cursor-pointer"
              leftIcon={<span className="material-symbols-outlined text-[18px]">policy</span>}
            >
              Update Rules
            </Button>
          </Link>
        </div>
      </section>

      {/* UNIFIED EMAIL STREAM / FILTERED FEED */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFF2EC] text-[#F15E1C] flex items-center justify-center border border-[#FDE8DF]">
              <span className="material-symbols-outlined text-[20px]">mark_email_read</span>
            </div>
            <div>
              <h2 className="text-xl font-heading font-extrabold text-[#0F172A] tracking-tight">
                {selectedCategoryFilter !== "ALL" ? `${selectedCategoryFilter.replace("_", " ")} EMAILS` : "Account Email Feed"}
              </h2>
              <p className="text-xs text-[#475569]">
                {selectedCategoryFilter !== "ALL"
                  ? `Showing emails filtered by ${selectedCategoryFilter}`
                  : "Emails across connected accounts scoped to your active filter"}
              </p>
            </div>
          </div>

          {selectedCategoryFilter !== "ALL" && (
            <button
              onClick={() => setSelectedCategoryFilter("ALL")}
              className="text-xs font-bold text-[#F15E1C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">filter_alt_off</span>
              Reset Category Filter
            </button>
          )}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
              <Skeleton width="120px" height="16px" radius="6px" />
              <Skeleton width="200px" height="18px" radius="4px" />
              <Skeleton width="100%" height="32px" radius="4px" />
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
              <Skeleton width="120px" height="16px" radius="6px" />
              <Skeleton width="200px" height="18px" radius="4px" />
              <Skeleton width="100%" height="32px" radius="4px" />
            </div>
          </div>
        ) : filteredEmails.length === 0 ? (
          <EmptyState
            title="No emails found in this category"
            description="All messages in this mailbox category have been triaged or no emails exist under the selected account."
            icon="verified"
            actionLabel="Reset Category Filter"
            onAction={() => setSelectedCategoryFilter("ALL")}
          />
        ) : (
          <div className="space-y-3">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => handleOpenEmail(email)}
                className={`p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-md transition-all cursor-pointer relative overflow-hidden group ${
                  email.unread ? "border-l-4 border-l-[#F15E1C]" : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Account Badge & Sender Info */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      {/* Account Source Tag */}
                      <span className="px-2 py-0.5 rounded-md bg-[#F1F5F9] border border-[#CBD5E1] font-bold text-[#0F172A] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#F15E1C]" />
                        {email.provider} · {email.accountEmail}
                      </span>
                      <PriorityBadge priority={email.priority} />
                      <RiskBadge risk={email.risk} />
                      <IntentBadge intent={email.intent} />
                      <span className="text-[#94A3B8] text-[11px] ml-auto sm:ml-0">{email.timestamp}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#0F172A]">{email.senderName}</span>
                      <span className="text-xs text-[#64748B]">&lt;{email.senderEmail}&gt;</span>
                    </div>

                    <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#F15E1C] transition-colors truncate">
                      {email.subject}
                    </h3>
                    <p className="text-xs text-[#475569] line-clamp-2">{email.snippet}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEmail(email);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#FFF2EC] text-[#F15E1C] hover:bg-[#F15E1C] hover:text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      View & Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* EMAIL DETAIL & DRAFT REPLY MODAL */}
      {activeEmail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-[#E2E8F0] my-8 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#F1F5F9]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#FFF2EC] text-[#F15E1C] text-xs font-bold border border-[#FDE8DF]">
                    {activeEmail.provider} · {activeEmail.accountEmail}
                  </span>
                  <PriorityBadge priority={activeEmail.priority} />
                </div>
                <h2 className="text-lg font-bold text-[#0F172A] mt-1">{activeEmail.subject}</h2>
                <p className="text-xs text-[#64748B]">
                  From: <strong className="text-[#0F172A]">{activeEmail.senderName}</strong> (&lt;{activeEmail.senderEmail}&gt;)
                </p>
              </div>
              <button
                onClick={() => setActiveEmail(null)}
                className="text-[#94A3B8] hover:text-[#0F172A] p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Email Body */}
            <div className="py-4 space-y-4">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F172A] whitespace-pre-wrap leading-relaxed">
                {activeEmail.body}
              </div>

              {/* Action Feedback Banner */}
              {actionFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                    actionFeedback.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {actionFeedback.type === "success" ? "check_circle" : "error"}
                  </span>
                  <span>{actionFeedback.text}</span>
                </div>
              )}

              {/* Reply Section */}
              {!isReplying ? (
                <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleUnread(activeEmail.id)}
                      className="px-3 py-1.5 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] text-xs font-semibold text-[#475569] cursor-pointer"
                    >
                      {activeEmail.unread ? "Mark Read" : "Mark Unread"}
                    </button>
                    <button
                      onClick={() => {
                        archiveEmail(activeEmail.id);
                        setActiveEmail(null);
                      }}
                      className="px-3 py-1.5 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] text-xs font-semibold text-[#475569] cursor-pointer"
                    >
                      Archive
                    </button>
                  </div>
                  <button
                    onClick={() => setIsReplying(true)}
                    className="px-4 py-2 rounded-xl bg-[#F15E1C] hover:bg-[#D94E10] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">reply</span>
                    Draft Reply
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-2 border-t border-[#F1F5F9]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                    Draft Reply (Dispatching from: {activeEmail.accountEmail})
                  </h4>

                  <div className="space-y-2">
                    <div className="text-xs font-medium text-[#475569]">
                      <strong>To:</strong> {activeEmail.senderEmail}
                    </div>
                    <div className="text-xs font-medium text-[#475569]">
                      <strong>Subject:</strong> Re: {activeEmail.subject}
                    </div>
                    <textarea
                      rows={4}
                      placeholder="Write executive reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#CBD5E1] focus:border-[#F15E1C] focus:ring-2 focus:ring-[#F15E1C]/20 text-xs text-[#0F172A] outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setIsReplying(false)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSaveDraft}
                        className="px-4 py-1.5 rounded-xl border border-[#F15E1C] text-[#F15E1C] hover:bg-[#FFF2EC] text-xs font-bold transition-all cursor-pointer"
                      >
                        Save Draft
                      </button>
                      <button
                        type="button"
                        onClick={handleSendReply}
                        className="px-4 py-1.5 rounded-xl bg-[#F15E1C] hover:bg-[#D94E10] text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
