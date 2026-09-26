"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { IntentBadge } from "@/components/ui/IntentBadge";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Greeting & Telemetry */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFF1F2] text-[#E11D48] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse" />
              Action Required
            </span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-xs text-[#475569] flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[14px] text-[#2E936F]">sync</span>
              Synced 2m ago across 3 accounts
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Good morning, Alexander. <span className="text-[#2E936F]">4 consequential items</span> need your executive attention.
          </h1>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button variant="secondary" size="md" leftIcon={<span className="material-symbols-outlined text-[18px]">tune</span>}>
            Triage Filter
          </Button>
          <Link href="/app/drafts">
            <Button variant="primary" size="md" leftIcon={<span className="material-symbols-outlined text-[18px]">bolt</span>}>
              Fast-Track Safe Drafts (8)
            </Button>
          </Link>
        </div>
      </div>

      {/* Bento Telemetry Strip (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Critical */}
        <Card accentRailColor="danger" hoverable>
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Critical Queue</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFF1F2] text-[#E11D48] text-[10px] font-bold">Urgent</span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#0F172A]">3</span>
            <span className="text-xs text-[#475569]">emails</span>
          </div>
          <div className="mt-2 text-xs font-semibold text-[#E11D48] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">priority_high</span>
            <span>Immediate legal & SLA action</span>
          </div>
        </Card>

        {/* Urgent */}
        <Card accentRailColor="warning" hoverable>
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Urgent Queue</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FEF7E6] text-[#795600] text-[10px] font-bold">Priority</span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#0F172A]">5</span>
            <span className="text-xs text-[#475569]">emails</span>
          </div>
          <div className="mt-2 text-xs font-semibold text-[#475569] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            <span>Requires review &lt; 2 hours</span>
          </div>
        </Card>

        {/* Need Review */}
        <Card accentRailColor="warning" hoverable>
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Need Review</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FEF7E6] text-[#795600] text-[10px] font-bold">Action Needed</span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#0F172A]">4</span>
            <span className="text-xs text-[#475569]">gated items</span>
          </div>
          <div className="mt-2 text-xs font-semibold text-[#795600] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">gavel</span>
            <span>Human-in-the-loop barrier</span>
          </div>
        </Card>

        {/* Safe to Draft */}
        <Card accentRailColor="primary" hoverable>
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Safe to Draft</span>
            <span className="px-2 py-0.5 rounded-full bg-[#EFF4FF] text-[#2E936F] text-[10px] font-bold">Ready</span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#0F172A]">8</span>
            <span className="text-xs text-[#475569]">drafts ready</span>
          </div>
          <div className="mt-2 text-xs font-semibold text-[#2E936F] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span>Zero risk thresholds met</span>
          </div>
        </Card>

        {/* Auto-Triaged */}
        <Card accentRailColor="neutral" hoverable>
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Auto-Triaged</span>
            <span className="px-2 py-0.5 rounded-full bg-[#E5EEFF] text-[#475569] text-[10px] font-bold">Silent</span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#475569]">42</span>
            <span className="text-xs text-[#475569]">filtered</span>
          </div>
          <div className="mt-2 text-xs text-[#94A3B8] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">archive</span>
            <span>Newsletters, receipts, logs</span>
          </div>
        </Card>
      </div>

      {/* Decision Center Hero Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#EFF4FF] text-[#2E936F] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">gavel</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">Decisions Waiting</h2>
              <p className="text-xs text-[#475569]">High-stakes corporate commitments requiring explicit human authorization</p>
            </div>
          </div>
          <Link href="/app/decisions">
            <Button variant="ghost" size="sm">
              View All Decisions (4) →
            </Button>
          </Link>
        </div>

        {/* Featured Decision Card 1 */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm relative overflow-hidden space-y-4">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E11D48]" />

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="space-y-3 flex-1 min-w-0">
              {/* Meta Tags */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#E5EEFF] font-bold text-[#0F172A]">
                  <span className="w-4 h-4 rounded bg-white text-[10px] flex items-center justify-center font-bold">G</span>
                  <span>ceo@company.com</span>
                </div>
                <IntentBadge intent="LEGAL" />
                <PriorityBadge priority="CRITICAL" />
                <RiskBadge risk="HIGH_RISK" />
                <span className="text-[#94A3B8] text-[11px] ml-auto lg:ml-2">14m ago</span>
              </div>

              {/* Subject & Sender */}
              <div>
                <div className="text-xs font-semibold text-[#475569]">
                  Elena Rostova <span className="text-[#94A3B8]">(General Counsel, Apex Law Group)</span>
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] tracking-tight mt-0.5">
                  Series B Definitive Agreements & IP Indemnity Clause Review
                </h3>
              </div>

              {/* AI Forensic Synthesis */}
              <Card variant="ai" className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-[#795600] font-bold text-xs uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">psychology</span>
                  <span>Executive AI Synthesis</span>
                </div>
                <p className="text-xs text-[#0F172A] leading-relaxed">
                  Contains binding contractual indemnity obligations and requests formal CEO authorization.{" "}
                  <mark className="bg-[#FFEC69]/50 px-1 rounded font-semibold text-[#0F172A]">
                    Unlimited liability exposure flagged
                  </mark>{" "}
                  under Section 14.3. Automatic draft generation has been programmatically blocked.
                </p>
              </Card>
            </div>

            {/* Action */}
            <div className="flex lg:flex-col items-center lg:items-stretch gap-2 shrink-0">
              <Link href="/app/decisions">
                <Button variant="primary" size="md" leftIcon={<span className="material-symbols-outlined text-[18px]">verified_user</span>}>
                  Review Decision
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
