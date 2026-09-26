/**
 * ExecuAI - Email Provider Abstraction & Ingestion Pipeline
 * Normalizes email structures across Gmail API and Zoho Mail API.
 * The rest of the application operates solely on the NormalizedEmail interface.
 */

export interface NormalizedEmailAttachment {
  providerAttachmentId: string;
  filename: string;
  fileSize: number;
  mimeType: string;
}

export interface NormalizedEmail {
  id: string; // Internal normalized UUID
  provider: "GMAIL" | "ZOHO";
  providerMessageId: string; // Provider-specific ID (stored separately)
  providerThreadId: string;
  emailAccountId: string; // Foreign key to email_accounts (Tenant Scoped)
  organizationId: string; // Tenant Scoped
  senderName: string;
  senderEmail: string;
  senderRole?: string;
  recipientsTo: string[];
  recipientsCc?: string[];
  subject: string;
  snippet: string;
  bodyText: string;
  sentAt: Date;
  isUnread: boolean;
  isFlagged: boolean;
  hasAttachment: boolean;
  attachments?: NormalizedEmailAttachment[];
  ingestedAt: Date;
}

export interface FetchMessagesOptions {
  maxResults?: number;
  pageToken?: string;
  query?: string;
}

export interface IngestionResult {
  newEmails: NormalizedEmail[];
  duplicateCount: number;
  errors: string[];
  nextPageToken?: string;
}

// Conceptual Provider Abstraction Base Interface
export interface EmailProvider {
  providerName: "GMAIL" | "ZOHO";
  
  // Health & Authentication Check
  verifyTokenValidity(encryptedTokens: string): Promise<boolean>;
  refreshToken(encryptedTokens: string): Promise<string>;
  
  // Normalized Message Fetching & Ingestion
  fetchMessages(
    encryptedTokens: string,
    emailAccountId: string,
    organizationId: string,
    options?: FetchMessagesOptions
  ): Promise<IngestionResult>;

  // Normalized Controlled Draft Creation
  createDraft(
    encryptedTokens: string,
    threadId: string,
    recipientTo: string,
    subject: string,
    bodyText: string
  ): Promise<{ providerDraftId: string; success: boolean }>;

  // Controlled Send Dispatch Execution
  sendDraft(
    encryptedTokens: string,
    providerDraftId: string
  ): Promise<{ providerMessageId: string; success: boolean }>;
}
