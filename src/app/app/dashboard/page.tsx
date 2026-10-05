"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { IntentBadge } from "@/components/ui/IntentBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/lib/auth-context";
import { useUserData, CategoryFilterType } from "@/lib/user-data-context";
import { UnifiedEmailItem } from "@/lib/types/execuai";
import { SafeEmailRenderer } from "@/components/execuai/SafeEmailRenderer";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const {
    connectedAccounts,
    selectedAccountFilter,
    setSelectedAccountFilter,
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
    archiveEmail,
    saveDraftReply,
    sendReply,
  } = useUserData();

  // Route prefetching for instant intelligence card navigation
  React.useEffect(() => {
    router.prefetch("/app/inbox");
    router.prefetch("/app/inbox?category=CRITICAL");
    router.prefetch("/app/inbox?category=URGENT");
    router.prefetch("/app/inbox?category=NEED_REVIEW");
    router.prefetch("/app/inbox?category=SAFE_TO_DRAFT");
    router.prefetch("/app/inbox?category=LOW_PRIORITY");
  }, [router]);

  const handleCategoryClick = (category: CategoryFilterType) => {
    const nextCategory = selectedCategoryFilter === category ? "ALL" : category;
    setSelectedCategoryFilter(nextCategory);
    router.push(`/app/inbox?category=${nextCategory}`);
  };

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

  // Extract up to 2 high-priority items for the executive focus widget
  const criticalOrUrgentEmails = filteredEmails.filter(
    (e) => e.priority === "CRITICAL" || e.priority === "HIGH" || e.risk === "HIGH_RISK"
  ).slice(0, 2);

  return (
    <div className="space-[#0F172A] space-y-6 font-sans">
      {/* 1. COMPACT EXECUTIVE HERO OVERVIEW */}
      <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFF2EC] text-[#F15E1C] border border-[#FDE8DF] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isLoading ? "bg-[#F15E1C] animate-pulse" : "bg-[#2E936F]"}`} />
                {primaryAccountEmail}
              </span>
              <span className="text-[#CBD5E1]">|</span>
              <span className="text-[#475569] font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#2E936F]">sync</span>
                {counts.syncedMailboxes} {counts.syncedMailboxes === 1 ? "Mailbox Synced" : "Mailboxes Synced"}
              </span>
              <span className="text-[#CBD5E1]">|</span>
              <span className="text-[#64748B] font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#64748B]">schedule</span>
                {isLoading ? "Syncing Gmail..." : lastSyncedAgo}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-[#0F172A] tracking-tight">
              Welcome back, <span className="text-[#F15E1C]">{userName}</span>
            </h1>

            {/* AI Generated Status Summary Banner */}
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]/80">
              <strong className="text-[#0F172A] font-semibold">AI Inbox Intelligence:</strong>{" "}
              {counts.critical > 0
                ? `${counts.critical} critical email${counts.critical === 1 ? "" : "s"} requiring immediate executive attention, `
                : "No critical flags detected. "}
              {counts.needReview} decision gate{counts.needReview === 1 ? "" : "s"} awaiting review, and{" "}
              {counts.safeToDraft} draft{counts.safeToDraft === 1 ? "" : "s"} ready for dispatch across connected accounts.
            </p>
          </div>

          {/* Controls & Primary CTAs */}
          <div className="flex flex-wrap lg:flex-col sm:flex-row items-stretch sm:items-center lg:items-end gap-2 shrink-0">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Account Selector */}
              <div className="px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2 text-xs font-semibold text-[#0F172A]">
                <span className="material-symbols-outlined text-[#F15E1C] text-[16px]">mail</span>
                <select
                  value={selectedAccountFilter}
                  onChange={(e) => setSelectedAccountFilter(e.target.value)}
                  className="bg-transparent font-semibold text-[#0F172A] outline-none cursor-pointer max-w-[140px] sm:max-w-[180px] truncate"
                >
                  <option value="ALL">All Accounts ({connectedAccounts.length})</option>
                  {connectedAccounts.map((acc) => (
                    <option key={acc.email} value={acc.email}>
                      {acc.provider}: {acc.email}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sync Refresh Button */}
              <button
                onClick={() => refreshGmailSync()}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] cursor-pointer flex items-center gap-1.5 text-xs font-semibold transition-all shadow-2xs"
                title="Fetch new/updated Gmail data"
              >
                <span className={`material-symbols-outlined text-[16px] ${isLoading ? "animate-spin text-[#F15E1C]" : ""}`}>
                  sync
                </span>
                <span>{isLoading ? "Syncing..." : "Sync"}</span>
              </button>
            </div>

            {/* Quick CTAs */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link href="/app/inbox" className="flex-1 sm:flex-none">
                <Button variant="primary" size="sm" className="w-full text-xs font-bold shadow-xs">
                  Review Inbox
                </Button>
              </Link>
              <Link href="/app/accounts" className="flex-1 sm:flex-none">
                <Button variant="secondary" size="sm" className="w-full text-xs font-semibold">
                  Manage Accounts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sync Error Banner (if OAuth expired or API failed) */}
      {syncError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-red-600">error</span>
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

      {/* 2. DYNAMIC 2-COLUMN EXECUTIVE DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* MAIN COLUMN (LEFT / CENTER): Email Feed & Intelligence Breakdown (~68% width) */}
        <div className="lg:col-span-8 space-y-6">
          {/* EMAIL INTELLIGENCE OVERVIEW (Dominant Critical + Compact Metric Pills) */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Intelligence Overview
              </h2>
              {selectedCategoryFilter !== "ALL" && (
                <button
                  onClick={() => handleCategoryClick("ALL")}
                  className="text-xs font-semibold text-[#F15E1C] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">filter_alt_off</span>
                  Clear Filter ({selectedCategoryFilter.replace("_", " ")})
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {/* Critical Card (Prominent / Visually Dominant) */}
              <button
                onClick={() => handleCategoryClick("CRITICAL")}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  selectedCategoryFilter === "CRITICAL"
                    ? "bg-[#FEF2F2] border-[#DC2626] ring-2 ring-[#DC2626]/20 shadow-xs"
                    : "bg-white border-[#E2E8F0] hover:border-[#FCA5A5] hover:shadow-2xs"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#DC2626] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-ping" />
                    Critical
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-[#FEF2F2] text-[#DC2626] text-[9px] font-bold border border-[#FCA5A5]/40">
                    Urgent
                  </span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#0F172A]">{counts.critical}</span>
                  <span className="text-[11px] text-[#475569] font-medium">items</span>
                </div>
              </button>

              {/* Urgent Tile */}
              <button
                onClick={() => handleCategoryClick("URGENT")}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedCategoryFilter === "URGENT"
                    ? "bg-[#FFF2EC] border-[#F15E1C] ring-2 ring-[#F15E1C]/20 shadow-xs"
                    : "bg-white border-[#E2E8F0] hover:border-[#FDBA74] hover:shadow-2xs"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F15E1C]">
                  Urgent
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#0F172A]">{counts.urgent}</span>
                  <span className="text-[11px] text-[#475569] font-medium">priority</span>
                </div>
              </button>

              {/* Need Review Tile */}
              <button
                onClick={() => handleCategoryClick("NEED_REVIEW")}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedCategoryFilter === "NEED_REVIEW"
                    ? "bg-[#FEF6E0] border-[#FAB60A] ring-2 ring-[#FAB60A]/20 shadow-xs"
                    : "bg-white border-[#E2E8F0] hover:border-[#FDE047] hover:shadow-2xs"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#795600]">
                  Need Review
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#0F172A]">{counts.needReview}</span>
                  <span className="text-[11px] text-[#475569] font-medium">gated</span>
                </div>
              </button>

              {/* Safe to Draft Tile */}
              <button
                onClick={() => handleCategoryClick("SAFE_TO_DRAFT")}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedCategoryFilter === "SAFE_TO_DRAFT"
                    ? "bg-[#E8F4F0] border-[#2E936F] ring-2 ring-[#2E936F]/20 shadow-xs"
                    : "bg-white border-[#E2E8F0] hover:border-[#6EE7B7] hover:shadow-2xs"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E936F]">
                  Safe to Draft
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#0F172A]">{counts.safeToDraft}</span>
                  <span className="text-[11px] text-[#475569] font-medium">ready</span>
                </div>
              </button>

              {/* Low Priority Tile */}
              <button
                onClick={() => handleCategoryClick("LOW_PRIORITY")}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedCategoryFilter === "LOW_PRIORITY"
                    ? "bg-[#F1F5F9] border-[#64748B] ring-2 ring-[#64748B]/20 shadow-xs"
                    : "bg-white border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-2xs"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  Low Priority
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#64748B]">{counts.lowPriority}</span>
                  <span className="text-[11px] text-[#94A3B8] font-medium">filed</span>
                </div>
              </button>
            </div>
          </section>

          {/* MAIN ACCOUNT EMAIL FEED */}
          <section className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#F15E1C]">inbox</span>
                <h2 className="text-base sm:text-lg font-heading font-extrabold text-[#0F172A] tracking-tight">
                  {selectedCategoryFilter !== "ALL" ? `${selectedCategoryFilter.replace("_", " ")} Emails` : "Account Email Feed"}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569] text-xs font-bold">
                  {filteredEmails.length}
                </span>
              </div>

              <div className="text-xs text-[#64748B] hidden sm:block">
                Scoped to: <strong className="text-[#0F172A]">{selectedAccountFilter === "ALL" ? "All Connected Accounts" : selectedAccountFilter}</strong>
              </div>
            </div>

            {/* Email List Render */}
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
                    <Skeleton width="140px" height="14px" radius="6px" />
                    <Skeleton width="220px" height="16px" radius="4px" />
                    <Skeleton width="100%" height="24px" radius="4px" />
                  </div>
                ))}
              </div>
            ) : filteredEmails.length === 0 ? (
              <EmptyState
                title="No emails match current filter"
                description="All emails under this category have been triaged or no messages exist for the selected scope."
                icon="verified"
                actionLabel="Reset Category Filter"
                onAction={() => setSelectedCategoryFilter("ALL")}
              />
            ) : (
              <div className="space-y-2.5">
                {filteredEmails.map((email) => {
                  const senderInitials = (email.senderName || "E")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase();

                  return (
                    <div
                      key={email.id}
                      onClick={() => handleOpenEmail(email)}
                      className={`p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] shadow-2xs hover:shadow-xs transition-all cursor-pointer relative group ${
                        email.unread ? "border-l-4 border-l-[#F15E1C] bg-[#FFF2EC]/10" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Sender Avatar Initials */}
                        <div className="w-9 h-9 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-[#FFF2EC] group-hover:text-[#F15E1C] group-hover:border-[#FDE8DF] transition-colors">
                          {senderInitials}
                        </div>

                        {/* Content & Metadata */}
                        <div className="flex-1 min-w-0 space-y-1">
                          {/* Row 1: Sender Name + Account Origin + Timestamp */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0 truncate">
                              <span className="text-xs font-extrabold text-[#0F172A] truncate">
                                {email.senderName}
                              </span>
                              <span className="text-[11px] text-[#64748B] truncate hidden sm:inline">
                                &lt;{email.senderEmail}&gt;
                              </span>
                              <span className="px-1.5 py-0.2 rounded bg-[#F1F5F9] border border-[#E2E8F0] text-[10px] font-semibold text-[#475569] truncate">
                                {email.provider} · {email.accountEmail}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#94A3B8] font-medium shrink-0">
                              {email.timestamp}
                            </span>
                          </div>

                          {/* Row 2: Subject + Priority Badges */}
                          <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                            <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#F15E1C] transition-colors truncate flex-1">
                              {email.subject}
                            </h3>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <PriorityBadge priority={email.priority} />
                              <RiskBadge risk={email.risk} />
                              <IntentBadge intent={email.intent} />
                            </div>
                          </div>

                          {/* Row 3: Snippet Preview */}
                          <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">
                            {email.snippet}
                          </p>

                          {/* Row 4: View & Reply CTA Trigger */}
                          <div className="pt-1.5 flex items-center justify-between">
                            <span className="text-[11px] text-[#94A3B8] font-medium">
                              {email.unread ? "Unread email" : "Triaged"}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenEmail(email);
                              }}
                              className="px-3 py-1 rounded-lg bg-[#FFF2EC] text-[#F15E1C] hover:bg-[#F15E1C] hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                            >
                              <span>View & Reply</span>
                              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* SECONDARY COLUMN (RIGHT): AI Telemetry, Critical Focus & Quick Actions (~32% width) */}
        <div className="lg:col-span-4 space-y-5">
          {/* QUICK ACTIONS PANEL */}
          <section className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#F1F5F9]">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Quick Actions
              </h2>
              <span className="material-symbols-outlined text-[16px] text-[#94A3B8]">bolt</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Link href="/app/inbox" className="w-full">
                <button className="w-full p-2.5 rounded-xl border border-[#E2E8F0] hover:border-[#F15E1C] hover:bg-[#FFF2EC]/30 text-left transition-all cursor-pointer flex items-center justify-between group">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#FFF2EC] text-[#F15E1C] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[16px]">move_to_inbox</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#F15E1C]">View Inbox</div>
                      <div className="text-[10px] text-[#64748B]">{filteredEmails.length} messages active</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-[#94A3B8] group-hover:text-[#F15E1C] group-hover:translate-x-0.5 transition-all">chevron_right</span>
                </button>
              </Link>

              <Link href="/app/drafts" className="w-full">
                <button className="w-full p-2.5 rounded-xl border border-[#E2E8F0] hover:border-[#F15E1C] hover:bg-[#FFF2EC]/30 text-left transition-all cursor-pointer flex items-center justify-between group">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#E8F4F0] text-[#2E936F] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[16px]">edit_note</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#F15E1C]">Review Drafts</div>
                      <div className="text-[10px] text-[#64748B]">{counts.totalDrafts} drafts ready</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-[#94A3B8] group-hover:text-[#F15E1C] group-hover:translate-x-0.5 transition-all">chevron_right</span>
                </button>
              </Link>

              <Link href="/app/accounts" className="w-full">
                <button className="w-full p-2.5 rounded-xl border border-[#E2E8F0] hover:border-[#F15E1C] hover:bg-[#FFF2EC]/30 text-left transition-all cursor-pointer flex items-center justify-between group">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#FEF6E0] text-[#795600] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[16px]">supervisor_account</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#F15E1C]">Manage Accounts</div>
                      <div className="text-[10px] text-[#64748B]">{connectedAccounts.length} accounts connected</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-[#94A3B8] group-hover:text-[#F15E1C] group-hover:translate-x-0.5 transition-all">chevron_right</span>
                </button>
              </Link>

              <Link href="/app/rules" className="w-full">
                <button className="w-full p-2.5 rounded-xl border border-[#E2E8F0] hover:border-[#F15E1C] hover:bg-[#FFF2EC]/30 text-left transition-all cursor-pointer flex items-center justify-between group">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#F1F5F9] text-[#475569] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[16px]">policy</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#F15E1C]">Update Rules</div>
                      <div className="text-[10px] text-[#64748B]">Configure AI triage policies</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-[#94A3B8] group-hover:text-[#F15E1C] group-hover:translate-x-0.5 transition-all">chevron_right</span>
                </button>
              </Link>
            </div>
          </section>

          {/* CRITICAL ACTION REQUIRED FOCUS WIDGET */}
          <section className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                  Action Required Focus
                </h2>
              </div>
              <span className="text-[10px] font-bold text-[#475569]">
                {criticalOrUrgentEmails.length} item{criticalOrUrgentEmails.length === 1 ? "" : "s"}
              </span>
            </div>

            {criticalOrUrgentEmails.length > 0 ? (
              <div className="space-y-2">
                {criticalOrUrgentEmails.map((email) => (
                  <div
                    key={email.id}
                    onClick={() => handleOpenEmail(email)}
                    className="p-3 rounded-lg bg-[#FEF2F2]/60 border border-[#FCA5A5]/50 hover:border-[#DC2626] transition-all cursor-pointer space-y-1 group"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-extrabold text-[#DC2626] truncate">{email.senderName}</span>
                      <PriorityBadge priority={email.priority} />
                    </div>
                    <div className="text-xs font-bold text-[#0F172A] truncate group-hover:text-[#DC2626]">
                      {email.subject}
                    </div>
                    <p className="text-[11px] text-[#475569] line-clamp-1">{email.snippet}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center rounded-lg bg-[#E8F4F0]/50 border border-[#2E936F]/20 space-y-1">
                <span className="material-symbols-outlined text-[24px] text-[#2E936F]">check_circle</span>
                <p className="text-xs font-bold text-[#2E936F]">No Urgent Blockers</p>
                <p className="text-[11px] text-[#475569]">All high-risk emails are currently cleared.</p>
              </div>
            )}
          </section>

          {/* CONNECTED ACCOUNTS HEALTH WIDGET */}
          <section className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#F1F5F9]">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Mailbox Status
              </h2>
              <span className="text-[10px] font-bold text-[#2E936F] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E936F]" />
                Live Sync
              </span>
            </div>

            <div className="space-y-2">
              {connectedAccounts.map((acc, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-6 h-6 rounded-md bg-[#FFF2EC] text-[#F15E1C] font-bold text-[10px] flex items-center justify-center shrink-0">
                      {acc.provider.toUpperCase().includes("GMAIL") ? "G" : "Z"}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#0F172A] truncate">{acc.email}</p>
                      <p className="text-[10px] text-[#64748B] capitalize">{acc.provider} OAuth 2.0</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#2E936F] px-1.5 py-0.5 rounded bg-[#E8F4F0]">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* 3. EMAIL DETAIL & DRAFT REPLY MODAL */}
      {activeEmail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-[#E2E8F0] my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[88vh]">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#F1F5F9] shrink-0 gap-4">
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#FFF2EC] text-[#F15E1C] text-xs font-bold border border-[#FDE8DF]">
                    {activeEmail.provider} · {activeEmail.accountEmail}
                  </span>
                  <PriorityBadge priority={activeEmail.priority} />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-[#0F172A] mt-1 break-words">{activeEmail.subject}</h2>
                <p className="text-xs text-[#64748B] truncate">
                  From: <strong className="text-[#0F172A]">{activeEmail.senderName}</strong> (&lt;{activeEmail.senderEmail}&gt;)
                </p>
              </div>

              <button
                onClick={() => setActiveEmail(null)}
                className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-all cursor-pointer shrink-0 border border-[#E2E8F0] flex items-center gap-1 text-xs font-semibold"
                title="Close Email Viewer"
                aria-label="Close Email Viewer"
              >
                <span>Close</span>
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Email Modal Scrollable Body */}
            <div className="py-4 space-y-4 overflow-y-auto flex-1 pr-1 custom-scrollbar">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <SafeEmailRenderer content={activeEmail.body} />
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
                <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9] shrink-0">
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
                <div className="space-y-3 pt-2 border-t border-[#F1F5F9] shrink-0">
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
