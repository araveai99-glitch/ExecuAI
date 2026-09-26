export type MailboxProvider = "GMAIL" | "ZOHO";

export type PriorityLevel =
  | "CRITICAL"
  | "URGENT"
  | "IMPORTANT"
  | "NORMAL"
  | "LOW";

export type IntentCategory =
  | "LEGAL"
  | "FINANCE"
  | "CLIENT"
  | "MEETING"
  | "VENDOR"
  | "HR"
  | "SALES"
  | "INTERNAL";

export type RiskLevel =
  | "HIGH_RISK"
  | "REVIEW_REQUIRED"
  | "SAFE"
  | "CONFIDENTIAL";

export type ActionCategory =
  | "CONTRACT_APPROVAL"
  | "UPDATED_QUOTATION"
  | "CLIENT_ESCALATION"
  | "NDA_DOCUMENT"
  | "BOARD_MEETING";

export interface ExecutiveSender {
  name: string;
  email: string;
  role: string;
  avatarInitials?: string;
}

export interface DecisionItem {
  id: string;
  actionCategory: ActionCategory;
  sender: ExecutiveSender;
  subject: string;
  account: string;
  provider: MailboxProvider;
  intent: IntentCategory;
  priority: PriorityLevel;
  risk: RiskLevel;
  timestamp: string;
  requiredActionLabel: string;
  synthesis: string;
  clauseExcerpt?: string;
  exposure?: string;
  slaMinutesRemaining?: number;
}

export interface TelemetryCounts {
  critical: number;
  urgent: number;
  needReview: number;
  safeToDraft: number;
  lowPriority: number;
  totalSyncedAccounts: number;
  lastSyncedAgo: string;
}
