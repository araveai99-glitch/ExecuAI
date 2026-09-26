"use client";

import * as React from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Button } from "@/components/ui/Button";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { IntentBadge } from "@/components/ui/IntentBadge";
import { Card } from "@/components/ui/Card";
import { EmailCard } from "@/components/ui/EmailCard";

export default function LandingPage() {
  const [activeTab, setActiveTab] = React.useState<"ALL" | "GMAIL" | "ZOHO">("ALL");

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <PublicHeader />

      <main className="flex-1 pt-16">
        {/* 01 HERO SECTION */}
        <section className="py-16 sm:py-24 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Copy & Actions */}
              <div className="lg:col-span-6 space-y-6">
                <h1 className="text-4xl sm:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
                  Your inbox, <br />
                  <span className="text-[#2E936F]">already understood.</span>
                </h1>

                <p className="text-base sm:text-xl text-[#475569] leading-relaxed font-normal">
                  Connect Gmail and Zoho. ExecuAI identifies what needs your attention, flags risky communication, and prepares the routine work for you.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <Link href="/onboarding" className="w-full sm:w-auto">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/how-it-works" className="w-full sm:w-auto">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                      See how it works
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Visual - Realistic ExecuAI Dashboard */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-[#CBD5E1] bg-white shadow-xl overflow-hidden space-y-4 p-4 sm:p-6">
                  {/* Top Window Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#E11D48]" />
                      <span className="w-3 h-3 rounded-full bg-[#FAB60A]" />
                      <span className="w-3 h-3 rounded-full bg-[#2E936F]" />
                      <span className="text-xs font-bold text-[#0F172A] ml-2">ExecuAI Dashboard</span>
                    </div>
                    <span className="text-[11px] text-[#2E936F] font-bold bg-[#EFF4FF] px-2.5 py-0.5 rounded-full">
                      Synced 3 Mailboxes
                    </span>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-[#FFF1F2] border border-[#FECDD3]">
                      <div className="text-[10px] font-bold uppercase text-[#E11D48]">Critical</div>
                      <div className="text-xl font-extrabold text-[#0F172A]">2</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FEF7E6] border border-[#FDE68A]">
                      <div className="text-[10px] font-bold uppercase text-[#795600]">Urgent</div>
                      <div className="text-xl font-extrabold text-[#0F172A]">4</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FEF7E6] border border-[#FDE68A]">
                      <div className="text-[10px] font-bold uppercase text-[#795600]">Need Review</div>
                      <div className="text-xl font-extrabold text-[#0F172A]">3</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#EFF4FF] border border-[#79d9b0]/40">
                      <div className="text-[10px] font-bold uppercase text-[#2E936F]">Safe to Draft</div>
                      <div className="text-xl font-extrabold text-[#0F172A]">12</div>
                    </div>
                  </div>

                  {/* Decision Center Preview Card */}
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0F172A]">Decisions Waiting</span>
                      <span className="text-[10px] font-bold text-[#E11D48] bg-[#FFF1F2] px-2 py-0.5 rounded">
                        Action Required
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-[#0F172A]">
                        Series B Legal Indemnity & Clause 14 Review
                      </div>
                      <div className="text-[11px] text-[#475569]">
                        From: Elena Rostova (General Counsel) • Gmail #1
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 MULTIPLE ACCOUNTS SECTION */}
        <section className="py-16 sm:py-24 bg-[#F8FAFC]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
                Multi-Mailbox Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Connect Multiple Accounts into One Workspace
              </h2>
              <p className="text-sm text-[#475569]">
                One user can connect work, personal, and subsidiary mailboxes. All accounts feed into one AI intelligence layer and one executive dashboard.
              </p>
            </div>

            {/* Structured Multi-Account Architecture Diagram */}
            <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="text-xs font-bold text-[#E11D48]">Gmail #1</div>
                  <div className="text-[11px] text-[#475569]">ceo@company.com</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="text-xs font-bold text-[#E11D48]">Gmail #2</div>
                  <div className="text-[11px] text-[#475569]">founder@personal.io</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="text-xs font-bold text-[#2563EB]">Zoho #1</div>
                  <div className="text-[11px] text-[#475569]">director@company.com</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="text-xs font-bold text-[#2563EB]">Zoho #2</div>
                  <div className="text-[11px] text-[#475569]">board@vance.io</div>
                </div>
              </div>

              <div className="text-center">
                <span className="text-xs font-bold text-[#2E936F] bg-[#EFF4FF] px-4 py-1.5 rounded-full border border-[#2E936F]/30">
                  ↓ Normalization Layer & AI Processing Queue ↓
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#0F172A] text-white text-center font-bold text-sm">
                ONE EXECUAI WORKSPACE & DASHBOARD
              </div>
            </div>
          </div>
        </section>

        {/* 03 UNIFIED INBOX SECTION */}
        <section className="py-16 sm:py-24 bg-white border-t border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
                Unified Mailbox Stream
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Every Email Identifies Its Source Account
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
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
            </div>
          </div>
        </section>

        {/* 04 AI UNDERSTANDING SECTION */}
        <section className="py-16 sm:py-24 bg-[#F8FAFC] border-t border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
                Plain-Language Explainability
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                AI Understanding & Signal Breakdown
              </h2>
            </div>

            <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
                <div>
                  <h4 className="text-base font-bold text-[#0F172A]">Series B IP Indemnity Review</h4>
                  <p className="text-xs text-[#475569]">From: Elena Rostova (General Counsel) &lt;elena@legal.com&gt;</p>
                </div>
                <div className="flex items-center gap-2">
                  <PriorityBadge priority="CRITICAL" />
                  <IntentBadge intent="LEGAL" />
                  <RiskBadge risk="HIGH_RISK" />
                </div>
              </div>

              {/* AI Explainability Card */}
              <Card variant="ai" className="p-4 space-y-3">
                <div className="text-xs font-bold text-[#795600] uppercase">
                  ExecuAI Classification Rationale
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#0F172A]">
                  <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
                    <span className="font-bold text-[#E11D48] block">Financial amount detected</span>
                    Extracted commercial value schedule from email attachment.
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
                    <span className="font-bold text-[#795600] block">Contract language detected</span>
                    Contains binding terms: "indemnify & hold harmless".
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
                    <span className="font-bold text-[#795600] block">Approval requested</span>
                    Sender explicitly requests affirmative executive authorization.
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
                    <span className="font-bold text-[#2E936F] block">Verified external sender</span>
                    External domain verified: legal.com
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* 05 RISK DETECTION & SAFETY GATE SECTION */}
        <section className="py-16 sm:py-24 bg-white border-t border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
                Safety Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Deterministic Safety Gate
              </h2>
              <p className="text-sm text-[#475569]">
                The LLM never directly controls outbound send operations. High-risk messages are quarantined behind an explicit human review barrier.
              </p>
            </div>

            {/* Safety Gate Flow */}
            <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#0F172A] text-white space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs">
                <div className="p-3 rounded-xl bg-[#1E293B]">
                  <div className="text-[10px] text-[#94A3B8]">01</div>
                  <div className="font-bold text-white mt-1">AI Analysis</div>
                </div>
                <div className="p-3 rounded-xl bg-[#1E293B]">
                  <div className="text-[10px] text-[#94A3B8]">02</div>
                  <div className="font-bold text-white mt-1">Safety Check</div>
                </div>
                <div className="p-3 rounded-xl bg-[#EFF4FF] text-[#0F172A] font-bold">
                  <div className="text-[10px] text-[#2E936F]">03 ROUTINE</div>
                  <div className="mt-1">Safe → AI Draft</div>
                </div>
                <div className="p-3 rounded-xl bg-[#FFF1F2] text-[#0F172A] font-bold">
                  <div className="text-[10px] text-[#E11D48]">03 HIGH RISK</div>
                  <div className="mt-1">Human Review</div>
                </div>
                <div className="p-3 rounded-xl bg-[#2E936F] text-white font-bold">
                  <div className="text-[10px] text-[#FFEC69]">04 DISPATCH</div>
                  <div className="mt-1">Controlled Send</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 06 DECISION CENTER SECTION */}
        <section className="py-16 sm:py-24 bg-[#F8FAFC] border-t border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
                Decision Desk
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Decisions Waiting
              </h2>
              <p className="text-sm text-[#475569]">
                Shows only items requiring potential executive decision or sign-off.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E11D48]">Contract Approval Required</span>
                  <span className="text-[11px] text-[#94A3B8]">Received 14m ago</span>
                </div>
                <h4 className="text-base font-bold text-[#0F172A]">
                  Series B Definitive Agreements & IP Indemnity Clause Review
                </h4>
                <p className="text-xs text-[#475569]">
                  From: Elena Rostova (General Counsel) • Requires review of un-capped liability clause 14.2.
                </p>
                <div className="pt-2 flex justify-end">
                  <Link href="/app/decisions">
                    <Button variant="primary" size="sm">
                      Review in Decision Center
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 07 AI DRAFT WORKBENCH SECTION */}
        <section className="py-16 sm:py-24 bg-white border-t border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
                AI Draft Workflow
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Original Email → AI Analysis → AI Draft → Human Review
              </h2>
            </div>

            <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4">
              <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] space-y-2">
                <div className="text-xs font-bold text-[#475569]">Prepared Executive Response Draft</div>
                <p className="text-xs text-[#0F172A] leading-relaxed">
                  "Dear Elena, I have reviewed the indemnity terms in Section 14.2. Please cap the third-party IP liability at 2x annual contract value before board signoff. Best, Alexander."
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-[#475569]">
                <span>Status: Saved Draft Pending Clearance</span>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">Edit Draft</Button>
                  <Button variant="primary" size="sm">Approve & Send</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 08 HUMAN APPROVAL & CONTROLLED SEND SECTION */}
        <section className="py-16 sm:py-24 bg-[#F8FAFC] border-t border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
                Controlled Dispatch
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Fail-Closed Zero-Trust Architecture
              </h2>
            </div>

            <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-4 text-xs">
              <div className="font-bold text-[#0F172A]">Controlled Send Verification Checklist:</div>
              <ul className="space-y-2 text-[#475569]">
                <li className="flex items-center gap-2 text-[#2E936F] font-semibold">✓ 1. User authenticated & tenant isolated</li>
                <li className="flex items-center gap-2 text-[#2E936F] font-semibold">✓ 2. User owns email account</li>
                <li className="flex items-center gap-2 text-[#2E936F] font-semibold">✓ 3. Draft belongs to correct user</li>
                <li className="flex items-center gap-2 text-[#2E936F] font-semibold">✓ 4. Draft status active (not revoked)</li>
                <li className="flex items-center gap-2 text-[#2E936F] font-semibold">✓ 5. High-risk policies satisfied</li>
                <li className="flex items-center gap-2 text-[#2E936F] font-semibold">✓ 6. Required human approval signed</li>
                <li className="flex items-center gap-2 text-[#2E936F] font-semibold">✓ 7. OAuth token valid</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 09 RESPONSIVE WORKBENCH SHOWCASE SECTION */}
        <section className="py-16 sm:py-24 bg-white border-t border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
                Responsive Layout Intent
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Designed for Desktop, iPad, and Mobile
              </h2>
              <p className="text-sm text-[#475569]">
                iPad landscape mode provides a complete 3-pane split view (Sidebar + Email list + AI detail), while iPad portrait and mobile adapt smoothly without content clipping or horizontal scrolling.
              </p>
            </div>
          </div>
        </section>

        {/* 10 EXECUTIVE USE CASES SECTION */}
        <section className="py-16 sm:py-24 bg-[#F8FAFC] border-t border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
                Executive Profiles
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Who ExecuAI Is Built For
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-2">
                <h4 className="text-base font-bold text-[#0F172A]">Founders & CEOs</h4>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Manage investor communications, financing terms, board schedules, and client escalations across corporate and personal mailboxes.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-2">
                <h4 className="text-base font-bold text-[#0F172A]">Legal Counsel</h4>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Automatically quarantine contracts, NDAs, legal notices, and indemnities behind mandatory human redline review.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-2">
                <h4 className="text-base font-bold text-[#0F172A]">CFOs & Finance</h4>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Flag large monetary values, purchase orders, and wire requests before issuing commercial commitments.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-2">
                <h4 className="text-base font-bold text-[#0F172A]">Managing Directors</h4>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Triage high volumes of vendor, client, and internal communications into priority decision queues without losing source account clarity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 11 SECURITY & TRUST SECTION */}
        <section className="py-16 sm:py-24 bg-white border-t border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
                Security Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Zero Model Training & Cryptographic Audit Logs
              </h2>
            </div>

            <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 text-xs text-[#475569]">
              <div className="font-bold text-[#0F172A] text-sm">Security Controls:</div>
              <p>• Zero Model Training Guarantee: Customer email content is never retained for AI LLM training.</p>
              <p>• OAuth 2.0 PKCE Authorization: Direct credentials are never stored or seen by our application.</p>
              <p>• Cryptographic Audit Trail: Every classification, policy check, and send event is logged to an immutable hash chain.</p>
            </div>
          </div>
        </section>

        {/* 12 FINAL CTA BANNER */}
        <section className="py-16 sm:py-20 bg-[#0F172A] text-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Connect Your Mailboxes to ExecuAI Today
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto">
              Bring your Gmail and Zoho mailboxes into one intelligent, safe workspace.
            </p>
            <div className="pt-2 flex justify-center">
              <Link href="/onboarding">
                <Button variant="primary" size="lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 13 FOOTER */}
      <PublicFooter />
    </div>
  );
}
