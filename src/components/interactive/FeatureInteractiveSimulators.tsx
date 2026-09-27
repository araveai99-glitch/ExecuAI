"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";
import { MagneticButton } from "./MagneticButton";

// 1. INTERACTIVE SAFETY GATE SIMULATOR
export function SafetyGateSimulator() {
  const [financialAmount, setFinancialAmount] = React.useState(5000000); // 50L default
  const [isContract, setIsContract] = React.useState(true);
  const [isConfidential, setIsConfidential] = React.useState(false);

  // Check if blocked by Safety Gate
  const isBlocked = financialAmount >= 1000000 || isContract || isConfidential;

  return (
    <TiltCard glowColor="orange" className="p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#f15e1c] animate-ping" />
          <h3 className="text-base font-bold text-[#0F172A] font-heading">
            Interactive Safety Gate Threshold Calculator
          </h3>
        </div>
        <span
          className={`text-xs font-extrabold px-3 py-1 rounded-full border transition-all ${
            isBlocked
              ? "bg-[#fff2ec] text-[#f15e1c] border-[#f15e1c]/30"
              : "bg-[#2e936f]/10 text-[#2e936f] border-[#2e936f]/30"
          }`}
        >
          {isBlocked ? "SAFETY GATE ENGAGED (BLOCKED)" : "SAFE TO AUTO-DRAFT"}
        </span>
      </div>

      <div className="space-y-5 text-xs">
        {/* Financial Amount Slider */}
        <div className="space-y-2">
          <div className="flex justify-between font-bold">
            <span className="text-[#0F172A]">Extracted Financial Exposure:</span>
            <span className="text-[#f15e1c] text-sm font-extrabold">
              ₹{(financialAmount / 100000).toFixed(1)} Lakhs ({financialAmount.toLocaleString("en-IN")})
            </span>
          </div>
          <input
            type="range"
            min="100000"
            max="10000000"
            step="500000"
            value={financialAmount}
            onChange={(e) => setFinancialAmount(Number(e.target.value))}
            className="w-full accent-[#f15e1c] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#94A3B8]">
            <span>₹1 Lakh (Low Risk)</span>
            <span>₹50 Lakhs (Executive Threshold)</span>
            <span>₹1 Crore (High Risk)</span>
          </div>
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => setIsContract(!isContract)}
            className={`p-3 rounded-xl border text-left font-bold transition-all cursor-pointer flex items-center justify-between ${
              isContract
                ? "bg-[#fff2ec] text-[#f15e1c] border-[#f15e1c]/40"
                : "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]"
            }`}
          >
            <span>Contains Contract / MSA Clause</span>
            <span className="material-symbols-outlined text-[18px]">
              {isContract ? "check_circle" : "cancel"}
            </span>
          </button>

          <button
            onClick={() => setIsConfidential(!isConfidential)}
            className={`p-3 rounded-xl border text-left font-bold transition-all cursor-pointer flex items-center justify-between ${
              isConfidential
                ? "bg-[#fff2ec] text-[#f15e1c] border-[#f15e1c]/40"
                : "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]"
            }`}
          >
            <span>Contains M&A / Secrecy Terms</span>
            <span className="material-symbols-outlined text-[18px]">
              {isConfidential ? "check_circle" : "cancel"}
            </span>
          </button>
        </div>

        {/* Live Policy Outcome Display */}
        <motion.div
          key={isBlocked ? "blocked" : "allowed"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border space-y-1.5 ${
            isBlocked
              ? "bg-[#fff2ec] border-[#f15e1c]/30 text-[#0F172A]"
              : "bg-[#2e936f]/10 border-[#2e936f]/30 text-[#0F172A]"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-extrabold uppercase text-[10px] tracking-wider text-[#f15e1c]">
              Policy Enforcement Action
            </span>
            <span className="text-[10px] font-bold text-[#64748B]">ISO 42001 Protocol</span>
          </div>
          <p className="text-xs font-semibold leading-relaxed">
            {isBlocked
              ? `Financial exposure of ₹${(financialAmount / 100000).toFixed(
                  1
                )}L exceeds safety cap (₹10L threshold). Autonomous send is strictly BLOCKED and routed to the Executive Decision Center.`
              : "Routine operational request. Safety Gate permits personalized AI response drafting for executive approval."}
          </p>
        </motion.div>
      </div>
    </TiltCard>
  );
}

// 2. INTERACTIVE 3D TRIAGE SIMULATOR
export function TriageMatrixSimulator() {
  const [activeTab, setActiveTab] = React.useState<"email1" | "email2" | "email3">("email1");

  const samples = {
    email1: {
      sender: "Elena Rostova (Apex Law)",
      subject: "Series B Definitive Agreements & IP Indemnity Clause Review",
      priority: "CRITICAL",
      intent: "LEGAL",
      risk: "HIGH_RISK",
      exposure: "₹1.5 Crores",
      summary: "High-consequence definitive legal contracts requiring binding indemnity signature.",
    },
    email2: {
      sender: "Alexander Vance (Board Member)",
      subject: "Q3 Board Presentation Draft & ESOP Option Pool Allocation",
      priority: "URGENT",
      intent: "INTERNAL",
      risk: "REVIEW_REQUIRED",
      exposure: "Governance",
      summary: "Urgent governance update for upcoming quarterly board director meeting.",
    },
    email3: {
      sender: "Accounts Payable (AWS Cloud Services)",
      subject: "Monthly Dedicated Cluster Infrastructure Statement - Aug 2026",
      priority: "NORMAL",
      intent: "FINANCE",
      risk: "SAFE",
      exposure: "Routine Receipt",
      summary: "Standard automated vendor billing receipt matching existing PO schedule.",
    },
  };

  const active = samples[activeTab];

  return (
    <TiltCard glowColor="green" className="p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <h3 className="text-base font-bold text-[#0F172A] font-heading">
          Interactive 3D Email Triage Matrix Simulator
        </h3>
        <span className="text-xs font-bold text-[#2e936f] bg-[#2e936f]/10 px-2.5 py-0.5 rounded-full border border-[#2e936f]/20">
          3-Dimensional Analysis
        </span>
      </div>

      <div className="space-y-4">
        {/* Sample Payload Tabs */}
        <div className="flex gap-2">
          {[
            { id: "email1", label: "Legal Contract (High Risk)" },
            { id: "email2", label: "Board Review (Urgent)" },
            { id: "email3", label: "Cloud Receipt (Safe)" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                activeTab === t.id
                  ? "bg-[#2e936f] text-white border-[#2e936f] shadow-xs"
                  : "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:bg-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Payload Detail */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4"
        >
          <div>
            <div className="text-[10px] font-extrabold uppercase text-[#94A3B8]">Inbound Email Payload</div>
            <div className="text-sm font-bold text-[#0F172A]">{active.sender}</div>
            <div className="text-xs text-[#475569]">{active.subject}</div>
          </div>

          {/* 3 Non-Overlapping Dimensions */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs pt-1">
            <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
              <div className="text-[10px] font-bold text-[#94A3B8] uppercase">Priority Level</div>
              <div className="font-extrabold text-[#f15e1c] text-sm mt-0.5">{active.priority}</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
              <div className="text-[10px] font-bold text-[#94A3B8] uppercase">Intent Category</div>
              <div className="font-extrabold text-[#2e936f] text-sm mt-0.5">{active.intent}</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
              <div className="text-[10px] font-bold text-[#94A3B8] uppercase">Risk Gate</div>
              <div className="font-extrabold text-[#fab60a] text-sm mt-0.5">{active.risk}</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] text-xs text-[#475569]">
            💡 <strong>AI Forensic Reason:</strong> {active.summary}
          </div>
        </motion.div>
      </div>
    </TiltCard>
  );
}

// 3. INTERACTIVE WRITING STYLE & VOICE TUNER SIMULATOR
export function VoiceTunerSimulator() {
  const [tone, setTone] = React.useState<"formal" | "concise" | "professional" | "authoritative">("formal");

  const previews = {
    formal:
      "Dear Elena,\n\nWe have thoroughly evaluated the Series B definitive agreements and IP indemnity clauses with legal counsel. We accept terms subject to paragraph 4.2 cap limits.\n\nBest regards,\nAlexander Vance",
    concise:
      "Elena — Series B agreements reviewed. Terms approved with paragraph 4.2 cap modification.\n\nThanks,\nAlexander",
    professional:
      "Hi Elena,\n\nThanks for sharing the Series B draft documents. Our team has reviewed the indemnity clauses and we are ready to move forward once paragraph 4.2 is confirmed.\n\nBest,\nAlexander Vance",
    authoritative:
      "Elena,\n\nThe proposed indemnity terms under clause 4.2 require strict liability caps before execution. Send revised executable docs.\n\nAlexander Vance\nCEO",
  };

  return (
    <TiltCard glowColor="yellow" className="p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
        <h3 className="text-base font-bold text-[#0F172A] font-heading">
          Executive Voice & Tone Synthesizer
        </h3>
        <span className="text-xs font-bold text-[#fab60a] bg-[#ffec69]/40 px-2.5 py-0.5 rounded-full border border-[#fab60a]/30 text-[#855d00]">
          Instant Preview
        </span>
      </div>

      <div className="space-y-4">
        {/* Tone Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: "formal", label: "Formal" },
            { id: "concise", label: "Concise" },
            { id: "professional", label: "Professional" },
            { id: "authoritative", label: "Authoritative" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTone(t.id as any)}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                tone === t.id
                  ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-xs"
                  : "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:bg-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Live AI Preview Display */}
        <motion.div
          key={tone}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-inner space-y-2"
        >
          <div className="flex items-center justify-between text-[10px] font-bold text-[#94A3B8] uppercase">
            <span>Synthesized Response Preview</span>
            <span className="text-[#2e936f]">87.1% Acceptance Match</span>
          </div>
          <pre className="text-xs text-[#0F172A] font-serif leading-relaxed whitespace-pre-wrap">
            {previews[tone]}
          </pre>
        </motion.div>
      </div>
    </TiltCard>
  );
}
