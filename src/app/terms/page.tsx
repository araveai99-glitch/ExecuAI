import * as React from "react";
import type { Metadata } from "next";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | ExecuAI Executive Platform",
  description:
    "Review the Terms of Service for ExecuAI. Understand human-in-the-loop Safety Gate rules, subscription agreements, liability terms, and acceptable usage policies.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <PublicHeader />

      <main id="main-content" className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <Breadcrumbs items={[{ label: "Terms of Service" }]} />

        <div className="space-y-8 mt-6">
          <div className="border-b border-[#E2E8F0] pb-6 space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-heading tracking-tight">
              Terms of Service Agreement
            </h1>
            <p className="text-sm text-[#64748B]">
              Effective Date: September 27, 2026 • Agreement Version 3.1
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-8 text-[#334155]">
            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                1. Acceptance of Terms
              </h2>
              <p>
                By creating an account, accessing, or subscribing to ExecuAI (&quot;the Service&quot;), you enter into a legally binding agreement with ExecuAI Inc. If you are entering into this agreement on behalf of a corporate entity, you represent that you hold the legal authority to bind that organization.
              </p>
            </section>

            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                2. Executive Human-in-the-Loop Disclaimers
              </h2>
              <p>
                ExecuAI synthesizes email draft responses and triages incoming correspondence using artificial intelligence. 
              </p>
              <div className="p-4 rounded-xl bg-[#FFF2EC] border border-[#F15E1C]/30 text-xs text-[#0F172A] space-y-2">
                <p className="font-bold text-[#F15E1C]">Important Safety Gate Protocol Notice:</p>
                <p>
                  1. ExecuAI serves as an assistant for email draft synthesis. The final decision to send, approve, or transmit high-stakes email communication remains with the human executive user.
                </p>
                <p>
                  2. For transactions exceeding your configured Safety Gate threshold or involving contractual commitments, ExecuAI explicitly locks automated transmission until approved by an authorized executive.
                </p>
              </div>
            </section>

            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                3. User Responsibilities & Acceptable Use
              </h2>
              <p>You agree not to use ExecuAI to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Generate, distribute, or automate unsolicited bulk marketing email (SPAM).</li>
                <li>Conduct deceptive phishing, impersonation of third parties, or illegal wire fraud.</li>
                <li>Bypass rate limits, reverse engineer underlying AI algorithms, or perform unauthorized security scraping.</li>
                <li>Store or process unencrypted credit card details or unapproved regulated data types.</li>
              </ul>
            </section>

            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                4. Subscription, Billing, and Cancellation
              </h2>
              <p>
                ExecuAI services are billed on a monthly or annual subscription basis. Payments are processed securely via PCI-DSS compliant payment gateways. Subscriptions renew automatically unless cancelled prior to the renewal date via your account settings.
              </p>
              <p>
                For details regarding 14-day refund eligibility, see our dedicated <Link href="/refund" className="text-[#F15E1C] underline font-semibold">Refund Policy</Link>.
              </p>
            </section>

            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                5. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, ExecuAI Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, commercial opportunities, or data, arising out of your use or inability to use the Service.
              </p>
            </section>

            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                6. Contact Legal Counsel
              </h2>
              <p>
                For legal inquiries or notice of dispute, reach out to our legal department:
              </p>
              <p className="font-semibold text-xs text-[#0F172A]">
                ExecuAI Legal Department — Email: <a href="mailto:legal@execuai.com" className="text-[#F15E1C] underline">legal@execuai.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
