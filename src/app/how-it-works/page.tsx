"use client";

import * as React from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { ParticleCanvas } from "@/components/interactive/ParticleCanvas";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";
import { TiltCard } from "@/components/interactive/TiltCard";
import { MagneticButton } from "@/components/interactive/MagneticButton";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Connect Email Accounts Securely",
      desc: "Authorize your Gmail and Zoho mailboxes via standard OAuth 2.0 PKCE. ExecuAI requests Read and Draft permissions. We never ask for or store your email password.",
      detail: "Supports multiple Gmail accounts plus Zoho accounts under one user profile.",
      accent: "#f15e1c",
    },
    {
      num: "02",
      title: "Email Ingestion & Data Normalization",
      desc: "Inbound emails are retrieved asynchronously and parsed into a common internal Email object containing provider, account ID, message ID, sender, recipients, subject, body, and attachments.",
      detail: "The AI engine sees a unified model regardless of whether the source was Gmail or Zoho.",
      accent: "#2e936f",
    },
    {
      num: "03",
      title: "AI Understanding & 3D Triage",
      desc: "The AI internal engine analyzes the email context across three distinct dimensions: Priority (Critical to Low), Intent (Legal, Finance, Client, etc.), and Risk (Safe to High Risk).",
      detail: "Produces explicit explainability reasons rather than obscure numeric confidence scores.",
      accent: "#fab60a",
    },
    {
      num: "04",
      title: "Deterministic Safety Gate Check",
      desc: "Application-level policy rules check for high-risk signals like financial values (₹50L+), legal contracts, NDAs, HR issues, or security OTPs.",
      detail: "High-risk items trigger an immediate autonomous reply blocker.",
      accent: "#f15e1c",
    },
    {
      num: "05",
      title: "Draft Preparation or Mandatory Human Review",
      desc: "Safe emails receive personalized draft replies matching your executive tone. High-risk emails are routed directly to your Decision Center workspace.",
      detail: "AI prepares the routine work; consequential decisions stay under human control.",
      accent: "#2e936f",
    },
    {
      num: "06",
      title: "Executive Approval & Controlled Send",
      desc: "The executive reviews, edits, or approves the draft. Upon approval, the backend Send Service executes provider send APIs and logs an entry in the immutable audit trail.",
      detail: "The LLM itself never directly controls the external email send function.",
      accent: "#fab60a",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col font-sans text-white relative overflow-hidden selection:bg-[#f15e1c]/30">
      <ParticleCanvas particleCount={35} className="opacity-30" />
      <PublicHeader />

      <main className="flex-1 pt-24 relative z-10">
        {/* HERO */}
        <section className="py-20 sm:py-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#2e936f]/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <ScrollReveal direction="down">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2e936f]/10 border border-[#2e936f]/30 text-xs font-bold uppercase tracking-widest text-[#2e936f] glow-green">
                <span className="w-2 h-2 rounded-full bg-[#2e936f] animate-pulse" />
                End-to-End Workflow Architecture
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight max-w-4xl mx-auto">
                How ExecuAI Works <span className="bg-gradient-to-r from-[#2e936f] via-[#fab60a] to-[#f15e1c] bg-clip-text text-transparent">Step-by-Step</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Understand → Prioritize → Protect → Assist → Ask → Act
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* STEPS LIST */}
        <section className="py-16 sm:py-24 border-t border-slate-800/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {steps.map((s, idx) => (
              <ScrollReveal key={s.num} delay={idx * 0.08} direction="up">
                <TiltCard className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-start gap-6 hover:border-[#f15e1c]/40 transition-all">
                  <div
                    className="w-14 h-14 rounded-2xl font-extrabold text-xl flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${s.accent}15`,
                      color: s.accent,
                      borderColor: `${s.accent}40`,
                    }}
                  >
                    {s.num}
                  </div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">{s.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{s.desc}</p>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-300">
                        <span className="text-[#fab60a] font-bold">💡 Architecture Detail:</span>
                        <span>{s.detail}</span>
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 bg-gradient-to-b from-[#090D16] to-[#04060A] text-white text-center border-t border-slate-800 relative">
          <div className="max-w-[1400px] mx-auto px-4 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight">Ready to Connect Your Mailboxes?</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
              Set up your OAuth connections and start experiencing deterministic safety triage today.
            </p>
            <div className="pt-4 flex justify-center">
              <Link href="/onboarding">
                <MagneticButton className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#f15e1c] to-[#fab60a] text-white font-bold text-base shadow-xl hover:shadow-[#f15e1c]/25 transition-all">
                  Start Setting Up ExecuAI
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

