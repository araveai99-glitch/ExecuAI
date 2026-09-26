"use client";

import * as React from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Button } from "@/components/ui/Button";

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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <PublicHeader />

      <main className="flex-1 pt-16">
        {/* HERO */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
              Transparent SaaS Pricing
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Invest in Time Protection & Risk Governance
            </h1>
            <p className="text-sm sm:text-base text-[#475569] max-w-2xl mx-auto">
              Choose the plan matching your connected mailbox volume. All plans include full 3D Triage and the Safety Gate Engine.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-[#F8FAFC] p-1.5 rounded-xl border border-[#E2E8F0] gap-2">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  !isAnnual ? "bg-white text-[#0F172A] shadow-xs" : "text-[#475569]"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isAnnual ? "bg-[#2E936F] text-white shadow-xs" : "text-[#475569]"
                }`}
              >
                <span>Annual Billing</span>
                <span className="bg-white text-[#2E936F] text-[10px] px-1.5 py-0.2 rounded-full font-extrabold">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* PRICING CARDS */}
        <section className="py-16 sm:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {plans.map((p) => (
                <div
                  key={p.name}
                  className={`p-6 sm:p-8 rounded-2xl bg-white border flex flex-col justify-between space-y-6 relative transition-all ${
                    p.popular
                      ? "border-[#2E936F] ring-2 ring-[#2E936F] shadow-lg"
                      : "border-[#E2E8F0] shadow-xs hover:shadow-md"
                  }`}
                >
                  {p.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#2E936F] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                      {p.badge}
                    </div>
                  )}

                  <div className="space-y-4">
                    {!p.popular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                        {p.badge}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-[#0F172A]">{p.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-[#0F172A]">
                        {isAnnual ? p.priceAnnual : p.priceMonthly}
                      </span>
                      <span className="text-xs text-[#475569]">/ month</span>
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed">{p.desc}</p>

                    <ul className="space-y-2.5 text-xs text-[#0F172A] pt-4 border-t border-[#E2E8F0]">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span className="text-[#2E936F] font-bold">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Link href="/onboarding" className="w-full">
                      <Button
                        variant={p.popular ? "primary" : "secondary"}
                        className="w-full"
                      >
                        {p.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="py-16 sm:py-24 bg-white border-t border-[#E2E8F0]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2"
                >
                  <h4 className="text-sm font-bold text-[#0F172A]">{faq.q}</h4>
                  <p className="text-xs text-[#475569] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
