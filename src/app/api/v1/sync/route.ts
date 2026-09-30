import { NextRequest, NextResponse } from "next/server";
import { ServerGmailTokenStore } from "@/lib/server/gmail-token-store";
import { ServerEmailStore } from "@/lib/server/gmail-email-store";
import { GmailApiService } from "@/lib/services/GmailApiService";
import { UnifiedEmailItem } from "@/lib/types/execuai";

// Polling-Based Incremental Live Sync API Endpoint (Gmail historyId)
export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const accountFilter = req.nextUrl.searchParams.get("accountEmail") || "ALL";
    const userEmailsParam = req.nextUrl.searchParams.get("userEmails") || "";
    const forceFullSync = req.nextUrl.searchParams.get("fullSync") === "true";

    const userEmails = userEmailsParam ? userEmailsParam.split(",").map((e) => e.trim()) : [];

    if (!userId || userId === "usr_current_session") {
      return NextResponse.json({
        success: true,
        emails: [],
        newMessagesCount: 0,
        syncStatus: "idle",
      });
    }

    // 1. Retrieve server-stored credentials for this user
    const credentials = await ServerGmailTokenStore.getAllUserCredentials(userId, userEmails);

    if (credentials.length === 0) {
      return NextResponse.json({
        success: true,
        emails: [],
        newMessagesCount: 0,
        syncStatus: "idle",
        syncError: "No connected Gmail accounts found.",
      });
    }

    let totalNewMessagesFetched = 0;
    const accountsStatusList: Array<{ email: string; status: string; historyId?: string }> = [];

    for (const cred of credentials) {
      const cleanEmail = cred.email.toLowerCase();

      if (accountFilter !== "ALL" && cleanEmail !== accountFilter.toLowerCase()) {
        continue;
      }

      // 2. Retrieve valid Access Token (auto-refreshed via Refresh Token on server if expired)
      const tokenResult = await ServerGmailTokenStore.getValidAccessToken(cred.userId, cleanEmail);

      if (!tokenResult.accessToken) {
        console.warn(`[LIVE SYNC] Token invalid for ${cleanEmail}: ${tokenResult.error}`);
        accountsStatusList.push({ email: cleanEmail, status: "RECONNECT_REQUIRED" });
        continue;
      }

      let activeToken = tokenResult.accessToken;
      const storedHistoryId = cred.historyId;

      try {
        if (storedHistoryId && !forceFullSync) {
          // 3a. INCREMENTAL SYNC via history.list API
          console.log(`[LIVE SYNC] Triggering incremental history.list polling for ${cleanEmail} (startHistoryId: ${storedHistoryId})`);
          
          let historyResult = await GmailApiService.fetchGmailHistoryUpdates(activeToken, storedHistoryId);

          if (historyResult.resetRequired) {
            console.warn(`[LIVE SYNC] Stale historyId for ${cleanEmail}. Falling back to full sync...`);
            const fullFetch = await GmailApiService.fetchRealGmailMessages(activeToken, cleanEmail, 25);
            if (fullFetch.messages.length > 0) {
              await ServerEmailStore.saveEmails(cred.userId, cleanEmail, fullFetch.messages);
            }
            const profile = await GmailApiService.fetchGmailProfile(activeToken).catch(() => null);
            cred.historyId = profile?.historyId || storedHistoryId;
            cred.lastSyncedAt = new Date().toISOString();
            await ServerGmailTokenStore.saveCredential(cred);
          } else if (historyResult.addedMessageIds && historyResult.addedMessageIds.length > 0) {
            // Fetch message details for newly added messages
            const newEmails: UnifiedEmailItem[] = [];
            for (const msgId of historyResult.addedMessageIds) {
              try {
                const msgUrl = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msgId}?format=full`;
                const msgRes = await fetch(msgUrl, {
                  headers: { Authorization: `Bearer ${activeToken}` },
                });
                if (msgRes.ok) {
                  const msgData = await msgRes.json();
                  const headersArr: Array<{ name: string; value: string }> = msgData.payload?.headers || [];
                  const getHeader = (n: string) => headersArr.find((h) => h.name.toLowerCase() === n.toLowerCase())?.value || "";

                  const fromRaw = getHeader("From");
                  let senderName = fromRaw;
                  let senderEmail = fromRaw;
                  const match = fromRaw.match(/(.*?)\s*<([^>]+)>/);
                  if (match) {
                    senderName = match[1].replace(/^["']|["']$/g, "").trim() || match[2];
                    senderEmail = match[2].trim();
                  }

                  const subject = getHeader("Subject") || "(No Subject)";
                  const snippet = msgData.snippet || "";
                  const bodyText = snippet;

                  const classification = { priority: "NORMAL" as const, intent: "OTHER" as const, risk: "SAFE" as const };

                  newEmails.push({
                    id: msgData.id,
                    threadId: msgData.threadId,
                    provider: "GMAIL",
                    accountEmail: cleanEmail,
                    accountLabel: `Gmail (${cleanEmail})`,
                    senderName: senderName || senderEmail,
                    senderEmail,
                    recipients: { to: [cleanEmail] },
                    subject,
                    snippet,
                    body: bodyText,
                    timestamp: "Just now",
                    priority: classification.priority,
                    intent: classification.intent,
                    risk: classification.risk,
                    unread: (msgData.labelIds || []).includes("UNREAD"),
                    flagged: (msgData.labelIds || []).includes("STARRED"),
                    hasAttachment: false,
                    aiDraftAvailable: true,
                  });
                }
              } catch (_) {}
            }

            if (newEmails.length > 0) {
              await ServerEmailStore.saveEmails(cred.userId, cleanEmail, newEmails);
              totalNewMessagesFetched += newEmails.length;
            }

            cred.historyId = historyResult.newHistoryId;
            cred.lastSyncedAt = new Date().toISOString();
            await ServerGmailTokenStore.saveCredential(cred);
          } else {
            // No new messages
            cred.historyId = historyResult.newHistoryId;
            cred.lastSyncedAt = new Date().toISOString();
            await ServerGmailTokenStore.saveCredential(cred);
          }
        } else {
          // 3b. FULL SYNC (Initial sync or reset)
          console.log(`[LIVE SYNC] Executing full sync for ${cleanEmail}...`);
          const fullFetch = await GmailApiService.fetchRealGmailMessages(activeToken, cleanEmail, 25);
          if (fullFetch.messages.length > 0) {
            await ServerEmailStore.saveEmails(cred.userId, cleanEmail, fullFetch.messages);
            totalNewMessagesFetched += fullFetch.messages.length;
          }
          const profile = await GmailApiService.fetchGmailProfile(activeToken).catch(() => null);
          cred.historyId = profile?.historyId || cred.historyId;
          cred.lastSyncedAt = new Date().toISOString();
          await ServerGmailTokenStore.saveCredential(cred);
        }

        accountsStatusList.push({ email: cleanEmail, status: "CONNECTED", historyId: cred.historyId });
      } catch (err: any) {
        console.error(`[LIVE SYNC ERROR] ${cleanEmail}:`, err);
        accountsStatusList.push({ email: cleanEmail, status: "ERROR" });
      }
    }

    // Return current dataset from store
    const storedEmails = await ServerEmailStore.getStoredEmails(userId, accountFilter);

    return NextResponse.json({
      success: true,
      emails: storedEmails,
      newMessagesCount: totalNewMessagesFetched,
      accounts: accountsStatusList,
      syncStatus: "synced",
      lastSyncedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[LIVE SYNC API Exception]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
