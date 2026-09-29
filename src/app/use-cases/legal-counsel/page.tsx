"use client";

import * as React from "react";
import { UseCaseDetailLayout, UseCaseData } from "@/components/use-cases/UseCaseDetailLayout";

const legalData: UseCaseData = {
  slug: "legal-counsel",
  role: "General Counsel & Legal Teams",
  icon: "gavel",
  badgeText: "Legal Guardrails & Contract Shield",
  headline: "Enforce Indemnity & Contract Risk Guardrails",
  description:
    "General Counsel and legal teams must catch uncapped liabilities, intellectual property transfers, and onerous NDAs before corporate leaders respond. ExecuAI scans incoming contracts and prepares redline strategy drafts.",
  sampleEmail: {
    senderName: "Apex Law Partners",
    senderEmail: "legal@apexlaw.com",
    senderRole: "External Counsel",
    subject: "Definitive Master Services Agreement Clause 14.2 Review",
    body: "Alexander,\n\nWe completed review of the target MSA. Section 14.2 contains an uncapped IP indemnity clause transferring unlimited liability to your company.\n\nPlease confirm redline instructions.",
    priority: "CRITICAL",
    intent: "LEGAL",
    risk: "HIGH_RISK",
    exposure: "Uncapped IP Liability",
    safetyOutcome:
      "Contract clause § 14.2 redline strategy generated: Proposing $10M liability cap and excluding derivative software claims.",
  },
  howItWorks: [
    {
      step: "Step 01",
      title: "Contractual Parsing",
      desc: "ExecuAI analyzes incoming PDF/Word attachments and email bodies for binding legal covenants.",
      icon: "description",
    },
    {
      step: "Step 02",
      title: "Indemnity & Liability Scoring",
      desc: "Flags uncapped indemnity, non-solicit, confidentiality duration, and jurisdiction clauses.",
      icon: "gavel",
    },
    {
      step: "Step 03",
      title: "Redline Draft Generation",
      desc: "AI prepares a professional response proposing balanced redline modifications for executive approval.",
      icon: "edit_note",
    },
  ],
  keyFeatures: [
    {
      title: "Clause Level Risk Analysis",
      desc: "Extracts specific contract paragraphs and compares against institutional risk tolerance policies.",
      icon: "analytics",
    },
    {
      title: "Legal Policy Engine",
      desc: "Configurable rules automatically block response dispatch if contract terms violate company legal policy.",
      icon: "policy",
    },
    {
      title: "Attachment Content Scanning",
      desc: "Parses PDF, Word, and text attachments for hidden legal obligations.",
      icon: "find_in_page",
    },
  ],
  benefits: [
    { metric: "100%", label: "Redline Accuracy", detail: "Zero uncapped liability clauses slip through unflagged." },
    { metric: "80%", label: "Faster Legal Review", detail: "Pre-synthesized clause summaries reduce counsel review times." },
    { metric: "Zero", label: "Accidental Assent", detail: "Eliminate binding contract assent via informal email replies." },
  ],
};

export default function LegalCounselPage() {
  return <UseCaseDetailLayout data={legalData} />;
}
