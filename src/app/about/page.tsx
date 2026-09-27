import * as React from "react";
import type { Metadata } from "next";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About ExecuAI | Engineering Executive Email Governance",
  description:
    "Learn about ExecuAI's mission, team, and zero-trust engineering philosophy for executive communication management across Gmail and Zoho mailboxes.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <PublicHeader />

      <main id="main-content" className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        <Breadcrumbs items={[{ label: "About ExecuAI" }]} />

        {/* Hero Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF2EC] text-[#F15E1C] text-xs font-bold border border-[#F15E1C]/30">
            Engineered for High-Stakes Leadership
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] font-heading tracking-tight leading-tight">
            Building the First Human-Controlled AI Executive Assistant
          </h1>
          <p className="text-base text-[#475569] max-w-3xl leading-relaxed">
            Modern executives manage multiple email accounts across Gmail and Zoho, drowning in administrative overload. ExecuAI unifies inbox triage into a single 3D decision matrix while enforcing hard financial and legal Safety Gates.
          </p>
        </div>

        {/* Core Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF2EC] text-[#F15E1C] flex items-center justify-center font-bold text-lg">
              01
            </div>
            <h3 className="text-base font-bold text-[#0F172A] font-heading">
              Safety Gate First
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Autonomous email sending without human approval creates unquantifiable corporate liability. Our platform locks all high-exposure messages behind executive verification.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F4F0] text-[#2E936F] flex items-center justify-center font-bold text-lg">
              02
            </div>
            <h3 className="text-base font-bold text-[#0F172A] font-heading">
              Dual Mailbox Convergence
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Connecting Google Workspace (Gmail) and Zoho Mail into a single unified stream allows seamless switching without account fragmenting.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEF6E0] text-[#FAB60A] flex items-center justify-center font-bold text-lg">
              03
            </div>
            <h3 className="text-base font-bold text-[#0F172A] font-heading">
              Zero Model Training
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Your communications are confidential assets. We enforce zero model training guarantees across all processing pipelines.
            </p>
          </div>
        </div>

        {/* Executive Team Overview */}
        <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F172A] font-heading">
              Leadership & Engineering Philosophy
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              Developed by experts in cloud architecture, AI security, and executive governance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <div className="font-bold text-[#0F172A] text-sm">Security & Privacy Governance</div>
              <p className="text-xs text-[#64748B]">
                Enforcing ISO 42001 AI risk management principles, OAuth token isolation, and strict server-side authorization across all backend API endpoints.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
              <div className="font-bold text-[#0F172A] text-sm">Executive Product Engineering</div>
              <p className="text-xs text-[#64748B]">
                Crafting intuitive, keyboard-navigable UI components built with accessibility, speed, and real-time triage matrix responsiveness.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between border-t border-[#E2E8F0] gap-4">
            <span className="text-xs font-semibold text-[#475569]">
              Ready to evaluate ExecuAI for your executive team?
            </span>
            <div className="flex gap-3">
              <Link href="/contact">
                <Button variant="primary" size="sm">
                  Request Executive Briefing
                </Button>
              </Link>
              <Link href="/security">
                <Button variant="secondary" size="sm">
                  View Security Architecture
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
