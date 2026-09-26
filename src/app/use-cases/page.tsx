"use client";

import * as React from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Button } from "@/components/ui/Button";

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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <PublicHeader />

      <main className="flex-1 pt-16">
        {/* HERO */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
              Real-World Executive Scenarios
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Tailored Solutions for Senior Leadership
            </h1>
            <p className="text-sm sm:text-base text-[#475569] max-w-2xl mx-auto">
              Discover how ExecuAI protects time and enforces governance across distinct corporate roles.
            </p>
          </div>
        </section>

        {/* USE CASES CARDS */}
        <section className="py-16 sm:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {useCases.map((uc) => (
                <div
                  key={uc.role}
                  className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#EFF4FF] text-[#2E936F] text-xs font-bold uppercase tracking-wider">
                      {uc.badge}
                    </span>
                    <h3 className="text-xl font-bold text-[#0F172A]">{uc.title}</h3>
                    <div className="p-3 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] text-xs text-[#E11D48] space-y-1">
                      <span className="font-bold uppercase tracking-wider">The Challenge:</span>
                      <p className="text-[#0F172A]">{uc.problem}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#EFF4FF] border border-[#79d9b0]/30 text-xs text-[#2E936F] space-y-1">
                      <span className="font-bold uppercase tracking-wider">ExecuAI Solution:</span>
                      <p className="text-[#0F172A]">{uc.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#0F172A] text-white text-center">
          <div className="max-w-[1400px] mx-auto px-4 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-bold">See ExecuAI in Action for Your Role</h2>
            <div className="pt-2">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Request Custom Executive Demo
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
