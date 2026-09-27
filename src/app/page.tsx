"use client";

import * as React from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { IntentBadge } from "@/components/ui/IntentBadge";
import { Card } from "@/components/ui/Card";
import { EmailCard } from "@/components/ui/EmailCard";
import { Hero3DVisual } from "@/components/interactive/Hero3DVisual";
import { TiltCard } from "@/components/interactive/TiltCard";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { ParticleCanvas } from "@/components/interactive/ParticleCanvas";
import { ScrollReveal, ScrollStaggerContainer } from "@/components/interactive/ScrollReveal";
import {
  SafetyGateSimulator,
  TriageMatrixSimulator,
  VoiceTunerSimulator,
} from "@/components/interactive/FeatureInteractiveSimulators";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A] overflow-x-hidden">
      <PublicHeader />

      <main className="flex-1 pt-16">
        {/* 01 HERO SECTION — WOW MOMENT */}
        <section className="relative py-16 sm:py-24 bg-white border-b border-[#E2E8F0] overflow-hidden">
          {/* Background WebGL/Canvas Particle Grid */}
          <ParticleCanvas particleCount={40} />

          {/* Soft Mesh Gradient Glow strictly in brand colors */}
          <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f15e1c]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
          <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#2e936f]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: "2s" }} />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Copy & Interactive Actions */}
              <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                <ScrollReveal variant="fade-down" delay={0.1}>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff2ec] border border-[#f15e1c]/20 text-xs font-bold text-[#f15e1c] uppercase tracking-wider shadow-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-pulse" />
                    AI Executive Email Assistant
                  </div>
                </ScrollReveal>

                <ScrollReveal variant="fade-up" delay={0.2}>
                  <h1 className="text-[38px] sm:text-[52px] lg:text-[60px] font-heading font-extrabold text-[#0F172A] tracking-tight leading-[1.08]">
                    Your executive inbox, <br />
                    <span className="text-[#f15e1c] bg-clip-text text-transparent bg-gradient-to-r from-[#f15e1c] via-[#fab60a] to-[#f15e1c]">
                      already understood.
                    </span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal variant="fade-up" delay={0.3}>
                  <p className="text-[16px] sm:text-[20px] lg:text-[22px] text-[#475569] leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
                    Connect Gmail and Zoho mailboxes into one unified workspace. ExecuAI identifies what needs your attention, isolates financial risks, and synthesizes routine drafts.
                  </p>
                </ScrollReveal>

                <ScrollReveal variant="fade-up" delay={0.4}>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                    <Link href="/onboarding" className="w-full sm:w-auto">
                      <MagneticButton
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto shadow-xl shadow-[#f15e1c]/25"
                        icon={<span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
                      >
                        Get Started Free
                      </MagneticButton>
                    </Link>
                    <Link href="/how-it-works" className="w-full sm:w-auto">
                      <MagneticButton variant="secondary" size="lg" className="w-full sm:w-auto">
                        See How It Works
                      </MagneticButton>
                    </Link>
                  </div>
                </ScrollReveal>

                {/* Trust Badges */}
                <ScrollReveal variant="fade-up" delay={0.5}>
                  <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold text-[#64748B]">
                    <span className="flex items-center gap-1.5">
                      <span className="text-[#2e936f] font-bold">✓</span> OAuth 2.0 PKCE Enforced
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-[#2e936f] font-bold">✓</span> Zero Model Training Guarantee
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-[#2e936f] font-bold">✓</span> ISO 42001 Guardrails
                    </span>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column: Interactive 3D Visual Experience */}
              <div className="lg:col-span-6 flex justify-center">
                <ScrollReveal variant="scale-up" delay={0.3}>
                  <Hero3DVisual />
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* 02 MULTI-MAILBOX ARCHITECTURE SECTION */}
        <section className="py-16 sm:py-24 bg-[#F8FAFC] relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <ScrollReveal variant="fade-up" className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2e936f] bg-[#2e936f]/10 px-3 py-1 rounded-full border border-[#2e936f]/20">
                Multi-Mailbox Architecture
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-heading font-extrabold text-[#0F172A] tracking-tight">
                Connect Multiple Accounts into One Workspace
              </h2>
              <p className="text-sm sm:text-base text-[#475569]">
                One executive user can link corporate Gmail, personal Gmail, and subsidiary Zoho mailboxes. All accounts feed into one unified intelligence layer and executive Decision Center.
              </p>
            </ScrollReveal>

            {/* Structured 3D Multi-Account Diagram Card */}
            <ScrollReveal variant="scale-up" delay={0.2}>
              <TiltCard glowColor="green" className="max-w-4xl mx-auto p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-1">
                    <span className="w-8 h-8 rounded-lg bg-[#f15e1c] text-white font-bold text-xs flex items-center justify-center mx-auto">G</span>
                    <div className="text-xs font-bold text-[#0F172A]">Gmail #1</div>
                    <div className="text-[11px] text-[#64748B]">ceo@company.com</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-1">
                    <span className="w-8 h-8 rounded-lg bg-[#f15e1c] text-white font-bold text-xs flex items-center justify-center mx-auto">G</span>
                    <div className="text-xs font-bold text-[#0F172A]">Gmail #2</div>
                    <div className="text-[11px] text-[#64748B]">founder@personal.io</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-1">
                    <span className="w-8 h-8 rounded-lg bg-[#2e936f] text-white font-bold text-xs flex items-center justify-center mx-auto">Z</span>
                    <div className="text-xs font-bold text-[#0F172A]">Zoho #1</div>
                    <div className="text-[11px] text-[#64748B]">director@company.com</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-1">
                    <span className="w-8 h-8 rounded-lg bg-[#2e936f] text-white font-bold text-xs flex items-center justify-center mx-auto">Z</span>
                    <div className="text-xs font-bold text-[#0F172A]">Zoho #2</div>
                    <div className="text-[11px] text-[#64748B]">board@vance.io</div>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-extrabold text-[#2e936f] bg-[#2e936f]/10 px-4 py-2 rounded-full border border-[#2e936f]/30">
                    <span className="material-symbols-outlined text-[16px] animate-bounce">arrow_downward</span>
                    <span>OAuth 2.0 PKCE Data Normalization Layer & AI Processing Queue</span>
                    <span className="material-symbols-outlined text-[16px] animate-bounce">arrow_downward</span>
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-[#0F172A] text-white text-center font-bold text-sm tracking-wide shadow-xl flex items-center justify-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#f15e1c] animate-ping" />
                  <span>ONE UNIFIED EXECUAI WORKSPACE & DECISION CENTER</span>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </section>

        {/* 03 UNIFIED INBOX STREAM SECTION */}
        <section className="py-16 sm:py-24 bg-white border-t border-[#E2E8F0] relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <ScrollReveal variant="fade-up" className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#f15e1c] bg-[#fff2ec] px-3 py-1 rounded-full border border-[#f15e1c]/20">
                Unified Mailbox Stream
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-heading font-extrabold text-[#0F172A] tracking-tight">
                Every Email Retains Origin & Thread Context
              </h2>
            </ScrollReveal>

            <ScrollStaggerContainer className="max-w-3xl mx-auto space-y-4">
              <TiltCard glowColor="orange" className="p-1">
                <EmailCard
                  provider="GMAIL"
                  accountEmail="ceo@company.com"
                  senderName="Elena Rostova (General Counsel)"
                  subject="Definitive Agreement & IP Indemnity Clause Review"
                  snippet="Please review clause 14.2 regarding third-party indemnities before tomorrow's meeting..."
                  timestamp="14m ago"
                  priority="CRITICAL"
                  intent="LEGAL"
                  risk="HIGH_RISK"
                  isSelected={true}
                />
              </TiltCard>

              <TiltCard glowColor="green" className="p-1">
                <EmailCard
                  provider="ZOHO"
                  accountEmail="director@company.com"
                  senderName="Marcus Brody (Nordic APAC)"
                  subject="Revised Enterprise Master Services Agreement & ₹50L Quotation"
                  snippet="We have updated the pricing schedule in Schedule C reflecting the discussed terms..."
                  timestamp="30m ago"
                  priority="URGENT"
                  intent="FINANCE"
                  risk="HIGH_RISK"
                />
              </TiltCard>
            </ScrollStaggerContainer>
          </div>
        </section>

        {/* 04 INTERACTIVE FEATURE SIMULATORS SECTION */}
        <section className="py-16 sm:py-24 bg-[#F8FAFC] border-t border-[#E2E8F0] relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <ScrollReveal variant="fade-up" className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2e936f] bg-[#2e936f]/10 px-3 py-1 rounded-full border border-[#2e936f]/20">
                Interactive Capability Demos
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-heading font-extrabold text-[#0F172A] tracking-tight">
                Test ExecuAI Interactive Demos Live
              </h2>
              <p className="text-sm sm:text-base text-[#475569]">
                Adjust safety caps, triage payload samples, and tune executive voice styles in real time.
              </p>
            </ScrollReveal>

            {/* Grid of Interactive Simulators */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <ScrollReveal variant="slide-right">
                <SafetyGateSimulator />
              </ScrollReveal>

              <ScrollReveal variant="slide-left">
                <TriageMatrixSimulator />
              </ScrollReveal>
            </div>

            {/* Voice Tuner Simulator Full Width */}
            <ScrollReveal variant="fade-up">
              <div className="max-w-4xl mx-auto">
                <VoiceTunerSimulator />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 05 BENTO GRID FEATURES SECTION */}
        <section className="py-16 sm:py-24 bg-white border-t border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <ScrollReveal variant="fade-up" className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#f15e1c] bg-[#fff2ec] px-3 py-1 rounded-full border border-[#f15e1c]/20">
                Architectural Bento Grid
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-heading font-extrabold text-[#0F172A] tracking-tight">
                Engineered for Senior Leadership Governance
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Bento Card 1: Safety Gate (7 cols) */}
              <div className="md:col-span-7">
                <TiltCard glowColor="orange" className="p-6 sm:p-8 h-full flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="w-10 h-10 rounded-xl bg-[#fff2ec] text-[#f15e1c] font-bold flex items-center justify-center border border-[#f15e1c]/20">
                      <span className="material-symbols-outlined text-[20px]">gavel</span>
                    </span>
                    <h3 className="text-xl font-bold text-[#0F172A] font-heading">
                      Deterministic Safety Gate Lock
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed">
                      Financial commitments above cap thresholds, contracts, NDAs, legal notices, and HR inquiries automatically trigger the Safety Gate. Autonomous sending is programmatically blocked.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#fff2ec] border border-[#f15e1c]/20 text-xs text-[#f15e1c] font-bold flex items-center justify-between">
                    <span>Autonomous Reply Capability</span>
                    <span className="px-2.5 py-0.5 rounded bg-[#f15e1c] text-white">Blocked By Policy</span>
                  </div>
                </TiltCard>
              </div>

              {/* Bento Card 2: 3D Triage (5 cols) */}
              <div className="md:col-span-5">
                <TiltCard glowColor="green" className="p-6 sm:p-8 h-full flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="w-10 h-10 rounded-xl bg-[#2e936f]/10 text-[#2e936f] font-bold flex items-center justify-center border border-[#2e936f]/20">
                      <span className="material-symbols-outlined text-[20px]">filter_alt</span>
                    </span>
                    <h3 className="text-xl font-bold text-[#0F172A] font-heading">
                      3D Triage Classification
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed">
                      Evaluates inbound emails across three non-overlapping axes: Priority Level, Intent Category, and Risk Gate.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <PriorityBadge priority="CRITICAL" size="sm" />
                    <IntentBadge intent="LEGAL" size="sm" />
                    <RiskBadge risk="HIGH_RISK" size="sm" />
                  </div>
                </TiltCard>
              </div>

              {/* Bento Card 3: Cryptographic Audit Trail (5 cols) */}
              <div className="md:col-span-5">
                <TiltCard glowColor="yellow" className="p-6 sm:p-8 h-full flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="w-10 h-10 rounded-xl bg-[#ffec69]/40 text-[#855d00] font-bold flex items-center justify-center border border-[#fab60a]/30">
                      <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                    </span>
                    <h3 className="text-xl font-bold text-[#0F172A] font-heading">
                      Cryptographic Audit Trail
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed">
                      Every ingestion, classification, draft edit, and human approval is logged with immutable cryptographic timestamps.
                    </p>
                  </div>
                  <div className="text-[11px] font-mono text-[#64748B] p-2 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                    SHA-256 Nonce: 0x9f82...c410
                  </div>
                </TiltCard>
              </div>

              {/* Bento Card 4: Multi-Mailbox Connection Hub (7 cols) */}
              <div className="md:col-span-7">
                <TiltCard glowColor="peach" className="p-6 sm:p-8 h-full flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="w-10 h-10 rounded-xl bg-[#f7d7b0] text-[#f15e1c] font-bold flex items-center justify-center border border-[#f15e1c]/20">
                      <span className="material-symbols-outlined text-[20px]">hub</span>
                    </span>
                    <h3 className="text-xl font-bold text-[#0F172A] font-heading">
                      Multi-Mailbox OAuth 2.0 PKCE Hub
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed">
                      Link work Gmail, personal Gmail, and Zoho Mail accounts into one unified SaaS workspace without storing email passwords.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#0F172A] font-bold pt-2">
                    <span className="flex items-center gap-1.5"><span className="w-5 h-5 rounded bg-[#f15e1c] text-white flex items-center justify-center text-[10px]">G</span> Gmail Work & Personal</span>
                    <span className="flex items-center gap-1.5"><span className="w-5 h-5 rounded bg-[#2e936f] text-white flex items-center justify-center text-[10px]">Z</span> Zoho Enterprise</span>
                  </div>
                </TiltCard>
              </div>
            </div>
          </div>
        </section>

        {/* 06 BOTTOM CALL-TO-ACTION HERO BANNER */}
        <section className="relative py-20 bg-[#0F172A] text-white text-center overflow-hidden">
          <ParticleCanvas particleCount={30} />

          {/* Glowing Ambient Mesh */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#f15e1c]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-4 relative z-10 space-y-6">
            <ScrollReveal variant="fade-up">
              <span className="inline-block px-3 py-1 rounded-full bg-[#f15e1c]/20 text-[#ffec69] text-xs font-bold uppercase tracking-wider border border-[#f15e1c]/40">
                Precision Executive Communication
              </span>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.1}>
              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight max-w-3xl mx-auto">
                Ready to Experience <span className="text-[#f15e1c]">Executive Precision?</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.2}>
              <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto">
                Connect your Gmail and Zoho accounts in under 2 minutes. Start triaging high-consequence inboxes safely today.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="scale-up" delay={0.3}>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/onboarding">
                  <MagneticButton variant="primary" size="lg" icon={<span className="material-symbols-outlined text-[20px]">arrow_forward</span>}>
                    Start Free Trial Now
                  </MagneticButton>
                </Link>
                <Link href="/contact">
                  <MagneticButton variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#0F172A]">
                    Request Executive Demo
                  </MagneticButton>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}


