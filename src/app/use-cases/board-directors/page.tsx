"use client";

import * as React from "react";
import { UseCaseDetailLayout, UseCaseData } from "@/components/use-cases/UseCaseDetailLayout";

const boardData: UseCaseData = {
  slug: "board-directors",
  role: "Venture Directors & Board",
  icon: "account_balance",
  badgeText: "Governance & Multi-Board Suite",
  headline: "Unify Subsidiary & Board Mailboxes into One Stream",
  description:
    "Venture directors and board members oversee multiple portfolio companies across Gmail and Zoho mailboxes. ExecuAI aggregates all governance queries, ESOP grant approvals, and quarterly board packs into a single prioritized workspace.",
  sampleEmail: {
    senderName: "Dr. Aris Thorne",
    senderEmail: "aris@vancecapital.io",
    senderRole: "Governance Committee Lead",
    subject: "Q3 Board Preparatory Session Schedule & ESOP Allocation Model",
    body: "Hi Alexander,\n\nAhead of Thursday's full board meeting, I'd like to spend 30 minutes walking through the proposed ESOP option pool expansion model. Please let me know if 9:30 AM or 11:00 AM EST works.",
    priority: "URGENT",
    intent: "MEETING",
    risk: "REVIEW_REQUIRED",
    exposure: "ESOP Grant Allocation",
    safetyOutcome:
      "Governance query parsed across connected Zoho board account. Draft acceptance prepared for 11:00 AM EST slot based on calendar availability.",
  },
  howItWorks: [
    {
      step: "Step 01",
      title: "Multi-Mailbox Aggregation",
      desc: "Connect Gmail and Zoho accounts from all portfolio companies into one unified inbox.",
      icon: "mark_email_unread",
    },
    {
      step: "Step 02",
      title: "Governance Priority Sorting",
      desc: "ExecuAI tags board resolutions, ESOP grants, and audit reports as HIGH_RISK or REVIEW_REQUIRED.",
      icon: "balance",
    },
    {
      step: "Step 03",
      title: "Batch Clearance & Scheduling",
      desc: "Approve meeting slots and governance communications in seconds with executive voice fidelity.",
      icon: "event_available",
    },
  ],
  keyFeatures: [
    {
      title: "Multi-Entity Telemetry",
      desc: "Seamless switching between portfolio company accounts without logging in and out.",
      icon: "hub",
    },
    {
      title: "ESOP & Cap Table Shield",
      desc: "Specialized detection of equity allocation and cap table modification requests.",
      icon: "pie_chart",
    },
    {
      title: "Audit History Ledger",
      desc: "Complete record of all board communications and approvals for corporate compliance.",
      icon: "history_edu",
    },
  ],
  benefits: [
    { metric: "1 Inbox", label: "For All Portfolio Companies", detail: "No more switching between 5 different board logins." },
    { metric: "100%", label: "Governance Compliance", detail: "All board resolutions verified before response dispatch." },
    { metric: "3x Faster", label: "Board Prep Alignment", detail: "Rapid scheduling and agenda alignment." },
  ],
};

export default function BoardDirectorsPage() {
  return <UseCaseDetailLayout data={boardData} />;
}
