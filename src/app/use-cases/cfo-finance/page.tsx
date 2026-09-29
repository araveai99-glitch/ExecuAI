"use client";

import * as React from "react";
import { UseCaseDetailLayout, UseCaseData } from "@/components/use-cases/UseCaseDetailLayout";

const cfoData: UseCaseData = {
  slug: "cfo-finance",
  role: "CFOs & Finance Office",
  icon: "payments",
  badgeText: "Finance & Treasury Safeguard",
  headline: "Detect Financial Commitments & Eliminate Wire Risk",
  description:
    "CFOs and finance leaders face constant invoice, wire transfer, and purchasing requests. ExecuAI automatically flags commercial commitments exceeding your threshold (e.g., ₹10 Lakhs or $50,000) and gates them from automated dispatch.",
  sampleEmail: {
    senderName: "Marcus Brody",
    senderEmail: "m.brody@nordicenterprises.com",
    senderRole: "Managing Director, Nordic APAC",
    subject: "Revised Enterprise Master Services Agreement & ₹50L Quotation Confirmation",
    body: "Hi Alexander,\n\nAttached is the revised Enterprise MSA along with Schedule C reflecting the total revised quotation of ₹50,00,000 for full-year deployment across 5 regional nodes.\n\nPlease confirm sign-off.",
    priority: "URGENT",
    intent: "FINANCE",
    risk: "HIGH_RISK",
    exposure: "₹50,00,000 Commitment",
    safetyOutcome:
      "Financial threshold rule triggered (>₹10L). Autonomous sending locked. Invoice details extracted for human CFO sign-off.",
  },
  howItWorks: [
    {
      step: "Step 01",
      title: "Financial Entity Extraction",
      desc: "ExecuAI parses currencies ($, ₹, €), payment terms, and vendor identities directly from message text and attachments.",
      icon: "attach_money",
    },
    {
      step: "Step 02",
      title: "Threshold Evaluation",
      desc: "Transactions exceeding customized limits are tagged as HIGH_RISK and isolated from standard email streams.",
      icon: "tune",
    },
    {
      step: "Step 03",
      title: "CFO Approval Queue",
      desc: "Approve commercial quotes with complete audit trail verification before any draft is sent to vendors.",
      icon: "verified_user",
    },
  ],
  keyFeatures: [
    {
      title: "Custom Amount Gates",
      desc: "Define strict monetary thresholds for single-executive vs multi-executive approval requirements.",
      icon: "tune",
    },
    {
      title: "Vendor Domain Authentication",
      desc: "DKIM/DMARC verification ensures incoming payment instructions originate from authentic vendor servers.",
      icon: "security",
    },
    {
      title: "Audit Ledger Recording",
      desc: "Every financial authorization is recorded with SHA-256 cryptographic hashes for compliance audits.",
      icon: "receipt_long",
    },
  ],
  benefits: [
    { metric: "100%", label: "Wire Fraud Prevention", detail: "Zero unverified payment confirmations sent via email." },
    { metric: "₹50L+", label: "Capital Protected", detail: "Automated isolation of unauthorized expenditure quotes." },
    { metric: "5x Faster", label: "Invoice Clearance", detail: "Rapid CFO triage of verified vendor billing mandates." },
  ],
};

export default function CfoFinancePage() {
  return <UseCaseDetailLayout data={cfoData} />;
}
