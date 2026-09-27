"use client";

import * as React from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { ParticleCanvas } from "@/components/interactive/ParticleCanvas";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";
import { TiltCard } from "@/components/interactive/TiltCard";
import { MagneticButton } from "@/components/interactive/MagneticButton";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = React.useState(true);

  const plans = [
    {
      name: "Executive Solo",
      badge: "Initial MVP Scope",
      priceMonthly: "$49",
      priceAnnual: "$39",
      desc: "Perfect for founders and executives managing up to 3 connected mailboxes (Gmail + Zoho).",
      features: [
        "Connect up to 3 Mailboxes (2 Gmail + 1 Zoho)",
        "Unified Executive Inbox Workbench",
        "3D Triage (Priority, Intent, Risk Gate)",
        "Safety Gate & Decision Center Workspace",
        "Context-Aware AI Response Studio",
        "Standard Email Support",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Executive Pro",
      badge: "Most Popular",
      priceMonthly: "$99",
      priceAnnual: "$79",
      desc: "Engineered for senior leaders managing multiple corporate, board, and personal inboxes.",
      features: [
        "Connect up to 8 Mailboxes (Gmail + Zoho)",
        "Everything in Solo Plan",
        "Advanced Risk Signal Detection (Financial >₹10L)",
        "Personalized Persona Writing Style Training",
        "Immutable Audit Logs & Telemetry Export",
        "Priority 24/7 Executive Support",
      ],
      cta: "Start Executive Pro Trial",
      popular: true,
    },
    {
      name: "Enterprise Desk",
      badge: "Multi-Tenant Governance",
      priceMonthly: "$249",
      priceAnnual: "$199",
      desc: "For corporate legal teams, CFO offices, and multi-executive managing desks.",
      features: [
        "Unlimited Connected Mailboxes",
        "Everything in Pro Plan",
        "Custom Safety Gate Policy Engine Rules",
        "Multi-Tenant Organization Governance",
        "Dedicated Private LLM Gateway Abstraction",
        "Custom SLA & Dedicated Account Lead",
      ],
      cta: "Contact Enterprise Sales",
      popular: false,
    },
  ];

  const faqs = [
    {
      q: "Does ExecuAI store my email password?",
      a: "No. ExecuAI uses standard OAuth 2.0 PKCE authentication with Google and Zoho. You never enter or store passwords in our application.",
    },
    {
      q: "Will AI ever send an email without my permission?",
      a: "Never. ExecuAI is designed on the principle: 'AI Can Prepare, AI Cannot Decide.' All emails, especially high-risk messages, require explicit human clearance.",
    },
    {
      q: "Can I connect both Gmail and Zoho accounts under one subscription?",
      a: "Yes. ExecuAI is built specifically to unify multiple Gmail and Zoho mailboxes into one single executive dashboard.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col font-sans text-white relative overflow-hidden selection:bg-[#f15e1c]/30">
      <ParticleCanvas particleCount={35} className="opacity-30" />
      <PublicHeader />

      <main className="flex-1 pt-24 relative z-10">
        {/* HERO */}
        <section className="py-20 sm:py-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#f15e1c]/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <ScrollReveal direction="down">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f15e1c]/10 border border-[#f15e1c]/30 text-xs font-bold uppercase tracking-widest text-[#f15e1c] glow-orange">
                <span className="w-2 h-2 rounded-full bg-[#f15e1c] animate-pulse" />
                Transparent SaaS Pricing
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight max-w-4xl mx-auto">
                Invest in <span className="bg-gradient-to-r from-[#f15e1c] via-[#fab60a] to-[#2e936f] bg-clip-text text-transparent">Time Protection</span> & Governance
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Choose the plan matching your connected mailbox volume. All plans include full 3D Triage and the Safety Gate Engine.
              </p>
            </ScrollReveal>

            {/* Billing Toggle */}
            <ScrollReveal delay={0.3}>
              <div className="inline-flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 gap-2 shadow-xl backdrop-blur-md">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    !isAnnual ? "bg-slate-800 text-white shadow-md border border-slate-700" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isAnnual ? "bg-gradient-to-r from-[#f15e1c] to-[#fab60a] text-white shadow-lg glow-orange" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span>Annual Billing</span>
                  <span className="bg-white text-[#f15e1c] text-[10px] px-2 py-0.5 rounded-full font-extrabold">
                    Save 20%
                  </span>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* PRICING CARDS */}
        <section className="py-16 sm:py-24 border-t border-slate-800/80">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {plans.map((p, idx) => (
                <ScrollReveal key={p.name} delay={idx * 0.1} direction="up">
                  <TiltCard
                    className={`p-8 rounded-3xl bg-slate-900/80 border flex flex-col justify-between space-y-6 relative transition-all backdrop-blur-xl shadow-2xl h-full ${
                      p.popular
                        ? "border-[#f15e1c] ring-1 ring-[#f15e1c]/50 glow-orange"
                        : "border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {p.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#f15e1c] to-[#fab60a] text-white text-[10px] font-extrabold uppercase tracking-widest shadow-lg">
                        {p.badge}
                      </div>
                    )}

                    <div className="space-y-4">
                      {!p.popular && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          {p.badge}
                        </span>
                      )}
                      <h3 className="text-2xl font-bold text-white font-heading">{p.name}</h3>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-5xl font-extrabold text-white tracking-tight">
                          {isAnnual ? p.priceAnnual : p.priceMonthly}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">/ month</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>

                      <ul className="space-y-3 text-xs text-slate-300 pt-6 border-t border-slate-800">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <span className="w-4 h-4 rounded-full bg-[#2e936f]/20 text-[#2e936f] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-[#2e936f]/40">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <Link href="/onboarding" className="w-full">
                        <MagneticButton className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-md ${
                          p.popular
                            ? "bg-gradient-to-r from-[#f15e1c] to-[#fab60a] text-white hover:shadow-[#f15e1c]/30"
                            : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                        }`}>
                          {p.cta}
                        </MagneticButton>
                      </Link>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="py-20 sm:py-28 border-t border-slate-800/80 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <ScrollReveal direction="down">
              <div className="text-center space-y-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-slate-400 text-sm">Clear answers regarding security, access scopes, and multi-mailbox setup.</p>
              </div>
            </ScrollReveal>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <ScrollReveal key={faq.q} delay={idx * 0.08} direction="up">
                  <TiltCard className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 backdrop-blur-md">
                    <h4 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                      <span className="text-[#f15e1c]">Q:</span> {faq.q}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">{faq.a}</p>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}

