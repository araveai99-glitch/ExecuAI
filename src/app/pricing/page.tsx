"use client";

import * as React from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = React.useState(true);

  const plans = [
    {
      name: "Executive Solo",
      badge: "Initial Scope",
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

      <main id="main-content" className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-12">
        <Breadcrumbs items={[{ label: "Pricing Plans" }]} />

        {/* HERO HEADER */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF2EC] border border-[#F15E1C]/30 text-xs font-bold uppercase tracking-wider text-[#F15E1C]">
            <span className="w-2 h-2 rounded-full bg-[#F15E1C] animate-pulse" />
            Transparent SaaS Pricing
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] font-heading tracking-tight">
            Invest in Time Protection & Governance
          </h1>
          <p className="text-base text-[#475569] leading-relaxed">
            Choose the plan matching your connected mailbox volume. All plans include full 3D Triage and the Safety Gate Engine.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center bg-white p-1 rounded-2xl border border-[#E2E8F0] gap-1 shadow-xs pt-1">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                !isAnnual ? "bg-[#F15E1C] text-white shadow-xs" : "text-[#475569] hover:text-[#0F172A]"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isAnnual ? "bg-[#F15E1C] text-white shadow-xs" : "text-[#475569] hover:text-[#0F172A]"
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-[#FFF2EC] text-[#F15E1C] text-[10px] px-2 py-0.5 rounded-full font-extrabold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`p-6 sm:p-8 rounded-3xl bg-white border flex flex-col justify-between space-y-6 relative shadow-sm ${
                p.popular
                  ? "border-[#F15E1C] ring-2 ring-[#F15E1C]/20 shadow-md"
                  : "border-[#E2E8F0]"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#F15E1C] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                  {p.badge}
                </div>
              )}

              <div className="space-y-4">
                {!p.popular && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                    {p.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold text-[#0F172A] font-heading">{p.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight font-heading">
                    {isAnnual ? p.priceAnnual : p.priceMonthly}
                  </span>
                  <span className="text-xs text-[#64748B] font-medium">/ month</span>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">{p.desc}</p>

                <ul className="space-y-2.5 text-xs text-[#334155] pt-4 border-t border-[#E2E8F0]">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#E8F4F0] text-[#2E936F] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-[#2E936F]/30">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <Link href="/onboarding" className="w-full">
                  <Button
                    variant={p.popular ? "primary" : "secondary"}
                    className="w-full py-3 text-xs font-bold"
                  >
                    {p.cta} →
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-[#0F172A] font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-[#64748B]">Clear answers regarding security, OAuth tokens, and multi-mailbox governance.</p>
          </div>

          <div className="space-y-4 pt-2">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 text-xs">
                <h3 className="font-bold text-[#0F172A]">
                  Q: {faq.q}
                </h3>
                <p className="text-[#475569] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
