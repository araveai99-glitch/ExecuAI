"use client";

import * as React from "react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    role: "CEO",
    inboxes: "1-3",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <PublicHeader />

      <main className="flex-1 pt-16">
        {/* HERO */}
        <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F]">
              Executive Consultation
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Request a Custom ExecuAI Platform Walkthrough
            </h1>
            <p className="text-sm sm:text-base text-[#475569] max-w-2xl mx-auto">
              Schedule a 1-on-1 walkthrough with our solutions team to review multi-mailbox setup, risk engine rules, and multi-tenant security architecture.
            </p>
          </div>
        </section>

        {/* FORM & INFO SECTION */}
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Form (7 cols) */}
              <div className="md:col-span-7">
                {submitted ? (
                  <Card variant="ai" className="p-8 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#2E936F] text-white flex items-center justify-center mx-auto text-xl font-bold">
                      ✓
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A]">Demo Request Received</h3>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      Thank you, {formData.name || "Executive"}. Our solutions team will reach out to {formData.email || "your email"} within 4 business hours to schedule your personalized ExecuAI walkthrough.
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setSubmitted(false)}
                    >
                      Submit Another Request
                    </Button>
                  </Card>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4"
                  >
                    <h3 className="text-lg font-bold text-[#0F172A]">Request Executive Consultation</h3>

                    <Input
                      label="Executive Full Name"
                      placeholder="Alexander Vance"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <Input
                      label="Work Email Address"
                      type="email"
                      placeholder="alexander@company.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                    <Select
                      label="Executive Role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      options={[
                        { value: "CEO", label: "CEO / Founder" },
                        { value: "COUNSEL", label: "General Counsel / Legal Partner" },
                        { value: "CFO", label: "CFO / Finance Director" },
                        { value: "MD", label: "Managing Director / Operations" },
                        { value: "OTHER", label: "Other Senior Leader" },
                      ]}
                    />

                    <Select
                      label="Number of Connected Mailboxes Needed"
                      value={formData.inboxes}
                      onChange={(e) => setFormData({ ...formData, inboxes: e.target.value })}
                      options={[
                        { value: "1-3", label: "1 - 3 Mailboxes (Gmail + Zoho)" },
                        { value: "4-8", label: "4 - 8 Mailboxes" },
                        { value: "9+", label: "9+ Enterprise Desk Mailboxes" },
                      ]}
                    />

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569]">
                        Message / Specific Triage Requirements
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Specify any custom financial thresholds, contract review needs, or multi-tenant requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-3 bg-white rounded-xl text-sm text-[#0F172A] border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#2E936F]"
                      />
                    </div>

                    <Button type="submit" variant="primary" className="w-full">
                      Submit Consultation Request
                    </Button>
                  </form>
                )}
              </div>

              {/* Info Sidebar (5 cols) */}
              <div className="md:col-span-5 space-y-6">
                <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
                  <h4 className="text-sm font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2">
                    Executive Support & Inquiries
                  </h4>
                  <div className="space-y-3 text-xs text-[#475569]">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#2E936F] text-[20px]">mail</span>
                      <div>
                        <span className="font-bold text-[#0F172A]">Direct Contact Email</span>
                        <p>executive-desk@execuai.io</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#2E936F] text-[20px]">shield_person</span>
                      <div>
                        <span className="font-bold text-[#0F172A]">Security Architecture Team</span>
                        <p>security-desk@execuai.io</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#2E936F] text-[20px]">schedule</span>
                      <div>
                        <span className="font-bold text-[#0F172A]">Response SLA</span>
                        <p>Within 4 business hours for senior executive inquiries.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#EFF4FF] border border-[#79d9b0]/30 space-y-2 text-xs">
                  <span className="font-bold text-[#2E936F] uppercase tracking-wider">Multi-Mailbox Demo Included</span>
                  <p className="text-[#0F172A] leading-relaxed">
                    Our live demonstration includes connecting test Gmail and Zoho mailboxes, triggering sample contract redlines, testing ₹50L financial thresholds, and editing AI drafts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
