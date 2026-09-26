export type MailboxProvider = "GMAIL" | "ZOHO";

export type PriorityLevel =
  | "CRITICAL"
  | "URGENT"
  | "IMPORTANT"
  | "NORMAL"
  | "LOW"
  | "SPAM";

export type IntentCategory =
  | "CLIENT"
  | "SALES"
  | "VENDOR"
  | "INTERNAL"
  | "FINANCE"
  | "HR"
  | "LEGAL"
  | "MEETING"
  | "SUPPORT"
  | "NEWSLETTER"
  | "MARKETING"
  | "PERSONAL"
  | "OTHER";

export type RiskLevel =
  | "SAFE"
  | "REVIEW"
  | "REVIEW_REQUIRED"
  | "HIGH_RISK"
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

export interface UnifiedEmailItem {
  id: string;
  provider: MailboxProvider;
  accountEmail: string;
  accountLabel: string; // "Gmail #1", "Gmail #2", "Zoho #1"
  senderName: string;
  senderEmail: string;
  senderRole?: string;
  avatarInitials?: string;
  subject: string;
  snippet: string;
  body: string;
  timestamp: string;
  priority: PriorityLevel;
  intent: IntentCategory;
  risk: RiskLevel;
  unread: boolean;
  flagged: boolean;
  hasAttachment?: boolean;
  aiDraftAvailable?: boolean;
  aiSummary?: string;
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

