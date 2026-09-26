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

export interface ThreadMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  senderRole?: string;
  avatarInitials?: string;
  recipients: {
    to: string[];
    cc?: string[];
    bcc?: string[];
  };
  timestamp: string;
  body: string;
  isFromUser?: boolean;
  attachments?: Array<{ name: string; size: string; type: string }>;
}

export interface AiClassificationRationale {
  plainLanguageReason: string;
  detectedFactors: Array<{
    icon: string;
    title: string;
    detail: string;
  }>;
  requiresHumanApproval: boolean;
  humanApprovalReason?: string;
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
  recipients?: {
    to: string[];
    cc?: string[];
    bcc?: string[];
  };
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
  aiRationale?: AiClassificationRationale;
  threadHistory?: ThreadMessage[];
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


