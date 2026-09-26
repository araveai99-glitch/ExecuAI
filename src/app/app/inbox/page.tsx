"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { EmailCard } from "@/components/ui/EmailCard";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { IntentBadge } from "@/components/ui/IntentBadge";
import { Card } from "@/components/ui/Card";

export default function UnifiedInboxPage() {
  const [activeAccountTab, setActiveAccountTab] = React.useState("all");
  const [selectedThreadId, setSelectedThreadId] = React.useState("1");
  const [selectedPriority, setSelectedPriority] = React.useState("ALL");

  const threads = [
    {
      id: "1",
      provider: "GMAIL" as const,
      accountEmail: "ceo@company.com",
      senderName: "Elena Rostova",
      subject: "Series B Definitive Agreements & IP Indemnity Clause Review",
      snippet: "Please review clause 14.2 regarding third-party indemnities before tomorrow's board meeting...",
      timestamp: "10:42 AM",
      priority: "CRITICAL" as const,
      intent: "LEGAL" as const,
      risk: "HIGH_RISK" as const,
    },
    {
      id: "2",
      provider: "ZOHO" as const,
      accountEmail: "director@company.com",
      senderName: "Marcus Brody",
      subject: "Revised Enterprise Master Services Agreement & ₹50L Quotation Confirmation",
      snippet: "We have updated the pricing schedule in Schedule C reflecting the discussed terms...",
      timestamp: "10:15 AM",
      priority: "URGENT" as const,
      intent: "FINANCE" as const,
      risk: "HIGH_RISK" as const,
    },
    {
      id: "3",
      provider: "GMAIL" as const,
      accountEmail: "ceo@company.com",
      senderName: "Dr. Aris Thorne",
      subject: "Q3 Board Meeting Agenda & Governance Review",
      snippet: "Can we schedule a 30-min preparatory session on Tuesday morning? The governance committee...",
      timestamp: "09:30 AM",
      priority: "IMPORTANT" as const,
      intent: "MEETING" as const,
      risk: "SAFE" as const,
    },
  ];

  const selectedThread = threads.find((t) => t.id === selectedThreadId) || threads[0];

  return (
    <div className="space-y-6">
      {/* Top Command Matrix Header */}
      <section className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-[#E2E8F0] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">Unified Inbox</h1>
            <span className="bg-[#E5EEFF] text-[#0F172A] text-xs px-2.5 py-0.5 rounded-full font-bold">
              48 Pending Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF1F2] text-[#E11D48] text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse" />
              3 Critical Action Items
            </span>
          </div>

          <Tabs
            variant="segmented"
            activeTab={activeAccountTab}
            onChange={setActiveAccountTab}
            tabs={[
              { id: "all", label: "All Accounts", badge: "48" },
              { id: "gmail", label: "Gmail", badge: "34" },
              { id: "zoho", label: "Zoho", badge: "14" },
            ]}
          />
        </div>

        {/* Priority & Risk Filter Matrix */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#F8FAFC]">
          <div className="flex items-center gap-1 bg-[#F8FAFC] px-2 py-1 rounded-xl border border-[#E2E8F0] text-xs">
            <span className="text-[#94A3B8] font-bold uppercase tracking-wider text-[10px] pr-1">Priority:</span>
            <button
              onClick={() => setSelectedPriority("ALL")}
              className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                selectedPriority === "ALL" ? "bg-white text-[#0F172A] shadow-xs" : "text-[#475569]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedPriority("CRITICAL")}
              className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                selectedPriority === "CRITICAL" ? "bg-[#FFF1F2] text-[#E11D48]" : "text-[#E11D48]"
              }`}
            >
              Critical (3)
            </button>
            <button
              onClick={() => setSelectedPriority("URGENT")}
              className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                selectedPriority === "URGENT" ? "bg-[#FEF7E6] text-[#795600]" : "text-[#475569]"
              }`}
            >
              Urgent (5)
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Executive Action Bar */}
      <section className="bg-white/95 p-3 rounded-xl border border-[#E2E8F0] shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <input type="checkbox" defaultChecked className="w-4 h-4 text-[#2E936F] rounded accent-[#2E936F]" />
          <span className="font-semibold text-[#0F172A]">1 thread selected:</span>
          <span className="text-[#475569] font-medium truncate max-w-xs">{selectedThread.subject}</span>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <Button variant="primary" size="sm" leftIcon={<span className="material-symbols-outlined text-[16px]">auto_fix_high</span>}>
            Generate AI Draft
          </Button>
          <Button variant="secondary" size="sm" leftIcon={<span className="material-symbols-outlined text-[16px]">gavel</span>}>
            Move to Decision Center
          </Button>
          <Button variant="danger" size="sm" leftIcon={<span className="material-symbols-outlined text-[16px]">shield_person</span>}>
            Block Auto-Reply
          </Button>
        </div>
      </section>

      {/* 2-Pane Split Executive Workbench */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Master Stream (5 cols) */}
        <div className="xl:col-span-5 space-y-3">
          {threads.map((thread) => (
            <EmailCard
              key={thread.id}
              provider={thread.provider}
              accountEmail={thread.accountEmail}
              senderName={thread.senderName}
              subject={thread.subject}
              snippet={thread.snippet}
              timestamp={thread.timestamp}
              priority={thread.priority}
              intent={thread.intent}
              risk={thread.risk}
              isSelected={selectedThreadId === thread.id}
              onClick={() => setSelectedThreadId(thread.id)}
            />
          ))}
        </div>

        {/* Right Active Detail Pane (7 cols) */}
        <div className="xl:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#E5EEFF] text-[#0F172A] text-xs font-bold">
                  {selectedThread.provider === "GMAIL" ? "G" : "Z"}
                </span>
                <span className="text-xs text-[#475569] font-medium">{selectedThread.accountEmail}</span>
              </div>
              <span className="text-xs text-[#94A3B8]">{selectedThread.timestamp}</span>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0F172A]">{selectedThread.subject}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold text-[#0F172A]">{selectedThread.senderName}</span>
                <span className="text-xs text-[#94A3B8]">• DKIM & DMARC Valid</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] text-xs text-[#0F172A] leading-relaxed space-y-2">
              <p>Dear Alexander,</p>
              <p>{selectedThread.snippet}</p>
            </div>

            {/* AI Explainability Surface */}
            <Card variant="ai">
              <div className="flex items-center justify-between pb-2 border-b border-[#FAB60A]/30">
                <div className="flex items-center gap-2 text-[#795600] font-bold text-xs">
                  <span className="material-symbols-outlined text-[18px]">psychology</span>
                  <span>AI Forensic Explainability</span>
                </div>
                <RiskBadge risk={selectedThread.risk} />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
                <div className="p-2 bg-white rounded border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#94A3B8] font-bold block">PRIORITY</span>
                  <PriorityBadge priority={selectedThread.priority} />
                </div>
                <div className="p-2 bg-white rounded border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#94A3B8] font-bold block">INTENT</span>
                  <IntentBadge intent={selectedThread.intent} />
                </div>
                <div className="p-2 bg-white rounded border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#94A3B8] font-bold block">SAFETY GATE</span>
                  <span className="text-xs font-bold text-[#E11D48]">ENFORCED</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
