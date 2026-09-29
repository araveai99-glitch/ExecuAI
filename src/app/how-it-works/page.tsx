"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { TiltCard } from "@/components/interactive/TiltCard";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = React.useState<number>(1);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxX = useSpring(useTransform(mouseX, [-400, 400], [-10, 10]), { stiffness: 150, damping: 20 });
  const parallaxY = useSpring(useTransform(mouseY, [-400, 400], [-10, 10]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const steps = [
    {
      id: 1,
      num: "01",
      title: "CONNECT",
      subtitle: "OAuth 2.0 PKCE Synchronization",
      desc: "Link your Gmail and Zoho Mail accounts securely using Google OAuth 2.0 PKCE. No passwords are ever requested or stored; ExecuAI uses scoped Read & Draft permissions.",
      icon: "hub",
      previewTitle: "Mailbox Connection Matrix",
      previewDetail: "Gmail Work + Personal + Zoho Mail Synchronized",
      badge: "OAuth PKCE Active",
      badgeColor: "bg-[#E8F4F0] text-[#2E936F]",
    },
    {
      id: 2,
      num: "02",
      title: "SYNC & INGEST",
      subtitle: "Real-Time Payload Streaming",
      desc: "ExecuAI continuously syncs incoming messages from your authenticated Gmail account, extracting senders, subjects, attachments, and message bodies in real time.",
      icon: "sync",
      previewTitle: "Real-Time Gmail Stream",
      previewDetail: "Incoming Gmail payloads ingested & normalized",
      badge: "Real-Time Ingestion",
      badgeColor: "bg-[#EFF6FF] text-[#2563EB]",
    },
    {
      id: 3,
      num: "03",
      title: "AI 3D ANALYSIS",
      subtitle: "Priority, Intent & Risk Gate Scoring",
      desc: "Every email is analyzed across 3 dimensions: Priority Level (Critical/Urgent/Low), Intent Category (Legal/Finance/Client/HR/Meeting), and Risk Gate.",
      icon: "psychology",
      previewTitle: "3D Matrix Classification",
      previewDetail: "Contract Indemnity Clause → High Risk Gate Detected",
      badge: "ExecuAI 3D Triage",
      badgeColor: "bg-[#FFF2EC] text-[#F15E1C]",
    },
    {
      id: 4,
      num: "04",
      title: "EXECUTIVE ACTION",
      subtitle: "Human Clearance & Controlled Send",
      desc: "High-risk items engage the Safety Gate, locking autonomous sends and routing to the Decision Center. Review AI drafts and clear them with 1-click dispatch.",
      icon: "task_alt",
      previewTitle: "Executive Dispatch Studio",
      previewDetail: "Draft approved by Executive → Sent via Gmail API",
      badge: "Human Cleared",
      badgeColor: "bg-[#FEF6E0] text-[#855D00]",
    },
  ];

  const current = steps.find((s) => s.id === activeStep) || steps[0];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A] overflow-x-hidden"
    >
      <PublicHeader />

      <main id="main-content" className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        <Breadcrumbs items={[{ label: "How It Works" }]} />

        {/* HERO SECTION */}
        <ScrollReveal variant="fade-up" className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF2EC] border border-[#F15E1C]/30 text-xs font-bold uppercase tracking-widest text-[#F15E1C]">
            <span className="w-2 h-2 rounded-full bg-[#F15E1C] animate-pulse" />
            Interactive 4-Step Architecture
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] font-heading tracking-tight leading-tight">
            How ExecuAI Triages & Governs Executive Inboxes
          </h1>
          <p className="text-base text-[#475569] leading-relaxed">
            Explore how ExecuAI ingests, classifies, gates, and dispatches executive emails with zero-trust security.
          </p>
        </ScrollReveal>

        {/* WORKFLOW PROGRESSION BAR & CONNECTING LINE */}
        <section className="relative space-y-6">
          {/* Animated Progress Line */}
          <div className="hidden sm:block absolute top-1/2 left-10 right-10 h-1 bg-[#E2E8F0] -translate-y-1/2 z-0 rounded-full">
            <motion.div
              className="h-full bg-[#F15E1C] rounded-full"
              initial={{ width: "25%" }}
              animate={{ width: `${(activeStep / steps.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>

          {/* STEP BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
            {steps.map((s) => {
              const isActive = activeStep === s.id;
              return (
                <motion.button
                  key={s.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(s.id)}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isActive
                      ? "bg-white border-[#F15E1C] ring-2 ring-[#F15E1C]/30 shadow-lg -translate-y-1"
                      : "bg-white/80 border-[#E2E8F0] hover:border-[#F15E1C]/40 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-extrabold px-2.5 py-1 rounded-lg transition-colors ${
                        isActive ? "bg-[#F15E1C] text-white" : "bg-[#F8FAFC] text-[#64748B]"
                      }`}
                    >
                      {s.num}
                    </span>
                    <span
                      className={`material-symbols-outlined text-[24px] ${
                        isActive ? "text-[#F15E1C]" : "text-[#94A3B8]"
                      }`}
                    >
                      {s.icon}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0F172A] font-heading">{s.title}</div>
                    <div className="text-[11px] text-[#64748B] truncate">{s.subtitle}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* ACTIVE STEP DETAILS PANEL WITH PARALLAX */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div style={{ x: parallaxX, y: parallaxY }}>
              <TiltCard glowColor="orange" className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-[#F15E1C] bg-[#FFF2EC] px-3 py-1 rounded-full border border-[#F15E1C]/30">
                      Step {current.num} of 04
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${current.badgeColor}`}>
                      {current.badge}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-heading">{current.title}</h2>
                  <p className="text-sm text-[#475569] leading-relaxed">{current.desc}</p>

                  <div className="pt-2">
                    <Link href="/auth/signup">
                      <MagneticButton variant="primary" size="md">
                        Try This Step Live →
                      </MagneticButton>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-6 p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 text-xs">
                    <span className="font-bold uppercase tracking-wider text-[#94A3B8]">{current.previewTitle}</span>
                    <span className="material-symbols-outlined text-[18px] text-[#2E936F]">verified</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2 text-xs">
                    <div className="font-bold text-[#0F172A]">{current.previewDetail}</div>
                    <p className="text-[11px] text-[#64748B]">
                      Automated verification executed. Policy enforcement criteria checked against ISO 42001 governance specs.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* BOTTOM CTA */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#0F172A] text-white text-center space-y-6 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight">
              Ready to Experience ExecuAI in Action?
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
