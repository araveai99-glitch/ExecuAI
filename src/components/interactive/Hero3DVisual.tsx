"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function Hero3DVisual() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), {
    stiffness: 180,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] max-w-[680px] mx-auto perspective-2000 flex items-center justify-center p-4 sm:p-8 select-none"
    >
      {/* Background Soft Atmospheric Glowing Orbs strictly in approved colors */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-[#f15e1c]/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/4 right-10 w-[220px] h-[220px] bg-[#2e936f]/20 rounded-full blur-2xl pointer-events-none animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-10 left-10 w-[240px] h-[240px] bg-[#f7d7b0]/50 rounded-full blur-2xl pointer-events-none animate-pulse-glow" style={{ animationDelay: "3s" }} />

      {/* Main 3D Tilted Interactive Composite Canvas */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Central Core Glass Workspace Stage */}
        <div
          style={{ transform: "translateZ(0px)" }}
          className="w-full h-full rounded-3xl bg-white/70 backdrop-blur-2xl border border-[#f15e1c]/20 shadow-2xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] z-10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#f15e1c] animate-pulse" />
              <span className="text-xs font-bold text-[#0F172A] font-heading tracking-tight">
                ExecuAI 3D Triage & Safety Gate Engine
              </span>
            </div>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#2e936f]/10 text-[#2e936f] border border-[#2e936f]/20">
              3 Mailboxes Active
            </span>
          </div>

          {/* Central Animated Triage Payload */}
          <div className="my-auto space-y-3 z-10 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#64748B]">
              <span>Inbound Payload Analysis</span>
              <span className="text-[#f15e1c]">ISO 42001 Guardrails</span>
            </div>

            {/* Ingestion Stream Cards */}
            <div className="p-3 rounded-xl bg-white/90 border border-[#E2E8F0] shadow-xs flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 rounded bg-[#f15e1c] text-white font-bold text-[10px] flex items-center justify-center">G</span>
                <div className="truncate">
                  <div className="font-bold text-[#0F172A] truncate">Elena Rostova (Apex Law)</div>
                  <div className="text-[10px] text-[#64748B] truncate">Series B Definitive Agreements...</div>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="px-2 py-0.5 rounded bg-[#fff2ec] text-[#f15e1c] text-[10px] font-extrabold border border-[#f15e1c]/20">Critical</span>
                <span className="px-2 py-0.5 rounded bg-[#ffec69]/40 text-[#855d00] text-[10px] font-extrabold border border-[#fab60a]/30">High Risk</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/90 border border-[#E2E8F0] shadow-xs flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-6 h-6 rounded bg-[#2e936f] text-white font-bold text-[10px] flex items-center justify-center">Z</span>
                <div className="truncate">
                  <div className="font-bold text-[#0F172A] truncate">Marcus Vance (CFO Office)</div>
                  <div className="text-[10px] text-[#64748B] truncate">Q3 Cloud Infrastructure Audit ₹50L...</div>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="px-2 py-0.5 rounded bg-[#2e936f]/10 text-[#2e936f] text-[10px] font-extrabold border border-[#2e936f]/20">Finance</span>
                <span className="px-2 py-0.5 rounded bg-[#f7d7b0]/50 text-[#0F172A] text-[10px] font-extrabold">Review Required</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar Metrics */}
          <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B] z-10 font-medium">
            <span>Unified stream: ceo@company.com</span>
            <span className="text-[#2e936f] font-bold">87.1% AI Approval Rate</span>
          </div>
        </div>

        {/* Floating 3D Layer 1: Safety Gate Alert Badge (Left foreground) */}
        <motion.div
          style={{ transform: "translateZ(65px)" }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -left-4 sm:-left-8 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#f15e1c]/40 shadow-2xl max-w-[240px] z-20 space-y-2 glow-orange"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#f15e1c]">
              Safety Gate Active
            </span>
            <span className="w-2 h-2 rounded-full bg-[#f15e1c] animate-ping" />
          </div>
          <div className="text-xs font-bold text-[#0F172A] leading-tight">
            Financial Commitment: ₹50,00,000 Detected
          </div>
          <div className="text-[10px] text-[#64748B] flex items-center gap-1">
            <span className="material-symbols-outlined text-[#f15e1c] text-[14px]">lock</span>
            <span>Autonomous reply blocked</span>
          </div>
        </motion.div>

        {/* Floating 3D Layer 2: 3D Classification Cube / Pill (Right top foreground) */}
        <motion.div
          style={{ transform: "translateZ(85px)" }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -top-2 -right-4 sm:-right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#2e936f]/40 shadow-2xl z-20 space-y-2 glow-green"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#2e936f]/10 text-[#2e936f] font-bold flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div>
              <div className="text-xs font-extrabold text-[#0F172A]">3D Email Triage</div>
              <div className="text-[10px] text-[#2e936f] font-bold">Priority • Intent • Risk</div>
            </div>
          </div>
          <div className="flex gap-1.5 pt-1">
            <span className="px-2 py-0.5 rounded bg-[#f7d7b0] text-[#f15e1c] text-[9px] font-extrabold">Legal</span>
            <span className="px-2 py-0.5 rounded bg-[#2e936f]/10 text-[#2e936f] text-[9px] font-extrabold">Verified</span>
          </div>
        </motion.div>

        {/* Floating 3D Layer 3: AI Draft Synthesizer Card (Bottom right foreground) */}
        <motion.div
          style={{ transform: "translateZ(75px)" }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-6 -right-4 sm:-right-8 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#fab60a]/40 shadow-2xl max-w-[260px] z-20 space-y-2.5 glow-yellow"
        >
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0F172A]">
              <span className="material-symbols-outlined text-[#fab60a] text-[18px]">auto_awesome</span>
              <span>AI Draft Prepared</span>
            </div>
            <span className="text-[9px] font-bold text-[#855d00] bg-[#ffec69]/50 px-2 py-0.5 rounded">
              Formal Tone
            </span>
          </div>
          <p className="text-[11px] text-[#475569] line-clamp-2 leading-relaxed italic font-serif">
            "We have reviewed clause 4.2 regarding indemnity limits..."
          </p>
          <div className="flex items-center justify-between text-[10px] pt-1">
            <span className="text-[#2e936f] font-bold">Human Approval Pending</span>
            <span className="text-[#f15e1c] font-bold">Review & Send</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
