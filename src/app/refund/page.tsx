import * as React from "react";
import type { Metadata } from "next";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Refund & Billing Policy | ExecuAI Executive Assistant",
  description:
    "Transparent details about ExecuAI's 14-day money-back guarantee, seat proration, subscription cancellations, and refund request procedures.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <PublicHeader />

      <main id="main-content" className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <Breadcrumbs items={[{ label: "Refund Policy" }]} />

        <div className="space-y-8 mt-6">
          <div className="border-b border-[#E2E8F0] pb-6 space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-heading tracking-tight">
              Refund & Subscription Terms
            </h1>
            <p className="text-sm text-[#64748B]">
              Last updated: September 27, 2026
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-8 text-[#334155]">
            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                1. 14-Day Satisfaction Guarantee
              </h2>
              <p>
                We stand behind the security and executive efficacy of ExecuAI. If you purchase an individual or executive workspace plan and decide within 14 days of initial activation that ExecuAI does not meet your team&apos;s workflow requirements, we will issue a 100% full refund—no questions asked.
              </p>
            </section>

            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                2. Instant Cancellation Policy
              </h2>
              <p>
                You can cancel your subscription at any time directly from your Executive Account Billing settings. Upon cancellation:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Your subscription will remain active until the end of the current billing cycle.</li>
                <li>No further recurring charges will occur.</li>
                <li>Your connected Gmail & Zoho OAuth tokens will remain safe until manual removal or data purging.</li>
              </ul>
            </section>

            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                3. Pro-Rated Billing & Seat Add-ons
              </h2>
              <p>
                When adding team members or delegated executive assistants mid-cycle:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Charges are pro-rated for the remaining days in your billing period.</li>
                <li>Removing seats applies a credit balance toward your next billing statement.</li>
              </ul>
            </section>

            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                4. How to Submit a Refund Request
              </h2>
              <p>
                To request a refund under our 14-day guarantee, contact billing support with your workspace email address:
              </p>
              <div className="p-4 rounded-xl bg-[#FFF2EC] border border-[#F15E1C]/30 text-xs text-[#0F172A]">
                <p className="font-bold text-[#F15E1C]">ExecuAI Billing Operations</p>
                <p>Email: <a href="mailto:billing@execuai.com" className="underline font-semibold">billing@execuai.com</a></p>
                <p>Response Time: Within 24 business hours</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
