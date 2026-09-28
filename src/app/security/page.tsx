"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";

export default function SecurityPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const pillarVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A] overflow-x-hidden">
      <PublicHeader />

      <main id="main-content" className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
        <Breadcrumbs items={[{ label: "Security & Governance" }]} />

        {/* HERO HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F4F0] border border-[#2E936F]/30 text-xs font-bold uppercase tracking-widest text-[#2E936F]">
            <span className="w-2 h-2 rounded-full bg-[#2E936F] animate-pulse" />
            ISO 42001 & OAuth 2.0 Governance
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] font-heading tracking-tight leading-tight">
            Security Architecture & Safety Gate Protocol
          </h1>
          <p className="text-base text-[#475569] leading-relaxed">
            ExecuAI operates under a zero-trust model: AI prepares draft responses, but human executives retain 100% control over email execution.
          </p>
        </motion.div>

        {/* 4 SECURITY PILLARS GRID WITH HOVER ELEVATION */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div
            variants={pillarVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 relative"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFF2EC] text-[#F15E1C] font-bold flex items-center justify-center border border-[#F15E1C]/20 text-lg shadow-xs">
              <span className="material-symbols-outlined text-[22px]">gavel</span>
            </div>
            <h2 className="text-xl font-bold text-[#0F172A] font-heading">
              1. Deterministic Safety Gate Protocol
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Financial commitments above configured thresholds (e.g. ₹10 Lakhs), contracts, NDAs, legal notices, and corporate governance inquiries automatically lock autonomous transmission and route directly to your Decision Center.
            </p>
          </motion.div>

          <motion.div
            variants={pillarVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 relative"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E8F4F0] text-[#2E936F] font-bold flex items-center justify-center border border-[#2E936F]/20 text-lg shadow-xs">
              <span className="material-symbols-outlined text-[22px]">key</span>
            </div>
            <h2 className="text-xl font-bold text-[#0F172A] font-heading">
              2. OAuth 2.0 PKCE Token Isolation
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              You never enter or store Gmail or Zoho passwords on ExecuAI. Authentication uses official Google and Zoho OAuth 2.0 authorization with least-privilege Read & Draft scopes.
            </p>
          </motion.div>

          <motion.div
            variants={pillarVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 relative"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FEF6E0] text-[#FAB60A] font-bold flex items-center justify-center border border-[#FAB60A]/20 text-lg shadow-xs">
              <span className="material-symbols-outlined text-[22px]">database</span>
            </div>
            <h2 className="text-xl font-bold text-[#0F172A] font-heading">
              3. Zero AI Foundation Model Training
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Customer emails and metadata are strictly isolated per tenant using PostgreSQL Row Level Security (RLS). Your executive data is <strong>never</strong> used to train public LLM foundation models.
            </p>
          </motion.div>

          <motion.div
            variants={pillarVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 relative"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFF2EC] text-[#F15E1C] font-bold flex items-center justify-center border border-[#F15E1C]/20 text-lg shadow-xs">
              <span className="material-symbols-outlined text-[22px]">receipt_long</span>
            </div>
            <h2 className="text-xl font-bold text-[#0F172A] font-heading">
              4. Immutable Cryptographic Audit Logs
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Every email ingestion, 3D classification, Safety Gate trigger, draft edit, and executive dispatch action is recorded in an immutable audit log with cryptographic timestamps.
            </p>
          </motion.div>
        </motion.div>

        {/* SECURITY CONTACT BOX */}
        <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm text-center space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] font-heading">
            Need a Formal Enterprise Security Briefing?
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] max-w-lg mx-auto leading-relaxed">
            Our Security & Compliance team provides SOC 2 Type II reports, ISO 42001 documentation, and custom enterprise SLA review.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link href="/contact">
              <Button variant="primary" size="sm">
                Request Security Briefing →
              </Button>
            </Link>
            <Link href="/privacy">
              <Button variant="secondary" size="sm">
                Read Privacy Policy
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
