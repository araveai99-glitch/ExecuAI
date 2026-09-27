import * as React from "react";
import type { Metadata } from "next";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cookie Policy | ExecuAI Transparency",
  description:
    "Learn how ExecuAI uses essential, preference, and performance cookies to maintain secure sessions without invasive cross-site advertising trackers.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <PublicHeader />

      <main id="main-content" className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <Breadcrumbs items={[{ label: "Cookie Policy" }]} />

        <div className="space-y-8 mt-6">
          <div className="border-b border-[#E2E8F0] pb-6 space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-heading tracking-tight">
              Cookie & Tracking Transparency Policy
            </h1>
            <p className="text-sm text-[#64748B]">
              Last updated: September 27, 2026
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-8 text-[#334155]">
            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files stored on your browser or device when you interact with websites. ExecuAI uses cookies strictly to deliver secure authentication, remember workspace preferences, and ensure system stability.
              </p>
            </section>

            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                2. Categories of Cookies We Use
              </h2>
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#0F172A] text-sm">Essential & Security Cookies</h3>
                    <span className="text-[10px] uppercase font-bold text-[#2E936F] bg-[#E8F4F0] px-2 py-0.5 rounded">Always Active</span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-1">
                    Required for OAuth session verification, CSRF token security, and keeping your workspace authenticated safely.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#0F172A] text-sm">Preference & UI State Cookies</h3>
                    <span className="text-[10px] uppercase font-bold text-[#F15E1C] bg-[#FFF2EC] px-2 py-0.5 rounded">User Configurable</span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-1">
                    Stores your Safety Gate threshold sliders, sidebar state, and UI theme settings across sessions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#0F172A] text-sm">Anonymous Telemetry Cookies</h3>
                    <span className="text-[10px] uppercase font-bold text-[#F15E1C] bg-[#FFF2EC] px-2 py-0.5 rounded">User Configurable</span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-1">
                    Helps us measure page performance and error rates without collecting personally identifiable information (PII).
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                3. Zero Third-Party Advertising Trackers
              </h2>
              <p>
                ExecuAI does <strong>NOT</strong> embed cross-site tracking pixels, third-party advertising cookies, or data-broker retargeting scripts. Your browsing activity on ExecuAI stays strictly inside ExecuAI.
              </p>
            </section>

            <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] font-heading">
                4. How to Control Your Preferences
              </h2>
              <p>
                You can manage or adjust your cookie preferences at any time using our floating Cookie Preferences tool or by adjusting your browser settings to block non-essential cookies.
              </p>
            </section>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
