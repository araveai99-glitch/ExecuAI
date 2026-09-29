"use client";

import * as React from "react";
import { UseCaseDetailLayout, UseCaseData } from "@/components/use-cases/UseCaseDetailLayout";

const ceoData: UseCaseData = {
  slug: "ceo-founders",
  role: "CEOs & Founders",
  icon: "engineering",
  badgeText: "Chief Executive Officer Suite",
  headline: "Filter Out Noise & Protect CEO Focus Time",
  description:
    "CEOs receive hundreds of daily emails across personal, investor, and corporate Gmail accounts. ExecuAI isolates urgent operational decisions while auto-drafting routine executive communications.",
  sampleEmail: {
    senderName: "Elena Rostova",
    senderEmail: "elena@apexlaw.com",
    senderRole: "General Counsel, Apex Law Group",
    subject: "Series B Definitive Agreements & IP Indemnity Clause Review",
    body: "Dear Alexander,\n\nI have completed review of the Series B Definitive Agreements. Section 14.2 contains an uncapped IP indemnity clause that transfers unlimited liability to our balance sheet.\n\nPlease confirm if you would like me to redline this section immediately.",
    priority: "CRITICAL",
    intent: "LEGAL",
    risk: "HIGH_RISK",
    exposure: "Equity & Governance",
    safetyOutcome:
      "Automated reply blocked to protect equity valuation. Draft reply prepared proposing $10M liability cap under Section 14.2.",
  },
  howItWorks: [
    {
      step: "Step 01",
      title: "Multi-Account Sync",
      desc: "Connect corporate Gmail, investor Google Workspace, and subsidiary accounts into a single stream.",
      icon: "hub",
    },
    {
      step: "Step 02",
      title: "3D Triage & Risk Filter",
      desc: "AI classifies incoming payloads by Priority, Intent, and Risk, instantly catching high-stakes items.",
      icon: "psychology",
    },
    {
      step: "Step 03",
      title: "1-Click Executive Clearance",
      desc: "Review pre-synthesized AI response drafts in the Decision Center with zero-trust safety gates.",
      icon: "task_alt",
    },
  ],
  keyFeatures: [
    {
      title: "Executive Voice Tuning",
      desc: "AI drafts mirror your exact salutation, tone, formality, and signature preferences.",
      icon: "record_voice_over",
    },
    {
      title: "Zero-Trust Safety Gate",
      desc: "Emails involving equity, financial sign-offs, or contracts are programmatically gated from auto-sending.",
      icon: "shield_lock",
    },
    {
      title: "Unified Decision Stream",
      desc: "Eliminate context switching between multiple Google Workspace accounts.",
      icon: "dashboard_customize",
    },
  ],
  benefits: [
    { metric: "12 Hours", label: "Saved Per Week", detail: "Reclaimed from routine email reading & typing." },
    { metric: "100%", label: "Contract Safety", detail: "Zero unauthorized financial or legal commitments." },
    { metric: "< 15 Min", label: "SLA Response Time", detail: "Fast turnaround on high-priority investor & board queries." },
  ],
};

export default function CeoFoundersPage() {
  return <UseCaseDetailLayout data={ceoData} />;
}
