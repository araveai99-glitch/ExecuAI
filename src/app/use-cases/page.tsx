"use client";

import * as React from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";

export default function UseCasesPage() {
  const [activeTab, setActiveTab] = React.useState<"ceo" | "cfo" | "legal" | "board">("ceo");

  const useCases = {
    ceo: {
      role: "CEOs & Founders",
      icon: "engineering",
      headline: "Filter Out Noise & Protect Focus Time",
      desc: "CEOs receive hundreds of daily emails across personal, investor, and corporate Gmail accounts. ExecuAI isolates urgent operational decisions while auto-drafting routine responses.",
      sampleSender: "Investor Relations (Sequoia APAC)",
      sampleSubject: "Series B Term Sheet Confirmation & Board Allocation",
      priority: "CRITICAL",
      intent: "INVESTOR",
      risk: "HIGH_RISK",
      exposure: "Equity / Governance",
      safetyAction: "Routed to Executive Decision Center for 1-click clearance.",
    },
    cfo: {
      role: "CFOs & Finance Office",
      icon: "payments",
      headline: "Detect Financial Commitments & Wire Risk",
      desc: "Automatically flag invoices, purchase orders, and expenditure quotes exceeding your configured Safety Gate threshold (e.g. ₹10 Lakhs or $50,000).",
      sampleSender: "AWS Cloud Infrastructure Accounts",
      sampleSubject: "Annual Reserved Instance Invoice & ₹50L Renewal",
      priority: "URGENT",
      intent: "FINANCE",
      risk: "HIGH_RISK",
      exposure: "₹50,00,000 Commitment",
      safetyAction: "Autonomous send blocked; expenditure verification locked.",
    },
    legal: {
      role: "General Counsel & Legal",
      icon: "gavel",
      headline: "Enforce Indemnity & Contract Guardrails",
      desc: "Detect incoming MSAs, NDAs, IP indemnities, and litigation notices before reply drafts are dispatched.",
      sampleSender: "Apex Law Partners (General Counsel)",
      sampleSubject: "Definitive Master Services Agreement Clause 14.2",
      priority: "CRITICAL",
      intent: "LEGAL",
      risk: "HIGH_RISK",
      exposure: "Indemnity Cap Required",
      safetyAction: "Draft synthesized with clause 14.2 cap modification.",
    },
    board: {
      role: "Venture Directors & Board",
      icon: "account_balance",
      headline: "Unify Subsidiary & Subsidiary Zoho Mailboxes",
      desc: "Directors serving on multiple boards can connect multiple subsidiary Zoho Mail accounts into a single decision stream.",
      sampleSender: "Portfolio Operations (Vance Capital)",
      sampleSubject: "Q3 Quarterly Governance Audit & ESOP Grant Review",
      priority: "URGENT",
      intent: "GOVERNANCE",
      risk: "REVIEW_REQUIRED",
      exposure: "Board Approval",
      safetyAction: "Prepared for executive review & batch approval.",
    },
  };

  const active = useCases[activeTab];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <PublicHeader />

      <main id="main-content" className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
        <Breadcrumbs items={[{ label: "Executive Use Cases" }]} />

        {/* HEADER */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF2EC] border border-[#F15E1C]/30 text-xs font-bold uppercase tracking-widest text-[#F15E1C]">
            <span className="w-2 h-2 rounded-full bg-[#F15E1C] animate-pulse" />
            Tailored Executive Scenarios
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] font-heading tracking-tight">
            How Executive Roles Use ExecuAI
          </h1>
          <p className="text-base text-[#475569] leading-relaxed">
            Select your leadership role below to explore real email payloads, 3D classification, and Safety Gate policy outcomes.
          </p>
        </div>

        {/* ROLE TABS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(Object.keys(useCases) as Array<keyof typeof useCases>).map((key) => {
            const item = useCases[key];
            const isSelected = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? "bg-white border-[#F15E1C] ring-2 ring-[#F15E1C]/20 shadow-md"
                    : "bg-white/60 border-[#E2E8F0] hover:border-[#F15E1C]/40"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${
                    isSelected ? "bg-[#F15E1C] text-white" : "bg-[#F8FAFC] text-[#64748B]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A] font-heading">
                    {item.role}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE SCENARIO CARD */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-extrabold text-[#F15E1C] uppercase tracking-wider bg-[#FFF2EC] px-3 py-1 rounded-full border border-[#F15E1C]/30">
              {active.role} Scenario
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-heading">
              {active.headline}
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed">
              {active.desc}
            </p>
            <div className="pt-2">
              <Link href="/onboarding">
                <Button variant="primary" size="sm">
                  Get Started for {active.role} →
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2 text-xs">
              <span className="font-bold text-[#94A3B8] uppercase tracking-wider">Inbound Email Payload</span>
              <span className="font-bold text-[#F15E1C]">Safety Gate Active</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2 text-xs">
              <div className="font-bold text-[#0F172A]">{active.sampleSender}</div>
              <p className="text-[#475569]">{active.sampleSubject}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded bg-[#FFF2EC] text-[#F15E1C] font-extrabold text-[10px]">{active.priority}</span>
                <span className="px-2 py-0.5 rounded bg-[#E8F4F0] text-[#2E936F] font-extrabold text-[10px]">{active.intent}</span>
                <span className="px-2 py-0.5 rounded bg-[#FEF6E0] text-[#855D00] font-extrabold text-[10px]">{active.risk}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFF2EC] border border-[#F15E1C]/30 text-xs text-[#0F172A] space-y-1">
              <div className="font-bold text-[#F15E1C]">Policy Outcome:</div>
              <p className="text-[11px] text-[#475569]">{active.safetyAction}</p>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
