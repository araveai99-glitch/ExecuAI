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
import { initialDecisionItems, initialTelemetryCounts } from "@/lib/data/mockExecuData";
import { DecisionItem } from "@/lib/types/execuai";

export default function DashboardPage() {
  const [loading, setLoading] = React.useState(false);
  const [errorState, setErrorState] = React.useState(false);
  const [decisions, setDecisions] = React.useState<DecisionItem[]>(initialDecisionItems);
  const [telemetry, setTelemetry] = React.useState(initialTelemetryCounts);

  const handleSimulateClear = () => {
    setDecisions([]);
    setTelemetry({ ...telemetry, critical: 0, urgent: 0, needReview: 0 });
  };

  const handleResetData = () => {
    setErrorState(false);
    setLoading(true);
    setTimeout(() => {
      setDecisions(initialDecisionItems);
      setTelemetry(initialTelemetryCounts);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header Greeting & Core Question ("What needs my attention right now?") */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFF2EC] text-[#F15E1C] border border-[#FDE8DF] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F15E1C] animate-pulse" />
              Executive Desk Telemetry
            </span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-xs text-[#475569] flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[14px] text-[#2E936F]">sync</span>
              Synced {telemetry.lastSyncedAgo} across {telemetry.totalSyncedAccounts} accounts
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-[#0F172A] tracking-tight">
            Good morning, Alexander.{" "}
            <span className="text-[#F15E1C]">
              {decisions.length > 0 ? `${decisions.length} consequential items` : "Zero pending items"}
            </span>{" "}
            need your executive attention right now.
          </h1>
        </div>

        {/* Demo State Simulators */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setLoading(!loading)}
            className="text-[11px] font-semibold text-[#475569] hover:text-[#0F172A] px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] cursor-pointer"
          >
            {loading ? "Stop Loading" : "Simulate Loading"}
          </button>
          <button
            onClick={() => setErrorState(!errorState)}
            className="text-[11px] font-semibold text-[#DC2626] hover:bg-[#FEF2F2] px-2.5 py-1 rounded-lg border border-[#FCA5A5] cursor-pointer"
          >
            {errorState ? "Clear Error" : "Simulate Error"}
          </button>
          {decisions.length > 0 ? (
            <button
              onClick={handleSimulateClear}
              className="text-[11px] font-semibold text-[#2E936F] hover:bg-[#E8F4F0] px-2.5 py-1 rounded-lg border border-[#2E936F]/30 cursor-pointer"
            >
              Simulate All Clear
            </button>
          ) : (
            <button
              onClick={handleResetData}
              className="text-[11px] font-semibold text-[#0F172A] hover:bg-[#FDF7F0] px-2.5 py-1 rounded-lg border border-[#CBD5E1] cursor-pointer"
            >
              Reset Data
            </button>
          )}
        </div>
      </div>

      {/* ERROR STATE */}
      {errorState ? (
        <ErrorState
          title="Gmail Authorization Expired"
          description="ExecuAI lost connection to Google Workspace account ceo@company.com. Reconnect through OAuth 2.0 to resume synchronization."
          actionLabel="Reconnect Gmail Account"
          onAction={handleResetData}
        />
      ) : loading ? (
        /* LOADING SKELETON STATE */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} variant="card" className="h-28" />
            ))}
          </div>
          <Skeleton variant="card" className="h-48" />
          <Skeleton variant="card" className="h-48" />
        </div>
      ) : (
        <>
          {/* Bento Telemetry Strip (Top Cards: Critical, Urgent, Need Review, Safe to Draft, Low Priority) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Critical */}
            <Card accentRailColor="danger" hoverable>
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Critical</span>
                <span className="px-2 py-0.5 rounded-full bg-[#FEF2F2] text-[#DC2626] text-[10px] font-bold">Urgent</span>
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-[#0F172A]">{telemetry.critical}</span>
                <span className="text-xs text-[#475569]">emails</span>
              </div>
              <div className="mt-2 text-xs font-semibold text-[#DC2626] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">priority_high</span>
                <span>Immediate legal action</span>
              </div>
            </Card>

            {/* Urgent */}
            <Card accentRailColor="warning" hoverable>
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Urgent</span>
                <span className="px-2 py-0.5 rounded-full bg-[#FFF2EC] text-[#F15E1C] text-[10px] font-bold">Priority</span>
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-[#0F172A]">{telemetry.urgent}</span>
                <span className="text-xs text-[#475569]">emails</span>
              </div>
              <div className="mt-2 text-xs font-semibold text-[#475569] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span>Requires review &lt; 2h</span>
              </div>
            </Card>

            {/* Need Review */}
            <Card accentRailColor="warning" hoverable>
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Need Review</span>
                <span className="px-2 py-0.5 rounded-full bg-[#FEF6E0] text-[#795600] text-[10px] font-bold">Action Needed</span>
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-[#0F172A]">{telemetry.needReview}</span>
                <span className="text-xs text-[#475569]">gated items</span>
              </div>
              <div className="mt-2 text-xs font-semibold text-[#795600] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">gavel</span>
                <span>Safety Gate barrier</span>
              </div>
            </Card>

            {/* Safe to Draft */}
            <Card accentRailColor="green" hoverable>
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Safe to Draft</span>
                <span className="px-2 py-0.5 rounded-full bg-[#E8F4F0] text-[#2E936F] text-[10px] font-bold">Ready</span>
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-[#0F172A]">{telemetry.safeToDraft}</span>
                <span className="text-xs text-[#475569]">drafts ready</span>
              </div>
              <div className="mt-2 text-xs font-semibold text-[#2E936F] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                <span>Zero risk threshold</span>
              </div>
            </Card>

            {/* Low Priority */}
            <Card accentRailColor="neutral" hoverable>
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Low Priority</span>
                <span className="px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569] text-[10px] font-bold">Silent</span>
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-[#475569]">{telemetry.lowPriority}</span>
                <span className="text-xs text-[#475569]">filtered</span>
              </div>
              <div className="mt-2 text-xs text-[#94A3B8] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">archive</span>
                <span>Auto-triaged noise</span>
              </div>
            </Card>
          </div>

          {/* QUICK ACTIONS SECTION */}
          <section className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              Executive Quick Actions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link href="/app/inbox">
                <Button variant="secondary" className="w-full justify-start text-xs font-bold" leftIcon={<span className="material-symbols-outlined text-[18px]">move_to_inbox</span>}>
                  View Inbox (48)
                </Button>
              </Link>
              <Link href="/app/drafts">
                <Button variant="secondary" className="w-full justify-start text-xs font-bold" leftIcon={<span className="material-symbols-outlined text-[18px]">edit_note</span>}>
                  Review Drafts (8)
                </Button>
              </Link>
              <Link href="/app/accounts">
                <Button variant="secondary" className="w-full justify-start text-xs font-bold" leftIcon={<span className="material-symbols-outlined text-[18px]">supervisor_account</span>}>
                  Manage Accounts (3)
                </Button>
              </Link>
              <Link href="/app/rules">
                <Button variant="secondary" className="w-full justify-start text-xs font-bold" leftIcon={<span className="material-symbols-outlined text-[18px]">policy</span>}>
                  Update Rules
                </Button>
              </Link>
            </div>
          </section>

          {/* DECISION CENTER SECTION */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FFF2EC] text-[#F15E1C] flex items-center justify-center border border-[#FDE8DF]">
                  <span className="material-symbols-outlined text-[20px]">gavel</span>
                </div>
                <div>
                  <h2 className="text-xl font-heading font-extrabold text-[#0F172A] tracking-tight">Decisions Waiting</h2>
                  <p className="text-xs text-[#475569]">Focus on consequential actions, not raw email volume</p>
                </div>
              </div>
              <Link href="/app/decisions">
                <Button variant="ghost" size="sm">
                  View Full Decision Center ({decisions.length}) →
                </Button>
              </Link>
            </div>

            {/* EMPTY STATE */}
            {decisions.length === 0 ? (
              <EmptyState
                title="You're all caught up."
                description="Zero pending decisions require executive clearance. ExecuAI Safety Engine is actively monitoring connected mailboxes."
                icon="verified"
                actionLabel="Reload Mock Data"
                onAction={handleResetData}
              />
            ) : (
              /* DECISION ITEMS STACK */
              <div className="space-y-4">
                {decisions.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm relative overflow-hidden space-y-4 hover:shadow-md transition-all"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#F15E1C]" />

                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="space-y-3 flex-1 min-w-0">
                        {/* Required Attribute Line: Account, Intent, Risk, Priority, Timestamp */}
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#F1F5F9] text-[#0F172A] font-bold">
                            <span className="w-4 h-4 rounded bg-white text-[10px] flex items-center justify-center font-bold">
                              {item.provider === "GMAIL" ? "G" : "Z"}
                            </span>
                            <span>{item.account}</span>
                          </div>
                          <IntentBadge intent={item.intent} />
                          <PriorityBadge priority={item.priority} />
                          <RiskBadge risk={item.risk} />
                          <span className="text-[#94A3B8] text-[11px] ml-auto lg:ml-2">Received {item.timestamp}</span>
                        </div>

                        {/* Subject & Sender */}
                        <div>
                          <div className="text-xs font-semibold text-[#475569]">
                            {item.sender.name} <span className="text-[#94A3B8]">({item.sender.role})</span>
                          </div>
                          <h3 className="text-lg font-bold text-[#0F172A] tracking-tight mt-0.5">
                            {item.subject}
                          </h3>
                        </div>

                        {/* AI Synthesis & Clause Excerpt */}
                        <Card variant="ai" className="p-4 space-y-2">
                          <div className="flex items-center justify-between pb-1 border-b border-[#FAB60A]/30">
                            <div className="flex items-center gap-2 text-[#795600] font-bold text-xs">
                              <span className="material-symbols-outlined text-[18px]">psychology</span>
                              <span>Executive AI Synthesis</span>
                            </div>
                            {item.exposure && (
                              <span className="text-[10px] font-bold text-[#F15E1C] bg-[#FFF2EC] px-2 py-0.5 rounded border border-[#FDE8DF]">
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

                      {/* Required Action Button */}
                      <div className="flex lg:flex-col items-center lg:items-stretch gap-2 shrink-0 pt-2 lg:pt-0">
                        <Link href="/app/decisions">
                          <Button
                            variant="primary"
                            size="md"
                            className="w-full"
                            leftIcon={<span className="material-symbols-outlined text-[18px]">verified_user</span>}
                          >
                            {item.requiredActionLabel}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

