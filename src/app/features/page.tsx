"use client";

import * as React from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { ParticleCanvas } from "@/components/interactive/ParticleCanvas";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";
import { TiltCard } from "@/components/interactive/TiltCard";
import { MagneticButton } from "@/components/interactive/MagneticButton";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col font-sans text-white relative overflow-hidden selection:bg-[#f15e1c]/30">
      <ParticleCanvas particleCount={40} className="opacity-40" />
      <PublicHeader />

      <main className="flex-1 pt-24 relative z-10">
        {/* HERO */}
        <section className="py-20 sm:py-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#f15e1c]/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <ScrollReveal direction="down">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f15e1c]/10 border border-[#f15e1c]/30 text-xs font-bold uppercase tracking-widest text-[#f15e1c] glow-orange">
                <span className="w-2 h-2 rounded-full bg-[#f15e1c] animate-pulse" />
                Platform Capabilities & AI Architecture
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight max-w-4xl mx-auto">
                Engineered for <span className="bg-gradient-to-r from-[#f15e1c] via-[#fab60a] to-[#2e936f] bg-clip-text text-transparent">Precision Executive</span> Communication
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                ExecuAI combines multi-mailbox ingestion, 3-dimensional classification, forensic explainability, and an application-level Safety Gate to streamline high-volume inboxes safely.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* FEATURE MATRIX GRID */}
        <section className="py-16 sm:py-24 relative border-t border-slate-800/80">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            {/* Feature 1: Multi-Mailbox Sync */}
            <ScrollReveal direction="up">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#f7d7b0]/10 text-[#f15e1c] font-bold flex items-center justify-center border border-[#f15e1c]/30 glow-orange">
                    <span className="material-symbols-outlined text-[24px]">mark_email_unread</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-heading">
                    1. Multi-Mailbox Connection Hub
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Link multiple Gmail and Zoho mailboxes into one unified SaaS workspace using OAuth 2.0 PKCE authentication. Read and Draft permissions allow ExecuAI to sync and prepare responses without needing full password credentials or automated external send rights.
                  </p>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#2e936f]/20 text-[#2e936f] font-bold text-xs flex items-center justify-center border border-[#2e936f]/30">✓</span>
                      <span>Supports work Gmail, personal Gmail, and Zoho Mail accounts simultaneously.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#2e936f]/20 text-[#2e936f] font-bold text-xs flex items-center justify-center border border-[#2e936f]/30">✓</span>
                      <span>Every email retains provider, account ID, and thread origin markers.</span>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-6">
                  <TiltCard className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-4 glow-orange">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Connected Mailboxes Status</span>
                      <span className="text-xs font-bold text-[#2e936f] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#2e936f] animate-ping" />
                        Live OAuth Sync
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-[#f15e1c] text-white font-extrabold text-sm flex items-center justify-center shadow-md">G</span>
                        <div>
                          <div className="text-sm font-bold text-white">ceo@company.com</div>
                          <div className="text-[11px] text-slate-400">Google Workspace OAuth 2.0</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#2e936f]/20 border border-[#2e936f]/30 text-[#2e936f]">Connected</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-[#2e936f] text-white font-extrabold text-sm flex items-center justify-center shadow-md">Z</span>
                        <div>
                          <div className="text-sm font-bold text-white">board@vance.io</div>
                          <div className="text-[11px] text-slate-400">Zoho Mail OAuth 2.0</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#2e936f]/20 border border-[#2e936f]/30 text-[#2e936f]">Connected</span>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </ScrollReveal>

            {/* Feature 2: 3D Triage */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6 lg:order-2 space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#2e936f]/10 text-[#2e936f] font-bold flex items-center justify-center border border-[#2e936f]/30 glow-green">
                    <span className="material-symbols-outlined text-[24px]">filter_alt</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-heading">
                    2. 3-Dimensional Email Triage Engine
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Instead of combining email status into a single generic rating, ExecuAI analyzes every email across three non-overlapping dimensions: Priority Level, Intent Category, and Risk Gate.
                  </p>
                  <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-[#f15e1c]/30">
                      <div className="font-bold text-[#f15e1c] text-sm">Priority</div>
                      <div className="text-slate-400 text-xs mt-1">Critical / Urgent</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-[#2e936f]/30">
                      <div className="font-bold text-[#2e936f] text-sm">Intent</div>
                      <div className="text-slate-400 text-xs mt-1">Legal / Finance</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-[#fab60a]/30">
                      <div className="font-bold text-[#fab60a] text-sm">Risk Gate</div>
                      <div className="text-slate-400 text-xs mt-1">High Risk Gate</div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-6 lg:order-1">
                  <TiltCard className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-4">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sample Classified Payload</div>
                    <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">Elena Rostova (Apex Law)</span>
                        <span className="text-xs text-slate-500">14m ago</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Series B Definitive Agreements & IP Indemnity Clause Review...
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <span className="px-2.5 py-1 rounded-lg bg-[#f15e1c]/20 border border-[#f15e1c]/30 text-[#f15e1c] text-xs font-bold">Critical</span>
                        <span className="px-2.5 py-1 rounded-lg bg-[#2e936f]/20 border border-[#2e936f]/30 text-[#2e936f] text-xs font-bold">Legal</span>
                        <span className="px-2.5 py-1 rounded-lg bg-[#fab60a]/20 border border-[#fab60a]/30 text-[#fab60a] text-xs font-bold">High Risk Gate</span>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </ScrollReveal>

            {/* Feature 3: Safety Gate & Decision Center */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#fab60a]/10 text-[#fab60a] font-bold flex items-center justify-center border border-[#fab60a]/30">
                    <span className="material-symbols-outlined text-[24px]">gavel</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-heading">
                    3. Safety Gate & Executive Decision Center
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Financial commitments, contracts, quotations, legal notices, and HR matters automatically engage the Safety Gate. Autonomous sending is blocked, and the email is routed to the Decision Center where the executive reviews detected signals before approving.
                  </p>
                </div>
                <div className="lg:col-span-6">
                  <TiltCard className="p-8 rounded-3xl bg-slate-900/80 border border-[#f15e1c]/40 backdrop-blur-xl shadow-2xl space-y-4 glow-orange">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#f15e1c] uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-pulse" />
                        Safety Gate Engaged
                      </span>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#f15e1c] text-white">Blocked</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                      Extracted clause value: <strong className="text-[#fab60a]">₹50,00,000</strong>. Financial liability threshold exceeded. Autonomous reply blocked by Policy Rule #4.
                    </p>
                  </TiltCard>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-b from-[#090D16] to-[#04060A] text-white text-center border-t border-slate-800 relative">
          <div className="max-w-[1400px] mx-auto px-4 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight">Ready to Experience Executive Precision?</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
              Connect your mailboxes in minutes and see how ExecuAI transforms your daily email workflow.
            </p>
            <div className="pt-4 flex justify-center">
              <Link href="/onboarding">
                <MagneticButton className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#f15e1c] to-[#fab60a] text-white font-bold text-base shadow-xl hover:shadow-[#f15e1c]/25 transition-all">
                  Get Started Free
                </MagneticButton>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}

