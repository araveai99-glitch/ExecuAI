"use client";

import * as React from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { ParticleCanvas } from "@/components/interactive/ParticleCanvas";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";
import { TiltCard } from "@/components/interactive/TiltCard";
import { MagneticButton } from "@/components/interactive/MagneticButton";

export default function SecurityPage() {
  const securityPillars = [
    {
      title: "1. Zero Password Storage & OAuth 2.0 PKCE",
      desc: "Users never enter their Gmail or Zoho account passwords into ExecuAI. Mailbox authentication is conducted directly through Google and Zoho OAuth 2.0 standard authorization flows using least-privilege Read and Draft scopes.",
      icon: "key",
      accent: "#f15e1c",
    },
    {
      title: "2. Encrypted Tokens & Tenant Isolation",
      desc: "OAuth refresh tokens and credentials are encrypted using AES-256 before storage in PostgreSQL. Multi-tenant database design isolates customer data using strict organization_id boundaries.",
      icon: "shield_locked",
      accent: "#2e936f",
    },
    {
      title: "3. Application-Level Safety Gate Architecture",
      desc: "The AI Large Language Model operates strictly in a read and draft generation capacity. The LLM has zero direct programmatic capability to execute external send functions. All sends pass through application safety logic.",
      icon: "gavel",
      accent: "#fab60a",
    },
    {
      title: "4. Cryptographic Audit Trail & Telemetry",
      desc: "Every critical action — email ingestion, AI classification, risk signal detection, draft editing, human approval, and API transmission — is recorded in an immutable audit log with cryptographic timestamps.",
      icon: "receipt_long",
      accent: "#f15e1c",
    },
    {
      title: "5. Data Control & Deletion Rights",
      desc: "Subscribers maintain full ownership of their data. Account disconnection instantly revokes OAuth access tokens and Purges synchronized thread metadata upon customer request.",
      icon: "delete_sweep",
      accent: "#2e936f",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090D16] flex flex-col font-sans text-white relative overflow-hidden selection:bg-[#f15e1c]/30">
      <ParticleCanvas particleCount={35} className="opacity-30" />
      <PublicHeader />

      <main className="flex-1 pt-24 relative z-10">
        {/* HERO */}
        <section className="py-20 sm:py-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#2e936f]/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <ScrollReveal direction="down">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2e936f]/10 border border-[#2e936f]/30 text-xs font-bold uppercase tracking-widest text-[#2e936f] glow-green">
                <span className="w-2 h-2 rounded-full bg-[#2e936f] animate-pulse" />
                Security & Trust Architecture
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight max-w-4xl mx-auto">
                Enterprise Privacy & <span className="bg-gradient-to-r from-[#2e936f] via-[#fab60a] to-[#f15e1c] bg-clip-text text-transparent">Human-in-the-Loop</span> Governance
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                ExecuAI is engineered with strict cryptographic isolation and deterministic safety controls. We communicate only supported capabilities.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* PILLARS */}
        <section className="py-16 sm:py-24 border-t border-slate-800/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {securityPillars.map((p, idx) => (
              <ScrollReveal key={p.title} delay={idx * 0.08} direction="up">
                <TiltCard className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-start gap-6 hover:border-[#2e936f]/40 transition-all">
                  <div
                    className="w-14 h-14 rounded-2xl font-bold flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${p.accent}15`,
                      color: p.accent,
                      borderColor: `${p.accent}40`,
                    }}
                  >
                    <span className="material-symbols-outlined text-[26px]">{p.icon}</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-bold text-white font-heading">{p.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{p.desc}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-b from-[#090D16] to-[#04060A] text-white text-center border-t border-slate-800 relative">
          <div className="max-w-[1400px] mx-auto px-4 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight">Have Specific Security Questions?</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
              Speak with our security architects to review your tenant isolation or compliance requirements.
            </p>
            <div className="pt-4 flex justify-center">
              <Link href="/contact">
                <MagneticButton className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#2e936f] to-[#fab60a] text-white font-bold text-base shadow-xl hover:shadow-[#2e936f]/25 transition-all">
                  Speak With Security Team
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

