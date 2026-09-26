"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { IntentBadge } from "@/components/ui/IntentBadge";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { initialUnifiedEmails } from "@/lib/data/mockExecuData";
import {
  UnifiedEmailItem,
  PriorityLevel,
  IntentCategory,
  RiskLevel,
} from "@/lib/types/execuai";

export default function UnifiedInboxPage() {
  // Simulator State Toggles
  const [viewState, setViewState] = React.useState<"NORMAL" | "LOADING" | "ERROR" | "EMPTY">("NORMAL");

  // Selection & Filter States
  const [selectedEmailId, setSelectedEmailId] = React.useState<string>("EMAIL-1001");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [accountFilter, setAccountFilter] = React.useState<string>("ALL");
  const [priorityFilter, setPriorityFilter] = React.useState<string>("ALL");
  const [intentFilter, setIntentFilter] = React.useState<string>("ALL");
  const [riskFilter, setRiskFilter] = React.useState<string>("ALL");
  const [unreadOnly, setUnreadOnly] = React.useState<boolean>(false);
  const [flaggedOnly, setFlaggedOnly] = React.useState<boolean>(false);

  // Mobile Detail Modal State
  const [isMobileDetailOpen, setIsMobileDetailOpen] = React.useState<boolean>(false);

  // Master Email List State (with local unread/flag toggling)
  const [emails, setEmails] = React.useState<UnifiedEmailItem[]>(initialUnifiedEmails);

  // Toggle Starred / Flagged
  const toggleFlag = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((item) => (item.id === id ? { ...item, flagged: !item.flagged } : item))
    );
  };

  // Toggle Unread
  const toggleUnread = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: !item.unread } : item))
    );
  };

  // Filter Logic
  const filteredEmails = React.useMemo(() => {
    if (viewState === "EMPTY") return [];

    return emails.filter((item) => {
      // Account filter
      if (accountFilter !== "ALL" && item.accountEmail !== accountFilter) {
        return false;
      }
      // Priority filter
      if (priorityFilter !== "ALL" && item.priority !== priorityFilter) {
        return false;
      }
      // Intent filter
      if (intentFilter !== "ALL" && item.intent !== intentFilter) {
        return false;
      }
      // Risk filter
      if (riskFilter !== "ALL" && item.risk !== riskFilter) {
        return false;
      }
      // Unread filter
      if (unreadOnly && !item.unread) {
        return false;
      }
      // Flagged filter
      if (flaggedOnly && !item.flagged) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchSender = item.senderName.toLowerCase().includes(query) || item.senderEmail.toLowerCase().includes(query);
        const matchSubject = item.subject.toLowerCase().includes(query);
        const matchSnippet = item.snippet.toLowerCase().includes(query);
        const matchAccount = item.accountEmail.toLowerCase().includes(query) || item.accountLabel.toLowerCase().includes(query);
        const matchSummary = item.aiSummary ? item.aiSummary.toLowerCase().includes(query) : false;
        if (!matchSender && !matchSubject && !matchSnippet && !matchAccount && !matchSummary) {
          return false;
        }
      }

      return true;
    });
  }, [emails, viewState, accountFilter, priorityFilter, intentFilter, riskFilter, unreadOnly, flaggedOnly, searchQuery]);

  // Currently Selected Email
  const activeEmail = React.useMemo(() => {
    return emails.find((e) => e.id === selectedEmailId) || filteredEmails[0] || emails[0];
  }, [emails, selectedEmailId, filteredEmails]);

  // Active Count Telemetry
  const unreadCount = React.useMemo(() => emails.filter((e) => e.unread).length, [emails]);
  const criticalCount = React.useMemo(() => emails.filter((e) => e.priority === "CRITICAL").length, [emails]);

  // Account Tabs Config
  const accountTabs = [
    { id: "ALL", label: "All Connected Accounts", badge: `${emails.length}` },
    { id: "ceo@company.com", label: "Gmail #1 (CEO)", badge: `${emails.filter((e) => e.accountEmail === "ceo@company.com").length}` },
    { id: "alexander.founder@gmail.com", label: "Gmail #2 (Personal)", badge: `${emails.filter((e) => e.accountEmail === "alexander.founder@gmail.com").length}` },
    { id: "director@company.com", label: "Zoho #1 (Director)", badge: `${emails.filter((e) => e.accountEmail === "director@company.com").length}` },
  ];

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden pb-12">
      {/* Dynamic State Switcher (Simulator Controls) */}
      <div className="bg-[#0F172A] text-white p-3 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2E936F] animate-ping" />
          <span className="font-bold text-[#FFEC69] uppercase tracking-wide text-[11px]">Inbox Simulation Mode:</span>
          <span className="text-[#94A3B8]">Toggle UI states to inspect empty, loading, or error behaviors</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setViewState("NORMAL")}
            className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
              viewState === "NORMAL" ? "bg-[#2E936F] text-white" : "bg-[#1E293B] text-[#94A3B8] hover:text-white"
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
              viewState === "ERROR" ? "bg-[#E11D48] text-white" : "bg-[#1E293B] text-[#94A3B8] hover:text-white"
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
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">Unified Executive Inbox</h1>
              <span className="bg-[#E5EEFF] text-[#0F172A] text-xs px-2.5 py-0.5 rounded-full font-bold">
                {unreadCount} Unread Emails
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF1F2] text-[#E11D48] text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse" />
                {criticalCount} Critical Priority
              </span>
            </div>
            <p className="text-xs text-[#64748B]">
              Real-time multi-mailbox aggregation across Gmail #1, Gmail #2, and Zoho #1.
            </p>
          </div>

          {/* Account Filter Tabs */}
          <div className="overflow-x-auto pb-1 max-w-full">
            <Tabs
              variant="segmented"
              activeTab={accountFilter}
              onChange={setAccountFilter}
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
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2E936F] focus:bg-white transition-all"
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
                  ? "bg-[#E5EEFF] border-[#2563EB] text-[#2563EB]"
                  : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
              Unread Only
            </button>

            <button
              onClick={() => setFlaggedOnly(!flaggedOnly)}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all flex items-center gap-1.5 ${
                flaggedOnly
                  ? "bg-[#FEF7E6] border-[#FAB60A] text-[#795600]"
                  : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-[#FAB60A]">star</span>
              Flagged Only
            </button>
          </div>

          {/* Reset Filters CTA */}
          {(accountFilter !== "ALL" ||
            priorityFilter !== "ALL" ||
            intentFilter !== "ALL" ||
            riskFilter !== "ALL" ||
            unreadOnly ||
            flaggedOnly ||
            searchQuery !== "") && (
            <button
              onClick={() => {
                setAccountFilter("ALL");
                setPriorityFilter("ALL");
                setIntentFilter("ALL");
                setRiskFilter("ALL");
                setUnreadOnly(false);
                setFlaggedOnly(false);
                setSearchQuery("");
              }}
              className="text-[#E11D48] hover:underline font-bold text-xs flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">refresh</span>
              Clear Filters
            </button>
          )}
        </div>
      </section>

      {/* Main Content Workbench */}
      {viewState === "LOADING" && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-5 space-y-3">
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
          <div className="hidden xl:block xl:col-span-7 p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-4">
            <Skeleton width="240px" height="24px" radius="6px" />
            <Skeleton width="140px" height="16px" radius="4px" />
            <Skeleton width="100%" height="200px" radius="12px" />
          </div>
        </div>
      )}

      {viewState === "ERROR" && (
        <div className="p-8 rounded-2xl bg-[#FFF1F2] border border-[#FDA4AF] text-center space-y-4 max-w-2xl mx-auto my-8 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-2xl">sync_problem</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#9F1239]">Unified Mailbox Sync Interrupted</h3>
            <p className="text-xs text-[#BE123C] leading-relaxed max-w-md mx-auto">
              Unable to reach OAuth provider endpoints for <span className="font-bold">director@company.com (Zoho #1)</span>. The connection timed out during TLS handshake verification.
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
            <Button
              variant="secondary"
              size="sm"
              onClick={() => alert("Re-authenticating accounts...")}
            >
              Re-authenticate Zoho
            </Button>
          </div>
        </div>
      )}

      {(viewState === "EMPTY" || (viewState === "NORMAL" && filteredEmails.length === 0)) && (
        <div className="p-12 rounded-2xl bg-[#FDF8F3] border border-[#F7D7B0] text-center space-y-4 max-w-xl mx-auto my-8 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#FEF7E6] text-[#FAB60A] flex items-center justify-center mx-auto border border-[#F7D7B0]">
            <span className="material-symbols-outlined text-3xl">verified</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[#0F172A]">You're all caught up.</h3>
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
                setAccountFilter("ALL");
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

      {viewState === "NORMAL" && filteredEmails.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Left Email Stream List (Stacked list for mobile/tablet, 5-col stream for desktop) */}
          <div className="xl:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#64748B] px-1 font-semibold">
              <span>Showing {filteredEmails.length} emails</span>
              <span>Sorted by Recency</span>
            </div>

            {filteredEmails.map((email) => {
              const isSelected = selectedEmailId === email.id;

              return (
                <div
                  key={email.id}
                  onClick={() => {
                    setSelectedEmailId(email.id);
                    setIsMobileDetailOpen(true);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 relative ${
                    isSelected
                      ? "bg-white border-[#2E936F] shadow-sm ring-1 ring-[#2E936F]"
                      : email.unread
                      ? "bg-white border-[#CBD5E1] shadow-2xs hover:border-[#94A3B8]"
                      : "bg-[#F8FAFC]/90 border-[#E2E8F0] hover:bg-white"
                  }`}
                >
                  {/* Account Badge & Timestamp */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          email.provider === "GMAIL"
                            ? "bg-[#FFF1F2] text-[#E11D48] border border-[#FDA4AF]"
                            : "bg-[#EFF6FF] text-[#2563EB] border border-[#93C5FD]"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[12px]">
                          {email.provider === "GMAIL" ? "mail" : "domain"}
                        </span>
                        {email.accountLabel} ({email.provider})
                      </span>
                      <span className="text-[11px] text-[#64748B] truncate font-medium">{email.accountEmail}</span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[11px] text-[#94A3B8] font-medium">{email.timestamp}</span>
                      <button
                        onClick={(e) => toggleFlag(e, email.id)}
                        className={`text-[18px] transition-colors ${
                          email.flagged ? "text-[#FAB60A] material-symbols-outlined fill-1" : "text-[#CBD5E1] hover:text-[#94A3B8] material-symbols-outlined"
                        }`}
                      >
                        star
                      </button>
                    </div>
                  </div>

                  {/* Sender & Subject */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-sm tracking-tight truncate ${email.unread ? "font-extrabold text-[#0F172A]" : "font-semibold text-[#334155]"}`}>
                        {email.senderName}
                      </h4>
                      {email.unread && (
                        <span className="w-2 h-2 rounded-full bg-[#2563EB] flex-shrink-0" title="Unread" />
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 line-clamp-1 ${email.unread ? "font-bold text-[#0F172A]" : "font-medium text-[#475569]"}`}>
                      {email.subject}
                    </p>
                  </div>

                  {/* Snippet */}
                  <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                    {email.snippet}
                  </p>

                  {/* AI Metadata Badges */}
                  <div className="flex items-center flex-wrap gap-1.5 pt-1">
                    <PriorityBadge priority={email.priority} size="sm" />
                    <IntentBadge intent={email.intent} size="sm" />
                    <RiskBadge risk={email.risk} size="sm" />
                    {email.hasAttachment && (
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

          {/* Right Email Detail Pane (Desktop & iPad Landscape Split View) */}
          <div className="hidden xl:block xl:col-span-7 space-y-4 sticky top-6">
            {activeEmail && (
              <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-6">
                {/* Account & Security Banner */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm text-white ${
                        activeEmail.provider === "GMAIL" ? "bg-[#EA4335]" : "bg-[#2264E5]"
                      }`}
                    >
                      {activeEmail.avatarInitials || activeEmail.senderName.substring(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                        {activeEmail.senderName}
                        <span className="text-xs font-normal text-[#64748B]">&lt;{activeEmail.senderEmail}&gt;</span>
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[#64748B]">
                        <span>{activeEmail.senderRole}</span>
                        <span>•</span>
                        <span className="text-[#2E936F] font-semibold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">verified</span>
                          DKIM & SPF Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-[#94A3B8] font-medium block">{activeEmail.timestamp}</span>
                    <span
                      className={`inline-block mt-1 text-[10px] font-extrabold px-2 py-0.5 rounded ${
                        activeEmail.provider === "GMAIL"
                          ? "bg-[#FFF1F2] text-[#E11D48]"
                          : "bg-[#EFF6FF] text-[#2563EB]"
                      }`}
                    >
                      Routed via {activeEmail.accountLabel} ({activeEmail.accountEmail})
                    </span>
                  </div>
                </div>

                {/* Email Subject & Triage Badges */}
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-[#0F172A] leading-tight">{activeEmail.subject}</h2>
                  <div className="flex items-center flex-wrap gap-2">
                    <PriorityBadge priority={activeEmail.priority} />
                    <IntentBadge intent={activeEmail.intent} />
                    <RiskBadge risk={activeEmail.risk} />
                    <button
                      onClick={(e) => toggleUnread(e, activeEmail.id)}
                      className="text-xs text-[#64748B] hover:text-[#0F172A] underline font-medium ml-auto"
                    >
                      Mark as {activeEmail.unread ? "Read" : "Unread"}
                    </button>
                  </div>
                </div>

                {/* AI Executive Summary Card */}
                {activeEmail.aiSummary && (
                  <Card variant="ai">
                    <div className="flex items-center justify-between pb-2 border-b border-[#FAB60A]/30">
                      <div className="flex items-center gap-2 text-[#795600] font-bold text-xs">
                        <span className="material-symbols-outlined text-[18px]">psychology</span>
                        <span>ExecuAI Triage Summary</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#795600] uppercase tracking-wider">
                        Confidence: 99.4%
                      </span>
                    </div>
                    <p className="text-xs text-[#0F172A] pt-2 font-medium leading-relaxed">
                      {activeEmail.aiSummary}
                    </p>
                  </Card>
                )}

                {/* Full Body Text */}
                <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F172A] leading-relaxed whitespace-pre-line font-normal space-y-4">
                  {activeEmail.body}
                </div>

                {/* Executive Quick Actions */}
                <div className="pt-2 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {activeEmail.aiDraftAvailable ? (
                      <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<span className="material-symbols-outlined text-[16px]">auto_fix_high</span>}
                      >
                        Review AI Prepared Draft
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        leftIcon={<span className="material-symbols-outlined text-[16px]">reply</span>}
                      >
                        Compose Reply
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<span className="material-symbols-outlined text-[16px]">gavel</span>}
                    >
                      Escalate to Decision Center
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      Forward
                    </Button>
                    <Button variant="danger" size="sm">
                      Quarantine Thread
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Reading View Modal / Drawer */}
      {isMobileDetailOpen && activeEmail && (
        <div className="fixed inset-0 z-50 xl:hidden bg-black/60 backdrop-blur-xs flex flex-col justify-end p-0 sm:p-4">
          <div className="bg-white w-full max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl p-6 space-y-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                  activeEmail.provider === "GMAIL" ? "bg-[#FFF1F2] text-[#E11D48]" : "bg-[#EFF6FF] text-[#2563EB]"
                }`}
              >
                {activeEmail.accountLabel} ({activeEmail.accountEmail})
              </span>
              <button
                onClick={() => setIsMobileDetailOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-bold"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-bold text-[#0F172A]">{activeEmail.subject}</h2>
              <div className="flex items-center gap-2 text-xs text-[#64748B]">
                <span className="font-bold text-[#0F172A]">{activeEmail.senderName}</span>
                <span>•</span>
                <span>{activeEmail.timestamp}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <PriorityBadge priority={activeEmail.priority} size="sm" />
              <IntentBadge intent={activeEmail.intent} size="sm" />
              <RiskBadge risk={activeEmail.risk} size="sm" />
            </div>

            {activeEmail.aiSummary && (
              <Card variant="ai">
                <p className="text-xs text-[#0F172A] font-medium leading-relaxed">
                  {activeEmail.aiSummary}
                </p>
              </Card>
            )}

            <div className="p-4 rounded-xl bg-[#F8FAFC] text-xs text-[#0F172A] whitespace-pre-line leading-relaxed">
              {activeEmail.body}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              {activeEmail.aiDraftAvailable ? (
                <Button variant="primary" fullWidth size="md">
                  Review AI Draft
                </Button>
              ) : (
                <Button variant="secondary" fullWidth size="md">
                  Compose Reply
                </Button>
              )}
              <Button variant="ghost" fullWidth size="md" onClick={() => setIsMobileDetailOpen(false)}>
                Back to Inbox List
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
