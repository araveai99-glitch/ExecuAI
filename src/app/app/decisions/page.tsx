"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { IntentBadge } from "@/components/ui/IntentBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import { initialDecisionItems } from "@/lib/data/mockExecuData";
import { DecisionItem } from "@/lib/types/execuai";

export default function DecisionCenterPage() {
  const [loading, setLoading] = React.useState(false);
  const [errorState, setErrorState] = React.useState(false);
  const [filterRisk, setFilterRisk] = React.useState<string>("ALL");
  const [decisions, setDecisions] = React.useState<DecisionItem[]>(initialDecisionItems);

  const filteredDecisions = decisions.filter((d) => {
    if (filterRisk === "ALL") return true;
    return d.risk === filterRisk;
  });

  const handleSimulateClear = () => {
    setDecisions([]);
  };

  const handleResetData = () => {
    setErrorState(false);
    setLoading(true);
    setTimeout(() => {
      setDecisions(initialDecisionItems);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-8">
      {/* Header Block with ISO Protocol Notice */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#fff2ec] text-[#f15e1c] border border-[#f15e1c]/20 text-[11px] font-bold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f15e1c] animate-pulse" />
              SAFETY GATE SYSTEM ACTIVE
            </span>
            <span className="text-[11px] font-semibold text-[#94A3B8]">
              ISO/IEC 42001 GOVERNED PROTOCOL
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-heading">
            Decision Center <span className="text-[#94A3B8] font-normal text-lg sm:text-xl">— Consequential Actions Awaiting Executive Decision</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#475569]">
            ExecuAI Policy Engine has isolated communications requiring binding business, legal, or financial authorization. Autonomous sending is strictly disabled.
          </p>
        </div>

        {/* State Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setLoading(!loading)}
            className="text-[11px] font-semibold text-[#475569] hover:text-[#0F172A] px-2 py-1 rounded bg-[#F8FAFC] border border-[#E2E8F0]"
          >
            {loading ? "Stop Loading" : "Simulate Loading"}
          </button>
          <button
            onClick={() => setErrorState(!errorState)}
            className="text-[11px] font-semibold text-[#f15e1c] hover:bg-[#fff2ec] px-2 py-1 rounded border border-[#f15e1c]/30"
          >
            {errorState ? "Clear Error" : "Simulate Error"}
          </button>
          {decisions.length > 0 ? (
            <button
              onClick={handleSimulateClear}
              className="text-[11px] font-semibold text-[#2e936f] hover:bg-[#2e936f]/10 px-2 py-1 rounded border border-[#2e936f]/30"
            >
              Simulate All Clear
            </button>
          ) : (
            <button
              onClick={handleResetData}
              className="text-[11px] font-semibold text-[#0F172A] hover:bg-[#F8FAFC] px-2 py-1 rounded border border-[#CBD5E1]"
            >
              Reset Data
            </button>
          )}
        </div>
      </div>

      {/* ERROR STATE */}
      {errorState ? (
        <ErrorState
          title="Decision Queue Synchronization Failure"
          description="Failed to verify safety gate nonces for connected mailboxes. Network connection timed out."
          actionLabel="Retry Queue Sync"
          onAction={handleResetData}
        />
      ) : loading ? (
        /* LOADING SKELETON STATE */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} variant="card" className="h-28" />
            ))}
          </div>
          <Skeleton variant="card" className="h-56" />
          <Skeleton variant="card" className="h-56" />
        </div>
      ) : (
        <>
          {/* Bento Stat Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card accentRailColor="danger">
              <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Decisions Pending</span>
              <div className="text-3xl font-bold text-[#0F172A] mt-1">{decisions.length}</div>
              <span className="text-xs text-[#f15e1c] font-semibold block mt-1">Autonomous Sends Blocked</span>
            </Card>

            <Card accentRailColor="primary">
              <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Financial Exposure Protected</span>
              <div className="text-2xl font-bold text-[#0F172A] mt-1">₹74,50,000</div>
              <span className="text-xs text-[#475569] block mt-1">Across 2 contractual milestones</span>
            </Card>

            <Card accentRailColor="warning">
              <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Legal / Contractual Reviews</span>
              <div className="text-3xl font-bold text-[#0F172A] mt-1">2</div>
              <span className="text-xs text-[#855d00] font-semibold block mt-1">High Consequence Items</span>
            </Card>

            <Card accentRailColor="neutral">
              <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Average Human Turnaround</span>
              <div className="text-3xl font-bold text-[#0F172A] mt-1">18m</div>
              <span className="text-xs text-[#2e936f] font-semibold block mt-1">Target SLA &lt; 45 minutes</span>
            </Card>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#E2E8F0]">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-[#94A3B8] uppercase text-[10px]">Filter Risk Gate:</span>
              {["ALL", "HIGH_RISK", "REVIEW_REQUIRED", "CONFIDENTIAL", "SAFE"].map((r) => (
                <button
                  key={r}
                  onClick={() => setFilterRisk(r)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                    filterRisk === r ? "bg-[#0F172A] text-white" : "text-[#475569] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {r.replace("_", " ")}
                </button>
              ))}
            </div>

            <span className="text-xs text-[#475569] font-medium">
              Showing {filteredDecisions.length} of {decisions.length} decisions
            </span>
          </div>

          {/* EMPTY STATE */}
          {filteredDecisions.length === 0 ? (
            <EmptyState
              title="You're all caught up."
              description="No pending decisions require your attention under this risk filter. All high-stakes communications are verified."
              icon="verified"
              actionLabel="Show All Decisions"
              onAction={() => {
                setFilterRisk("ALL");
                if (decisions.length === 0) handleResetData();
              }}
            />
          ) : (
            /* DECISION CARDS LIST */
            <div className="space-y-6">
              {filteredDecisions.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm relative overflow-hidden space-y-4 hover:shadow-md transition-all"
                >
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                      item.risk === "HIGH_RISK" ? "bg-[#f15e1c]" : (item.risk === "REVIEW_REQUIRED" || item.risk === "REVIEW") ? "bg-[#fab60a]" : "bg-[#2e936f]"
                    }`}
                  />

                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="space-y-3 flex-1 min-w-0">
                      {/* Meta Line: Required Attributes (Account, Intent, Priority, Risk, Timestamp) */}
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#f7d7b0]/40 text-[#0F172A] font-bold border border-[#f7d7b0]">
                          <span className="w-4 h-4 rounded bg-white text-[10px] flex items-center justify-center font-bold">
                            {item.provider === "GMAIL" ? "G" : "Z"}
                          </span>
                          <span>{item.account}</span>
                        </div>
                        <IntentBadge intent={item.intent} />
                        <PriorityBadge priority={item.priority} />
                        <RiskBadge risk={item.risk} />
                        <span className="text-[#94A3B8] text-[11px] ml-auto lg:ml-2">
                          Received {item.timestamp}
                        </span>
                      </div>

                      {/* Subject & Sender */}
                      <div>
                        <h3 className="text-xl font-bold text-[#0F172A] tracking-tight font-heading">{item.subject}</h3>
                        <div className="text-xs font-semibold text-[#475569] mt-0.5">
                          {item.sender.name} <span className="text-[#94A3B8]">({item.sender.role} &lt;{item.sender.email}&gt;)</span>
                        </div>
                      </div>

                      {/* AI Forensic Synthesis */}
                      <Card variant="ai" className="p-4 space-y-2">
                        <div className="flex items-center justify-between pb-1 border-b border-[#fab60a]/30">
                          <div className="flex items-center gap-2 text-[#855d00] font-bold text-xs">
                            <span className="material-symbols-outlined text-[18px]">psychology</span>
                            <span>ExecuAI Autonomous Forensic Analysis</span>
                          </div>
                          {item.exposure && (
                            <span className="text-[10px] font-bold text-[#f15e1c] bg-[#fff2ec] px-2 py-0.5 rounded border border-[#f15e1c]/20">
                              Exposure: {item.exposure}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#0F172A] leading-relaxed">{item.synthesis}</p>
                        {item.clauseExcerpt && (
                          <div className="p-2 bg-white rounded border border-[#E2E8F0] text-[11px] font-mono text-[#0F172A]">
                            📄 {item.clauseExcerpt}
                          </div>
                        )}
                      </Card>
                    </div>

                    {/* Action Cluster with Primary Action CTA */}
                    <div className="flex lg:flex-col items-center lg:items-stretch gap-2 shrink-0 pt-2 lg:pt-0">
                      <Link href="/app/drafts">
                        <Button
                          variant="primary"
                          size="md"
                          className="w-full"
                          leftIcon={<span className="material-symbols-outlined text-[18px]">verified_user</span>}
                        >
                          {item.requiredActionLabel}
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
          )}
        </>
      )}
    </div>
  );
}
