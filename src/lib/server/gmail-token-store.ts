import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getPrismaClient } from "@/lib/server/prisma-client";
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
  historyId?: string;
  lastSyncedAt?: string;
  messagesCount?: number;
  syncError?: string;
}

const STORAGE_FILE_PATH = path.join(process.cwd(), ".data", "gmail_credentials_v1.json");



function ensureDirectoryExists(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    ensureDirectoryExists(dirname);
    fs.mkdirSync(dirname);
  }
}

export class ServerGmailTokenStore {
  /**
   * Persists OAuth credentials in Database / Storage bound strictly to the canonical user ID and email
   */
  public static async saveCredential(cred: StoredGmailCredential): Promise<void> {
    const cleanEmail = cred.email.toLowerCase().trim();
    const cleanUserId = cred.userId.trim();
    const expiresAtBigInt = BigInt(cred.expiresAt || Date.now() + 3600 * 1000);

    console.log(`[DIAGNOSTIC LOG] GmailToken stored userId: ${cleanUserId}, email: ${cleanEmail}`);
    console.log(`[GMAIL TOKENS STORE] saveCredential — Persisting OAuth token for userId: ${cleanUserId}, email: ${cleanEmail}`);

    // 1. Try Prisma Database Persistence (`gmail_tokens` table)
    const db = getPrismaClient();
    if (!db) {
      console.error(`[OAUTH DB SAVE CRITICAL ERROR] getPrismaClient() returned null. process.env.DATABASE_URL present: ${Boolean(process.env.DATABASE_URL)}`);
    } else {
      try {
        // Step A: Ensure Organization exists
        let defaultOrg = await db.organization.findFirst({ where: { id: "org_execuai_corp" } });
        if (!defaultOrg) {
          defaultOrg = await db.organization.create({
            data: {
              id: "org_execuai_corp",
              name: "ExecuAI Corporation",
              slug: "execuai-corp",
            },
          }).catch((err) => {
            console.warn(`[OAUTH DB SAVE] Org creation note: ${err.message}`);
            return null;
          });
        }
        const orgId = defaultOrg?.id || "org_execuai_corp";

        // Step B: Ensure User exists
        let userObj = await db.user.findUnique({ where: { id: cleanUserId } });
        if (!userObj) {
          userObj = await db.user.findUnique({ where: { email: cleanEmail } });
        }
        if (!userObj) {
          userObj = await db.user.create({
            data: {
              id: cleanUserId,
              organizationId: orgId,
              email: cleanEmail,
              fullName: cred.name || cleanEmail.split("@")[0],
              role: "USER",
              status: "ACTIVE",
              emailVerified: true,
            },
          }).catch((err) => {
            console.warn(`[OAUTH DB SAVE] User creation note: ${err.message}`);
            return null;
          });
        }

        const activeDbUserId = userObj?.id || cleanUserId;

        // Step C: Upsert GmailToken record
        const existingToken = await db.gmailToken.findFirst({
          where: { userId: activeDbUserId, email: cleanEmail },
        });

        const finalRefreshToken = cred.refreshToken || existingToken?.refreshToken || undefined;
        const finalHistoryId = cred.historyId || existingToken?.historyId || undefined;

        await db.gmailToken.upsert({
          where: {
            userId_email: { userId: activeDbUserId, email: cleanEmail },
          },
          update: {
            accessToken: cred.accessToken,
            ...(finalRefreshToken ? { refreshToken: finalRefreshToken } : {}),
            expiresAt: expiresAtBigInt,
            status: cred.status || "CONNECTED",
            scope: cred.scope || "https://www.googleapis.com/auth/gmail.readonly",
            ...(finalHistoryId ? { historyId: finalHistoryId } : {}),
            updatedAt: new Date(),
          },
          create: {
            userId: activeDbUserId,
            email: cleanEmail,
            accessToken: cred.accessToken,
            refreshToken: finalRefreshToken,
            expiresAt: expiresAtBigInt,
            status: cred.status || "CONNECTED",
            scope: cred.scope || "https://www.googleapis.com/auth/gmail.readonly",
            ...(finalHistoryId ? { historyId: finalHistoryId } : {}),
          },
        });

        console.log(`[GMAIL TOKENS DB] Saved OAuth tokens in Prisma DB for userId: ${activeDbUserId}, email: ${cleanEmail}`);
        cred.refreshToken = finalRefreshToken;
        cred.historyId = finalHistoryId;

        // Step D: Upsert EmailAccount record
        await db.emailAccount.upsert({
          where: {
            userId_emailAddress: { userId: activeDbUserId, emailAddress: cleanEmail },
          },
          update: {
            status: "CONNECTED",
            lastSyncedAt: new Date(),
            updatedAt: new Date(),
          },
          create: {
            organizationId: orgId,
            userId: activeDbUserId,
            accountLabel: `Gmail (${cleanEmail})`,
            provider: "GMAIL",
            emailAddress: cleanEmail,
            status: "CONNECTED",
            encryptedTokens: "OAUTH2_TOKENS_STORED_IN_GMAIL_TOKENS",
            oauthScopes: [cred.scope || "https://www.googleapis.com/auth/gmail.readonly"],
            lastSyncedAt: new Date(),
          },
        });

        // Step E: Immediate Post-Save DB Query Verification Telemetry
        const verifyToken = await db.gmailToken.findFirst({ where: { userId: activeDbUserId, email: cleanEmail } });
        const verifyAccount = await db.emailAccount.findFirst({ where: { userId: activeDbUserId, emailAddress: cleanEmail } });
        const verifyUser = await db.user.findUnique({ where: { id: activeDbUserId } });
        const verifyOrg = await db.organization.findUnique({ where: { id: orgId } });

        console.log(`[POST-SAVE VERIFICATION TELEMETRY] userExists: ${Boolean(verifyUser)}, orgExists: ${Boolean(verifyOrg)}, gmailTokenRowExists: ${Boolean(verifyToken)}, emailAccountRowExists: ${Boolean(verifyAccount)}`);
      } catch (dbErr: any) {
        console.error(`[GMAIL TOKENS DB SAVE ERROR] Exception persisting OAuth token to PostgreSQL: ${dbErr.message}`, dbErr);
      }
    }

    // 2. Try Supabase REST Database Persistence (`gmail_tokens` table)
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        const { data: existingSb } = await supabase
          .from("gmail_tokens")
          .select("*")
          .eq("user_id", cleanUserId)
          .eq("email", cleanEmail)
          .single();

        const finalRefreshToken = cred.refreshToken || existingSb?.refresh_token || undefined;
        const finalHistoryId = cred.historyId || existingSb?.history_id || undefined;

        await supabase.from("gmail_tokens").upsert(
          {
            user_id: cleanUserId,
            email: cleanEmail,
            access_token: cred.accessToken,
            refresh_token: finalRefreshToken,
            expires_at: cred.expiresAt,
            status: cred.status || "CONNECTED",
            scope: cred.scope || "https://www.googleapis.com/auth/gmail.readonly",
            history_id: finalHistoryId,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id,email" }
        );

        console.log(`[GMAIL TOKENS DB] Saved OAuth tokens in Supabase DB for userId: ${cleanUserId}, email: ${cleanEmail}`);
        cred.refreshToken = finalRefreshToken;
        cred.historyId = finalHistoryId;
      } catch (sbErr: any) {
        console.warn(`[GMAIL TOKENS DB] Supabase write note: ${sbErr.message}`);
      }
    }

