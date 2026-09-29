"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { TiltCard } from "@/components/interactive/TiltCard";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { IntentBadge } from "@/components/ui/IntentBadge";

export interface UseCaseData {
  slug: string;
  role: string;
  icon: string;
  badgeText: string;
  headline: string;
  description: string;
  sampleEmail: {
    senderName: string;
    senderEmail: string;
    senderRole: string;
    subject: string;
    body: string;
    priority: "CRITICAL" | "URGENT" | "IMPORTANT" | "NORMAL" | "LOW" | "SPAM";
    intent: "LEGAL" | "FINANCE" | "CLIENT" | "MEETING" | "HR" | "INTERNAL" | "SALES" | "OTHER" | string;
    risk: "HIGH_RISK" | "REVIEW_REQUIRED" | "CONFIDENTIAL" | "SAFE";
    exposure?: string;
    safetyOutcome: string;
  };
  howItWorks: Array<{ step: string; title: string; desc: string; icon: string }>;
  keyFeatures: Array<{ title: string; desc: string; icon: string; badge?: string }>;
  benefits: Array<{ metric: string; label: string; detail: string }>;
}

export const UseCaseDetailLayout: React.FC<{ data: UseCaseData }> = ({ data }) => {
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);

  // Mouse Parallax for Hero Visual
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxX = useSpring(useTransform(mouseX, [-400, 400], [-10, 10]), { stiffness: 150, damping: 20 });
  const parallaxY = useSpring(useTransform(mouseY, [-400, 400], [-10, 10]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A] overflow-x-hidden"
    >
      <PublicHeader />

      <main id="main-content" className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        {/* Navigation Bar & Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
          <Breadcrumbs
            items={[
              { label: "Executive Use Cases", href: "/use-cases" },
              { label: data.role },
            ]}
          />

          <button
            onClick={() => router.push("/use-cases")}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#CBD5E1] text-xs font-bold text-[#0F172A] hover:border-[#F15E1C] hover:text-[#F15E1C] transition-all cursor-pointer shadow-2xs group w-fit"
          >
            <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span>Back to Use Cases</span>
          </button>
        </div>

        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal variant="slide-right" className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-[#FFF2EC] border border-[#F15E1C]/30 text-xs font-extrabold uppercase tracking-widest text-[#F15E1C] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">{data.icon}</span>
                {data.badgeText}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] font-heading tracking-tight leading-tight">
              {data.headline}
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              {data.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href="/auth/signup">
                <MagneticButton
                  variant="primary"
                  size="md"
                  icon={<span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
                >
                  Get Started for {data.role}
                </MagneticButton>
              </Link>
              <Link href="/features">
                <Button variant="secondary" size="md">
                  Explore Features →
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          {/* Interactive Parallax 3D Card Visual */}
          <ScrollReveal variant="slide-left" className="lg:col-span-6">
            <motion.div style={{ x: parallaxX, y: parallaxY }}>
              <TiltCard glowColor="orange" className="p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 text-xs">
                  <div className="flex items-center gap-2 font-bold text-[#0F172A]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F15E1C] animate-ping" />
                    <span>Real-Time Inbound Payload Simulation</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E8F4F0] text-[#2E936F] font-bold text-[10px] uppercase border border-[#2E936F]/30">
                    Safety Gate Active
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-sm">{data.sampleEmail.senderName}</h4>
                      <p className="text-[#64748B] text-[11px]">{data.sampleEmail.senderRole}</p>
                    </div>
                    <span className="text-[#F15E1C] font-mono text-[10px]">&lt;{data.sampleEmail.senderEmail}&gt;</span>
                  </div>

                  <p className="font-bold text-[#0F172A]">{data.sampleEmail.subject}</p>
                  <p className="text-[#475569] line-clamp-2 leading-relaxed">{data.sampleEmail.body}</p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <PriorityBadge priority={data.sampleEmail.priority} size="sm" />
                    <IntentBadge intent={data.sampleEmail.intent} size="sm" />
                    <RiskBadge risk={data.sampleEmail.risk} size="sm" />
                    {data.sampleEmail.exposure && (
                      <span className="px-2 py-0.5 rounded bg-[#FEF2F2] text-[#DC2626] font-bold text-[10px] border border-[#FDA4AF]">
                        Exposure: {data.sampleEmail.exposure}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FFF2EC] border border-[#F15E1C]/30 text-xs text-[#0F172A] space-y-1">
                  <div className="font-bold text-[#F15E1C] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Zero-Trust Policy Outcome:
                  </div>
                  <p className="text-[11px] text-[#475569] leading-relaxed font-medium">
                    {data.sampleEmail.safetyOutcome}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          </ScrollReveal>
        </section>

        {/* HOW THIS USE CASE WORKS (Interactive Animated Workflow) */}
        <section className="space-y-8 pt-6 border-t border-[#E2E8F0]">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F15E1C]">Workflow Architecture</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] font-heading">
              How This Use Case Works
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Step-by-step execution path from raw email ingestion to human clearance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.howItWorks.map((stepItem, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-4 ${
                    isActive
                      ? "bg-white border-[#F15E1C] shadow-md ring-2 ring-[#F15E1C]/20 -translate-y-1"
                      : "bg-white/80 border-[#E2E8F0] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#FFF2EC] text-[#F15E1C] text-xs font-extrabold border border-[#FDE8DF]">
                      {stepItem.step}
                    </span>
                    <span className={`material-symbols-outlined text-[24px] ${isActive ? "text-[#F15E1C]" : "text-[#94A3B8]"}`}>
                      {stepItem.icon}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F172A] font-heading">{stepItem.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed">{stepItem.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* RELEVANT FEATURES (Tilt Cards Grid) */}
        <section className="space-y-8 pt-6 border-t border-[#E2E8F0]">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E936F]">Core Capabilities</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] font-heading">
              Key Features for {data.role}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.keyFeatures.map((feat, idx) => (
              <TiltCard key={idx} glowColor="green" className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8F4F0] text-[#2E936F] flex items-center justify-center text-xl font-bold">
                  <span className="material-symbols-outlined text-[22px]">{feat.icon}</span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] font-heading">{feat.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed">{feat.desc}</p>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* QUANTIFIABLE OUTCOMES / BENEFITS */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E2E8F0] shadow-md space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F15E1C]">Measurable Impact</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-heading">
              Quantifiable ROI for Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {data.benefits.map((b, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#F15E1C] font-heading">{b.metric}</div>
                <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">{b.label}</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">{b.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#0F172A] text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight">
              Ready to Upgrade Your Executive Email Workflow?
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
                  View All Use Cases
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};
