"use client";

import * as React from "react";
import { UseCaseDetailLayout, UseCaseData } from "@/components/use-cases/UseCaseDetailLayout";

const opsData: UseCaseData = {
  slug: "operations-support",
  role: "VP Operations & Client Support",
  icon: "support_agent",
  badgeText: "Operational SLA & Retention Shield",
  headline: "Manage Client Escalations & Outage Rebate Claims",
  description:
    "Operations leaders handle critical client escalations, SLA outage rebate claims, and service credit requests. ExecuAI isolates urgent client issues and synthesizes executive resolution drafts.",
  sampleEmail: {
    senderName: "Sarah Jenkins",
    senderEmail: "s.jenkins@apexglobal.io",
    senderRole: "VP Operations, Apex Global",
    subject: "Urgent Client Escalation: Q2 SLA Outage Rebate Penalty Claim",
    body: "Alexander,\n\nFollowing Tuesday's API outage, Apex Global has submitted a formal SLA rebate claim for 15% of annual contract value. Our customer success lead recommends offering a 5% service credit instead.\n\nWe need your guidance on whether to escalate or approve the credit.",
    priority: "CRITICAL",
    intent: "CLIENT",
    risk: "REVIEW_REQUIRED",
    exposure: "₹24.5L Penalty Claim",
    safetyOutcome:
      "Client SLA claim isolated. Strategic draft generated offering 5% service credit in lieu of cash refund.",
  },
  howItWorks: [
    {
      step: "Step 01",
      title: "Escalation Ingestion",
      desc: "Detects outage complaints, SLA penalty requests, and critical client ticket escalations.",
      icon: "warning",
    },
    {
      step: "Step 02",
      title: "SLA & Contract Matching",
      desc: "Cross-checks claim details against existing customer retainer contracts and SLA agreements.",
      icon: "fact_check",
    },
    {
      step: "Step 03",
      title: "Executive Resolution Draft",
      desc: "Prepares a balanced response offering service credits while protecting annual contract retention.",
      icon: "handshake",
    },
  ],
  keyFeatures: [
    {
      title: "Client Churn Shield",
      desc: "Prioritize tier-1 client escalations to prevent customer churn after operational incidents.",
      icon: "shield",
    },
    {
      title: "SLA Penalty Calculator Integration",
      desc: "Automatically extracts rebate percentage claims and calculates financial credit impact.",
      icon: "calculate",
    },
    {
      title: "Cross-Team Delegation",
      desc: "1-click forwarding of technical incident context to engineering or legal leads.",
      icon: "forward_to_inbox",
    },
  ],
  benefits: [
    { metric: "95%", label: "Client Retention", detail: "Fast executive intervention on critical account escalations." },
    { metric: "15 Min", label: "Incident Resolution", detail: "Rapid executive triage during downtime events." },
    { metric: "Zero", label: "Uncoordinated Credit Sends", detail: "Human clearance enforced on financial rebates." },
  ],
};

export default function OperationsSupportPage() {
  return <UseCaseDetailLayout data={opsData} />;
}