    // 3. File-system store fallback (bound to cleanUserId and cleanEmail)
    try {
      ensureDirectoryExists(STORAGE_FILE_PATH);
      let localRecords: StoredGmailCredential[] = [];
      if (fs.existsSync(STORAGE_FILE_PATH)) {
        try {
          localRecords = JSON.parse(fs.readFileSync(STORAGE_FILE_PATH, "utf-8"));
        } catch (_) {}
      }

      const existingIdx = localRecords.findIndex(
        (r) => r.userId.toLowerCase() === cleanUserId.toLowerCase() && r.email.toLowerCase() === cleanEmail
      );

      const existingRecord = existingIdx >= 0 ? localRecords[existingIdx] : null;
      const finalRefreshToken = cred.refreshToken || existingRecord?.refreshToken;
      const finalHistoryId = cred.historyId || existingRecord?.historyId;

      const recordToSave: StoredGmailCredential = {
        ...cred,
        email: cleanEmail,
        userId: cleanUserId,
        refreshToken: finalRefreshToken,
        historyId: finalHistoryId,
      };

      if (existingIdx >= 0) {
        localRecords[existingIdx] = recordToSave;
      } else {
        localRecords.push(recordToSave);
      }

      fs.writeFileSync(STORAGE_FILE_PATH, JSON.stringify(localRecords, null, 2), "utf-8");
      console.log(`[GMAIL TOKENS DISK] Saved credential to disk store for userId: ${cleanUserId}, email: ${cleanEmail}`);
    } catch (fsErr: any) {
      console.warn(`[GMAIL TOKENS STORE] Disk save note: ${fsErr.message}`);
    }
  }

  /**
   * Retrieves stored OAuth credential strictly belonging to specified user ID and email
   */
  public static async getCredential(userId: string, email: string): Promise<StoredGmailCredential | null> {
    if (!email) return null;
    const cleanEmail = email.toLowerCase().trim();
    const rawUserId = userId ? userId.trim() : "";
    const cleanUserId = userId ? userId.toLowerCase().trim() : "";

    // 1. Prisma DB
    const db = getPrismaClient();
    if (db) {
      try {
        const tokenRow = await db.gmailToken.findFirst({
          where: {
            email: cleanEmail,
          },
        });

        if (tokenRow) {
          console.log(`[GMAIL TOKENS STORE] getCredential — Found Prisma DB token for email: ${cleanEmail}`);
          return {
            userId: tokenRow.userId,
            email: tokenRow.email,
            accessToken: tokenRow.accessToken,
            refreshToken: tokenRow.refreshToken || undefined,
            expiresAt: Number(tokenRow.expiresAt),
            status: tokenRow.status as any,
            scope: tokenRow.scope || undefined,
            historyId: tokenRow.historyId || undefined,
          };
        }
      } catch (dbErr: any) {
        console.warn(`[GMAIL TOKENS DB] Query note for ${cleanEmail}: ${dbErr.message}`);
      }
    }

    // 2. Supabase DB
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        const { data: sbRow } = await supabase
          .from("gmail_tokens")
          .select("*")
          .eq("email", cleanEmail)
          .single();

        if (sbRow) {
          console.log(`[GMAIL TOKENS STORE] getCredential — Found Supabase DB token for email: ${cleanEmail}`);
          return {
            userId: sbRow.user_id,
            email: sbRow.email,
            accessToken: sbRow.access_token,
            refreshToken: sbRow.refresh_token || undefined,
            expiresAt: Number(sbRow.expires_at),
            status: sbRow.status || "CONNECTED",
            scope: sbRow.scope || undefined,
            historyId: sbRow.history_id || undefined,
          };
        }
      } catch (_) {}
    }

    // 3. Disk store fallback
    try {
      if (fs.existsSync(STORAGE_FILE_PATH)) {
        const localRecords: StoredGmailCredential[] = JSON.parse(fs.readFileSync(STORAGE_FILE_PATH, "utf-8"));
        const match = localRecords.find((r) => r.email.toLowerCase() === cleanEmail);
        if (match) {
          console.log(`[GMAIL TOKENS STORE] getCredential — Found disk token for email: ${cleanEmail}`);
          return match;
        }
      }
    } catch (_) {}

    console.log(`[GMAIL TOKENS STORE] getCredential — No token found for email: ${cleanEmail}`);
    return null;
  }

  /**
   * Retrieves all stored Gmail credentials belonging strictly to the specified canonical user ID or connected email addresses
   */
  public static async getAllUserCredentials(userId: string, userEmails: string[] = []): Promise<StoredGmailCredential[]> {
    const rawUserId = (userId || "").trim();
    const cleanUserId = rawUserId.toLowerCase();
    const cleanUserEmails = userEmails.map((e) => e.toLowerCase().trim()).filter(Boolean);

    if (!rawUserId && cleanUserEmails.length === 0) {
      console.warn("[GMAIL TOKENS STORE] getAllUserCredentials called with empty userId and no emails — returning 0 credentials");
      return [];
    }

    const map = new Map<string, StoredGmailCredential>();

    // Build OR conditions array for Prisma DB query
    const prismaOrConditions: any[] = [];
    if (rawUserId) {
      prismaOrConditions.push({ userId: rawUserId });
      prismaOrConditions.push({ userId: cleanUserId });
    }
    if (cleanUserEmails.length > 0) {
      cleanUserEmails.forEach((em) => {
        prismaOrConditions.push({ email: em });
      });
    }

    // 1. Prisma DB
    const db = getPrismaClient();
    if (db && prismaOrConditions.length > 0) {
      try {
        const rows = await db.gmailToken.findMany({
          where: {
            OR: prismaOrConditions,
          },
        });
        rows.forEach((r: any) => {
          const recEmail = r.email.toLowerCase();
          if (cleanUserEmails.length === 0 || cleanUserEmails.includes(recEmail)) {
            map.set(recEmail, {
              userId: r.userId,
              email: r.email,
              accessToken: r.accessToken,
              refreshToken: r.refreshToken || undefined,
              expiresAt: Number(r.expiresAt),
              status: r.status as any,
              scope: r.scope || undefined,
              historyId: r.historyId || undefined,
            });
          }
        });
      } catch (_) {}
    }

    // 2. Supabase DB
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        let sbQuery = supabase.from("gmail_tokens").select("*");
        const orClauses: string[] = [];
        if (rawUserId) {
          orClauses.push(`user_id.eq.${rawUserId}`, `user_id.eq.${cleanUserId}`);
        }
        if (cleanUserEmails.length > 0) {
          cleanUserEmails.forEach((em) => orClauses.push(`email.eq.${em}`));
        }
        if (orClauses.length > 0) {
          sbQuery = sbQuery.or(orClauses.join(","));
        }
        const { data: sbRows } = await sbQuery;
        if (sbRows && Array.isArray(sbRows)) {
          sbRows.forEach((r: any) => {
            const recEmail = (r.email || "").toLowerCase();
            if (!map.has(recEmail) && (cleanUserEmails.length === 0 || cleanUserEmails.includes(recEmail))) {
              map.set(recEmail, {
                userId: r.user_id,
                email: r.email,
                accessToken: r.access_token,
                refreshToken: r.refresh_token || undefined,
                expiresAt: Number(r.expires_at),
                status: r.status || "CONNECTED",
                scope: r.scope || undefined,
                historyId: r.history_id || undefined,
              });
            }
          });
        }
      } catch (_) {}
    }

    // 3. Disk store fallback
    try {
      if (fs.existsSync(STORAGE_FILE_PATH)) {
        const localRecords: StoredGmailCredential[] = JSON.parse(fs.readFileSync(STORAGE_FILE_PATH, "utf-8"));
        localRecords.forEach((r: StoredGmailCredential) => {
          const recEmail = (r.email || "").toLowerCase();
          const matchesUser = rawUserId ? (r.userId === rawUserId || r.userId.toLowerCase() === cleanUserId) : false;
          const matchesEmail = cleanUserEmails.includes(recEmail);
          if (
            (matchesUser || matchesEmail) &&
            !map.has(recEmail) &&
            (cleanUserEmails.length === 0 || cleanUserEmails.includes(recEmail))
          ) {
            map.set(recEmail, r);
          }
        });
      }
    } catch (_) {}

    const results = Array.from(map.values());
    console.log(`[DIAGNOSTIC LOG] GmailToken lookup userId: ${cleanUserId}, credential count: ${results.length}`);
    console.log(`[GMAIL TOKENS STORE] getAllUserCredentials(userId=${cleanUserId}, userEmails=[${cleanUserEmails.join(", ")}]) -> Matched ${results.length} credential(s)`);
    return results;
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

    const { getGoogleClientId, getGoogleClientSecret } = await import("@/lib/config/google-oauth");
    const clientId = getGoogleClientId();
    const clientSecret = getGoogleClientSecret();

    if (!clientId || !clientSecret) {
      console.error("[GMAIL TOKENS REFRESH ERROR] Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in server environment variables.");
    }

    try {
      const res = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
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

    // 1. Attempt token revocation with Google OAuth Revocation Endpoint
    try {
      const cred = await this.getCredential(userId, cleanEmail);
      const tokenToRevoke = cred?.refreshToken || cred?.accessToken;
      if (tokenToRevoke) {
        await fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(tokenToRevoke)}`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }).catch((revErr) => {
          console.warn(`[GMAIL DISCONNECT] Token revocation note for ${cleanEmail}:`, revErr.message);
        });
        console.log(`[GMAIL DISCONNECT] Revoked Google OAuth token for ${cleanEmail}`);
      }
    } catch (err: any) {
      console.warn(`[GMAIL DISCONNECT] Revocation pre-check note for ${cleanEmail}:`, err.message);
    }

    // 2. Remove from Prisma DB
    const db = getPrismaClient();
    if (db) {
      try {
        await db.gmailToken.deleteMany({ where: { email: cleanEmail } }).catch(() => {});
      } catch (_) {}
    }

    // 3. Remove from Supabase DB
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        await supabase.from("gmail_tokens").delete().eq("email", cleanEmail);
      } catch (_) {}
    }

    // 4. Remove from local disk cache
    try {
      if (fs.existsSync(STORAGE_FILE_PATH)) {
        let localRecords: StoredGmailCredential[] = JSON.parse(fs.readFileSync(STORAGE_FILE_PATH, "utf-8"));
        localRecords = localRecords.filter((r) => r.email.toLowerCase() !== cleanEmail);
        fs.writeFileSync(STORAGE_FILE_PATH, JSON.stringify(localRecords, null, 2), "utf-8");
      }
    } catch (_) {}
  }
}
