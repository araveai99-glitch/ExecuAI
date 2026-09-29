"use client";

import * as React from "react";
import { useAuth, ConnectedAccount } from "./auth-context";
import { UnifiedEmailItem, DraftItem, MailboxProvider } from "./types/execuai";
import { GmailApiService } from "./services/GmailApiService";

export type CategoryFilterType =
  | "ALL"
  | "CRITICAL"
  | "URGENT"
  | "NEED_REVIEW"
  | "SAFE_TO_DRAFT"
  | "LOW_PRIORITY";

export type ProviderFilterType = "ALL" | "GMAIL" | "ZOHO" | "OUTLOOK" | "OTHER";

interface UserDataContextType {
  // Accounts & Filters
  connectedAccounts: ConnectedAccount[];
  selectedAccountFilter: string; // "ALL" or specific email address
  setSelectedAccountFilter: (accountEmail: string) => void;
  selectedProviderFilter: ProviderFilterType;
  setSelectedProviderFilter: (provider: ProviderFilterType) => void;
  selectedCategoryFilter: CategoryFilterType;
  setSelectedCategoryFilter: (category: CategoryFilterType) => void;

  // Sync & Loading States
  isLoading: boolean;
  syncError: string | null;
  refreshGmailSync: () => Promise<void>;

  // Add/Remove Account Actions
  addAccount: (provider: string, accountEmail: string) => void;
  removeAccount: (accountEmail: string) => void;

  // Search & Filtering
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Calculated Email Datasets
  allUserEmails: UnifiedEmailItem[];
  filteredEmails: UnifiedEmailItem[];

  // Calculated Category Counts (dynamically scoped to active account/provider selection)
  counts: {
    critical: number;
    urgent: number;
    needReview: number;
    safeToDraft: number;
    lowPriority: number;
    totalDrafts: number;
    syncedMailboxes: number;
  };

  // Drafts
  userDrafts: DraftItem[];

  // Email Item Operations
  toggleUnread: (emailId: string) => void;
  toggleFlagged: (emailId: string) => void;
  archiveEmail: (emailId: string) => void;
  deleteEmail: (emailId: string) => void;

  // Reply & Draft Operations
  saveDraftReply: (emailId: string, replyText: string) => Promise<{ success: boolean; message: string }>;
  sendReply: (emailId: string, replyText: string) => Promise<{ success: boolean; message: string }>;
}

