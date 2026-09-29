import { NextRequest, NextResponse } from "next/server";
import { ServerGmailTokenStore } from "@/lib/server/gmail-token-store";
import { GmailApiService } from "@/lib/services/GmailApiService";
import { UnifiedEmailItem, DraftItem } from "@/lib/types/execuai";

// Server-side Unified Inbox API
export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const accountFilter = req.nextUrl.searchParams.get("accountEmail") || "ALL";

    if (!userId || userId === "usr_current_session") {
      return NextResponse.json({
        success: true,
        emails: [],
        drafts: [],
        accounts: [],
        counts: {
          critical: 0,
          urgent: 0,
          needReview: 0,
          safeToDraft: 0,
          lowPriority: 0,
          totalDrafts: 0,
          syncedMailboxes: 0,
        },
        syncStatus: "idle",
        syncError: null,
      });
    }

    // 1. Retrieve all server-stored Gmail credentials strictly for this user session
    const credentials = await ServerGmailTokenStore.getAllUserCredentials(userId);

    console.log(`[GMAIL SYNC] GET /api/v1/inbox — Found ${credentials.length} server-stored credential(s)`);

    if (credentials.length === 0) {
      return NextResponse.json({
        success: true,
        emails: [],
        drafts: [],
        accounts: [],
        counts: {
          critical: 0,
          urgent: 0,
          needReview: 0,
          safeToDraft: 0,
          lowPriority: 0,
          totalDrafts: 0,
          syncedMailboxes: 0,
        },
        syncStatus: "idle",
        syncError: "No connected Gmail accounts. Please click Connect Gmail to authenticate.",
      });
    }

    const allFetchedEmails: UnifiedEmailItem[] = [];
    const allFetchedDrafts: DraftItem[] = [];
    const accountsStatusList: Array<{ email: string; provider: string; status: string; lastSync: string; syncError?: string }> = [];
    let validSyncedCount = 0;
    let globalError: string | null = null;

    for (const cred of credentials) {
      const cleanEmail = cred.email.toLowerCase();

      // Filter by account if specified
      if (accountFilter !== "ALL" && cleanEmail !== accountFilter.toLowerCase()) {
        continue;
      }

      // 2. Obtain valid Access Token (auto-refreshes via Refresh Token on server if expired)
      const tokenResult = await ServerGmailTokenStore.getValidAccessToken(cred.userId, cleanEmail);

      if (!tokenResult.accessToken) {
        console.warn(`[GMAIL SYNC] Account ${cleanEmail} has invalid/expired server token. Error: ${tokenResult.error}`);
        accountsStatusList.push({
          email: cleanEmail,
          provider: "Gmail",
          status: "RECONNECT_REQUIRED",
          lastSync: cred.lastSyncedAt || "Failed",
          syncError: tokenResult.error || "Gmail connection expired. Reconnect Gmail.",
        });
        globalError = tokenResult.error || "Gmail connection expired. Reconnect Gmail.";
        continue;
      }

      // 3. Call Gmail API on server using valid access token (with automatic 401 single retry)
      try {
        console.log(`[GMAIL SYNC] Fetching Gmail INBOX for ${cleanEmail} via server API...`);
        let activeToken = tokenResult.accessToken;
        let messages: UnifiedEmailItem[] = [];
        let drafts: any[] = [];

        try {
          messages = await GmailApiService.fetchRealGmailMessages(activeToken, cleanEmail, 30);
          drafts = await GmailApiService.fetchRealGmailDrafts(activeToken, cleanEmail);
        } catch (fetchErr: any) {
          if (fetchErr.message?.includes("401") || fetchErr.message?.toLowerCase().includes("expired")) {
            console.warn(`[GMAIL SYNC] Received 401 Unauthorized for ${cleanEmail}. Triggering token refresh & retry...`);
            const refreshRes = await ServerGmailTokenStore.refreshAccessToken(cred.userId, cleanEmail);

            if (refreshRes.accessToken) {
              activeToken = refreshRes.accessToken;
              console.log(`[GMAIL SYNC] Token refreshed successfully for ${cleanEmail}. Retrying Gmail API call ONCE...`);
              messages = await GmailApiService.fetchRealGmailMessages(activeToken, cleanEmail, 30);
              drafts = await GmailApiService.fetchRealGmailDrafts(activeToken, cleanEmail);
            } else {
              throw new Error(refreshRes.error || "401 Unauthorized: Unable to refresh expired access token. Please re-authorize Gmail.");
            }
          } else {
            throw fetchErr;
          }
        }

        console.log(`[GMAIL SYNC] Account ${cleanEmail}: ${messages.length} messages, ${drafts.length} drafts fetched`);
        allFetchedEmails.push(...messages);

        const convertedDrafts: DraftItem[] = drafts.map((d) => {
          const orig = messages.find((m) => m.id === d.messageId || m.threadId === d.messageId) || {
            id: d.messageId || d.id,
            provider: "GMAIL" as const,
            accountEmail: cleanEmail,
            accountLabel: `Gmail (${cleanEmail})`,
            senderName: "Gmail Draft",
            senderEmail: cleanEmail,
            subject: d.subject,
            snippet: d.snippet,
            body: d.snippet,
            timestamp: d.date || "Draft",
            priority: "NORMAL" as const,
            intent: "OTHER" as const,
            risk: "SAFE" as const,
            unread: false,
            flagged: false,
          };

          return {
            id: d.id,
            emailId: d.messageId,
            originalEmail: orig,
            draftSubject: d.subject,
            draftBody: d.snippet,
            status: "DRAFT_PREPARED",
            currentTone: "professional",
            currentLength: "medium",
            lastSavedAgo: d.date,
            requiresHumanApproval: true,
            humanApprovalReason: "Actual Gmail Draft",
          };
        });

        allFetchedDrafts.push(...convertedDrafts);
        validSyncedCount++;

        cred.status = "CONNECTED";
        cred.lastSyncedAt = new Date().toISOString();
        cred.messagesCount = messages.length;
        await ServerGmailTokenStore.saveCredential(cred);

        accountsStatusList.push({
          email: cleanEmail,
          provider: "Gmail",
          status: "CONNECTED",
          lastSync: "Synced just now",
        });
      } catch (err: any) {
        console.error(`[GMAIL SYNC] Exception fetching Gmail API for ${cleanEmail}:`, err);
        accountsStatusList.push({
          email: cleanEmail,
          provider: "Gmail",
          status: err.message?.includes("401") || err.message?.includes("403") ? "RECONNECT_REQUIRED" : "ERROR",
          lastSync: cred.lastSyncedAt || "Error",
          syncError: err.message,
        });
        globalError = err.message || `Failed to fetch messages for ${cleanEmail}`;
      }
    }

    // 4. Deduplicate messages by ID
    const uniqueMap = new Map<string, UnifiedEmailItem>();
    allFetchedEmails.forEach((e) => uniqueMap.set(e.id, e));
    const deduplicatedEmails = Array.from(uniqueMap.values());

    // 5. Calculate category counts from actual inbox messages
    const critical = deduplicatedEmails.filter((e) => e.priority === "CRITICAL").length;
    const urgent = deduplicatedEmails.filter((e) => e.priority === "URGENT").length;
    const needReview = deduplicatedEmails.filter(
      (e) => e.risk === "HIGH_RISK" || e.risk === "REVIEW_REQUIRED" || e.risk === "REVIEW"
    ).length;
    const safeToDraft = deduplicatedEmails.filter((e) => e.risk === "SAFE" || e.aiDraftAvailable).length;
    const lowPriority = deduplicatedEmails.filter(
      (e) => e.priority === "LOW" || e.priority === "NORMAL" || e.priority === "SPAM"
    ).length;

    return NextResponse.json({
      success: true,
      emails: deduplicatedEmails,
      drafts: allFetchedDrafts,
      accounts: accountsStatusList,
      counts: {
        critical,
        urgent,
        needReview,
        safeToDraft,
        lowPriority,
        totalDrafts: allFetchedDrafts.length,
        syncedMailboxes: validSyncedCount,
      },
      syncStatus: validSyncedCount > 0 ? "synced" : "error",
      syncError: validSyncedCount > 0 ? null : globalError || "Gmail connection failed",
      lastSyncedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[GMAIL SYNC API Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
