"use client";

import * as React from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Button } from "@/components/ui/Button";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <PublicHeader />

      <main className="flex-1 pt-16">
        {/* HERO */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
              Platform Capabilities
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Engineered for Precision Executive Communication
            </h1>
            <p className="text-sm sm:text-base text-[#475569] max-w-2xl mx-auto">
              ExecuAI combines multi-mailbox ingestion, 3-dimensional classification, forensic explainability, and an application-level Safety Gate to streamline high-volume inboxes safely.
            </p>
          </div>
        </section>

        {/* FEATURE MATRIX GRID */}
        <section className="py-16 sm:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* Feature 1: Multi-Mailbox Sync */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#EFF4FF] text-[#2E936F] font-bold flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">mark_email_unread</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                  1. Multi-Mailbox Connection Hub
                </h2>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Link multiple Gmail and Zoho mailboxes into one unified SaaS workspace using OAuth 2.0 PKCE authentication. Read and Draft permissions allow ExecuAI to sync and prepare responses without needing full password credentials or automated external send rights.
                </p>
                <ul className="space-y-2 text-xs text-[#0F172A] font-medium">
                  <li className="flex items-center gap-2">
                    <span className="text-[#2E936F] font-bold">✓</span>
                    <span>Supports work Gmail, personal Gmail, and Zoho Mail accounts simultaneously.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#2E936F] font-bold">✓</span>
                    <span>Every email retains provider, account ID, and thread origin markers.</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Connected Mailboxes Status</div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#EA4335] text-white font-bold text-xs flex items-center justify-center">G</span>
                    <span className="text-xs font-bold text-[#0F172A]">ceo@company.com</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EFF4FF] text-[#2E936F]">Connected</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#226BBA] text-white font-bold text-xs flex items-center justify-center">Z</span>
                    <span className="text-xs font-bold text-[#0F172A]">board@vance.io</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EFF4FF] text-[#2E936F]">Connected</span>
                </div>
              </div>
            </div>

            {/* Feature 2: 3D Triage */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 lg:order-2 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#EFF4FF] text-[#2E936F] font-bold flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">filter_alt</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                  2. 3-Dimensional Email Triage
                </h2>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Instead of combining email status into a single generic rating, ExecuAI analyzes every email across three non-overlapping dimensions: Priority Level, Intent Category, and Risk Gate.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                  <div className="p-3 rounded-xl bg-white border border-[#E2E8F0]">
                    <div className="font-bold text-[#E11D48]">Priority</div>
                    <div className="text-[11px] text-[#475569] mt-0.5">Critical / Urgent</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E2E8F0]">
                    <div className="font-bold text-[#0F172A]">Intent</div>
                    <div className="text-[11px] text-[#475569] mt-0.5">Legal / Finance</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E2E8F0]">
                    <div className="font-bold text-[#795600]">Risk Gate</div>
                    <div className="text-[11px] text-[#475569] mt-0.5">High Risk Gate</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 lg:order-1 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-3">
                <div className="text-xs font-bold text-[#0F172A]">Sample Classified Payload</div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0F172A]">Elena Rostova (Apex Law)</span>
                    <span className="text-[#94A3B8]">14m ago</span>
                  </div>
                  <p className="text-[#475569]">Series B Definitive Agreements & IP Indemnity Clause Review...</p>
                  <div className="flex gap-2 pt-1">
                    <span className="px-2 py-0.5 rounded bg-[#FFF1F2] text-[#E11D48] text-[10px] font-bold">Critical</span>
                    <span className="px-2 py-0.5 rounded bg-[#E5EEFF] text-[#0F172A] text-[10px] font-bold">Legal</span>
                    <span className="px-2 py-0.5 rounded bg-[#FEF7E6] text-[#795600] text-[10px] font-bold">High Risk</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: Safety Gate & Decision Center */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#FFF1F2] text-[#E11D48] font-bold flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">gavel</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                  3. Safety Gate & Executive Decision Center
                </h2>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Financial commitments, contracts, quotations, legal notices, and HR matters automatically engage the Safety Gate. Autonomous sending is blocked, and the email is routed to the Decision Center where the executive reviews detected signals before approving.
                </p>
              </div>
              <div className="lg:col-span-6 p-6 rounded-2xl bg-[#FFF1F2] border border-[#FECDD3] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E11D48] uppercase tracking-wider">Safety Gate Active</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E11D48] text-white">Blocked</span>
                </div>
                <p className="text-xs text-[#0F172A]">
                  Extracted clause value: <strong>₹50,00,000</strong>. Financial liability threshold exceeded. Autonomous reply blocked by Policy Rule #4.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#0F172A] text-white text-center">
          <div className="max-w-[1400px] mx-auto px-4 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-bold">Ready to Experience Executive Precision?</h2>
            <div className="pt-2">
              <Link href="/onboarding">
                <Button variant="primary" size="lg">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
