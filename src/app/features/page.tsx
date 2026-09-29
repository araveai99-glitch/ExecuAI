"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { TiltCard } from "@/components/interactive/TiltCard";
import { ScrollReveal, ScrollStaggerContainer } from "@/components/interactive/ScrollReveal";

export default function FeaturesPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxX = useSpring(useTransform(mouseX, [-500, 500], [-15, 15]), { stiffness: 150, damping: 20 });
  const parallaxY = useSpring(useTransform(mouseY, [-500, 500], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const featurePillars = [
    {
      num: "01",
      icon: "hub",
      title: "Multi-Mailbox OAuth Aggregator",
      badge: "OAuth 2.0 PKCE",
      desc: "Connect multiple Google Workspace, Gmail, and Zoho Mail accounts into a single synchronized SaaS stream. Read and Draft scopes allow ExecuAI to analyze payloads and prepare drafts without holding full password or auto-sending permissions.",
      bullets: [
        "Concurrent multi-account Gmail & Zoho stream synchronization",
        "Preserves origin headers, account labels, and thread contexts",
        "OAuth token encryption using AES-256 GCM algorithms",
      ],
    },
    {
      num: "02",
      icon: "psychology",
      title: "3D Triage & Intent Engine",
      badge: "ExecuAI Certified",
      desc: "Analyzes every email across three distinct dimensions: Priority (Critical/Urgent/Low), Intent (Legal/Finance/Client/HR/Meeting), and Risk Gate (High Risk/Review Required/Safe).",
      bullets: [
        "Parses contractual obligations, pricing quotes, and meeting slots",
        "Prevents unread message overload in high-volume executive inboxes",
        "Calculates priority metrics dynamically from email text",
      ],
    },
    {
      num: "03",
      icon: "security",
      title: "Zero-Trust Safety Gate & Decision Center",
      badge: "ISO 42001 Protocol",
      desc: "Emails containing binding legal language, financial quotes above thresholds (e.g., ₹10 Lakhs or $50k), or NDA agreements automatically trigger the Safety Gate.",
      bullets: [
        "Autonomous sending is programmatically blocked on high-risk items",
        "Routes gated communications to the Decision Center for 1-click review",
        "Plain-language forensic rationale explains why AI gated each message",
      ],
    },
    {
      num: "04",
      icon: "record_voice_over",
      title: "Executive Voice Synthesis & Draft Studio",
      badge: "Human Clearance Required",
      desc: "Generates tailored email response drafts matching your executive salutation, tone, brevity, and sign-off preferences while enforcing safety guardrails.",
      bullets: [
        "Adjust response length (Short/Medium/Detailed) and tone on the fly",
        "Drafts are saved directly to your authenticated Gmail account",
        "Controlled send dispatch via official Gmail API endpoints",
      ],
    },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A] overflow-x-hidden"
    >
      <PublicHeader />

      <main id="main-content" className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        <Breadcrumbs items={[{ label: "Features & Capabilities" }]} />

        {/* HERO SECTION WITH PARALLAX */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal variant="slide-right" className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF2EC] border border-[#F15E1C]/30 text-xs font-bold uppercase tracking-widest text-[#F15E1C]">
              <span className="w-2 h-2 rounded-full bg-[#F15E1C] animate-pulse" />
              Platform Capabilities & AI Architecture
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] font-heading tracking-tight leading-tight">
              Engineered for Precision Executive Communication
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              ExecuAI combines multi-mailbox ingestion, 3-dimensional triage, forensic explainability, and an application-level Safety Gate to streamline high-volume inboxes safely.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href="/auth/signup">
                <MagneticButton variant="primary" size="md">
                  Get Started Free
                </MagneticButton>
              </Link>
              <Link href="/how-it-works">
                <Button variant="secondary" size="md">
                  How It Works →
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slide-left" className="lg:col-span-6">
            <motion.div style={{ x: parallaxX, y: parallaxY }}>
              <TiltCard glowColor="orange" className="p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 text-xs">
                  <span className="font-bold text-[#0F172A]">Executive Feature Studio</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E8F4F0] text-[#2E936F] font-bold text-[10px] uppercase">
                    Platform Active
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#F15E1C] text-white font-bold flex items-center justify-center">G</span>
                      <div>
                        <div className="font-bold text-[#0F172A]">Google Workspace API</div>
                        <div className="text-[10px] text-[#64748B]">Gmail OAuth 2.0 PKCE Stream</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#2E936F]">Verified</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#2E936F] text-white font-bold flex items-center justify-center">Z</span>
                      <div>
                        <div className="font-bold text-[#0F172A]">Zoho Enterprise API</div>
                        <div className="text-[10px] text-[#64748B]">Zoho Mail Ingestion Engine</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#2E936F]">Verified</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFF2EC] border border-[#F15E1C]/30 text-xs font-bold text-[#F15E1C] flex items-center justify-between">
                    <span>Safety Gate Barrier:</span>
                    <span>Zero Unauthorized Sends</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </ScrollReveal>
        </section>

        {/* FEATURE PILLARS GRID */}
        <section className="space-y-8 pt-8 border-t border-[#E2E8F0]">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E936F]">Four Core Pillars</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] font-heading">
              Platform Features & Guardrails
            </h2>
          </div>

          <ScrollStaggerContainer className="space-y-8">
            {featurePillars.map((feat, idx) => (
              <TiltCard key={idx} glowColor={idx % 2 === 0 ? "orange" : "green"} className="p-6 sm:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FFF2EC] text-[#F15E1C] font-extrabold flex items-center justify-center border border-[#FDE8DF] text-sm">
                        {feat.num}
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-bold text-[#0F172A]">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-heading">{feat.title}</h3>
                    <p className="text-sm text-[#475569] leading-relaxed">{feat.desc}</p>

                    <ul className="space-y-2 text-xs text-[#0F172A] font-semibold pt-1">
                      {feat.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-[#E8F4F0] text-[#2E936F] font-bold flex items-center justify-center text-[10px]">
                            ✓
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-5 p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0] font-bold text-[#0F172A]">
                      <span>Capability Demonstration</span>
                      <span className="material-symbols-outlined text-[#F15E1C] text-[18px]">{feat.icon}</span>
                    </div>
                    <p className="text-[#64748B] leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </ScrollStaggerContainer>
        </section>

        {/* BOTTOM CTA */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#0F172A] text-white text-center space-y-6 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight">
              Ready to Upgrade Your Executive Email Setup?
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Connect your Gmail account in 60 seconds with official Google OAuth 2.0 PKCE authentication.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/auth/signup">
                <MagneticButton variant="primary" size="md">
                  Get Started Free Today
                </MagneticButton>
              </Link>
              <Link href="/use-cases">
                <Button variant="secondary" size="md">
                  View Executive Use Cases
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
