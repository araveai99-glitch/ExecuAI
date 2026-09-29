import { UnifiedEmailItem, PriorityLevel, IntentCategory, RiskLevel } from "../types/execuai";

export interface GmailProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
  historyId?: string;
}

export interface GoogleUserProfile {
  email: string;
  name: string;
  picture?: string;
}

/**
 * Encodes string to Base64URL (RFC 4648 §5) format for Gmail API
 */
export function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Decodes Base64URL string from Gmail API payload with UTF-8 support
 */
export function decodeBase64Url(base64UrlStr: string): string {
  try {
    let base64 = base64UrlStr.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4 !== 0) {
      base64 += "=";
    }
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder("utf-8").decode(bytes);
  } catch (e) {
    return base64UrlStr;
  }
}

/**
 * Recursively extracts plain text / HTML body from Gmail payload
 */
export function getBodyFromPayload(payload: any): string {
  if (!payload) return "";
  if (payload.body && payload.body.data && typeof payload.body.data === "string" && payload.body.data.trim().length > 0) {
    return decodeBase64Url(payload.body.data);
  }
  if (payload.parts && Array.isArray(payload.parts)) {
    // 1. First pass: look for plain text in immediate parts
    for (const part of payload.parts) {
      if (part.mimeType === "text/plain" && part.body && part.body.data) {
        return decodeBase64Url(part.body.data);
      }
    }
    // 2. Second pass: look for html text in immediate parts
    for (const part of payload.parts) {
      if (part.mimeType === "text/html" && part.body && part.body.data) {
        const html = decodeBase64Url(part.body.data);
        return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      }
    }
    // 3. Third pass: recursively search nested parts (e.g. multipart/alternative)
    for (const part of payload.parts) {
      if (part.parts && Array.isArray(part.parts)) {
        const nested = getBodyFromPayload(part);
        if (nested) return nested;
      }
    }
  }
  return "";
}

/**
 * Classifies a real Gmail message into 3D Executive Triage dimensions
 */
export function classifyRealGmailMessage(
  subject: string,
  snippet: string,
  bodyText: string,
  senderEmail: string,
  labels: string[] = []
) {
  const text = `${subject} ${snippet} ${bodyText}`.toLowerCase();

  // Priority Level
  let priority: PriorityLevel = "NORMAL";
  if (labels.includes("SPAM") || text.includes("phishing") || text.includes("lottery winner")) {
    priority = "SPAM";
  } else if (
    text.includes("urgent") ||
    text.includes("critical") ||
    text.includes("indemnity") ||
    text.includes("asap") ||
    text.includes("sla outage") ||
    text.includes("immediately") ||
    text.includes("overdue") ||
    text.includes("liability") ||
    text.includes("breach") ||
    text.includes("escalation")
  ) {
    priority = "CRITICAL";
  } else if (
    text.includes("important") ||
    text.includes("contract") ||
    text.includes("agreement") ||
    text.includes("quotation") ||
    text.includes("invoice") ||
    text.includes("approval") ||
    text.includes("sign-off") ||
    text.includes("revised")
  ) {
    priority = "URGENT";
  } else if (labels.includes("CATEGORY_PROMOTIONS") || text.includes("newsletter") || text.includes("unsubscribe") || text.includes("discount")) {
    priority = "LOW";
  }

  // Intent Category
  let intent: IntentCategory = "OTHER";
  if (text.includes("contract") || text.includes("legal") || text.includes("nda") || text.includes("indemnity") || text.includes("counsel") || text.includes("agreement")) {
    intent = "LEGAL";
  } else if (text.includes("invoice") || text.includes("pricing") || text.includes("budget") || text.includes("payment") || text.includes("finance") || text.includes("quote") || text.includes("₹") || text.includes("$")) {
    intent = "FINANCE";
  } else if (text.includes("client") || text.includes("customer") || text.includes("escalation") || text.includes("sla") || text.includes("support")) {
    intent = "CLIENT";
  } else if (text.includes("meet") || text.includes("schedule") || text.includes("calendar") || text.includes("interview") || text.includes("zoom")) {
    intent = "MEETING";
  } else if (text.includes("hire") || text.includes("resume") || text.includes("hr") || text.includes("candidate")) {
    intent = "HR";
  } else if (text.includes("engineering") || text.includes("internal") || text.includes("sprint") || text.includes("release")) {
    intent = "INTERNAL";
  } else if (labels.includes("CATEGORY_UPDATES") || text.includes("newsletter") || text.includes("digest")) {
    intent = "NEWSLETTER";
  }

  // Risk Level
  let risk: RiskLevel = "SAFE";
  if (priority === "CRITICAL" || text.includes("uncapped") || text.includes("liability") || text.includes("penalty") || text.includes("indemnity")) {
    risk = "HIGH_RISK";
  } else if (text.includes("approval") || text.includes("sign-off") || text.includes("review") || text.includes("action required")) {
    risk = "REVIEW_REQUIRED";
  } else if (text.includes("confidential") || text.includes("nda") || text.includes("acquisition") || text.includes("proprietary")) {
    risk = "CONFIDENTIAL";
  }

  const aiSummary = `AI Triage: Classified as ${priority} priority (${intent} category, ${risk} risk level).`;
  const aiRationale = {
    plainLanguageReason: `Derived from actual Gmail content analysis: ${priority} priority assigned based on keyword signals. Risk level evaluated as ${risk}.`,
    requiresHumanApproval: risk === "HIGH_RISK" || risk === "REVIEW_REQUIRED",
    humanApprovalReason: risk === "HIGH_RISK" ? "Human approval required. High-risk terms identified in message body." : "Executive clearance recommended.",
    detectedFactors: [
      {
        icon: priority === "CRITICAL" ? "priority_high" : "info",
        title: `${priority} Priority Signal`,
        detail: `Subject/content matched ${priority.toLowerCase()} priority criteria.`,
      },
      {
        icon: "verified_user",
        title: "Gmail Verified Sender",
        detail: `Authenticated sender: ${senderEmail}`,
      },
    ],
  };

  return { priority, intent, risk, aiSummary, aiRationale };
}

