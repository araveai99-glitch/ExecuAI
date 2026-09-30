import { getSupabaseServerClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";

export interface StoredGmailCredential {
  userId: string;
  email: string;
  name?: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt: number; // timestamp in ms
  status: "CONNECTED" | "SYNCING" | "RECONNECT_REQUIRED" | "PENDING";
  scope?: string;
  lastSyncedAt?: string;
  messagesCount?: number;
  syncError?: string;
}

const STORAGE_FILE_PATH = path.join(process.cwd(), ".data", "gmail_credentials_v1.json");

// Safe Prisma client getter (supports both dynamic and static module resolution)
function getPrismaClient(): any {
  try {
    const { PrismaClient } = require("@prisma/client");
    const globalForPrisma = global as unknown as { prisma: any };
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient();
    }
    return globalForPrisma.prisma;
  } catch (e) {
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

export class ServerGmailTokenStore {
  /**
   * Persists OAuth credentials in the Database (`gmail_tokens` table / Prisma `GmailToken`)
   */
  public static async saveCredential(cred: StoredGmailCredential): Promise<void> {
    const cleanEmail = cred.email.toLowerCase();
    const cleanUserId = cred.userId || "usr_default_session";
    const expiresAtBigInt = BigInt(cred.expiresAt || Date.now() + 3600 * 1000);

    // 1. Try Prisma Database Persistence (`gmail_tokens` table)
    const db = getPrismaClient();
    if (db) {
      try {
        const existing = await db.gmailToken.findUnique({
          where: { email: cleanEmail },
        });

        const finalRefreshToken = cred.refreshToken || existing?.refreshToken || undefined;

        await db.gmailToken.upsert({
          where: { email: cleanEmail },
          update: {
            userId: cleanUserId,
            accessToken: cred.accessToken,
            ...(finalRefreshToken ? { refreshToken: finalRefreshToken } : {}),
            expiresAt: expiresAtBigInt,
            status: cred.status || "CONNECTED",
            scope: cred.scope || "https://www.googleapis.com/auth/gmail.readonly",
            updatedAt: new Date(),
          },
          create: {
            userId: cleanUserId,
            email: cleanEmail,
            accessToken: cred.accessToken,
            refreshToken: finalRefreshToken,
            expiresAt: expiresAtBigInt,
            status: cred.status || "CONNECTED",
            scope: cred.scope || "https://www.googleapis.com/auth/gmail.readonly",
          },
        });

        console.log(`[GMAIL TOKENS DB] Saved OAuth tokens in database for ${cleanEmail} (Refresh token present: ${!!finalRefreshToken})`);
        cred.refreshToken = finalRefreshToken;
      } catch (dbErr: any) {
        console.warn(`[GMAIL TOKENS DB] Prisma write note/fallback for ${cleanEmail}: ${dbErr.message}`);
      }
    }

    // 2. Try Supabase REST Database Persistence (`gmail_tokens` table)
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        const { data: existingSb } = await supabase.from("gmail_tokens").select("*").eq("email", cleanEmail).single();
        const finalRefreshToken = cred.refreshToken || existingSb?.refresh_token || undefined;

        await supabase.from("gmail_tokens").upsert({
          user_id: cleanUserId,
          email: cleanEmail,
          access_token: cred.accessToken,
          refresh_token: finalRefreshToken,
          expires_at: cred.expiresAt,
          status: cred.status || "CONNECTED",
          scope: cred.scope || "https://www.googleapis.com/auth/gmail.readonly",
          updated_at: new Date().toISOString(),
        }, { onConflict: "email" });

        console.log(`[GMAIL TOKENS DB] Saved OAuth tokens in Supabase DB for ${cleanEmail}`);
        cred.refreshToken = finalRefreshToken;
      } catch (sbErr: any) {
        console.warn(`[GMAIL TOKENS DB] Supabase write note: ${sbErr.message}`);
      }
    }

    // 3. File-system sync (fallback for local offline dev)
    try {
      ensureDirectoryExists(STORAGE_FILE_PATH);
      let localRecords: StoredGmailCredential[] = [];
      if (fs.existsSync(STORAGE_FILE_PATH)) {
        try {
          localRecords = JSON.parse(fs.readFileSync(STORAGE_FILE_PATH, "utf-8"));
        } catch (_) {}
      }

      const key = `${cleanUserId}_${cleanEmail}`;
      const existingIdx = localRecords.findIndex((r) => `${r.userId.toLowerCase()}_${r.email.toLowerCase()}` === key || r.email.toLowerCase() === cleanEmail);

      const existingRecord = existingIdx >= 0 ? localRecords[existingIdx] : null;
      const finalRefreshToken = cred.refreshToken || existingRecord?.refreshToken;

      const recordToSave: StoredGmailCredential = {
        ...cred,
        email: cleanEmail,
        userId: cleanUserId,
        refreshToken: finalRefreshToken,
      };

      if (existingIdx >= 0) {
        localRecords[existingIdx] = recordToSave;
      } else {
        localRecords.push(recordToSave);
      }

      fs.writeFileSync(STORAGE_FILE_PATH, JSON.stringify(localRecords, null, 2), "utf-8");
    } catch (fsErr: any) {
      console.warn(`[GMAIL TOKENS STORE] Local disk save note: ${fsErr.message}`);
    }
  }

  /**
   * Retrieves stored OAuth credential for user from Database (stateless per request)
   */
  public static async getCredential(userId: string, email: string): Promise<StoredGmailCredential | null> {
    const cleanEmail = email.toLowerCase();
    const cleanUserId = userId.toLowerCase();

    // 1. Fetch from Database via Prisma
    const db = getPrismaClient();
    if (db) {
      try {
        const tokenRow = await db.gmailToken.findUnique({
          where: { email: cleanEmail },
        });

        if (tokenRow && (tokenRow.userId.toLowerCase() === cleanUserId || cleanUserId === "usr_session_active")) {
          return {
            userId: tokenRow.userId,
            email: tokenRow.email,
            accessToken: tokenRow.accessToken,
            refreshToken: tokenRow.refreshToken || undefined,
            expiresAt: Number(tokenRow.expiresAt),
            status: tokenRow.status as any,
            scope: tokenRow.scope || undefined,
          };
        }
      } catch (dbErr: any) {
        console.warn(`[GMAIL TOKENS DB] Database query fallback for ${cleanEmail}: ${dbErr.message}`);
      }
    }

    // 2. Fetch from Supabase DB
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        const query = supabase.from("gmail_tokens").select("*").eq("email", cleanEmail);
        if (cleanUserId !== "usr_session_active") {
          query.eq("user_id", cleanUserId);
        }
        const { data: sbRow } = await query.single();
        if (sbRow) {
          return {
            userId: sbRow.user_id,
            email: sbRow.email,
            accessToken: sbRow.access_token,
            refreshToken: sbRow.refresh_token || undefined,
            expiresAt: Number(sbRow.expires_at),
            status: sbRow.status || "CONNECTED",
            scope: sbRow.scope || undefined,
          };
        }
      } catch (_) {}
    }

    // 3. Fallback: Fetch from local disk store
    try {
      if (fs.existsSync(STORAGE_FILE_PATH)) {
        const localRecords: StoredGmailCredential[] = JSON.parse(fs.readFileSync(STORAGE_FILE_PATH, "utf-8"));
        const match = localRecords.find((r) => r.email.toLowerCase() === cleanEmail && (r.userId.toLowerCase() === cleanUserId || cleanUserId === "usr_session_active"));
        if (match) return match;
      }
    } catch (_) {}

    return null;
  }

  /**
   * Retrieves all stored credentials for a user from Database
   */
  public static async getAllUserCredentials(userId: string): Promise<StoredGmailCredential[]> {
    const cleanUserId = userId.toLowerCase();
    const map = new Map<string, StoredGmailCredential>();

    // 1. Prisma DB
    const db = getPrismaClient();
    if (db) {
      try {
        const rows = await db.gmailToken.findMany();
        rows.forEach((r: any) => {
          if (r.userId.toLowerCase() === cleanUserId || cleanUserId === "usr_session_active") {
            map.set(r.email.toLowerCase(), {
              userId: r.userId,
              email: r.email,
              accessToken: r.accessToken,
              refreshToken: r.refreshToken || undefined,
              expiresAt: Number(r.expiresAt),
              status: r.status as any,
              scope: r.scope || undefined,
            });
          }
        });
      } catch (_) {}
    }

    // 2. Supabase DB
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        const query = supabase.from("gmail_tokens").select("*");
        if (cleanUserId !== "usr_session_active") {
          query.eq("user_id", cleanUserId);
        }
        const { data: sbRows } = await query;
        if (sbRows && Array.isArray(sbRows)) {
          sbRows.forEach((r: any) => {
            if (!map.has(r.email.toLowerCase())) {
              map.set(r.email.toLowerCase(), {
                userId: r.user_id,
                email: r.email,
                accessToken: r.access_token,
                refreshToken: r.refresh_token || undefined,
                expiresAt: Number(r.expires_at),
                status: r.status || "CONNECTED",
                scope: r.scope || undefined,
              });
            }
          });
        }
      } catch (_) {}
    }

    // 3. Local Disk Fallback
    try {
      if (fs.existsSync(STORAGE_FILE_PATH)) {
        const localRecords: StoredGmailCredential[] = JSON.parse(fs.readFileSync(STORAGE_FILE_PATH, "utf-8"));
        localRecords.forEach((r: StoredGmailCredential) => {
          if (!map.has(r.email.toLowerCase()) && (r.userId.toLowerCase() === cleanUserId || cleanUserId === "usr_session_active")) {
            map.set(r.email.toLowerCase(), r);
          }
        });
      }
    } catch (_) {}

    return Array.from(map.values());
  }

  /**
   * Obtains a valid Access Token for Gmail API calls on the server.
   * Checks expiration. If expired or close to expiry (within 60s), auto-refreshes via Google OAuth endpoint
   * and saves the new access_token and expiry back into the database.
   */
  public static async getValidAccessToken(
    userId: string,
    email: string
  ): Promise<{ accessToken: string | null; refreshToken?: string; error?: string }> {
    const cred = await this.getCredential(userId, email);
    if (!cred) {
      return { accessToken: null, error: `No server token found in database for ${email}` };
    }

    // Check token freshness (buffer 60 seconds)
    const isStillValid = cred.accessToken && cred.expiresAt > Date.now() + 60000;
    if (isStillValid) {
      return { accessToken: cred.accessToken, refreshToken: cred.refreshToken };
    }

    // Access Token Expired — Perform Server-Side Refresh
    if (cred.refreshToken) {
      console.log(`[GMAIL TOKENS REFRESH] Token expired for ${email}. Triggering automatic OAuth refresh from Google...`);
      return await this.refreshAccessToken(userId, email, cred.refreshToken);
    }

    console.warn(`[GMAIL TOKENS REFRESH] Access token expired for ${email} and no refresh token is stored in DB.`);
    return { accessToken: cred.accessToken || null, error: "Access token expired. Re-authorization required." };
  }

  /**
   * Calls Google's OAuth token endpoint (https://oauth2.googleapis.com/token) to obtain a new access_token,
   * calculates new expiry, and saves it into the database table (`gmail_tokens`).
   */
  public static async refreshAccessToken(
    userId: string,
    email: string,
    refreshTokenInput?: string
  ): Promise<{ accessToken: string | null; refreshToken?: string; error?: string }> {
    const cred = await this.getCredential(userId, email);
    const refreshToken = refreshTokenInput || cred?.refreshToken;

    if (!refreshToken) {
      return { accessToken: null, error: "No refresh_token available for token refresh." };
    }

    const clientId = process.env.GMAIL_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GMAIL_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error("[GMAIL TOKENS REFRESH ERROR] Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in server environment variables.");
    }

    try {
      const res = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: (clientId || "").trim(),
          client_secret: (clientSecret || "").trim(),
          refresh_token: refreshToken.trim(),
          grant_type: "refresh_token",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const newAccessToken = data.access_token;
        const expiresInMs = (data.expires_in || 3600) * 1000;
        const newExpiresAt = Date.now() + expiresInMs;
        const newRefreshToken = data.refresh_token || refreshToken;

        // Save refreshed access token & expiry back into Database (`gmail_tokens`)
        await this.saveCredential({
          userId: userId || cred?.userId || "usr_session_active",
          email: email.toLowerCase(),
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          expiresAt: newExpiresAt,
          status: "CONNECTED",
          scope: data.scope || cred?.scope || "https://www.googleapis.com/auth/gmail.readonly",
          lastSyncedAt: new Date().toISOString(),
        });

        console.log(`[GMAIL TOKENS REFRESH SUCCESS] Refreshed access token for ${email} saved to database. Expires in ${data.expires_in}s.`);
        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
      } else {
        const errData = await res.json().catch(() => ({}));
        console.error(`[GMAIL TOKENS REFRESH FAILED] Google token endpoint error for ${email}:`, errData);

        if (cred) {
          cred.status = "RECONNECT_REQUIRED";
          cred.syncError = errData.error_description || "Refresh token revoked or expired.";
          await this.saveCredential(cred);
        }

        return {
          accessToken: null,
          error: errData.error_description || "Google refresh token expired or revoked. Please re-authorize Gmail.",
        };
      }
    } catch (err: any) {
      console.error(`[GMAIL TOKENS REFRESH EXCEPTION] Exception refreshing token for ${email}:`, err);
      return { accessToken: null, error: err.message };
    }
  }

  public static async removeCredential(userId: string, email: string): Promise<void> {
    const cleanEmail = email.toLowerCase();
    const db = getPrismaClient();
    if (db) {
      try {
        await db.gmailToken.delete({ where: { email: cleanEmail } }).catch(() => {});
      } catch (_) {}
    }

    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        await supabase.from("gmail_tokens").delete().eq("email", cleanEmail);
      } catch (_) {}
    }

    try {
      if (fs.existsSync(STORAGE_FILE_PATH)) {
        let localRecords: StoredGmailCredential[] = JSON.parse(fs.readFileSync(STORAGE_FILE_PATH, "utf-8"));
        localRecords = localRecords.filter((r) => r.email.toLowerCase() !== cleanEmail);
        fs.writeFileSync(STORAGE_FILE_PATH, JSON.stringify(localRecords, null, 2), "utf-8");
      }
    } catch (_) {}
  }
}
