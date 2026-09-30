import { UnifiedEmailItem } from "@/lib/types/execuai";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";

const EMAIL_STORAGE_FILE_PATH = path.join(process.cwd(), ".data", "gmail_emails_v1.json");

function getPrismaClient(): any {
  try {
    const { PrismaClient } = require("@prisma/client");
    const globalForPrisma = global as unknown as { prisma: any };
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient();
    }
    return globalForPrisma.prisma;
  } catch (_) {
    return null;
  }
}

function ensureDirectoryExists(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    ensureDirectoryExists(dirname);
    fs.mkdirSync(dirname);
  }
}

export class ServerEmailStore {
  /**
   * Persists / merges real fetched emails for a user and account into database & cache
   */
  public static async saveEmails(userId: string, accountEmail: string, emails: UnifiedEmailItem[]): Promise<void> {
    const cleanUserId = userId.toLowerCase();
    const cleanAccountEmail = accountEmail.toLowerCase();

    // 1. Try Prisma DB Persistence (Optional)
    const db = getPrismaClient();
    if (db) {
      try {
        // Find or create EmailAccount
        let emailAccount = await db.emailAccount.findFirst({
          where: { emailAddress: cleanAccountEmail },
        });

        if (emailAccount) {
          for (const email of emails) {
            // Upsert EmailThread
            const thread = await db.emailThread.upsert({
              where: { id: email.threadId || email.id },
              update: {
                subject: email.subject,
                snippet: email.snippet,
                isUnread: email.unread,
                isFlagged: email.flagged,
                lastMessageAt: new Date(),
              },
              create: {
                id: email.threadId || email.id,
                emailAccountId: emailAccount.id,
                providerThreadId: email.threadId || email.id,
                subject: email.subject,
                snippet: email.snippet,
                isUnread: email.unread,
                isFlagged: email.flagged,
                lastMessageAt: new Date(),
              },
            });

            // Upsert Email
            await db.email.upsert({
              where: { id: email.id },
              update: {
                subject: email.subject,
                snippet: email.snippet,
                bodyText: email.body,
                senderName: email.senderName,
                senderEmail: email.senderEmail,
              },
              create: {
                id: email.id,
                emailAccountId: emailAccount.id,
                threadId: thread.id,
                providerMessageId: email.id,
                senderName: email.senderName,
                senderEmail: email.senderEmail,
                recipientsTo: email.recipients?.to || [cleanAccountEmail],
                recipientsCc: email.recipients?.cc || [],
                subject: email.subject,
                snippet: email.snippet,
                bodyText: email.body,
                sentAt: new Date(),
                isFromUser: false,
                hasAttachment: email.hasAttachment || false,
              },
            });
          }
        }
      } catch (dbErr: any) {
        console.warn(`[SERVER EMAIL STORE] Prisma write note: ${dbErr.message}`);
      }
    }

    // 2. Try Supabase REST Persistence
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        for (const email of emails) {
          await supabase.from("emails").upsert(
            {
              id: email.id,
              user_id: cleanUserId,
              account_email: cleanAccountEmail,
              provider_message_id: email.id,
              provider_thread_id: email.threadId,
              sender_name: email.senderName,
              sender_email: email.senderEmail,
              recipients_to: email.recipients?.to || [],
              subject: email.subject,
              snippet: email.snippet,
              body_text: email.body,
              unread: email.unread,
              flagged: email.flagged,
              priority: email.priority,
              intent: email.intent,
              risk: email.risk,
              data_json: JSON.stringify(email),
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          );
        }
      } catch (sbErr: any) {
        console.warn(`[SERVER EMAIL STORE] Supabase write note: ${sbErr.message}`);
      }
    }

    // 3. Local File-System Cache (guaranteed persistence across dev reboots)
    try {
      ensureDirectoryExists(EMAIL_STORAGE_FILE_PATH);
      let localStore: Record<string, UnifiedEmailItem[]> = {};

      if (fs.existsSync(EMAIL_STORAGE_FILE_PATH)) {
        try {
          localStore = JSON.parse(fs.readFileSync(EMAIL_STORAGE_FILE_PATH, "utf-8"));
        } catch (_) {}
      }

      const storeKey = `${cleanUserId}_${cleanAccountEmail}`;
      const existingEmails = localStore[storeKey] || [];

      // Merge & deduplicate
      const map = new Map<string, UnifiedEmailItem>();
      existingEmails.forEach((e) => map.set(e.id, e));
      emails.forEach((e) => map.set(e.id, e));

      localStore[storeKey] = Array.from(map.values());
      fs.writeFileSync(EMAIL_STORAGE_FILE_PATH, JSON.stringify(localStore, null, 2), "utf-8");
      console.log(`[SERVER EMAIL STORE] Persisted ${emails.length} emails to disk cache for ${cleanAccountEmail}`);
    } catch (fsErr: any) {
      console.warn(`[SERVER EMAIL STORE] Disk cache write note: ${fsErr.message}`);
    }
  }

  /**
   * Fetches cached/stored emails for user & account
   */
  public static async getStoredEmails(userId: string, accountEmail?: string): Promise<UnifiedEmailItem[]> {
    const cleanUserId = userId.toLowerCase();
    const cleanAccount = accountEmail?.toLowerCase();

    // Try Local File Cache first for fast response
    try {
      if (fs.existsSync(EMAIL_STORAGE_FILE_PATH)) {
        const localStore: Record<string, UnifiedEmailItem[]> = JSON.parse(fs.readFileSync(EMAIL_STORAGE_FILE_PATH, "utf-8"));
        let results: UnifiedEmailItem[] = [];

        Object.keys(localStore).forEach((key) => {
          if (key.startsWith(`${cleanUserId}_`)) {
            if (!cleanAccount || cleanAccount === "all" || key === `${cleanUserId}_${cleanAccount}`) {
              results.push(...localStore[key]);
            }
          }
        });

        if (results.length > 0) {
          const map = new Map<string, UnifiedEmailItem>();
          results.forEach((e) => map.set(e.id, e));
          return Array.from(map.values());
        }
      }
    } catch (_) {}

    return [];
  }
}
