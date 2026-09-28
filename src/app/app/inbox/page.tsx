"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { IntentBadge } from "@/components/ui/IntentBadge";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmailDetailView } from "@/components/execuai/EmailDetailView";
import { UnifiedEmailItem } from "@/lib/types/execuai";
import { useAuth } from "@/lib/auth-context";
import { useUserData } from "@/lib/user-data-context";

export default function UnifiedInboxPage() {
  const { user } = useAuth();
  const {
    connectedAccounts,
    selectedAccountFilter,
    setSelectedAccountFilter,
    allUserEmails,
    filteredEmails,
    searchQuery,
    setSearchQuery,
    toggleFlagged,
    toggleUnread,
  } = useUserData();

  // Simulator State Toggles
  const [viewState, setViewState] = React.useState<"NORMAL" | "LOADING" | "ERROR" | "EMPTY">("NORMAL");

  // Selection & Filter States
  const [selectedEmailId, setSelectedEmailId] = React.useState<string>("");
  const [priorityFilter, setPriorityFilter] = React.useState<string>("ALL");
  const [intentFilter, setIntentFilter] = React.useState<string>("ALL");
  const [riskFilter, setRiskFilter] = React.useState<string>("ALL");
  const [unreadOnly, setUnreadOnly] = React.useState<boolean>(false);
  const [flaggedOnly, setFlaggedOnly] = React.useState<boolean>(false);

  // Mobile Detail Modal State
  const [isMobileDetailOpen, setIsMobileDetailOpen] = React.useState<boolean>(false);

  // Set initial selected email when list updates
  React.useEffect(() => {
    if (filteredEmails.length > 0 && !selectedEmailId) {
      setSelectedEmailId(filteredEmails[0].id);
    }
  }, [filteredEmails, selectedEmailId]);

  // Secondary Filter Logic applied on top of context filteredEmails
  const displayEmails = React.useMemo(() => {
    if (viewState === "EMPTY") return [];

    return filteredEmails.filter((item) => {
      if (priorityFilter !== "ALL" && item.priority !== priorityFilter) return false;
      if (intentFilter !== "ALL" && item.intent !== intentFilter) return false;
      if (riskFilter !== "ALL" && item.risk !== riskFilter) return false;
      if (unreadOnly && !item.unread) return false;
      if (flaggedOnly && !item.flagged) return false;
      return true;
    });
  }, [filteredEmails, viewState, priorityFilter, intentFilter, riskFilter, unreadOnly, flaggedOnly]);

  // Currently Selected Email
  const activeEmail = React.useMemo(() => {
    return (
      displayEmails.find((e) => e.id === selectedEmailId) ||
      displayEmails[0] ||
      allUserEmails[0] ||
      null
    );
  }, [displayEmails, selectedEmailId, allUserEmails]);

  // Active Count Telemetry
  const unreadCount = React.useMemo(() => allUserEmails.filter((e) => e.unread).length, [allUserEmails]);
  const criticalCount = React.useMemo(() => allUserEmails.filter((e) => e.priority === "CRITICAL").length, [allUserEmails]);

  // Account Tabs Config
  const accountTabs = React.useMemo(() => {
    const tabs = [{ id: "ALL", label: "All Connected Accounts", badge: `${allUserEmails.length}` }];
    connectedAccounts.forEach((acc) => {
      const count = allUserEmails.filter((e) => e.accountEmail.toLowerCase() === acc.email.toLowerCase()).length;
      tabs.push({
        id: acc.email,
        label: `${acc.provider} (${acc.email})`,
        badge: `${count}`,
      });
    });
    return tabs;
  }, [connectedAccounts, allUserEmails]);

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden pb-12 font-sans text-[#0F172A]">
      {/* Dynamic State Switcher (Simulator Controls) */}
      <div className="bg-[#0F172A] text-white p-3 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F15E1C] animate-ping" />
          <span className="font-bold text-[#FFEC69] uppercase tracking-wide text-[11px]">Inbox Simulation Mode:</span>
          <span className="text-[#94A3B8]">Toggle UI states to inspect empty, loading, or error behaviors</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setViewState("NORMAL")}
            className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
              viewState === "NORMAL" ? "bg-[#F15E1C] text-white" : "bg-[#1E293B] text-[#94A3B8] hover:text-white"
            }`}
          >
            Live Stream
          </button>
          <button
            onClick={() => setViewState("LOADING")}
            className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
              viewState === "LOADING" ? "bg-[#FAB60A] text-[#0F172A]" : "bg-[#1E293B] text-[#94A3B8] hover:text-white"
            }`}
          >
            Skeleton Loading
          </button>
          <button
            onClick={() => setViewState("EMPTY")}
            className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
              viewState === "EMPTY" ? "bg-[#CBD5E1] text-[#0F172A]" : "bg-[#1E293B] text-[#94A3B8] hover:text-white"
            }`}
          >
            Empty State
          </button>
          <button
            onClick={() => setViewState("ERROR")}
            className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
              viewState === "ERROR" ? "bg-[#F15E1C] text-white" : "bg-[#1E293B] text-[#94A3B8] hover:text-white"
            }`}
          >
            Error State
          </button>
        </div>
      </div>

      {/* Header & Main Control Bar */}
      <section className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-[#E2E8F0] space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight font-heading">Unified Executive Inbox</h1>
              <span className="bg-[#F7D7B0]/50 text-[#0F172A] text-xs px-2.5 py-0.5 rounded-full font-bold">
                {unreadCount} Unread Emails
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF2EC] text-[#F15E1C] text-xs font-bold border border-[#F15E1C]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F15E1C] animate-pulse" />
                {criticalCount} Critical Priority
              </span>
            </div>
            <p className="text-xs text-[#64748B]">
              Real-time multi-mailbox aggregation across your connected accounts.
            </p>
          </div>

          {/* Account Filter Tabs */}
          <div className="overflow-x-auto pb-1 max-w-full">
            <Tabs
              variant="segmented"
              activeTab={selectedAccountFilter}
              onChange={setSelectedAccountFilter}
              tabs={accountTabs}
            />
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search emails, people, or topics across all connected accounts..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#F15E1C] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Multi-Dimensional Filter Control Matrix */}
        <div className="pt-3 border-t border-[#F8FAFC] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Priority Select */}
            <div className="flex items-center gap-1 bg-[#F8FAFC] px-2.5 py-1.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#94A3B8] font-bold text-[10px] uppercase tracking-wider pr-1">Priority:</span>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="bg-transparent text-[#0F172A] font-semibold text-xs focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Priorities</option>
                <option value="CRITICAL">Critical</option>
                <option value="URGENT">Urgent</option>
                <option value="IMPORTANT">Important</option>
                <option value="NORMAL">Normal</option>
                <option value="LOW">Low</option>
                <option value="SPAM">Spam</option>
              </select>
            </div>

            {/* Intent Select */}
            <div className="flex items-center gap-1 bg-[#F8FAFC] px-2.5 py-1.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#94A3B8] font-bold text-[10px] uppercase tracking-wider pr-1">Intent:</span>
              <select
                value={intentFilter}
                onChange={(e) => setIntentFilter(e.target.value)}
                className="bg-transparent text-[#0F172A] font-semibold text-xs focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Intents</option>
                <option value="CLIENT">Client</option>
                <option value="SALES">Sales</option>
                <option value="VENDOR">Vendor</option>
                <option value="INTERNAL">Internal</option>
                <option value="FINANCE">Finance</option>
                <option value="HR">HR</option>
                <option value="LEGAL">Legal</option>
                <option value="MEETING">Meeting</option>
                <option value="SUPPORT">Support</option>
                <option value="NEWSLETTER">Newsletter</option>
                <option value="MARKETING">Marketing</option>
                <option value="PERSONAL">Personal</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* Risk Select */}
            <div className="flex items-center gap-1 bg-[#F8FAFC] px-2.5 py-1.5 rounded-xl border border-[#E2E8F0]">
              <span className="text-[#94A3B8] font-bold text-[10px] uppercase tracking-wider pr-1">Risk Gate:</span>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="bg-transparent text-[#0F172A] font-semibold text-xs focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Risk Levels</option>
                <option value="HIGH_RISK">High Risk</option>
                <option value="REVIEW">Review Required</option>
                <option value="CONFIDENTIAL">Confidential</option>
                <option value="SAFE">Safe</option>
              </select>
            </div>

            {/* Unread & Flagged Toggles */}
            <button
              onClick={() => setUnreadOnly(!unreadOnly)}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all flex items-center gap-1.5 ${
                unreadOnly
                  ? "bg-[#FFF2EC] border-[#F15E1C] text-[#F15E1C]"
                  : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#F15E1C]" />
              Unread Only
            </button>

            <button
              onClick={() => setFlaggedOnly(!flaggedOnly)}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all flex items-center gap-1.5 ${
                flaggedOnly
                  ? "bg-[#FFEC69]/30 border-[#FAB60A] text-[#855D00]"
                  : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#FAB60A]">star</span>
              Flagged Only
            </button>
          </div>

          {/* Reset Filters CTA */}
          {(selectedAccountFilter !== "ALL" ||
            priorityFilter !== "ALL" ||
            intentFilter !== "ALL" ||
            riskFilter !== "ALL" ||
            unreadOnly ||
            flaggedOnly ||
            searchQuery !== "") && (
            <button
              onClick={() => {
                setSelectedAccountFilter("ALL");
                setPriorityFilter("ALL");
                setIntentFilter("ALL");
                setRiskFilter("ALL");
                setUnreadOnly(false);
                setFlaggedOnly(false);
                setSearchQuery("");
              }}
              className="text-[#F15E1C] hover:underline font-bold text-xs flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">refresh</span>
              Clear Filters
            </button>
          )}
        </div>
      </section>

      {/* Main Content Workbench */}
      {viewState === "LOADING" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <Skeleton width="100px" height="16px" radius="6px" />
                  <Skeleton width="50px" height="14px" radius="4px" />
                </div>
                <Skeleton width="180px" height="18px" radius="4px" />
                <Skeleton width="100%" height="32px" radius="4px" />
                <div className="flex gap-2">
                  <Skeleton width="60px" height="18px" radius="4px" />
                  <Skeleton width="60px" height="18px" radius="4px" />
                </div>
              </div>
            ))}
          </div>
          <div className="hidden lg:block lg:col-span-7 p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-4">
            <Skeleton width="240px" height="24px" radius="6px" />
            <Skeleton width="140px" height="16px" radius="4px" />
            <Skeleton width="100%" height="200px" radius="12px" />
          </div>
        </div>
      )}

      {viewState === "ERROR" && (
        <div className="p-8 rounded-2xl bg-[#FFF2EC] border border-[#F15E1C]/30 text-center space-y-4 max-w-2xl mx-auto my-8 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#F15E1C]/10 text-[#F15E1C] flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-2xl">sync_problem</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#F15E1C] font-heading">Unified Mailbox Sync Interrupted</h3>
            <p className="text-xs text-[#475569] leading-relaxed max-w-md mx-auto">
              Unable to reach OAuth provider endpoints for connected accounts. The connection timed out during TLS handshake verification.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setViewState("NORMAL")}
              leftIcon={<span className="material-symbols-outlined text-[16px]">refresh</span>}
            >
              Retry Unified Sync
            </Button>
          </div>
        </div>
      )}

      {(viewState === "EMPTY" || (viewState === "NORMAL" && displayEmails.length === 0)) && (
        <div className="p-12 rounded-2xl bg-[#F7D7B0]/20 border border-[#F7D7B0] text-center space-y-4 max-w-xl mx-auto my-8 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#FFEC69]/40 text-[#FAB60A] flex items-center justify-center mx-auto border border-[#F7D7B0]">
            <span className="material-symbols-outlined text-3xl">verified</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[#0F172A] font-heading">You&apos;re all caught up.</h3>
            <p className="text-xs text-[#64748B]">
              No emails matching your active filter criteria require attention across connected accounts.
            </p>
          </div>
          <div className="pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setViewState("NORMAL");
                setSelectedAccountFilter("ALL");
                setPriorityFilter("ALL");
                setIntentFilter("ALL");
                setRiskFilter("ALL");
                setUnreadOnly(false);
                setFlaggedOnly(false);
                setSearchQuery("");
              }}
            >
              Reset Filter Criteria
            </Button>
          </div>
        </div>
      )}

      {viewState === "NORMAL" && displayEmails.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Email Stream List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#64748B] px-1 font-semibold">
              <span>Showing {displayEmails.length} emails</span>
              <span>Sorted by Recency</span>
            </div>

            {displayEmails.map((emailItem: UnifiedEmailItem) => {
              const isSelected = activeEmail?.id === emailItem.id;

              return (
                <div
                  key={emailItem.id}
                  onClick={() => {
                    setSelectedEmailId(emailItem.id);
                    setIsMobileDetailOpen(true);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 relative ${
                    isSelected
                      ? "bg-white border-[#F15E1C] shadow-sm ring-1 ring-[#F15E1C]"
                      : emailItem.unread
                      ? "bg-white border-[#CBD5E1] shadow-2xs hover:border-[#94A3B8]"
                      : "bg-[#F8FAFC]/90 border-[#E2E8F0] hover:bg-white"
                  }`}
                >
                  {/* Account Badge & Timestamp */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          emailItem.provider === "GMAIL"
                            ? "bg-[#FFF1F2] text-[#E11D48] border border-[#FDA4AF]"
                            : "bg-[#EFF6FF] text-[#2563EB] border border-[#93C5FD]"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[12px]">
                          {emailItem.provider === "GMAIL" ? "mail" : "domain"}
                        </span>
                        {emailItem.provider}
                      </span>
                      <span className="text-[11px] text-[#64748B] truncate font-medium">{emailItem.accountEmail}</span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[11px] text-[#94A3B8] font-medium">{emailItem.timestamp}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlagged(emailItem.id);
                        }}
                        className={`text-[18px] transition-colors ${
                          emailItem.flagged ? "text-[#FAB60A] material-symbols-outlined fill-1" : "text-[#CBD5E1] hover:text-[#94A3B8] material-symbols-outlined"
                        }`}
                      >
                        star
                      </button>
                    </div>
                  </div>

                  {/* Sender & Subject */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-sm tracking-tight truncate ${emailItem.unread ? "font-extrabold text-[#0F172A]" : "font-semibold text-[#334155]"}`}>
                        {emailItem.senderName}
                      </h4>
                      {emailItem.unread && (
                        <span className="w-2 h-2 rounded-full bg-[#2563EB] flex-shrink-0" title="Unread" />
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 line-clamp-1 ${emailItem.unread ? "font-bold text-[#0F172A]" : "font-medium text-[#475569]"}`}>
                      {emailItem.subject}
                    </p>
                  </div>

                  {/* Snippet */}
                  <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                    {emailItem.snippet}
                  </p>

                  {/* AI Metadata Badges */}
                  <div className="flex items-center flex-wrap gap-1.5 pt-1">
                    <PriorityBadge priority={emailItem.priority} size="sm" />
                    <IntentBadge intent={emailItem.intent} size="sm" />
                    <RiskBadge risk={emailItem.risk} size="sm" />
                    {emailItem.hasAttachment && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded font-bold">
                        <span className="material-symbols-outlined text-[12px]">attach_file</span>
                        File
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Email Detail Pane */}
          <div className="hidden lg:block lg:col-span-7 space-y-4 sticky top-6">
            {activeEmail && (
              <EmailDetailView email={activeEmail} />
            )}
          </div>
        </div>
      )}

      {/* Mobile Reading View Modal / Drawer (<1024px) */}
      {isMobileDetailOpen && activeEmail && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-xs flex flex-col justify-end p-0 sm:p-4">
          <div className="bg-white w-full max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl p-4 sm:p-6 space-y-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#0F172A]">Email Thread & AI Analysis</span>
              <button
                onClick={() => setIsMobileDetailOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-bold"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <EmailDetailView email={activeEmail} onBack={() => setIsMobileDetailOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

