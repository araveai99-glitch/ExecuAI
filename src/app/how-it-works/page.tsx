"use client";

import * as React from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Button } from "@/components/ui/Button";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Connect Email Accounts Securely",
      desc: "Authorize your Gmail and Zoho mailboxes via standard OAuth 2.0 PKCE. ExecuAI requests Read and Draft permissions. We never ask for or store your email password.",
      detail: "Supports multiple Gmail accounts plus Zoho accounts under one user profile.",
    },
    {
      num: "02",
      title: "Email Ingestion & Data Normalization",
      desc: "Inbound emails are retrieved asynchronously and parsed into a common internal Email object containing provider, account ID, message ID, sender, recipients, subject, body, and attachments.",
      detail: "The AI engine sees a unified model regardless of whether the source was Gmail or Zoho.",
    },
    {
      num: "03",
      title: "AI Understanding & 3D Triage",
      desc: "The AI internal engine analyzes the email context across three distinct dimensions: Priority (Critical to Low), Intent (Legal, Finance, Client, etc.), and Risk (Safe to High Risk).",
      detail: "Produces explicit explainability reasons rather than obscure numeric confidence scores.",
    },
    {
      num: "04",
      title: "Deterministic Safety Gate Check",
      desc: "Application-level policy rules check for high-risk signals like financial values (₹50L+), legal contracts, NDAs, HR issues, or security OTPs.",
      detail: "High-risk items trigger an immediate autonomous reply blocker.",
    },
    {
      num: "05",
      title: "Draft Preparation or Mandatory Human Review",
      desc: "Safe emails receive personalized draft replies matching your executive tone. High-risk emails are routed directly to your Decision Center workspace.",
      detail: "AI prepares the routine work; consequential decisions stay under human control.",
    },
    {
      num: "06",
      title: "Executive Approval & Controlled Send",
      desc: "The executive reviews, edits, or approves the draft. Upon approval, the backend Send Service executes provider send APIs and logs an entry in the immutable audit trail.",
      detail: "The LLM itself never directly controls the external email send function.",
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
              End-to-End Workflow Architecture
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              How ExecuAI Works Step-by-Step
            </h1>
            <p className="text-sm sm:text-base text-[#475569] max-w-2xl mx-auto">
              Understand → Prioritize → Protect → Assist → Ask → Act
            </p>
          </div>
        </section>

        {/* STEPS LIST */}
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {steps.map((s) => (
              <div
                key={s.num}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row items-start gap-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#EFF4FF] text-[#2E936F] font-bold text-xl flex items-center justify-center shrink-0 border border-[#79d9b0]/30">
                  {s.num}
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-bold text-[#0F172A]">{s.title}</h3>
                  <p className="text-sm text-[#475569] leading-relaxed">{s.desc}</p>
                  <div className="pt-2">
                    <span className="inline-block px-3 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium text-[#0F172A]">
                      💡 Key Architecture: {s.detail}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 bg-[#0F172A] text-white text-center">
          <div className="max-w-[1400px] mx-auto px-4 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-bold">Ready to Connect Your Mailboxes?</h2>
            <div className="pt-2">
              <Link href="/onboarding">
                <Button variant="primary" size="lg">
                  Start Setting Up ExecuAI
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
