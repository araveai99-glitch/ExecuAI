export type MailboxProvider = "GMAIL" | "ZOHO" | "OUTLOOK" | "OTHER";

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

export type DraftTone = "professional" | "concise" | "friendly" | "formal";
export type DraftLength = "short" | "medium" | "detailed";

export interface DraftItem {
  id: string;
  emailId: string;
  originalEmail: UnifiedEmailItem;
  currentTone: DraftTone;
  currentLength: DraftLength;
  draftSubject: string;
  draftBody: string;
  status: "DRAFT_PREPARED" | "EDITED" | "APPROVED" | "CONTROLLED_SEND_QUEUED" | "DISPATCHED";
  lastSavedAgo: string;
  requiresHumanApproval: boolean;
  humanApprovalReason: string;
}

export type AccountStatus =
  | "CONNECTED"
  | "SYNCING"
  | "PAUSED"
  | "ERROR"
  | "RECONNECT_REQUIRED";

export interface AccountItem {
  id: string;
  accountLabel: string; // "Gmail #1", "Gmail #2", "Zoho #1"
  provider: MailboxProvider;
  emailAddress: string;
  status: AccountStatus;
  lastSync: string;
  syncError?: string;
  scopes: string[];
  connectedDate: string;
  unreadCount: number;
  totalSyncedThreads: number;
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




