import * as React from "react";
import type { Metadata } from "next";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | ExecuAI Security & Data Governance",
  description:
    "Read the official ExecuAI Privacy Policy. Learn how we handle Gmail & Zoho OAuth integrations, data minimization, zero AI model training policies, and user privacy rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <PublicHeader />
      
      <main id="main-content" className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        <div className="space-y-8 mt-6">
          {/* Header Section */}
          <div className="border-b border-[#E2E8F0] pb-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F4F0] text-[#2E936F] text-xs font-bold border border-[#2E936F]/30">
              <span className="w-2 h-2 rounded-full bg-[#2E936F]" />
              Zero AI Model Training Guarantee
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-heading tracking-tight">
              Privacy Policy & Data Protection Statement
            </h1>
            <p className="text-sm text-[#64748B]">
              Last updated: September 27, 2026 • Effective Version 2.4
            </p>
          </div>

          {/* Policy Content */}
          <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-8 text-[#334155]">
            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                1. Executive Summary & Core Commitment
              </h2>
              <p>
                ExecuAI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates an executive email management platform designed for CEOs, founders, and enterprise executives. We understand that executive email communication contains high-stakes strategic, financial, and personal data.
              </p>
              <p>
                <strong>Our Core Guarantee:</strong> ExecuAI strictly enforces zero training on customer email data. Your emails, metadata, draft responses, and recipient details are <em>never</em> used to train global AI foundation models, fine-tune public LLMs, or expose data outside your isolated tenant environment.
              </p>
            </section>

            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                2. Information We Access and Process
              </h2>
              <p>
                When you connect your email accounts (such as Gmail via Google OAuth 2.0 or Zoho Mail via API tokens), we access only the data necessary to provide executive inbox triage and AI draft generation:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Mailbox Metadata:</strong> Sender name, recipient addresses, subject lines, timestamp, and message headers for priority triage computation.
                </li>
                <li>
                  <strong>Email Body Content:</strong> Transient email text required for intent classification, financial risk assessment, and executive reply synthesis.
                </li>
                <li>
                  <strong>Safety Gate Audit Logs:</strong> Logs detailing when Safety Gate blocks automated actions due to financial exposure thresholds or contract keywords.
                </li>
                <li>
                  <strong>Account Identification:</strong> Work email address, profile picture, time zone, and workspace preferences for authentication.
                </li>
              </ul>
            </section>

            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                3. Google API Limited Use Disclosure
              </h2>
              <p>
                ExecuAI&apos;s use and transfer of information received from Google APIs to any other app adheres to the{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F15E1C] underline font-semibold"
                >
                  Google API Service User Data Policy
                </a>
                , including the Limited Use requirements.
              </p>
              <p>
                We do not transfer Google user data to third parties unless required to provide or improve ExecuAI&apos;s core executive assistant functionality, comply with applicable law, or as part of a merger/acquisition with explicit notice.
              </p>
            </section>

            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                4. Data Storage, Isolation, and Retention
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <h3 className="font-bold text-[#0F172A] text-sm">Tenant Isolation</h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Every customer workspace runs in an isolated database environment with Row Level Security (RLS) and AES-256 encryption at rest.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <h3 className="font-bold text-[#0F172A] text-sm">Automated Log Purging</h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Transient email vector indexes and processing logs are automatically purged after 30 days unless extended by your enterprise retention policy.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                5. Your Privacy Rights (GDPR & CCPA)
              </h2>
              <p>
                Depending on your location, you hold the following explicit rights regarding your personal data:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Right to Access:</strong> Request a full copy of data associated with your ExecuAI workspace.</li>
                <li><strong>Right to Erasure (Data Deletion):</strong> Request total purge of mailbox tokens and draft history.</li>
                <li><strong>Right to Revoke Access:</strong> Disconnect Gmail or Zoho OAuth grants immediately from your security dashboard.</li>
                <li><strong>Right to Export:</strong> Download structured audit logs and triage history in JSON/CSV format.</li>
              </ul>
            </section>

            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                6. Contact Privacy & Data Officer
              </h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to execute a formal Data Deletion Request, submit your request to:
              </p>
              <div className="p-4 rounded-xl bg-[#FFF2EC] border border-[#F15E1C]/30 text-xs text-[#0F172A]">
                <p className="font-bold text-[#F15E1C]">ExecuAI Data Protection Office</p>
                <p>Email: <a href="mailto:privacy@execuai.com" className="underline font-semibold">privacy@execuai.com</a></p>
                <p>Security Hub: <Link href="/security" className="underline font-semibold">Security Governance</Link></p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
