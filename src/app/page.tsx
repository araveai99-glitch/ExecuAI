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
  const [activeAccountTab, setActiveAccountTab] = React.useState<"ALL" | "GMAIL" | "ZOHO">("ALL");

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <PublicHeader />

      <main className="flex-1 pt-16">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 bg-gradient-to-b from-white via-[#F8FAFC] to-[#F8FAFC] border-b border-[#E2E8F0]">
          {/* Subtle Accent Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
              {/* Telemetry Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF4FF] border border-[#79d9b0]/40 text-[#2E936F] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#2E936F] animate-pulse" />
                <span>Unified Executive Email Intelligence for Gmail + Zoho</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1]">
                Your Inbox. <br />
                <span className="text-[#2E936F]">Your Decisions.</span> <br />
                Your Control.
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-xl text-[#475569] max-w-2xl leading-relaxed font-normal">
                A secure AI Executive Assistant bringing multiple Gmail and Zoho accounts into one workspace — understanding every email, identifying high-risk commitments, preparing drafts, and leaving final authority in your hands.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
                <Link href="/onboarding" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                    Get Started Free
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </Button>
                </Link>
                <Link href="/how-it-works" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    See How It Works
                  </Button>
                </Link>
              </div>

              {/* Architecture Core Pipeline Strip */}
              <div className="pt-8 w-full">
                <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
                  <div className="space-y-1 p-2 rounded-xl bg-[#F8FAFC]">
                    <div className="text-[10px] font-bold text-[#94A3B8] uppercase">Step 1</div>
                    <div className="text-xs font-bold text-[#0F172A]">Multiple Accounts</div>
                  </div>
                  <div className="space-y-1 p-2 rounded-xl bg-[#F8FAFC]">
                    <div className="text-[10px] font-bold text-[#94A3B8] uppercase">Step 2</div>
                    <div className="text-xs font-bold text-[#0F172A]">Unified Workspace</div>
                  </div>
                  <div className="space-y-1 p-2 rounded-xl bg-[#F8FAFC]">
                    <div className="text-[10px] font-bold text-[#94A3B8] uppercase">Step 3</div>
                    <div className="text-xs font-bold text-[#0F172A]">AI Understands</div>
                  </div>
                  <div className="space-y-1 p-2 rounded-xl bg-[#F8FAFC]">
                    <div className="text-[10px] font-bold text-[#94A3B8] uppercase">Step 4</div>
                    <div className="text-xs font-bold text-[#0F172A]">Risk Detection</div>
                  </div>
                  <div className="space-y-1 p-2 rounded-xl bg-[#F8FAFC]">
                    <div className="text-[10px] font-bold text-[#94A3B8] uppercase">Step 5</div>
                    <div className="text-xs font-bold text-[#0F172A]">AI Prepares Drafts</div>
                  </div>
                  <div className="space-y-1 p-2 rounded-xl bg-[#EFF4FF] border border-[#2E936F]/30 col-span-2 md:col-span-1">
                    <div className="text-[10px] font-bold text-[#2E936F] uppercase">Step 6</div>
                    <div className="text-xs font-bold text-[#2E936F]">Human Controls</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE PRODUCT PREVIEW SHOWCASE */}
        <section className="py-16 sm:py-24 bg-[#F8FAFC]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
                Executive Workbench Architecture
              </h2>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                One Dashboard. Multiple Mailboxes. Zero Chaos.
              </h3>
              <p className="text-sm text-[#475569]">
                See how ExecuAI automatically categorizes incoming emails across all your connected Gmail & Zoho accounts while quarantining high-stakes communication behind an explicit Safety Gate.
              </p>
            </div>

            {/* Interactive Preview Container */}
            <div className="rounded-2xl border border-[#CBD5E1] bg-white shadow-xl overflow-hidden">
              {/* Top Window Bar */}
              <div className="h-12 bg-[#0F172A] px-4 flex items-center justify-between text-white border-b border-[#1E293B]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E11D48]" />
                  <div className="w-3 h-3 rounded-full bg-[#FAB60A]" />
                  <div className="w-3 h-3 rounded-full bg-[#2E936F]" />
                  <span className="text-xs font-semibold text-[#94A3B8] ml-2 hidden sm:inline">
                    ExecuAI SaaS Workspace — Executive Triage Studio
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <span className="w-2 h-2 rounded-full bg-[#2E936F]" />
                  <span>3 Connected Mailboxes Synced</span>
                </div>
              </div>

              {/* Workbench Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 p-4 sm:p-6 gap-6 bg-[#F8FAFC]">
                {/* Left Stream (5 cols) */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                      Unified Email Stream
                    </span>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-[#E2E8F0]">
                      <button
                        onClick={() => setActiveAccountTab("ALL")}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          activeAccountTab === "ALL" ? "bg-[#0F172A] text-white" : "text-[#475569]"
                        }`}
                      >
                        All (48)
                      </button>
                      <button
                        onClick={() => setActiveAccountTab("GMAIL")}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          activeAccountTab === "GMAIL" ? "bg-[#0F172A] text-white" : "text-[#475569]"
                        }`}
                      >
                        Gmail (34)
                      </button>
                      <button
                        onClick={() => setActiveAccountTab("ZOHO")}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          activeAccountTab === "ZOHO" ? "bg-[#0F172A] text-white" : "text-[#475569]"
                        }`}
                      >
                        Zoho (14)
                      </button>
                    </div>
                  </div>

                  <EmailCard
                    provider="GMAIL"
                    accountEmail="ceo@company.com"
                    senderName="Elena Rostova (General Counsel)"
                    subject="Series B Definitive Agreements & IP Indemnity Clause Review"
                    snippet="Please review clause 14.2 regarding third-party indemnities before tomorrow's board meeting..."
                    timestamp="14m ago"
                    priority="CRITICAL"
                    intent="LEGAL"
                    risk="HIGH_RISK"
                    isSelected={true}
                  />

                  <EmailCard
                    provider="ZOHO"
                    accountEmail="board@vance.io"
                    senderName="Marcus Brody (Nordic APAC)"
                    subject="Revised Enterprise Master Services Agreement & ₹50L Quotation"
                    snippet="We have updated the pricing schedule in Schedule C reflecting the discussed terms..."
                    timestamp="30m ago"
                    priority="URGENT"
                    intent="FINANCE"
                    risk="HIGH_RISK"
                  />

                  <EmailCard
                    provider="GMAIL"
                    accountEmail="ceo@company.com"
                    senderName="Dr. Aris Thorne (ESOP Board)"
                    subject="Q3 Board Preparatory Session Schedule"
                    snippet="Can we schedule a 30-min preparatory session on Tuesday morning? ESOP allocation model ready..."
                    timestamp="1h ago"
                    priority="IMPORTANT"
                    intent="MEETING"
                    risk="SAFE"
                  />
                </div>

                {/* Right Studio Pane (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Safety Gate Banner */}
                  <div className="p-4 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#E11D48] text-white flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">gavel</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#E11D48] uppercase tracking-wider">
                          SAFETY GATE ENGAGED — AUTONOMOUS SEND BLOCKED
                        </div>
                        <p className="text-xs text-[#475569] mt-0.5">
                          Uncapped legal liability clause detected. Explicit CEO clearance required.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AI Explainability Synthesis */}
                  <Card variant="ai">
                    <div className="flex items-center justify-between pb-2 border-b border-[#FAB60A]/30">
                      <div className="flex items-center gap-2 text-[#795600] font-bold text-xs">
                        <span className="material-symbols-outlined text-[18px]">psychology</span>
                        <span>ExecuAI Forensic Explainability Matrix</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#0F172A] border border-[#CBD5E1]">
                        Audit ID #EX-882
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                      <div className="bg-white p-2.5 rounded-lg border border-[#E2E8F0]">
                        <span className="text-[10px] font-bold text-[#E11D48] uppercase">Why It Matters</span>
                        <p className="text-xs text-[#0F172A] mt-0.5">
                          External legal counsel requests binding CEO signoff on amended indemnity terms with <span className="font-bold text-[#E11D48]">uncapped liability</span>.
                        </p>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-[#E2E8F0]">
                        <span className="text-[10px] font-bold text-[#795600] uppercase">Signals Detected</span>
                        <p className="text-xs text-[#0F172A] mt-0.5">
                          Detected binding terms: <mark className="bg-[#FFEC69]/60 px-1 rounded">"irrevocably agrees"</mark> and <mark className="bg-[#FFEC69]/60 px-1 rounded">"indemnify & hold harmless"</mark>.
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Response Studio Action Footer */}
                  <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#475569]">AI Prepared Draft:</span>
                      <span className="text-xs font-bold text-[#2E936F] bg-[#EFF4FF] px-2 py-0.5 rounded-full">
                        Ready for Review
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm">
                        Edit Draft
                      </Button>
                      <Button variant="primary" size="sm">
                        Approve & Dispatch
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE PRODUCT PRINCIPLE SECTION */}
        <section className="py-16 sm:py-24 bg-white border-y border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
                The Master Product Philosophy
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
                AI CAN PREPARE. <br />
                <span className="text-[#E11D48]">AI CANNOT DECIDE.</span>
              </h2>
              <p className="text-base text-[#475569] leading-relaxed">
                Most email tools either write generic automated replies or require manual typing for everything. ExecuAI introduces a deterministic Safety Gate that acts as your digital Chief of Staff.
              </p>
            </div>

            {/* Side-by-side comparison table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* What AI Does */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#EFF4FF] border border-[#79d9b0]/40 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2E936F] text-white flex items-center justify-center font-bold text-lg">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A]">What AI Does Safely</h3>
                    <p className="text-xs text-[#2E936F] font-semibold">Prepares and assists routine workflows</p>
                  </div>
                </div>
                <ul className="space-y-3 text-xs text-[#0F172A] pt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2E936F] font-bold">•</span>
                    <span><strong>Reads & Understands:</strong> Normalizes incoming emails across all connected accounts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2E936F] font-bold">•</span>
                    <span><strong>Classifies 3D Dimensions:</strong> Assigns Priority, Intent, and Risk tags instantly.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2E936F] font-bold">•</span>
                    <span><strong>Detects Risk:</strong> Flags financial values, contracts, legal notices, and HR items.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2E936F] font-bold">•</span>
                    <span><strong>Drafts Responses:</strong> Prepares personalized draft replies matching your executive tone.</span>
                  </li>
                </ul>
              </div>

              {/* What AI Never Does */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FFF1F2] border border-[#FECDD3] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E11D48] text-white flex items-center justify-center font-bold text-lg">
                    ✗
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#E11D48]">What AI Never Does Independently</h3>
                    <p className="text-xs text-[#E11D48] font-semibold">Strict application-level safety gate</p>
                  </div>
                </div>
                <ul className="space-y-3 text-xs text-[#0F172A] pt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span><strong>Never approves contracts</strong> or commits money without your explicit authorization.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span><strong>Never negotiates prices</strong> or accepts binding commercial terms automatically.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span><strong>Never sends high-risk responses</strong> without mandatory human review in Decision Center.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E11D48] font-bold">•</span>
                    <span><strong>LLM never controls external API sending directly</strong> — all sends pass through controlled backend logic.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MULTI-MAILBOX ARCHITECTURE SECTION */}
        <section className="py-16 sm:py-24 bg-[#F8FAFC]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
                Multi-Mailbox SaaS Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Not Separate Email Apps — One Unified Engine
              </h2>
              <p className="text-sm text-[#475569]">
                Connect your work Gmail, personal Gmail, board Zoho, or subsidiary accounts. The system maintains tenant isolation while feeding every mailbox into a unified executive workspace.
              </p>
            </div>

            {/* Architecture Card */}
            <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-2xl bg-white border border-[#E2E8F0] shadow-md space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-[#EA4335]/10 text-[#EA4335] font-bold flex items-center justify-center mx-auto text-lg">
                    G
                  </div>
                  <h4 className="text-sm font-bold text-[#0F172A]">Gmail Connectors</h4>
                  <p className="text-xs text-[#475569]">OAuth 2.0 PKCE Read & Draft permissions for multiple Google accounts.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#EFF4FF] border border-[#2E936F]/40 space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-[#2E936F] text-white font-bold flex items-center justify-center mx-auto text-lg">
                    E
                  </div>
                  <h4 className="text-sm font-bold text-[#2E936F]">ExecuAI AI Engine</h4>
                  <p className="text-xs text-[#475569]">Unified Normalized Email Object parsing across all connected providers.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-[#226BBA]/10 text-[#226BBA] font-bold flex items-center justify-center mx-auto text-lg">
                    Z
                  </div>
                  <h4 className="text-sm font-bold text-[#0F172A]">Zoho Connectors</h4>
                  <p className="text-xs text-[#475569]">OAuth 2.0 Zoho Mail API ingestion with account origin tagging.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TARGET EXECUTIVE USE CASES */}
        <section className="py-16 sm:py-24 bg-white border-t border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
                Executive Profiles
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Engineered for High-Stakes Decision Makers
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#E5EEFF] text-[#0F172A] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">Founders & CEOs</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Manage investor communications, financing terms, board schedules, and client escalations across corporate and personal mailboxes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#E5EEFF] text-[#0F172A] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">gavel</span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">Legal Counsel</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Automatically quarantine contracts, NDAs, legal notices, and indemnities behind mandatory human redline review.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#E5EEFF] text-[#0F172A] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">payments</span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">CFOs & Finance</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Flag large monetary values (e.g. ₹50L+), purchase orders, and wire requests before issuing commercial commitments.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#E5EEFF] text-[#0F172A] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">Managing Directors</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Triage high volumes of vendor, client, and internal communications into priority decision queues without losing source account clarity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA BANNER */}
        <section className="py-16 sm:py-20 bg-[#0F172A] text-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Take Control of Your Executive Inbox Today.
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto">
              Bring your Gmail and Zoho mailboxes into one intelligent, safe workspace. Start automating routine work without surrendering control.
            </p>
            <div className="pt-4 flex justify-center">
              <Link href="/onboarding">
                <Button variant="primary" size="lg" className="shadow-lg">
                  Get Started Free Now
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
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
