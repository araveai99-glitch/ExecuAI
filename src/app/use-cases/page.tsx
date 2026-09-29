"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { TiltCard } from "@/components/interactive/TiltCard";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";

export default function UseCasesPage() {
  const [activeTab, setActiveTab] = React.useState<string>("ceo-founders");

  const useCasesList = [
    {
      slug: "ceo-founders",
      role: "CEOs & Founders",
      icon: "engineering",
      headline: "Filter Out Noise & Protect CEO Focus Time",
      desc: "CEOs receive hundreds of daily emails across personal, investor, and corporate Gmail accounts. ExecuAI isolates urgent operational decisions while auto-drafting routine executive communications.",
      priority: "CRITICAL",
      intent: "INVESTOR",
      risk: "HIGH_RISK",
      exposure: "Equity / Governance",
      safetyAction: "Routed to Executive Decision Center for 1-click clearance.",
    },
    {
      slug: "cfo-finance",
      role: "CFOs & Finance Office",
      icon: "payments",
      headline: "Detect Financial Commitments & Wire Risk",
      desc: "Automatically flag invoices, purchase orders, and expenditure quotes exceeding your configured Safety Gate threshold (e.g. ₹10 Lakhs or $50,000).",
      priority: "URGENT",
      intent: "FINANCE",
      risk: "HIGH_RISK",
      exposure: "₹50,00,000 Commitment",
      safetyAction: "Autonomous send blocked; expenditure verification locked.",
    },
    {
      slug: "legal-counsel",
      role: "General Counsel & Legal",
      icon: "gavel",
      headline: "Enforce Indemnity & Contract Guardrails",
      desc: "Detect incoming MSAs, NDAs, IP indemnities, and litigation notices before reply drafts are dispatched.",
      priority: "CRITICAL",
      intent: "LEGAL",
      risk: "HIGH_RISK",
      exposure: "Indemnity Cap Required",
      safetyAction: "Draft synthesized with clause 14.2 cap modification.",
    },
    {
      slug: "board-directors",
      role: "Venture Directors & Board",
      icon: "account_balance",
      headline: "Unify Subsidiary & Board Mailboxes",
      desc: "Directors serving on multiple boards can connect multiple subsidiary Gmail and Zoho accounts into a single decision stream.",
      priority: "URGENT",
      intent: "GOVERNANCE",
      risk: "REVIEW_REQUIRED",
      exposure: "Board Approval",
      safetyAction: "Prepared for executive review & batch approval.",
    },
    {
      slug: "sales-growth",
      role: "Sales & Growth Leaders",
      icon: "trending_up",
      headline: "Accelerate Enterprise Deal Cycles",
      desc: "Sales executives manage complex enterprise pipelines where buyer questions, pricing approvals, and executive introductions require immediate response.",
      priority: "URGENT",
      intent: "SALES",
      risk: "REVIEW_REQUIRED",
      exposure: "₹50L Pipeline Deal",
      safetyAction: "Commercial pricing extracted and verified against discount limits.",
    },
    {
      slug: "operations-support",
      role: "VP Operations & Client Support",
      icon: "support_agent",
      headline: "Manage Client Escalations & Outage Claims",
      desc: "Operations leaders handle critical client escalations, SLA outage rebate claims, and service credit requests.",
      priority: "CRITICAL",
      intent: "CLIENT",
      risk: "REVIEW_REQUIRED",
      exposure: "₹24.5L Penalty Claim",
      safetyAction: "Client SLA claim isolated. Strategic draft generated offering 5% service credit.",
    },
  ];

  const active = useCasesList.find((u) => u.slug === activeTab) || useCasesList[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A] overflow-x-hidden">
      <PublicHeader />

      <main id="main-content" className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        <Breadcrumbs items={[{ label: "Executive Use Cases" }]} />

        {/* HEADER */}
        <ScrollReveal variant="fade-up" className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF2EC] border border-[#F15E1C]/30 text-xs font-bold uppercase tracking-widest text-[#F15E1C]">
            <span className="w-2 h-2 rounded-full bg-[#F15E1C] animate-pulse" />
            Tailored Executive Scenarios
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] font-heading tracking-tight leading-tight">
            Executive Use Cases & Operational Workflows
          </h1>
          <p className="text-base text-[#475569] leading-relaxed">
            Select your leadership role below to explore real email payloads, 3D classification, and Safety Gate policy outcomes.
          </p>
        </ScrollReveal>

        {/* ROLE SELECTION TABS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {useCasesList.map((item) => {
            const isSelected = activeTab === item.slug;
            return (
              <motion.button
                key={item.slug}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(item.slug)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? "bg-white border-[#F15E1C] ring-2 ring-[#F15E1C]/30 shadow-md"
                    : "bg-white/80 border-[#E2E8F0] hover:border-[#F15E1C]/40 hover:bg-white"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-base transition-colors ${
                    isSelected ? "bg-[#F15E1C] text-white" : "bg-[#F8FAFC] text-[#64748B]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                </div>
                <div className="text-xs font-bold text-[#0F172A] font-heading line-clamp-1">
                  {item.role}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ACTIVE SCENARIO PREVIEW CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E2E8F0] shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-extrabold text-[#F15E1C] uppercase tracking-wider bg-[#FFF2EC] px-3 py-1 rounded-full border border-[#F15E1C]/30">
                {active.role} Scenario
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-heading">
                {active.headline}
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                {active.desc}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link href={`/use-cases/${active.slug}`}>
                  <MagneticButton variant="primary" size="md">
                    Explore Dedicated {active.role} Page →
                  </MagneticButton>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2 text-xs">
                <span className="font-bold text-[#94A3B8] uppercase tracking-wider">Inbound Payload Simulation</span>
                <span className="font-bold text-[#F15E1C]">Safety Gate Active</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2 text-xs shadow-2xs">
                <div className="font-bold text-[#0F172A]">Sample Email Payload</div>
                <p className="text-[#475569]">{active.headline}</p>
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
          </motion.div>
        </AnimatePresence>

        {/* ALL 6 USE CASES GRID (Each card links directly to dedicated route) */}
        <section className="space-y-8 pt-8 border-t border-[#E2E8F0]">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E936F]">Explore All Scenarios</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] font-heading">
              Dedicated Executive Workflows
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCasesList.map((uc) => (
              <TiltCard key={uc.slug} glowColor="orange" className="p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF2EC] text-[#F15E1C] flex items-center justify-center text-xl font-bold">
                    <span className="material-symbols-outlined text-[22px]">{uc.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] font-heading">{uc.role}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed line-clamp-3">{uc.desc}</p>
                </div>

                <div className="pt-2">
                  <Link href={`/use-cases/${uc.slug}`} className="block w-full">
                    <Button variant="secondary" size="sm" className="w-full justify-between">
                      <span>View Use Case Page</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Button>
                  </Link>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
