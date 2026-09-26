"use client";

import * as React from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Button } from "@/components/ui/Button";

export default function SecurityPage() {
  const securityPillars = [
    {
      title: "1. Zero Password Storage & OAuth 2.0 PKCE",
      desc: "Users never enter their Gmail or Zoho account passwords into ExecuAI. Mailbox authentication is conducted directly through Google and Zoho OAuth 2.0 standard authorization flows using least-privilege Read and Draft scopes.",
      icon: "key",
    },
    {
      title: "2. Encrypted Tokens & Tenant Isolation",
      desc: "OAuth refresh tokens and credentials are encrypted using AES-256 before storage in PostgreSQL. Multi-tenant database design isolates customer data using strict organization_id boundaries.",
      icon: "shield_locked",
    },
    {
      title: "3. Application-Level Safety Gate Architecture",
      desc: "The AI Large Language Model operates strictly in a read and draft generation capacity. The LLM has zero direct programmatic capability to execute external send functions. All sends pass through application safety logic.",
      icon: "gavel",
    },
    {
      title: "4. Cryptographic Audit Trail & Telemetry",
      desc: "Every critical action — email ingestion, AI classification, risk signal detection, draft editing, human approval, and API transmission — is recorded in an immutable audit log with cryptographic timestamps.",
      icon: "receipt_long",
    },
    {
      title: "5. Data Control & Deletion Rights",
      desc: "Subscribers maintain full ownership of their data. Account disconnection instantly revokes OAuth access tokens and Purges synchronized thread metadata upon customer request.",
      icon: "delete_sweep",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <PublicHeader />

      <main className="flex-1 pt-16">
        {/* HERO */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
              Security & Trust Architecture
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Enterprise Privacy & Human-in-the-Loop Governance
            </h1>
            <p className="text-sm sm:text-base text-[#475569] max-w-2xl mx-auto">
              ExecuAI is engineered with strict cryptographic isolation and deterministic safety controls. We communicate only supported capabilities.
            </p>
          </div>
        </section>

        {/* PILLARS */}
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {securityPillars.map((p) => (
              <div
                key={p.title}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row items-start gap-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EFF4FF] text-[#2E936F] font-bold flex items-center justify-center shrink-0 border border-[#79d9b0]/30">
                  <span className="material-symbols-outlined text-[24px]">{p.icon}</span>
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg font-bold text-[#0F172A]">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#0F172A] text-white text-center">
          <div className="max-w-[1400px] mx-auto px-4 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-bold">Have Specific Security Questions?</h2>
            <div className="pt-2">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Speak With Our Security Architecture Team
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
