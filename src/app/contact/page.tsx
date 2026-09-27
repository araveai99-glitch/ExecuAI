"use client";

import * as React from "react";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { ParticleCanvas } from "@/components/interactive/ParticleCanvas";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";
import { TiltCard } from "@/components/interactive/TiltCard";
import { MagneticButton } from "@/components/interactive/MagneticButton";

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
    <div className="min-h-screen bg-[#090D16] flex flex-col font-sans text-white relative overflow-hidden selection:bg-[#f15e1c]/30">
      <ParticleCanvas particleCount={35} className="opacity-30" />
      <PublicHeader />

      <main className="flex-1 pt-24 relative z-10">
        {/* HERO */}
        <section className="py-20 sm:py-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#f15e1c]/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <ScrollReveal direction="down">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f15e1c]/10 border border-[#f15e1c]/30 text-xs font-bold uppercase tracking-widest text-[#f15e1c] glow-orange">
                <span className="w-2 h-2 rounded-full bg-[#f15e1c] animate-pulse" />
                Executive Consultation
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight max-w-4xl mx-auto">
                Request a Custom <span className="bg-gradient-to-r from-[#f15e1c] via-[#fab60a] to-[#2e936f] bg-clip-text text-transparent">ExecuAI Walkthrough</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Schedule a 1-on-1 walkthrough with our solutions team to review multi-mailbox setup, risk engine rules, and multi-tenant security architecture.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* FORM & INFO SECTION */}
        <section className="py-16 sm:py-24 border-t border-slate-800/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Form (7 cols) */}
              <div className="md:col-span-7">
                <ScrollReveal direction="right">
                  {submitted ? (
                    <TiltCard className="p-8 rounded-3xl bg-slate-900/90 border border-[#2e936f]/40 backdrop-blur-xl shadow-2xl text-center space-y-5 glow-green">
                      <div className="w-14 h-14 rounded-full bg-[#2e936f] text-white flex items-center justify-center mx-auto text-2xl font-bold shadow-lg">
                        ✓
                      </div>
                      <h3 className="text-2xl font-bold text-white font-heading">Demo Request Received</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Thank you, <strong className="text-white">{formData.name || "Executive"}</strong>. Our solutions team will reach out to <strong className="text-white">{formData.email || "your email"}</strong> within 4 business hours to schedule your personalized ExecuAI walkthrough.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-all"
                      >
                        Submit Another Request
                      </button>
                    </TiltCard>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-5 glow-orange"
                    >
                      <h3 className="text-xl font-bold text-white font-heading border-b border-slate-800 pb-3">Request Executive Consultation</h3>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Executive Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Alexander Vance"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#f15e1c] focus:ring-1 focus:ring-[#f15e1c] transition-all placeholder:text-slate-600"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Work Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="alexander@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#f15e1c] focus:ring-1 focus:ring-[#f15e1c] transition-all placeholder:text-slate-600"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Executive Role</label>
                          <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#f15e1c] transition-all"
                          >
                            <option value="CEO">CEO / Founder</option>
                            <option value="COUNSEL">General Counsel / Legal</option>
                            <option value="CFO">CFO / Finance Director</option>
                            <option value="MD">Managing Director / Operations</option>
                            <option value="OTHER">Other Senior Leader</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Mailbox Volume</label>
                          <select
                            value={formData.inboxes}
                            onChange={(e) => setFormData({ ...formData, inboxes: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#f15e1c] transition-all"
                          >
                            <option value="1-3">1 - 3 Mailboxes (Gmail + Zoho)</option>
                            <option value="4-8">4 - 8 Mailboxes</option>
                            <option value="9+">9+ Enterprise Desk Mailboxes</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Triage & Governance Requirements</label>
                        <textarea
                          rows={3}
                          placeholder="Specify custom financial thresholds, contract review needs, or multi-tenant setup..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-[#f15e1c] focus:ring-1 focus:ring-[#f15e1c] transition-all placeholder:text-slate-600"
                        />
                      </div>

                      <MagneticButton
                        type="submit"
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#f15e1c] to-[#fab60a] text-white font-bold text-sm shadow-xl hover:shadow-[#f15e1c]/30 transition-all mt-2"
                      >
                        Submit Consultation Request
                      </MagneticButton>
                    </form>
                  )}
                </ScrollReveal>
              </div>

              {/* Info Sidebar (5 cols) */}
              <div className="md:col-span-5 space-y-6">
                <ScrollReveal direction="left">
                  <TiltCard className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-6">
                    <h4 className="text-base font-bold text-white font-heading border-b border-slate-800 pb-3">
                      Executive Support & Inquiries
                    </h4>
                    <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#f15e1c] text-[22px]">mail</span>
                        <div>
                          <div className="font-bold text-white">Direct Contact Email</div>
                          <div className="text-slate-400">executive-desk@execuai.io</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#f15e1c] text-[22px]">shield_person</span>
                        <div>
                          <div className="font-bold text-white">Security Architecture Team</div>
                          <div className="text-slate-400">security-desk@execuai.io</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#2e936f] text-[22px]">schedule</span>
                        <div>
                          <div className="font-bold text-white">Response SLA</div>
                          <div className="text-slate-400">Within 4 business hours for senior executive inquiries.</div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={0.1}>
                  <div className="p-6 rounded-3xl bg-slate-900/60 border border-[#f15e1c]/30 backdrop-blur-md space-y-2 text-xs">
                    <span className="font-bold text-[#f15e1c] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#f15e1c] animate-ping" />
                      Multi-Mailbox Demo Included
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      Our live demonstration includes connecting test Gmail and Zoho mailboxes, triggering sample contract redlines, testing ₹50L financial thresholds, and editing AI drafts.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}

