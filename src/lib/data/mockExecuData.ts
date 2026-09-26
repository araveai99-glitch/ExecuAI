import { DecisionItem, TelemetryCounts } from "../types/execuai";

export const initialTelemetryCounts: TelemetryCounts = {
  critical: 3,
  urgent: 5,
  needReview: 4,
  safeToDraft: 8,
  lowPriority: 42,
  totalSyncedAccounts: 3,
  lastSyncedAgo: "2m ago",
};

export const initialDecisionItems: DecisionItem[] = [
  {
    id: "DEC-101",
    actionCategory: "CONTRACT_APPROVAL",
    sender: {
      name: "Elena Rostova",
      email: "elena@apexlaw.com",
      role: "General Counsel, Apex Law Group",
      avatarInitials: "ER",
    },
    subject: "Series B Definitive Agreements & IP Indemnity Clause Review",
    account: "ceo@company.com",
    provider: "GMAIL",
    intent: "LEGAL",
    priority: "CRITICAL",
    risk: "HIGH_RISK",
    timestamp: "14m ago",
    requiredActionLabel: "Review Contract & Redline",
    synthesis:
      "Contains binding contractual indemnity obligations and requests formal CEO authorization. Unlimited liability exposure flagged under Section 14.3. Automatic draft generation has been programmatically blocked.",
    clauseExcerpt:
      "Detected Clause § 14.3(b) — Series_B_Definitive_Draft_v4.pdf (Liability Cap: Omitted)",
    exposure: "Uncapped Liability",
    slaMinutesRemaining: 42,
  },
  {
    id: "DEC-102",
    actionCategory: "UPDATED_QUOTATION",
    sender: {
      name: "Marcus Brody",
      email: "m.brody@nordicenterprises.com",
      role: "Managing Director, Nordic Enterprises APAC",
      avatarInitials: "MB",
    },
    subject: "Revised Enterprise Master Services Agreement & ₹50L Quotation Confirmation",
    account: "director@company.com",
    provider: "ZOHO",
    intent: "FINANCE",
    priority: "URGENT",
    risk: "HIGH_RISK",
    timestamp: "30m ago",
    requiredActionLabel: "Approve Commercial Quote",
    synthesis:
      "Extracted commercial licensing amount of ₹50,00,000 ($60k equiv). Exceeds single-executive auto-authorization threshold of ₹10,00,000. Affirmative digital reply constitutes enforceable contract.",
    clauseExcerpt:
      "Schedule C § 8.2 — Nordic_MSA_RevB_ExecutedDraft_ScheduleC.pdf (Rate Assent Required)",
    exposure: "₹50,00,000",
    slaMinutesRemaining: 90,
  },
  {
    id: "DEC-103",
    actionCategory: "CLIENT_ESCALATION",
    sender: {
      name: "Sarah Jenkins",
      email: "s.jenkins@apexglobal.io",
      role: "VP Operations, Apex Global Systems",
      avatarInitials: "SJ",
    },
    subject: "Urgent Client Escalation: Q2 SLA Outage Rebate Penalty Claim",
    account: "ceo@company.com",
    provider: "GMAIL",
    intent: "CLIENT",
    priority: "CRITICAL",
    risk: "REVIEW_REQUIRED",
    timestamp: "1h ago",
    requiredActionLabel: "Review Escalation Claim",
    synthesis:
      "Client requests formal CEO commitment on 15% SLA rebate penalty due to Q2 downtime incident. High-priority client relationship requires executive escalation handling.",
    clauseExcerpt:
      "SLA Claim Ref #AC-9901 — Contractual Outage Rebate & Credit Authorization Request",
    exposure: "₹24,50,000",
    slaMinutesRemaining: 15,
  },
  {
    id: "DEC-104",
    actionCategory: "NDA_DOCUMENT",
    sender: {
      name: "Dr. Aris Thorne",
      email: "aris@vancecapital.io",
      role: "Managing Partner, Vance Capital",
      avatarInitials: "AT",
    },
    subject: "Mutual Non-Disclosure Agreement for Strategic Acquisition Discussions",
    account: "board@vance.io",
    provider: "ZOHO",
    intent: "LEGAL",
    priority: "URGENT",
    risk: "CONFIDENTIAL",
    timestamp: "2h ago",
    requiredActionLabel: "Approve NDA Terms",
    synthesis:
      "Confidential strategic M&A document attached. Contains strict non-solicitation clauses and 5-year disclosure restrictions. Quarantined for executive confidentiality clearance.",
    clauseExcerpt:
      "Mutual_NDA_Vance_Acquisition_Draft.pdf — Strict 5-Year Confidentiality & Non-Solicit",
    exposure: "Strict Confidential",
    slaMinutesRemaining: 120,
  },
  {
    id: "DEC-105",
    actionCategory: "BOARD_MEETING",
    sender: {
      name: "Dr. Aris Thorne",
      email: "aris@vancecapital.io",
      role: "Governance Committee Lead",
      avatarInitials: "AT",
    },
    subject: "Q3 Board Preparatory Session Schedule & ESOP Allocation Model",
    account: "ceo@company.com",
    provider: "GMAIL",
    intent: "MEETING",
    priority: "IMPORTANT",
    risk: "SAFE",
    timestamp: "3h ago",
    requiredActionLabel: "Confirm Meeting Slot",
    synthesis:
      "Requests a 30-minute preparatory session on Tuesday morning to present the revised ESOP allocation model prior to full board ratification. AI draft prepared.",
    clauseExcerpt:
      "ESOP_Allocation_Proposal_Q3.pdf — 30-Min Tuesday Session Requested",
    exposure: "Routine Governance",
    slaMinutesRemaining: 240,
  },
];
