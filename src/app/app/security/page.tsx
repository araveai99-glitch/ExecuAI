"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { IntentBadge } from "@/components/ui/IntentBadge";

export default function RiskAndSafetyPage() {
  // Selected Risk Filter Tab
  const [activeCategory, setActiveCategory] = React.useState<"ALL" | "SAFE" | "REVIEW" | "HIGH_RISK" | "CONFIDENTIAL">("HIGH_RISK");

  // High Risk Communication Screen Modal / Simulator State
  const [showHighRiskScreen, setShowHighRiskScreen] = React.useState(true);
  const [actionSuccessNotice, setActionSuccessNotice] = React.useState<string | null>(null);

  const triggerActionNotice = (msg: string) => {
    setActionSuccessNotice(msg);
    setTimeout(() => setActionSuccessNotice(null), 4000);
  };

  // Comprehensive Catalog of Monitored Risk Signals
  const riskSignals = [
    { name: "Financial amount", category: "High Risk", count: 18, desc: "Currency values, budget commitments, large sums", icon: "payments" },
    { name: "Payment request", category: "High Risk", count: 12, desc: "Invoices, wire transfers, billing mandates", icon: "receipt_long" },
    { name: "Quotation", category: "High Risk", count: 9, desc: "Commercial quotes, rate cards, pricing schedules", icon: "request_quote" },
    { name: "Pricing", category: "Review Required", count: 14, desc: "Discount requests, unit pricing changes", icon: "sell" },
    { name: "Contract", category: "High Risk", count: 11, desc: "MSA, SOW, definitive agreements, terms", icon: "gavel" },
    { name: "Agreement", category: "High Risk", count: 8, desc: "Binding assent requests, terms updates", icon: "handshake" },
    { name: "NDA", category: "Confidential", count: 6, desc: "Non-disclosure agreements, secrecy terms", icon: "folder_managed" },
    { name: "Legal notice", category: "High Risk", count: 4, desc: "Subpoenas, dispute claims, SLA outage penalties", icon: "balance" },
    { name: "Confidential information", category: "Confidential", count: 15, desc: "Trade secrets, acquisition targets, board notes", icon: "lock" },
    { name: "Approval request", category: "High Risk", count: 22, desc: "Explicit request for CEO/Executive sign-off", icon: "rule" },
    { name: "Negotiation", category: "Review Required", count: 10, desc: "Counter-offers, redline edits, term changes", icon: "forum" },
    { name: "HR-sensitive information", category: "Confidential", count: 7, desc: "Salaries, performance reviews, hiring pipelines", icon: "badge" },
    { name: "Password", category: "Confidential", count: 2, desc: "Plaintext passwords, credential leaks (Redacted)", icon: "key" },
    { name: "OTP", category: "Confidential", count: 5, desc: "One-time passwords, 2FA verification codes", icon: "pin" },
    { name: "Credentials", category: "Confidential", count: 3, desc: "API secret keys, cloud access tokens (Redacted)", icon: "password" },
  ];

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden pb-12">
      {/* Toast Notice */}
      {actionSuccessNotice && (
        <div className="p-4 rounded-xl bg-[#2E936F] text-white text-xs font-bold shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{actionSuccessNotice}</span>
          </div>
          <button onClick={() => setActionSuccessNotice(null)} className="text-white hover:opacity-80">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Top Header & Restrained Governance Disclaimer */}
      <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">Risk & Safety Governance</h1>
              <span className="bg-[#EFF4FF] text-[#2E936F] text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#79d9b0]/30">
                Zero-Trust Active
              </span>
              <span className="bg-[#FEF7E6] text-[#795600] text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#FDE68A]">
                ISO 42001 Audited
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Multi-layered communication risk classification, signal detection, and human approval barriers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowHighRiskScreen(true)}
              leftIcon={<span className="material-symbols-outlined text-[16px] text-[#E11D48]">warning</span>}
            >
              Simulate High-Risk Communication
            </Button>
            <Link href="/app/audit-log">
              <Button variant="ghost" size="sm" leftIcon={<span className="material-symbols-outlined text-[16px]">receipt_long</span>}>
                Cryptographic Audit Log
              </Button>
            </Link>
          </div>
        </div>

        {/* Responsible AI Disclaimer (No Claim of Infallibility) */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs space-y-1">
          <div className="flex items-center gap-2 text-[#0F172A] font-bold">
            <span className="material-symbols-outlined text-[18px] text-[#2E936F]">info</span>
            <span>ExecuAI Responsible Risk Disclaimer</span>
          </div>
          <p className="text-[#64748B] leading-relaxed">
            ExecuAI risk classification operates probabilistically to surface high-priority communications. The AI is <span className="font-semibold text-[#0F172A]">not infallible</span>. The platform is designed with a strict zero-trust posture: when high financial, legal, or sensitive signals are detected, autonomous sending is programmatically disabled and executive human judgment remains the sole authorizing authority.
          </p>
        </div>
      </section>

      {/* 4 Risk Categories Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Safe */}
        <div
          onClick={() => setActiveCategory("SAFE")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
            activeCategory === "SAFE"
              ? "bg-white border-[#2E936F] shadow-sm ring-1 ring-[#2E936F]"
              : "bg-white border-[#E2E8F0] hover:bg-[#F8FAFC]"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-xl bg-[#EFF4FF] text-[#2E936F] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </span>
            <span className="text-xs font-bold text-[#2E936F]">142 Emails</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Safe to Draft</h3>
            <p className="text-[11px] text-[#64748B] mt-0.5 leading-normal">
              Routine updates, scheduling, non-binding newsletters. AI drafts permitted.
            </p>
          </div>
        </div>

        {/* Review Required */}
        <div
          onClick={() => setActiveCategory("REVIEW")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
            activeCategory === "REVIEW"
              ? "bg-white border-[#FAB60A] shadow-sm ring-1 ring-[#FAB60A]"
              : "bg-white border-[#E2E8F0] hover:bg-[#F8FAFC]"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-xl bg-[#FEF7E6] text-[#795600] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">gavel</span>
            </span>
            <span className="text-xs font-bold text-[#795600]">24 Emails</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Review Required</h3>
            <p className="text-[11px] text-[#64748B] mt-0.5 leading-normal">
              Operational questions, pricing negotiations, partner requests. Executive review needed.
            </p>
          </div>
        </div>

        {/* High Risk */}
        <div
          onClick={() => setActiveCategory("HIGH_RISK")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
            activeCategory === "HIGH_RISK"
              ? "bg-white border-[#E11D48] shadow-sm ring-1 ring-[#E11D48]"
              : "bg-white border-[#E2E8F0] hover:bg-[#F8FAFC]"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-xl bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">security</span>
            </span>
            <span className="text-xs font-bold text-[#E11D48]">7 Critical</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">High Risk</h3>
            <p className="text-[11px] text-[#64748B] mt-0.5 leading-normal">
              Financial amounts, contracts, NDA, legal notices. Auto-reply programmatically blocked.
            </p>
          </div>
        </div>

        {/* Confidential */}
        <div
          onClick={() => setActiveCategory("CONFIDENTIAL")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
            activeCategory === "CONFIDENTIAL"
              ? "bg-white border-[#2563EB] shadow-sm ring-1 ring-[#2563EB]"
              : "bg-white border-[#E2E8F0] hover:bg-[#F8FAFC]"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">lock</span>
            </span>
            <span className="text-xs font-bold text-[#2563EB]">12 Isolated</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Confidential</h3>
            <p className="text-[11px] text-[#64748B] mt-0.5 leading-normal">
              HR sensitive data, acquisition notes, passwords, OTPs. Redacted & isolated.
            </p>
          </div>
        </div>
      </div>

      {/* Monitored Risk Signals Catalog */}
      <section className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2E936F]">radar</span>
              Monitored Risk Signals Catalog
            </h2>
            <p className="text-xs text-[#64748B]">15 semantic pattern detectors active across all connected inboxes</p>
          </div>
          <span className="text-xs font-bold text-[#2E936F] bg-[#EFF4FF] px-2.5 py-1 rounded-full border border-[#79d9b0]/30">
            Real-time Parsing Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {riskSignals.map((signal, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex items-start gap-3 hover:bg-white hover:shadow-2xs transition-all text-xs"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  signal.category === "High Risk"
                    ? "bg-[#FFF1F2] text-[#E11D48]"
                    : signal.category === "Confidential"
                    ? "bg-[#EFF6FF] text-[#2563EB]"
                    : "bg-[#FEF7E6] text-[#795600]"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{signal.icon}</span>
              </div>
              <div className="space-y-0.5 min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-bold text-[#0F172A] truncate">{signal.name}</h4>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-white border border-[#E2E8F0] text-[#64748B]">
                    {signal.count} detected
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B] leading-normal">{signal.desc}</p>
                <span
                  className={`inline-block mt-1 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                    signal.category === "High Risk"
                      ? "bg-[#FFF1F2] text-[#E11D48]"
                      : signal.category === "Confidential"
                      ? "bg-[#EFF6FF] text-[#2563EB]"
                      : "bg-[#FEF7E6] text-[#795600]"
                  }`}
                >
                  {signal.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEDICATED HIGH-RISK SCREEN MODAL (Fulfilling High-Risk Screen Spec) */}
      {showHighRiskScreen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 border border-[#FDA4AF] max-h-[90vh] overflow-y-auto">
            {/* Header Title Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center font-bold shrink-0 border border-[#FDA4AF]">
                  <span className="material-symbols-outlined text-[24px]">security</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">High-Risk Communication</h2>
                  <p className="text-xs text-[#E11D48] font-bold flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-ping" />
                    Automatic reply blocked. Executive review required.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowHighRiskScreen(false)}
                className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#0F172A] flex items-center justify-center font-bold hover:bg-[#E2E8F0]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Email Payload Context Card */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#64748B] font-medium">
                <span>From: Elena Rostova &lt;elena@apexlaw.com&gt;</span>
                <span className="font-bold text-[#2563EB]">Gmail #1 (ceo@company.com)</span>
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Series B Definitive Agreements & IP Indemnity Clause Review</h3>
              <p className="text-[#475569] line-clamp-2">
                "Section 14.2 contains an uncapped IP indemnity clause that transfers unlimited liability to our balance sheet. Please confirm if you would like me to redline this section immediately."
              </p>
            </div>

            {/* MANDATED 4 SECTIONS */}

            {/* Section 1: Why this was flagged */}
            <div className="p-4 rounded-xl bg-[#FFF1F2] border border-[#FDA4AF] space-y-2 text-xs">
              <h4 className="font-bold text-[#9F1239] uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">flag</span>
                1. Why this was flagged
              </h4>
              <p className="text-[#9F1239] font-medium leading-relaxed">
                This email was flagged as <span className="font-extrabold underline">High Risk</span> because it contains an uncapped legal indemnity clause ($10M investment exposure), requests formal CEO authorization, and involves an external legal correspondent.
              </p>
            </div>

            {/* Section 2: What signals were detected */}
            <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2 text-xs">
              <h4 className="font-bold text-[#0F172A] uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#FAB60A]">search</span>
                2. What signals were detected
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#E11D48]">gavel</span>
                  <div>
                    <p className="font-bold text-[#0F172A]">Contract & Indemnity</p>
                    <p className="text-[10px] text-[#64748B]">Section 14.2 uncapped liability</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#FAB60A]">payments</span>
                  <div>
                    <p className="font-bold text-[#0F172A]">Financial Amount</p>
                    <p className="text-[10px] text-[#64748B]">$10,000,000 exposure at stake</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#2563EB]">rate_review</span>
                  <div>
                    <p className="font-bold text-[#0F172A]">Approval Request</p>
                    <p className="text-[10px] text-[#64748B]">Formal CEO sign-off requested</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#2E936F]">verified_user</span>
                  <div>
                    <p className="font-bold text-[#0F172A]">External Sender</p>
                    <p className="text-[10px] text-[#64748B]">elena@apexlaw.com (Verified)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: What the system will block */}
            <div className="p-4 rounded-xl bg-[#FEF7E6] border border-[#FDE68A] space-y-2 text-xs">
              <h4 className="font-bold text-[#795600] uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">block</span>
                3. What the system will block
              </h4>
              <ul className="space-y-1.5 text-[#795600] font-medium pl-1">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#E11D48]">cancel</span>
                  <span><strong>Automatic reply blocked.</strong> No autonomous draft dispatch will occur.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#E11D48]">cancel</span>
                  <span>Direct LLM provider send API call execution suppressed.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#E11D48]">cancel</span>
                  <span>Unverifiable automated commitments prevented.</span>
                </li>
              </ul>
            </div>

            {/* Section 4: What the user must decide */}
            <div className="p-4 rounded-xl bg-[#EFF4FF] border border-[#79d9b0]/40 space-y-2 text-xs">
              <h4 className="font-bold text-[#2E936F] uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                4. What the user must decide
              </h4>
              <p className="text-[#0F172A] font-medium leading-relaxed">
                <span className="font-extrabold text-[#2E936F]">Executive review required.</span> As Chief Executive Officer, you must review the contract terms and decide whether to approve redlining, request revised terms from counsel, or ignore the communication.
              </p>
            </div>

            {/* MANDATED ACTIONS BAR */}
            <div className="pt-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                variant="danger"
                size="sm"
                fullWidth
                onClick={() => {
                  setShowHighRiskScreen(false);
                  triggerActionNotice("Communication set to Do Not Respond. Auto-reply suppressed.");
                }}
                leftIcon={<span className="material-symbols-outlined text-[16px]">block</span>}
              >
                Do Not Respond
              </Button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link href="/app/inbox/EMAIL-1001" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => setShowHighRiskScreen(false)}
                    leftIcon={<span className="material-symbols-outlined text-[16px]">visibility</span>}
                  >
                    Review Email
                  </Button>
                </Link>

                <Link href="/app/drafts/EMAIL-1001" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => setShowHighRiskScreen(false)}
                    leftIcon={<span className="material-symbols-outlined text-[18px]">edit_note</span>}
                  >
                    Create Draft
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
