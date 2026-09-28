"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";

export default function FeaturesPage() {
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A] overflow-x-hidden">
      <PublicHeader />

      <main id="main-content" className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
        <Breadcrumbs items={[{ label: "Features & Capabilities" }]} />

        {/* HERO HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF2EC] border border-[#F15E1C]/30 text-xs font-bold uppercase tracking-widest text-[#F15E1C]">
            <span className="w-2 h-2 rounded-full bg-[#F15E1C] animate-pulse" />
            Platform Capabilities & AI Architecture
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] font-heading tracking-tight leading-tight">
            Engineered for Precision Executive Communication
          </h1>
          <p className="text-base text-[#475569] leading-relaxed">
            ExecuAI combines multi-mailbox ingestion, 3-dimensional classification, forensic explainability, and an application-level Safety Gate to streamline high-volume inboxes safely.
          </p>
        </motion.div>

        {/* FEATURE MATRIX LIST WITH STAGGERED REVEAL & 3D TILT EFFECT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Feature 1: Multi-Mailbox Sync */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.005 }}
            onHoverStart={() => setHoveredCard(1)}
            onHoverEnd={() => setHoveredCard(null)}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden"
          >
            <div className="lg:col-span-7 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFF2EC] text-[#F15E1C] font-bold flex items-center justify-center border border-[#F15E1C]/20 text-lg shadow-xs">
                01
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A] font-heading">
                Multi-Mailbox Connection Hub
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                Link multiple Gmail and Zoho mailboxes into one unified SaaS workspace using OAuth 2.0 PKCE authentication. Read and Draft permissions allow ExecuAI to sync and prepare responses without needing full password credentials or automated external send rights.
              </p>
              <ul className="space-y-2 text-xs text-[#334155] font-semibold">
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E8F4F0] text-[#2E936F] font-bold flex items-center justify-center text-[10px]">✓</span>
                  <span>Supports work Gmail, personal Gmail, and Zoho Mail accounts simultaneously.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E8F4F0] text-[#2E936F] font-bold flex items-center justify-center text-[10px]">✓</span>
                  <span>Every email retains provider, account ID, and thread origin markers.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Mailbox Sync Status</span>
                <span className="text-xs font-bold text-[#2E936F] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2E936F] animate-ping" />
                  Live OAuth
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#F15E1C] text-white font-bold text-xs flex items-center justify-center">G</span>
                  <div>
                    <div className="text-xs font-bold text-[#0F172A]">Gmail Work Account</div>
                    <div className="text-[10px] text-[#64748B]">Google Workspace OAuth</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E8F4F0] text-[#2E936F]">Connected</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#2E936F] text-white font-bold text-xs flex items-center justify-center">Z</span>
                  <div>
                    <div className="text-xs font-bold text-[#0F172A]">Zoho Enterprise Account</div>
                    <div className="text-[10px] text-[#64748B]">Zoho Mail OAuth</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E8F4F0] text-[#2E936F]">Connected</span>
              </div>
            </div>
          </motion.div>

          {/* Feature 2: 3D Triage */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.005 }}
            onHoverStart={() => setHoveredCard(2)}
            onHoverEnd={() => setHoveredCard(null)}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden"
          >
            <div className="lg:col-span-7 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8F4F0] text-[#2E936F] font-bold flex items-center justify-center border border-[#2E936F]/20 text-lg shadow-xs">
                02
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A] font-heading">
                3-Dimensional Email Triage Engine
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                Instead of combining email status into a single generic rating, ExecuAI analyzes every email across three non-overlapping dimensions: Priority Level, Intent Category, and Risk Gate.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-[#FFF2EC] border border-[#F15E1C]/30 font-bold text-[#F15E1C] shadow-2xs">
                  Priority Level
                </div>
                <div className="p-3 rounded-xl bg-[#E8F4F0] border border-[#2E936F]/30 font-bold text-[#2E936F] shadow-2xs">
                  Intent Category
                </div>
                <div className="p-3 rounded-xl bg-[#FEF6E0] border border-[#FAB60A]/30 font-bold text-[#855D00] shadow-2xs">
                  Risk Gate
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <div className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Sample Classified Ingestion</div>
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2 text-xs shadow-2xs">
                <div className="font-bold text-[#0F172A]">General Counsel Counsel</div>
                <p className="text-[#64748B]">Series B Definitive Agreements & IP Indemnity Clause Review...</p>
                <div className="flex gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-[#FFF2EC] text-[#F15E1C] font-extrabold text-[10px]">Critical</span>
                  <span className="px-2 py-0.5 rounded bg-[#E8F4F0] text-[#2E936F] font-extrabold text-[10px]">Legal</span>
                  <span className="px-2 py-0.5 rounded bg-[#FEF6E0] text-[#855D00] font-extrabold text-[10px]">High Risk Gate</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 3: Safety Gate Protocol */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.005 }}
            onHoverStart={() => setHoveredCard(3)}
            onHoverEnd={() => setHoveredCard(null)}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden"
          >
            <div className="lg:col-span-7 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#FEF6E0] text-[#FAB60A] font-bold flex items-center justify-center border border-[#FAB60A]/30 text-lg shadow-xs">
                03
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A] font-heading">
                Safety Gate & Decision Center
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                Financial commitments, contracts, quotations, legal notices, and HR matters automatically engage the Safety Gate. Autonomous sending is blocked, and the email is routed to the Decision Center where the executive reviews detected signals before approving.
              </p>
            </div>

            <div className="lg:col-span-5 p-5 rounded-2xl bg-[#FFF2EC] border border-[#F15E1C]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#F15E1C] uppercase tracking-wider">Safety Gate Protocol</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-[#F15E1C] text-white">Blocked</span>
              </div>
              <p className="text-xs text-[#0F172A] leading-relaxed font-semibold">
                Extracted clause exposure: <strong>₹50,00,000</strong>. Financial liability threshold exceeded (₹10L limit). Autonomous send locked; routed to Executive Decision Center.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* BOTTOM CTA */}
        <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] text-center space-y-4 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-heading">
            Ready to Connect Your Mailboxes?
          </h2>
          <p className="text-sm text-[#475569] max-w-md mx-auto">
            Experience clean multi-mailbox triage and human-in-the-loop executive safety gates today.
          </p>
          <div className="pt-2 flex justify-center">
            <Link href="/onboarding">
              <Button variant="primary" size="lg">
                Get Started Free →
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
