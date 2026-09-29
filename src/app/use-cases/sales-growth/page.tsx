"use client";

import * as React from "react";
import { UseCaseDetailLayout, UseCaseData } from "@/components/use-cases/UseCaseDetailLayout";

const salesData: UseCaseData = {
  slug: "sales-growth",
  role: "Sales & Growth Leaders",
  icon: "trending_up",
  badgeText: "Enterprise Revenue Velocity",
  headline: "Accelerate Enterprise Deal Cycles & Executive Assent",
  description:
    "Sales executives and CROs manage complex enterprise pipelines where buyer questions, pricing approvals, and executive sponsor introductions require immediate response to avoid deal stagnation.",
  sampleEmail: {
    senderName: "Marcus Brody",
    senderEmail: "m.brody@nordicenterprises.com",
    senderRole: "Managing Director, Nordic APAC",
    subject: "Revised Enterprise Master Services Agreement & ₹50L Quotation Confirmation",
    body: "Hi Alexander,\n\nAttached is the revised Enterprise MSA along with Schedule C reflecting the total revised quotation of ₹50,00,000 for full-year deployment across 5 regional nodes.\n\nPlease confirm sign-off to issue the binding billing mandate.",
    priority: "URGENT",
    intent: "CLIENT",
    risk: "REVIEW_REQUIRED",
    exposure: "₹50L Pipeline Deal",
    safetyOutcome:
      "Commercial pricing extracted and verified against discount limits. Draft response prepared for executive sign-off.",
  },
  howItWorks: [
    {
      step: "Step 01",
      title: "Pipeline Lead Identification",
      desc: "Automatically detects high-value buyer emails, procurement RFPs, and pricing requests.",
      icon: "leaderboard",
    },
    {
      step: "Step 02",
      title: "Commercial Discount Check",
      desc: "Compares requested discounts against configured gross margin threshold rules.",
      icon: "calculate",
    },
    {
      step: "Step 03",
      title: "Executive Sponsor Dispatch",
      desc: "Generates tailored executive replies that maintain deal momentum while protecting margins.",
      icon: "send",
    },
  ],
  keyFeatures: [
    {
      title: "Deal Velocity Accelerator",
      desc: "Reduce turnaround time on enterprise procurement and MSA approval cycles.",
      icon: "speed",
    },
    {
      title: "Commercial Margin Guardrails",
      desc: "Prevents accidental approval of non-standard payment terms or excessive discounts.",
      icon: "margin",
    },
    {
      title: "Executive Follow-up Synthesis",
      desc: "Drafts high-touch executive check-ins for stalled tier-1 enterprise opportunities.",
      icon: "auto_awesome",
    },
  ],
  benefits: [
    { metric: "40%", label: "Faster Deal Closure", detail: "Shortened sales cycle times on complex enterprise quotes." },
    { metric: "Zero", label: "Discount Oversights", detail: "Automated verification of commercial pricing limits." },
    { metric: "100%", label: "Pipeline Visibility", detail: "Never lose a high-value buyer email in inbox clutter." },
  ],
};

export default function SalesGrowthPage() {
  return <UseCaseDetailLayout data={salesData} />;
}
