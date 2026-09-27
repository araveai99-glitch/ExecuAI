"use client";

import * as React from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { ParticleCanvas } from "@/components/interactive/ParticleCanvas";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";
import { TiltCard } from "@/components/interactive/TiltCard";
import { MagneticButton } from "@/components/interactive/MagneticButton";

export default function UseCasesPage() {
  const useCases = [
    {
      role: "Founders & CEOs",
      badge: "Multiple Accounts + Investor Relations",
      title: "Managing Board Updates, Financing Terms & Client Escalations",
      problem: "CEOs manage corporate Gmail, investor Gmail, and subsidiary Zoho accounts. High-priority investor updates get buried under routine vendor receipts and newsletters.",
      solution: "ExecuAI aggregates all mailboxes into one Decision Center. Safe routine replies receive auto-drafts, while Series B term sheets and client escalations are flagged as Critical.",
    },
    {
      role: "General Counsel & Legal Partners",
      badge: "Risk Engine + Contract Redlines",
      title: "Protecting Against Uncapped Liabilities & Binding Commitments",
      problem: "Legal counsel receives contracts, NDAs, and agreements via email. A wrong reply or accidental assent can trigger enforceable contractual liabilities.",
      solution: "ExecuAI Safety Gate automatically scans for terms like 'irrevocably agrees' or 'indemnify'. Automatic replies are strictly blocked, routing the document for human redline review.",
    },
    {
      role: "CFOs & Finance Directors",
      badge: "Financial Commitment Thresholds",
      title: "Reviewing Quotations, Invoice Approvals & Payment Schedules",
      problem: "Finance leaders receive large quotations (e.g. ₹50L+), purchase orders, and wire requests mixed with low-priority vendor inquiries.",
      solution: "ExecuAI extracts financial figures. Amounts exceeding single-executive threshold rules require explicit clearance in the Decision Center before invoice credentials release.",
    },
    {
      role: "Managing Directors & Agency Leaders",
      badge: "High-Volume Triage + Team Delegation",
      title: "Sorting Client Requests Without Surrendering Inbox Control",
      problem: "Managing directors spend 3+ hours daily reading and triaging client emails, writing repetitive acknowledgements.",
      solution: "ExecuAI auto-triages routine meeting requests and status updates into safe drafts, cutting triage time by 75% while keeping final send authority under human control.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col font-sans text-white relative overflow-hidden selection:bg-[#f15e1c]/30">
      <ParticleCanvas particleCount={35} className="opacity-30" />
      <PublicHeader />

      <main className="flex-1 pt-24 relative z-10">
        {/* HERO */}
        <section className="py-20 sm:py-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#fab60a]/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <ScrollReveal direction="down">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fab60a]/10 border border-[#fab60a]/30 text-xs font-bold uppercase tracking-widest text-[#fab60a]">
                <span className="w-2 h-2 rounded-full bg-[#fab60a] animate-pulse" />
                Real-World Executive Scenarios
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight max-w-4xl mx-auto">
                Tailored Solutions for <span className="bg-gradient-to-r from-[#fab60a] via-[#f15e1c] to-[#2e936f] bg-clip-text text-transparent">Senior Leadership</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Discover how ExecuAI protects time and enforces governance across distinct corporate roles.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* USE CASES CARDS */}
        <section className="py-16 sm:py-24 border-t border-slate-800/80">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {useCases.map((uc, idx) => (
                <ScrollReveal key={uc.role} delay={idx * 0.1} direction="up">
                  <TiltCard className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-6 flex flex-col justify-between hover:border-[#f15e1c]/40 transition-all h-full">
                    <div className="space-y-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#f15e1c]/15 border border-[#f15e1c]/30 text-[#f15e1c] text-xs font-bold uppercase tracking-wider">
                        {uc.badge}
                      </span>
                      <h3 className="text-2xl font-bold text-white font-heading">{uc.title}</h3>
                      
                      <div className="p-4 rounded-2xl bg-slate-950/80 border border-[#f15e1c]/30 text-xs space-y-1">
                        <span className="font-bold uppercase tracking-wider text-[#f15e1c]">The Challenge:</span>
                        <p className="text-slate-300 leading-relaxed">{uc.problem}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-950/80 border border-[#2e936f]/30 text-xs space-y-1">
                        <span className="font-bold uppercase tracking-wider text-[#2e936f]">ExecuAI Solution:</span>
                        <p className="text-slate-300 leading-relaxed">{uc.solution}</p>
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-b from-[#090D16] to-[#04060A] text-white text-center border-t border-slate-800 relative">
          <div className="max-w-[1400px] mx-auto px-4 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight">See ExecuAI in Action for Your Role</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
              Talk to our executive solutions team for a custom walkthrough tailored to your inbox volume.
            </p>
            <div className="pt-4 flex justify-center">
              <Link href="/contact">
                <MagneticButton className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#f15e1c] to-[#fab60a] text-white font-bold text-base shadow-xl hover:shadow-[#f15e1c]/25 transition-all">
                  Request Custom Executive Demo
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