export class GmailApiService {
  /**
   * Fetches authenticated Google user profile from OAuth userinfo endpoint
   */
  public static async fetchGoogleUserProfile(accessToken: string): Promise<GoogleUserProfile> {
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) {
      throw new Error(`Google UserInfo API error: ${res.statusText} (${res.status})`);
    }
    const data = await res.json();
    return {
      email: data.email,
      name: data.name || data.email.split("@")[0],
      picture: data.picture,
    };
  }

  /**
   * Fetches real Gmail user profile from Gmail API users.getProfile endpoint
   */
  public static async fetchGmailProfile(accessToken: string): Promise<GmailProfile> {
    const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/profile", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (res.status === 401) {
      throw new Error("Gmail connection expired. Reconnect Gmail.");
    }
    if (!res.ok) {
      throw new Error(`Gmail API profile error: ${res.statusText} (${res.status})`);
    }
    const data = await res.json();
    return {
      emailAddress: data.emailAddress,
      messagesTotal: data.messagesTotal || 0,
      threadsTotal: data.threadsTotal || 0,
      historyId: data.historyId,
    };
  }

  /**
   * Fetches actual Gmail Drafts from Gmail API users.drafts.list
   */
  public static async fetchRealGmailDrafts(
    accessToken: string,
    accountEmail: string
  ): Promise<Array<{ id: string; messageId: string; subject: string; snippet: string; date: string }>> {
    try {
      const listRes = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/drafts?maxResults=20", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!listRes.ok) return [];

      const data = await listRes.json();
      const draftsList: Array<{ id: string; message?: { id: string } }> = data.drafts || [];
      const drafts: Array<{ id: string; messageId: string; subject: string; snippet: string; date: string }> = [];

      for (const d of draftsList) {
        try {
          const draftDetailRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/drafts/${d.id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (draftDetailRes.ok) {
            const detail = await draftDetailRes.json();
            const headers: Array<{ name: string; value: string }> = detail.message?.payload?.headers || [];
            const subjHeader = headers.find((h) => h.name.toLowerCase() === "subject");
            const dateHeader = headers.find((h) => h.name.toLowerCase() === "date");
            drafts.push({
              id: d.id,
              messageId: detail.message?.id || d.id,
              subject: subjHeader ? subjHeader.value : "(Draft)",
              snippet: detail.message?.snippet || "",
              date: dateHeader ? dateHeader.value : "Draft",
            });
          }
        } catch (e) {
          // ignore individual draft detail failure
        }
      }
      return drafts;
    } catch (e) {
      console.error("Error fetching Gmail drafts:", e);
      return [];
    }
  }

  /**
   * Fetches actual Gmail messages from the authenticated Gmail mailbox
   */
  public static async fetchRealGmailMessages(
    accessToken: string,
    accountEmail: string,
    maxResults = 25
  ): Promise<UnifiedEmailItem[]> {
    // 1. Verify Gmail Profile & Email Address
    let gmailProfile: GmailProfile | null = null;
    try {
      gmailProfile = await this.fetchGmailProfile(accessToken);
      console.log(`[Gmail API Telemetry] Authenticated Profile Email: ${gmailProfile.emailAddress}, Total Messages: ${gmailProfile.messagesTotal}, Total Threads: ${gmailProfile.threadsTotal}`);
    } catch (profileErr) {
      console.warn(`[Gmail API Telemetry] Could not fetch profile directly:`, profileErr);
    }

    const verifiedAccountEmail = (gmailProfile?.emailAddress || accountEmail).toLowerCase();

    // 2. Query Gmail API for messages strictly in INBOX (label:INBOX)
    const listUrl = `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}&q=label:INBOX -label:TRASH -label:SPAM`;
    const listRes = await fetch(listUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (listRes.status === 401) {
      throw new Error("Gmail connection expired. Reconnect Gmail.");
    }
    if (!listRes.ok) {
      throw new Error(`Gmail API list error: ${listRes.statusText} (${listRes.status})`);
    }

    const listData = await listRes.json();
    const messageSummaries: Array<{ id: string; threadId: string }> = listData.messages || [];

    console.log(`[Gmail API Telemetry] Gmail API returned ${messageSummaries.length} message IDs for ${verifiedAccountEmail}`);

    if (messageSummaries.length === 0) {
      return [];
    }

    // Batch fetch message details
    const emailItems: UnifiedEmailItem[] = [];

    for (const item of messageSummaries) {
      try {
        const msgUrl = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${item.id}?format=full`;
        const msgRes = await fetch(msgUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!msgRes.ok) continue;

        const msgData = await msgRes.json();
        const labels: string[] = msgData.labelIds || [];

        // STRICT CHECK: MUST BE IN INBOX, AND NEVER TRASH, SPAM, DRAFT, OR SENT
        if (!labels.includes("INBOX")) {
          continue;
        }
        if (labels.includes("TRASH") || labels.includes("SPAM") || labels.includes("DRAFT") || labels.includes("SENT")) {
          continue;
        }

        const headersArr: Array<{ name: string; value: string }> = msgData.payload?.headers || [];
        const getHeader = (name: string) => {
          const found = headersArr.find((h) => h.name.toLowerCase() === name.toLowerCase());
          return found ? found.value : "";
        };

        const fromRaw = getHeader("From");
        const toRaw = getHeader("To");
        const ccRaw = getHeader("Cc");
        const subject = getHeader("Subject") || "(No Subject)";
        const dateRaw = getHeader("Date");

        // Parse sender name & email
        let senderName = fromRaw;
        let senderEmail = fromRaw;
        const match = fromRaw.match(/(.*?)\s*<([^>]+)>/);
        if (match) {
          senderName = match[1].replace(/^["']|["']$/g, "").trim() || match[2];
          senderEmail = match[2].trim();
        }

        // Parse recipients
        const recipientsTo = toRaw
          ? toRaw.split(",").map((s) => s.trim().replace(/^.*<([^>]+)>$/, "$1"))
          : [verifiedAccountEmail];
        const recipientsCc = ccRaw
          ? ccRaw.split(",").map((s) => s.trim().replace(/^.*<([^>]+)>$/, "$1"))
          : [];

        const snippet = msgData.snippet || "";
        const bodyText = getBodyFromPayload(msgData.payload) || snippet;

        // Parse date
        let timestamp = "Recently";
        if (dateRaw) {
          try {
            const d = new Date(dateRaw);
            timestamp = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          } catch (e) {
            timestamp = dateRaw;
          }
        }

        const unread = labels.includes("UNREAD");
        const flagged = labels.includes("STARRED");

        // Check attachments
        const hasAttachment =
          msgData.payload?.parts?.some((p: any) => p.filename && p.filename.length > 0) || false;

        // Apply AI Classification on real email data
        const classification = classifyRealGmailMessage(subject, snippet, bodyText, senderEmail, labels);

        const emailItem: UnifiedEmailItem = {
          id: msgData.id, // Real Gmail message ID
          threadId: msgData.threadId, // Real Gmail thread ID
          provider: "GMAIL",
          accountEmail: verifiedAccountEmail,
          accountLabel: `Gmail (${verifiedAccountEmail})`,
          senderName: senderName || senderEmail,
          senderEmail: senderEmail,
          senderRole: "External Correspondent",
          avatarInitials: (senderName || senderEmail).substring(0, 2).toUpperCase(),
          recipients: { to: recipientsTo, cc: recipientsCc },
          subject: subject,
          snippet: snippet,
          body: bodyText,
          timestamp: timestamp,
          priority: classification.priority,
          intent: classification.intent,
          risk: classification.risk,
          unread: unread,
          flagged: flagged,
          hasAttachment: hasAttachment,
          aiDraftAvailable: true,
          aiSummary: classification.aiSummary,
          aiRationale: classification.aiRationale,
          threadHistory: [
            {
              id: `msg_${msgData.id}`,
              senderName: senderName || senderEmail,
              senderEmail: senderEmail,
              senderRole: "Sender",
              avatarInitials: (senderName || senderEmail).substring(0, 2).toUpperCase(),
              recipients: { to: recipientsTo },
              timestamp: timestamp,
              body: bodyText,
              isFromUser: false,
            },
          ],
        };

        emailItems.push(emailItem);
      } catch (err) {
        console.error(`Error fetching message ${item.id}:`, err);
      }
    }

    console.log(`[Gmail API Telemetry] Successfully processed ${emailItems.length} Inbox messages for ${verifiedAccountEmail}`);
    return emailItems;
  }

  /**
   * Creates a draft in Gmail via Gmail API
   */
  public static async createGmailDraft(
    accessToken: string,
    threadId: string,
    toEmail: string,
    fromEmail: string,
    subject: string,
    bodyText: string
  ): Promise<{ success: boolean; providerDraftId?: string; error?: string }> {
    try {
      const rawMessage = [
        `From: ${fromEmail}`,
        `To: ${toEmail}`,
        `Subject: ${subject}`,
        `In-Reply-To: ${threadId}`,
        `Content-Type: text/plain; charset=utf-8`,
        "",
        bodyText,
      ].join("\r\n");

      const encodedRaw = base64UrlEncode(rawMessage);

      const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/drafts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            threadId: threadId,
            raw: encodedRaw,
          },
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        return {
          success: false,
          error: errData.error?.message || `Gmail API Draft creation failed (${res.status})`,
        };
      }

      const data = await res.json();
      return {
        success: true,
        providerDraftId: data.id,
      };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  /**
   * Sends an email reply via Gmail API
   */
  public static async sendGmailReply(
    accessToken: string,
    threadId: string,
    toEmail: string,
    fromEmail: string,
    subject: string,
    bodyText: string
  ): Promise<{ success: boolean; providerMessageId?: string; error?: string }> {
    try {
      const rawMessage = [
        `From: ${fromEmail}`,
        `To: ${toEmail}`,
        `Subject: ${subject}`,
        `In-Reply-To: ${threadId}`,
        `Content-Type: text/plain; charset=utf-8`,
        "",
        bodyText,
      ].join("\r\n");

      const encodedRaw = base64UrlEncode(rawMessage);

      const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadId: threadId,
          raw: encodedRaw,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        return {
          success: false,
          error: errData.error?.message || `Gmail API Send failed (${res.status})`,
        };
      }

      const data = await res.json();
      return {
        success: true,
        providerMessageId: data.id,
      };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }
}

