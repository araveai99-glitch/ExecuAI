"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = React.useState<number>(1);

  const steps = [
    {
      id: 1,
      num: "01",
      title: "Connect Accounts",
      subtitle: "OAuth 2.0 PKCE Least Privilege",
      desc: "Link Gmail and Zoho Mail accounts securely using provider OAuth 2.0. No passwords are stored; ExecuAI uses read & draft tokens.",
      icon: "hub",
      previewTitle: "Mailbox Connection Matrix",
      previewDetail: "2 Gmail Accounts + 1 Zoho Account Synchronized",
      badge: "OAuth PKCE Active",
      badgeColor: "bg-[#E8F4F0] text-[#2E936F]",
    },
    {
      id: 2,
      num: "02",
      title: "3D Ingestion & Triage",
      subtitle: "Multi-Axis Signal Extraction",
      desc: "Incoming emails are classified across Priority (Critical/Urgent), Intent (Legal/Finance), and Risk Gate (High/Low Exposure).",
      icon: "filter_alt",
      previewTitle: "3D Matrix Classification",
      previewDetail: "Legal Contract → High Risk Gate Detected",
      badge: "ISO 42001 Classification",
      badgeColor: "bg-[#FFF2EC] text-[#F15E1C]",
    },
    {
      id: 3,
      num: "03",
      title: "Safety Gate Lockdown",
      subtitle: "Deterministic Policy Verification",
      desc: "Financial commitments >₹10L, contracts, or M&A terms engage the Safety Gate. Autonomous sending is programmatically locked.",
      icon: "gavel",
      previewTitle: "Safety Gate Policy Lock",
      previewDetail: "Exposure ₹50,00,000 exceeds safety threshold → routed to Decision Center",
      badge: "Autonomous Send Blocked",
      badgeColor: "bg-[#FEF6E0] text-[#855D00]",
    },
    {
      id: 4,
      num: "04",
      title: "Executive Decision & Dispatch",
      subtitle: "Human-in-the-Loop Approval",
      desc: "Review synthesized AI drafts in your tone, edit paragraph clauses if needed, and grant 1-click execution to send from your origin mailbox.",
      icon: "task_alt",
      previewTitle: "Executive Dispatch Studio",
      previewDetail: "Draft approved by Executive → Sent via Gmail OAuth",
      badge: "Executive Cleared",
      badgeColor: "bg-[#E8F4F0] text-[#2E936F]",
    },
  ];

  const current = steps.find((s) => s.id === activeStep) || steps[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A] overflow-x-hidden">
      <PublicHeader />

      <main id="main-content" className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
        <Breadcrumbs items={[{ label: "How It Works" }]} />

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF2EC] border border-[#F15E1C]/30 text-xs font-bold uppercase tracking-widest text-[#F15E1C]">
            <span className="w-2 h-2 rounded-full bg-[#F15E1C] animate-pulse" />
            4-Step Executive Workflow
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] font-heading tracking-tight leading-tight">
            How ExecuAI Triages & Governs Inboxes
          </h1>
          <p className="text-base text-[#475569] leading-relaxed">
            Click any step below to see how ExecuAI transforms incoming email chaos into clear executive decisions.
          </p>
        </motion.div>

        {/* STEP PROGRESSION BAR & CONNECTING LINE */}
        <div className="relative space-y-4">
          {/* Animated Connecting Line Indicator */}
          <div className="hidden sm:block absolute top-1/2 left-8 right-8 h-1 bg-[#E2E8F0] -translate-y-1/2 z-0 rounded-full">
            <motion.div
              className="h-full bg-[#F15E1C] rounded-full"
              initial={{ width: "25%" }}
              animate={{ width: `${(activeStep / steps.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>

          {/* STEP NAVIGATION CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
            {steps.map((s) => {
              const isActive = activeStep === s.id;
              return (
                <motion.button
                  key={s.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(s.id)}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isActive
                      ? "bg-white border-[#F15E1C] ring-2 ring-[#F15E1C]/30 shadow-lg"
                      : "bg-white/80 border-[#E2E8F0] hover:border-[#F15E1C]/40 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-extrabold px-2.5 py-1 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#F15E1C] text-white"
                          : "bg-[#F8FAFC] text-[#64748B]"
                      }`}
                    >
                      {s.num}
                    </span>
                    <motion.span
                      animate={isActive ? { rotate: [0, -10, 10, 0] } : {}}
                      transition={{ duration: 0.3 }}
                      className={`material-symbols-outlined text-[24px] ${
                        isActive ? "text-[#F15E1C]" : "text-[#94A3B8]"
                      }`}
                    >
                      {s.icon}
                    </motion.span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0F172A] font-heading">
                      {s.title}
                    </div>
                    <div className="text-[11px] text-[#64748B] truncate">
                      {s.subtitle}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE STEP INTERACTIVE WORKFLOW PREVIEW WITH TRANSITION */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E2E8F0] shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-[#F15E1C] bg-[#FFF2EC] px-3 py-1 rounded-full border border-[#F15E1C]/30">
                  Step {current.num} of 04
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${current.badgeColor}`}>
                  {current.badge}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-heading">
                {current.title}
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                {current.desc}
              </p>
              <div className="pt-2">
                <Link href="/onboarding">
                  <Button variant="primary" size="sm">
                    Try This Workflow Live →
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                  {current.previewTitle}
                </span>
                <span className="material-symbols-outlined text-[18px] text-[#2E936F]">
                  verified
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
                <div className="text-xs font-bold text-[#0F172A]">
                  {current.previewDetail}
                </div>
                <p className="text-[11px] text-[#64748B]">
                  Automated Safety Gate check executed. Policy enforcement rules verified against ISO 42001 governance specs.
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <PublicFooter />
    </div>
  );
}
