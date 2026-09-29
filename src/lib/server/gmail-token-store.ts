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
  lastSyncedAt?: string;
  messagesCount?: number;
  syncError?: string;
}

const STORAGE_FILE_PATH = path.join(process.cwd(), ".data", "gmail_credentials_v1.json");

function ensureDirectoryExists(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
}

export class ServerGmailTokenStore {
  private static credentialsMap: Map<string, StoredGmailCredential> = new Map();
  private static isInitialized = false;

  private static loadFromDisk() {
    if (this.isInitialized) return;
    try {
      if (fs.existsSync(STORAGE_FILE_PATH)) {
        const raw = fs.readFileSync(STORAGE_FILE_PATH, "utf-8");
        const parsed: StoredGmailCredential[] = JSON.parse(raw);
        parsed.forEach((cred) => {
          const key = `${cred.userId.toLowerCase()}_${cred.email.toLowerCase()}`;
          this.credentialsMap.set(key, cred);
        });
        console.log(`[GMAIL AUTH STORE] Loaded ${this.credentialsMap.size} stored credential record(s) from disk.`);
      }
    } catch (e) {
      console.error("[GMAIL AUTH STORE] Error loading credentials from disk:", e);
    } finally {
      this.isInitialized = true;
    }
  }

  private static saveToDisk() {
    try {
      ensureDirectoryExists(STORAGE_FILE_PATH);
      const arr = Array.from(this.credentialsMap.values());
      fs.writeFileSync(STORAGE_FILE_PATH, JSON.stringify(arr, null, 2), "utf-8");
    } catch (e) {
      console.error("[GMAIL AUTH STORE] Error persisting credentials to disk:", e);
    }
  }

  public static saveCredential(cred: StoredGmailCredential) {
    this.loadFromDisk();
    const key = `${cred.userId.toLowerCase()}_${cred.email.toLowerCase()}`;
    
    // Preserve existing refresh token if new one is missing
    const existing = this.credentialsMap.get(key);
    if (existing && existing.refreshToken && !cred.refreshToken) {
      cred.refreshToken = existing.refreshToken;
    }

    this.credentialsMap.set(key, cred);
    this.saveToDisk();

    console.log(`[GMAIL AUTH] Credentials stored securely for account: ${cred.email}`);
    console.log(`[GMAIL AUTH] Access token available: YES`);
    console.log(`[GMAIL AUTH] Refresh token available: ${cred.refreshToken ? "YES" : "NO"}`);
  }

  public static getCredential(userId: string, email: string): StoredGmailCredential | null {
    this.loadFromDisk();
    const key = `${userId.toLowerCase()}_${email.toLowerCase()}`;
    return this.credentialsMap.get(key) || null;
  }

  public static getAllUserCredentials(userId: string): StoredGmailCredential[] {
    this.loadFromDisk();
    const result: StoredGmailCredential[] = [];
    for (const [_, cred] of this.credentialsMap.entries()) {
      if (cred.userId.toLowerCase() === userId.toLowerCase()) {
        result.push(cred);
      }
    }
    return result;
  }

  public static getAllCredentials(): StoredGmailCredential[] {
    this.loadFromDisk();
    return Array.from(this.credentialsMap.values());
  }

  /**
   * Obtains a valid Access Token for Gmail API calls on the server.
   * Auto-refreshes using Google OAuth refresh token if access token has expired.
   */
  public static async getValidAccessToken(userId: string, email: string): Promise<{ accessToken: string | null; error?: string }> {
    this.loadFromDisk();
    const cred = this.getCredential(userId, email);
    if (!cred) {
      return { accessToken: null, error: `No server credentials found for ${email}` };
    }

    // Check token freshness (buffer 60 seconds)
    if (cred.accessToken && cred.expiresAt > Date.now() + 60000) {
      return { accessToken: cred.accessToken };
    }

    // Access Token Expired — Attempt Refresh using Refresh Token if available
    if (cred.refreshToken) {
      console.log(`[GMAIL AUTH] Access token expired for ${email}. Triggering automatic OAuth refresh...`);
      try {
        const clientId = process.env.GMAIL_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GMAIL_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
          console.warn("[GMAIL AUTH] Missing GMAIL_CLIENT_ID or GMAIL_CLIENT_SECRET in server environment.");
        }

        const res = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: clientId || "",
            client_secret: clientSecret || "",
            refresh_token: cred.refreshToken,
            grant_type: "refresh_token",
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const newAccessToken = data.access_token;
          const expiresInMs = (data.expires_in || 3600) * 1000;

          cred.accessToken = newAccessToken;
          cred.expiresAt = Date.now() + expiresInMs;
          cred.status = "CONNECTED";
          cred.syncError = undefined;

          this.saveCredential(cred);
          console.log(`[GMAIL AUTH] Successfully refreshed access token for ${email}. Expires in ${data.expires_in}s.`);
          return { accessToken: newAccessToken };
        } else {
          const errData = await res.json().catch(() => ({}));
          console.error(`[GMAIL AUTH] Refresh token exchange failed for ${email}:`, errData);
          cred.status = "RECONNECT_REQUIRED";
          cred.syncError = errData.error_description || "Refresh token revoked or expired.";
          this.saveCredential(cred);
          return { accessToken: null, error: "Gmail connection expired. Reconnect Gmail." };
        }
      } catch (err: any) {
        console.error(`[GMAIL AUTH] Refresh request exception for ${email}:`, err);
        return { accessToken: null, error: err.message };
      }
    }

    // Token is expired and no refresh token available
    console.warn(`[GMAIL AUTH] Access token expired for ${email} and no refresh token available.`);
    return { accessToken: cred.accessToken || null };
  }

  public static removeCredential(userId: string, email: string) {
    this.loadFromDisk();
    const key = `${userId.toLowerCase()}_${email.toLowerCase()}`;
    this.credentialsMap.delete(key);
    this.saveToDisk();
    console.log(`[GMAIL AUTH] Removed credentials for ${email}`);
  }
}
