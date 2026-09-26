"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { IntentBadge } from "@/components/ui/IntentBadge";

export default function DecisionCenterPage() {
  const decisions = [
    {
      id: "1",
      title: "Series B Definitive Agreements & IP Indemnity Clause Review",
      sender: "Elena Rostova (General Counsel, Apex Law Group)",
      account: "ceo@company.com",
      provider: "GMAIL" as const,
      priority: "CRITICAL" as const,
      intent: "LEGAL" as const,
      risk: "HIGH_RISK" as const,
      time: "14m ago",
      why: "Contains binding contractual indemnity obligations and requests formal CEO authorization. Unlimited liability exposure flagged under Section 14.3.",
      excerpt: "Detected Clause § 14.3(b) — Series_B_Definitive_Draft_v4.pdf (Liability Cap: Omitted)",
      exposure: "Uncapped Liability",
    },
    {
      id: "2",
      title: "Revised Enterprise Master Services Agreement & ₹50L Quotation Confirmation",
      sender: "Marcus Brody (Managing Director, Nordic Enterprises APAC)",
      account: "director@company.com",
      provider: "ZOHO" as const,
      priority: "URGENT" as const,
      intent: "FINANCE" as const,
      risk: "HIGH_RISK" as const,
      time: "30m ago",
      why: "Extracted commercial licensing amount of ₹50,00,000 ($60k equiv). Exceeds single-executive auto-authorization threshold of ₹10,00,000.",
      excerpt: "Schedule C § 8.2 — Nordic_MSA_RevB_ExecutedDraft.pdf (Rate Assent Required)",
      exposure: "₹50,00,000",
    },
    {
      id: "3",
      title: "Client SLA Escalation & Warranty Penalty Claim",
      sender: "Sarah Jenkins (VP Ops, Apex Global)",
      account: "ceo@company.com",
      provider: "GMAIL" as const,
      priority: "CRITICAL" as const,
      intent: "CLIENT" as const,
      risk: "REVIEW_REQUIRED" as const,
      time: "1h ago",
      why: "Client requests formal CEO commitment on 15% SLA rebate penalty due to Q2 downtime incident.",
      excerpt: "SLA Claim Ref #AC-9901 — Contractual Penalty Assent Requested",
      exposure: "₹24,50,000",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Block with ISO Protocol Notice */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF1F2] text-[#E11D48] text-[11px] font-bold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse" />
              SAFETY GATE SYSTEM ACTIVE
            </span>
            <span className="text-[11px] font-semibold text-[#94A3B8]">
              ISO/IEC 42001 GOVERNED PROTOCOL
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Decision Center <span className="text-[#94A3B8] font-normal text-lg sm:text-xl">— Consequential Actions Awaiting Executive Clearance</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#475569]">
            ExecuAI Policy Engine has isolated communications requiring binding business, legal, or financial authorization. Autonomous sending is strictly disabled.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-[#EFF4FF] px-3 py-1.5 rounded-lg flex items-center gap-2 border border-[#79d9b0]/30 text-xs text-[#2E936F] font-bold">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>Autonomous Guard: Enforced</span>
          </div>
        </div>
      </div>

      {/* Bento Stat Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card accentRailColor="danger">
          <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Decisions Pending</span>
          <div className="text-3xl font-bold text-[#0F172A] mt-1">4</div>
          <span className="text-xs text-[#E11D48] font-semibold block mt-1">All Autonomous Sends Blocked</span>
        </Card>

        <Card accentRailColor="primary">
          <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Financial Exposure Protected</span>
          <div className="text-2xl font-bold text-[#0F172A] mt-1">₹74,50,000</div>
          <span className="text-xs text-[#475569] block mt-1">Across 2 contractual milestones</span>
        </Card>

        <Card accentRailColor="warning">
          <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Legal / Contractual Reviews</span>
          <div className="text-3xl font-bold text-[#0F172A] mt-1">2</div>
          <span className="text-xs text-[#795600] font-semibold block mt-1">High Consequence Items</span>
        </Card>

        <Card accentRailColor="neutral">
          <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Average Human Turnaround</span>
          <div className="text-3xl font-bold text-[#0F172A] mt-1">18m</div>
          <span className="text-xs text-[#2E936F] font-semibold block mt-1">Target SLA &lt; 45 minutes</span>
        </Card>
      </div>

      {/* Decision Cards List */}
      <div className="space-y-6">
        {decisions.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm relative overflow-hidden space-y-4 hover:shadow-md transition-all"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E11D48]" />

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="space-y-3 flex-1 min-w-0">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <PriorityBadge priority={item.priority} />
                  <IntentBadge intent={item.intent} />
                  <RiskBadge risk={item.risk} />
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#E5EEFF] text-[#0F172A] font-bold">
                    <span className="w-4 h-4 rounded bg-white text-[10px] flex items-center justify-center font-bold">
                      {item.provider === "GMAIL" ? "G" : "Z"}
                    </span>
                    <span>{item.account}</span>
                  </div>
                  <span className="text-[#94A3B8] text-[11px] ml-auto lg:ml-2">Received {item.time}</span>
                </div>

                {/* Title & Sender */}
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] tracking-tight">{item.title}</h3>
                  <div className="text-xs font-semibold text-[#475569] mt-0.5">{item.sender}</div>
                </div>

                {/* Forensic Analysis Module */}
                <Card variant="ai" className="p-4 space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-[#FAB60A]/30">
                    <div className="flex items-center gap-2 text-[#795600] font-bold text-xs">
                      <span className="material-symbols-outlined text-[18px]">psychology</span>
                      <span>ExecuAI Autonomous Forensic Analysis</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#E11D48] bg-[#FFF1F2] px-2 py-0.5 rounded">
                      Exposure: {item.exposure}
                    </span>
                  </div>
                  <p className="text-xs text-[#0F172A] leading-relaxed">{item.why}</p>
                  <div className="p-2 bg-white rounded border border-[#E2E8F0] text-[11px] font-mono text-[#0F172A]">
                    📄 {item.excerpt}
                  </div>
                </Card>
              </div>

              {/* Action Cluster */}
              <div className="flex lg:flex-col items-center lg:items-stretch gap-2 shrink-0 pt-2 lg:pt-0">
                <Link href="/app/drafts">
                  <Button variant="primary" size="md" className="w-full" leftIcon={<span className="material-symbols-outlined text-[18px]">verified_user</span>}>
                    Review & Clearance
                  </Button>
                </Link>
                <Button variant="secondary" size="sm" className="w-full">
                  Delegate Redline
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
