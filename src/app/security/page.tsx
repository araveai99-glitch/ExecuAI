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

export default function SecurityPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxX = useSpring(useTransform(mouseX, [-400, 400], [-10, 10]), { stiffness: 150, damping: 20 });
  const parallaxY = useSpring(useTransform(mouseY, [-400, 400], [-10, 10]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const securityPillars = [
    {
      icon: "gavel",
      title: "1. Deterministic Safety Gate Protocol",
      desc: "Financial commitments above configured thresholds (e.g. ₹10 Lakhs or $50k), contracts, NDAs, legal notices, and corporate governance inquiries automatically lock autonomous transmission and route directly to your Decision Center.",
      badge: "Zero-Trust Active",
      badgeColor: "bg-[#FFF2EC] text-[#F15E1C]",
    },
    {
      icon: "key",
      title: "2. OAuth 2.0 PKCE Token Isolation",
      desc: "You never enter or store Gmail or Zoho passwords on ExecuAI. Authentication uses official Google and Zoho OAuth 2.0 authorization with least-privilege Read & Draft scopes.",
      badge: "Least Privilege Scopes",
      badgeColor: "bg-[#E8F4F0] text-[#2E936F]",
    },
    {
      icon: "database",
      title: "3. Zero AI Foundation Model Training",
      desc: "Customer emails and metadata are strictly isolated per tenant using PostgreSQL Row Level Security (RLS). Your executive data is NEVER used to train public LLM foundation models.",
      badge: "Tenant Isolated RLS",
      badgeColor: "bg-[#FEF6E0] text-[#855D00]",
    },
    {
      icon: "receipt_long",
      title: "4. Immutable Cryptographic Audit Logs",
      desc: "Every email ingestion, 3D classification, Safety Gate trigger, draft edit, and executive dispatch action is recorded in an immutable audit log with cryptographic SHA-256 hashes.",
      badge: "Cryptographic Proof",
      badgeColor: "bg-[#FFF2EC] text-[#F15E1C]",
    },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A] overflow-x-hidden"
    >
      <PublicHeader />

      <main id="main-content" className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        <Breadcrumbs items={[{ label: "Security & Governance" }]} />

        {/* HERO SECTION WITH PARALLAX & SHIELD VISUAL */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal variant="slide-right" className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F4F0] border border-[#2E936F]/30 text-xs font-bold uppercase tracking-widest text-[#2E936F]">
              <span className="w-2 h-2 rounded-full bg-[#2E936F] animate-pulse" />
              ISO 42001 & OAuth 2.0 Governance
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] font-heading tracking-tight leading-tight">
              Security Architecture & Safety Gate Protocol
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              ExecuAI operates under a zero-trust model: AI prepares draft responses, but human executives retain 100% control over email execution and financial dispatch.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href="/auth/signup">
                <MagneticButton variant="primary" size="md">
                  Get Started Free
                </MagneticButton>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="md">
                  Request Security Briefing →
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          {/* Interactive Shield / Security Visual Card */}
          <ScrollReveal variant="slide-left" className="lg:col-span-6">
            <motion.div style={{ x: parallaxX, y: parallaxY }}>
              <TiltCard glowColor="green" className="p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 text-xs">
                  <div className="flex items-center gap-2 font-bold text-[#0F172A]">
                    <span className="material-symbols-outlined text-[#2E936F] text-[18px]">verified_user</span>
                    <span>Zero-Trust Shield Visual</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E8F4F0] text-[#2E936F] font-bold text-[10px] uppercase">
                    DKIM & DMARC Enforced
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0F172A]">Gmail OAuth 2.0 Session</span>
                    <span className="text-[#2E936F] font-bold">AES-256 Encrypted</span>
                  </div>
                  <div className="flex items-center justify-between text-[#64748B]">
                    <span>Scope Isolation:</span>
                    <span>gmail.readonly, gmail.compose</span>
                  </div>
                  <div className="flex items-center justify-between text-[#64748B]">
                    <span>Password Storage:</span>
                    <span className="font-bold text-[#0F172A]">EXPLICITLY EXCLUDED</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FFF2EC] border border-[#F15E1C]/30 text-xs text-[#0F172A] space-y-1">
                  <div className="font-bold text-[#F15E1C] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                    Autonomous Send Protection:
                  </div>
                  <p className="text-[11px] text-[#475569] leading-relaxed">
                    Zero autonomous sends are permitted for legal contracts or financial quotes above threshold. Human clearance required.
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          </ScrollReveal>
        </section>

        {/* 4 SECURITY PILLARS GRID */}
        <section className="space-y-8 pt-8 border-t border-[#E2E8F0]">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E936F]">Institutional Trust</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] font-heading">
              Four Pillars of Enterprise Protection
            </h2>
          </div>

          <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityPillars.map((pillar, idx) => (
              <TiltCard key={idx} glowColor={idx % 2 === 0 ? "green" : "orange"} className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F4F0] text-[#2E936F] font-bold flex items-center justify-center border border-[#2E936F]/20 text-lg shadow-xs">
                    <span className="material-symbols-outlined text-[22px]">{pillar.icon}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${pillar.badgeColor}`}>
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0F172A] font-heading">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{pillar.desc}</p>
              </TiltCard>
            ))}
          </ScrollStaggerContainer>
        </section>

        {/* BOTTOM CONTACT BOX */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E2E8F0] shadow-md text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-heading">
            Need a Formal Enterprise Security Briefing?
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] max-w-lg mx-auto leading-relaxed">
            Our Security & Compliance team provides SOC 2 Type II reports, ISO 42001 documentation, and custom enterprise SLA reviews.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact">
              <Button variant="primary" size="sm">
                Request Security Briefing →
              </Button>
            </Link>
            <Link href="/privacy">
              <Button variant="secondary" size="sm">
                Read Privacy Policy
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