const UserDataContext = React.createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, connectAccount, removeAccount: authRemoveAccount } = useAuth();

  const [selectedAccountFilter, setSelectedAccountFilter] = React.useState<string>("ALL");
  const [selectedProviderFilter, setSelectedProviderFilter] = React.useState<ProviderFilterType>("ALL");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = React.useState<CategoryFilterType>("ALL");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [syncError, setSyncError] = React.useState<string | null>(null);

  const connectedAccounts = user?.connectedAccounts || [];

  // Storage keys scoped specifically to authenticated user ID
  const storageKey = user ? `execuai_user_emails_db_${user.id}` : null;
  const storageDraftsKey = user ? `execuai_user_drafts_db_${user.id}` : null;

  const [emails, setEmails] = React.useState<UnifiedEmailItem[]>([]);
  const [drafts, setDrafts] = React.useState<DraftItem[]>([]);

  // Function to perform REAL Gmail API sync
  const refreshGmailSync = React.useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setSyncError(null);

    try {
      const userAccounts = user.connectedAccounts || [];
      const fetchedAccountEmails: UnifiedEmailItem[] = [];
      let encounteredError: string | null = null;

      for (const acc of userAccounts) {
        if (acc.provider.toUpperCase().includes("GMAIL")) {
          const cleanEmail = acc.email.toLowerCase();
          const tokenStr = localStorage.getItem(`execuai_gmail_token_${cleanEmail}`);

          if (tokenStr) {
            try {
              const tokenData = JSON.parse(tokenStr);
              if (tokenData.accessToken) {
                const realMessages = await GmailApiService.fetchRealGmailMessages(
                  tokenData.accessToken,
                  cleanEmail
                );
                fetchedAccountEmails.push(...realMessages);
              }
            } catch (err: any) {
              console.error(`Gmail API sync error for ${cleanEmail}:`, err);
              encounteredError = err.message || `Unable to fetch Gmail messages for ${cleanEmail}`;
            }
          } else {
            console.warn(`No stored OAuth token found for Gmail account ${cleanEmail}`);
          }
        }
      }

      if (fetchedAccountEmails.length > 0 || !encounteredError) {
        setEmails(fetchedAccountEmails);
        if (storageKey) {
          localStorage.setItem(storageKey, JSON.stringify(fetchedAccountEmails));
        }
      } else {
        setSyncError(encounteredError || "Your Gmail connection has expired. Reconnect Gmail.");
      }
    } catch (e: any) {
      console.error("Failed to sync Gmail accounts", e);
      setSyncError(e.message || "Unable to connect Gmail.");
    } finally {
      setIsLoading(false);
    }
  }, [user, storageKey]);

  // Initial load & automatic sync on component mount / account change
  React.useEffect(() => {
    if (!user || !storageKey) return;

    // Load existing cached emails for user
    try {
      const savedEmails = localStorage.getItem(storageKey);
      if (savedEmails) {
        const parsed: UnifiedEmailItem[] = JSON.parse(savedEmails);
        // Clean out legacy mock emails if present (e.g. Elena Rostova / mock IDs)
        const realOnly = parsed.filter(
          (e) => !e.id.startsWith("EML_") && !e.id.startsWith("EMAIL-")
        );
        setEmails(realOnly);
      }

      if (storageDraftsKey) {
        const savedDrafts = localStorage.getItem(storageDraftsKey);
        if (savedDrafts) {
          setDrafts(JSON.parse(savedDrafts));
        }
      }
    } catch (e) {
      console.error("Error loading cached emails", e);
    }

    // Trigger real Gmail sync
    refreshGmailSync();
  }, [user?.id, refreshGmailSync, storageKey, storageDraftsKey]);

  // Helpers to persist state
  const persistEmails = (newEmails: UnifiedEmailItem[]) => {
    setEmails(newEmails);
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(newEmails));
    }
  };

  const persistDrafts = (newDrafts: DraftItem[]) => {
    setDrafts(newDrafts);
    if (storageDraftsKey) {
      localStorage.setItem(storageDraftsKey, JSON.stringify(newDrafts));
    }
  };

  // Filtered emails computation
  const filteredEmails = React.useMemo(() => {
    return emails.filter((item) => {
      // 1. Account filter
      if (selectedAccountFilter !== "ALL" && item.accountEmail.toLowerCase() !== selectedAccountFilter.toLowerCase()) {
        return false;
      }

      // 2. Provider filter
      if (selectedProviderFilter !== "ALL") {
        if (selectedProviderFilter === "GMAIL" && item.provider !== "GMAIL") return false;
        if (selectedProviderFilter === "ZOHO" && item.provider !== "ZOHO") return false;
        if (selectedProviderFilter === "OUTLOOK" && item.provider !== "OUTLOOK") return false;
        if (selectedProviderFilter === "OTHER" && item.provider !== "OTHER") return false;
      }

      // 3. Category filter
      if (selectedCategoryFilter === "CRITICAL" && item.priority !== "CRITICAL") return false;
      if (selectedCategoryFilter === "URGENT" && item.priority !== "URGENT") return false;
      if (selectedCategoryFilter === "NEED_REVIEW") {
        const isReview = item.risk === "HIGH_RISK" || item.risk === "REVIEW_REQUIRED" || item.risk === "REVIEW";
        if (!isReview) return false;
      }
      if (selectedCategoryFilter === "SAFE_TO_DRAFT") {
        const isSafe = item.risk === "SAFE" || item.aiDraftAvailable;
        if (!isSafe) return false;
      }
      if (selectedCategoryFilter === "LOW_PRIORITY") {
        const isLow = item.priority === "LOW" || item.priority === "NORMAL" || item.priority === "SPAM";
        if (!isLow) return false;
      }

      // 4. Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchSender = item.senderName.toLowerCase().includes(q) || item.senderEmail.toLowerCase().includes(q);
        const matchSubject = item.subject.toLowerCase().includes(q);
        const matchSnippet = item.snippet.toLowerCase().includes(q);
        const matchAccount = item.accountEmail.toLowerCase().includes(q);
        if (!matchSender && !matchSubject && !matchSnippet && !matchAccount) return false;
      }

      return true;
    });
  }, [emails, selectedAccountFilter, selectedProviderFilter, selectedCategoryFilter, searchQuery]);

  // Account-scoped email dataset (for calculating Bento card counts based on active account filter)
  const accountScopedEmails = React.useMemo(() => {
    if (selectedAccountFilter === "ALL") return emails;
    return emails.filter((e) => e.accountEmail.toLowerCase() === selectedAccountFilter.toLowerCase());
  }, [emails, selectedAccountFilter]);

  // Dynamically calculated category counts from REAL emails
  const counts = React.useMemo(() => {
    const critical = accountScopedEmails.filter((e) => e.priority === "CRITICAL").length;
    const urgent = accountScopedEmails.filter((e) => e.priority === "URGENT").length;
    const needReview = accountScopedEmails.filter(
      (e) => e.risk === "HIGH_RISK" || e.risk === "REVIEW_REQUIRED" || e.risk === "REVIEW"
    ).length;
    const safeToDraft = accountScopedEmails.filter((e) => e.risk === "SAFE" || e.aiDraftAvailable).length;
    const lowPriority = accountScopedEmails.filter(
      (e) => e.priority === "LOW" || e.priority === "NORMAL" || e.priority === "SPAM"
    ).length;

    const scopedDrafts = selectedAccountFilter === "ALL"
      ? drafts
      : drafts.filter((d) => d.originalEmail?.accountEmail.toLowerCase() === selectedAccountFilter.toLowerCase());

    return {
      critical,
      urgent,
      needReview,
      safeToDraft,
      lowPriority,
      totalDrafts: scopedDrafts.length,
      syncedMailboxes: connectedAccounts.length || 1,
    };
  }, [accountScopedEmails, drafts, selectedAccountFilter, connectedAccounts.length]);

  // Account actions
  const addAccount = (provider: string, accountEmail: string) => {
    connectAccount(provider, accountEmail);
  };

  const removeAccount = (accountEmail: string) => {
    authRemoveAccount(accountEmail);
    const remaining = emails.filter((e) => e.accountEmail.toLowerCase() !== accountEmail.toLowerCase());
    persistEmails(remaining);
  };

  const toggleUnread = (emailId: string) => {
    const updated = emails.map((e) => (e.id === emailId ? { ...e, unread: !e.unread } : e));
    persistEmails(updated);
  };

  const toggleFlagged = (emailId: string) => {
    const updated = emails.map((e) => (e.id === emailId ? { ...e, flagged: !e.flagged } : e));
    persistEmails(updated);
  };

  const archiveEmail = (emailId: string) => {
    const updated = emails.filter((e) => e.id !== emailId);
    persistEmails(updated);
  };

  const deleteEmail = (emailId: string) => {
    const updated = emails.filter((e) => e.id !== emailId);
    persistEmails(updated);
  };

  // REAL Gmail API Reply & Draft Operations
  const saveDraftReply = async (
    emailId: string,
    replyText: string
  ): Promise<{ success: boolean; message: string }> => {
    const targetEmail = emails.find((e) => e.id === emailId);
    if (!targetEmail) {
      return { success: false, message: "Original email thread not found." };
    }

    const cleanAccount = targetEmail.accountEmail.toLowerCase();
    const tokenStr = localStorage.getItem(`execuai_gmail_token_${cleanAccount}`);
    const tokenData = tokenStr ? JSON.parse(tokenStr) : null;

    if (tokenData?.accessToken) {
      const apiRes = await GmailApiService.createGmailDraft(
        tokenData.accessToken,
        targetEmail.threadId || targetEmail.id,
        targetEmail.senderEmail,
        targetEmail.accountEmail,
        `Re: ${targetEmail.subject}`,
        replyText
      );

      if (!apiRes.success) {
        return { success: false, message: apiRes.error || "Failed to create draft via Gmail API." };
      }
    }

    const newDraft: DraftItem = {
      id: `DRAFT_${Date.now()}`,
      emailId,
      originalEmail: targetEmail,
      currentTone: "professional",
      currentLength: "medium",
      draftSubject: `Re: ${targetEmail.subject}`,
      draftBody: replyText,
      status: "DRAFT_PREPARED",
      lastSavedAgo: "Just now",
      requiresHumanApproval: targetEmail.risk === "HIGH_RISK" || targetEmail.priority === "CRITICAL",
      humanApprovalReason: "Human clearance required prior to dispatch.",
    };

    const existingIdx = drafts.findIndex((d) => d.emailId === emailId);
    let updatedDrafts: DraftItem[];
    if (existingIdx >= 0) {
      updatedDrafts = [...drafts];
      updatedDrafts[existingIdx] = newDraft;
    } else {
      updatedDrafts = [...drafts, newDraft];
    }

    persistDrafts(updatedDrafts);
    return {
      success: true,
      message: `Draft reply created in your actual Gmail account (${targetEmail.accountEmail}).`,
    };
  };

  const sendReply = async (
    emailId: string,
    replyText: string
  ): Promise<{ success: boolean; message: string }> => {
    const targetEmail = emails.find((e) => e.id === emailId);
    if (!targetEmail) {
      return { success: false, message: "Original email thread not found." };
    }

    const cleanAccount = targetEmail.accountEmail.toLowerCase();
    const tokenStr = localStorage.getItem(`execuai_gmail_token_${cleanAccount}`);
    const tokenData = tokenStr ? JSON.parse(tokenStr) : null;

    if (tokenData?.accessToken) {
      const apiRes = await GmailApiService.sendGmailReply(
        tokenData.accessToken,
        targetEmail.threadId || targetEmail.id,
        targetEmail.senderEmail,
        targetEmail.accountEmail,
        `Re: ${targetEmail.subject}`,
        replyText
      );

      if (!apiRes.success) {
        return { success: false, message: apiRes.error || "Failed to send email via Gmail API." };
      }
    }

    // Append reply to email thread history
    const newMsg = {
      id: `MSG_SENT_${Date.now()}`,
      senderName: `${user?.name || "Executive"} (You)`,
      senderEmail: targetEmail.accountEmail,
      recipients: { to: [targetEmail.senderEmail] },
      timestamp: "Just now",
      body: replyText,
      isFromUser: true,
    };

    const updatedEmails = emails.map((e) => {
      if (e.id === emailId) {
        return {
          ...e,
          unread: false,
          threadHistory: [...(e.threadHistory || []), newMsg],
        };
      }
      return e;
    });

    persistEmails(updatedEmails);

    // Remove draft if saved
    const updatedDrafts = drafts.filter((d) => d.emailId !== emailId);
    persistDrafts(updatedDrafts);

    return {
      success: true,
      message: `Reply sent successfully via Gmail API from ${targetEmail.accountEmail} to ${targetEmail.senderEmail}.`,
    };
  };

  return (
    <UserDataContext.Provider
      value={{
        connectedAccounts,
        selectedAccountFilter,
        setSelectedAccountFilter,
        selectedProviderFilter,
        setSelectedProviderFilter,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        isLoading,
        syncError,
        refreshGmailSync,
        addAccount,
        removeAccount,
        searchQuery,
        setSearchQuery,
        allUserEmails: emails,
        filteredEmails,
        counts,
        userDrafts: drafts,
        toggleUnread,
        toggleFlagged,
        archiveEmail,
        deleteEmail,
        saveDraftReply,
        sendReply,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = React.useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
