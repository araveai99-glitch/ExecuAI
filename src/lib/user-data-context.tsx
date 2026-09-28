"use client";

import * as React from "react";
import { useAuth, ConnectedAccount } from "./auth-context";
import { UnifiedEmailItem, DraftItem, PriorityLevel, RiskLevel, MailboxProvider } from "./types/execuai";
import { initialUnifiedEmails } from "./data/mockExecuData";

export type CategoryFilterType =
  | "ALL"
  | "CRITICAL"
  | "URGENT"
  | "NEED_REVIEW"
  | "SAFE_TO_DRAFT"
  | "LOW_PRIORITY";

export type ProviderFilterType = "ALL" | "GMAIL" | "ZOHO" | "OUTLOOK" | "OTHER";

interface UserDataContextType {
  // Accounts
  connectedAccounts: ConnectedAccount[];
  selectedAccountFilter: string; // "ALL" or specific email address
  setSelectedAccountFilter: (accountEmail: string) => void;
  selectedProviderFilter: ProviderFilterType;
  setSelectedProviderFilter: (provider: ProviderFilterType) => void;
  selectedCategoryFilter: CategoryFilterType;
  setSelectedCategoryFilter: (category: CategoryFilterType) => void;

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
  saveDraftReply: (emailId: string, replyText: string) => { success: boolean; message: string };
  sendReply: (emailId: string, replyText: string) => Promise<{ success: boolean; message: string }>;
}

const UserDataContext = React.createContext<UserDataContextType | undefined>(undefined);

// Helper to generate seed emails dynamically for any email address
function generateEmailsForAccount(
  accountEmail: string,
  providerName: string,
  userName: string
): UnifiedEmailItem[] {
  const prov = (providerName.toUpperCase().includes("ZOHO")
    ? "ZOHO"
    : providerName.toUpperCase().includes("OUTLOOK")
    ? "OUTLOOK"
    : providerName.toUpperCase().includes("GMAIL")
    ? "GMAIL"
    : "OTHER") as MailboxProvider;

  const label = `${providerName} (${accountEmail})`;

  return [
    {
      id: `EML_${Date.now()}_1`,
      provider: prov,
      accountEmail: accountEmail,
      accountLabel: label,
      senderName: "Elena Rostova",
      senderEmail: "elena@apexlaw.com",
      senderRole: "General Counsel, Apex Law",
      avatarInitials: "ER",
      recipients: { to: [accountEmail] },
      subject: "Series B Definitive Agreements & IP Indemnity Review",
      snippet: "Uncapped liability clause identified in Section 14.2 requiring executive confirmation...",
      body: `Dear ${userName},\n\nI have completed review of the Series B Definitive Agreements returned by target lead counsel. Section 14.2 contains an uncapped IP indemnity clause that transfers unlimited liability to your balance sheet.\n\nKey Recommendations:\n1. Require a liability cap equal to 2x aggregate investment amount ($10M).\n2. Exclude secondary software derivative claims.\n\nPlease confirm if you would like me to redline this section immediately.`,
      timestamp: "10:42 AM",
      priority: "CRITICAL",
      intent: "LEGAL",
      risk: "HIGH_RISK",
      unread: true,
      flagged: true,
      hasAttachment: true,
      aiDraftAvailable: true,
      aiSummary: "Legal risk: Uncapped IP liability clause identified in Series B agreement. Autonomous sending blocked.",
      threadHistory: [
        {
          id: `MSG_${Date.now()}_101`,
          senderName: "Elena Rostova",
          senderEmail: "elena@apexlaw.com",
          senderRole: "General Counsel, Apex Law",
          avatarInitials: "ER",
          recipients: { to: [accountEmail] },
          timestamp: "10:42 AM",
          body: `Dear ${userName},\n\nI have completed review of the Series B Definitive Agreements returned by target lead counsel. Section 14.2 contains an uncapped IP indemnity clause that transfers unlimited liability to your balance sheet.\n\nPlease confirm if you would like me to redline this section immediately.`,
          isFromUser: false,
        },
      ],
    },
    {
      id: `EML_${Date.now()}_2`,
      provider: prov,
      accountEmail: accountEmail,
      accountLabel: label,
      senderName: "Marcus Brody",
      senderEmail: "m.brody@nordicenterprises.com",
      senderRole: "Managing Director, Nordic APAC",
      avatarInitials: "MB",
      recipients: { to: [accountEmail] },
      subject: "Revised Enterprise Master Services Agreement & ₹50L Quotation",
      snippet: "Attached is the revised commercial quotation of ₹50,00,000 for full-year deployment...",
      body: `Hi ${userName},\n\nAttached is the revised Enterprise MSA along with Schedule C reflecting the total revised quotation of ₹50,00,000 for full-year deployment across 5 regional nodes.\n\nPlease review and let us know if we have sign-off to issue the binding billing mandate.`,
      timestamp: "09:15 AM",
      priority: "URGENT",
      intent: "FINANCE",
      risk: "HIGH_RISK",
      unread: true,
      flagged: false,
      hasAttachment: true,
      aiDraftAvailable: true,
      aiSummary: "Financial Assent Required: ₹50L quote exceeds single-executive auto-approval limits.",
      threadHistory: [
        {
          id: `MSG_${Date.now()}_102`,
          senderName: "Marcus Brody",
          senderEmail: "m.brody@nordicenterprises.com",
          senderRole: "Managing Director",
          recipients: { to: [accountEmail] },
          timestamp: "09:15 AM",
          body: `Hi ${userName},\n\nAttached is the revised Enterprise MSA along with Schedule C reflecting the total revised quotation of ₹50,00,000 for full-year deployment.\n\nPlease confirm sign-off.`,
          isFromUser: false,
        },
      ],
    },
    {
      id: `EML_${Date.now()}_3`,
      provider: prov,
      accountEmail: accountEmail,
      accountLabel: label,
      senderName: "Sarah Jenkins",
      senderEmail: "s.jenkins@apexglobal.io",
      senderRole: "VP Operations, Apex Global",
      avatarInitials: "SJ",
      recipients: { to: [accountEmail] },
      subject: "Urgent Client Escalation: Q2 SLA Outage Rebate Penalty Claim",
      snippet: "Client requests formal executive commitment on 15% SLA rebate penalty...",
      body: `Dear ${userName},\n\nFollowing our Q2 downtime incident, Apex Global has submitted a formal SLA outage rebate claim requesting a 15% credit refund on their annual retainer.\n\nWe need your executive decision on whether to approve the rebate credit or offer extended contract terms.`,
      timestamp: "Yesterday",
      priority: "CRITICAL",
      intent: "CLIENT",
      risk: "REVIEW_REQUIRED",
      unread: false,
      flagged: true,
      hasAttachment: false,
      aiDraftAvailable: true,
      aiSummary: "Client Escalation: SLA rebate penalty claim of ₹24.5L requires executive sign-off.",
      threadHistory: [
        {
          id: `MSG_${Date.now()}_103`,
          senderName: "Sarah Jenkins",
          senderEmail: "s.jenkins@apexglobal.io",
          recipients: { to: [accountEmail] },
          timestamp: "Yesterday",
          body: `Dear ${userName},\n\nFollowing our Q2 downtime incident, Apex Global has submitted a formal SLA outage rebate claim.\n\nPlease review and advise.`,
          isFromUser: false,
        },
      ],
    },
    {
      id: `EML_${Date.now()}_4`,
      provider: prov,
      accountEmail: accountEmail,
      accountLabel: label,
      senderName: "Dr. Aris Thorne",
      senderEmail: "aris@vancecapital.io",
      senderRole: "Managing Partner, Vance Capital",
      avatarInitials: "AT",
      recipients: { to: [accountEmail] },
      subject: "Mutual Non-Disclosure Agreement for Strategic Acquisition Discussions",
      snippet: "Confidential M&A NDA attached for strategic acquisition discussions...",
      body: `Hello ${userName},\n\nAttached is the mutual NDA drafted by our legal counsel for our upcoming strategic acquisition discussions.\n\nIt incorporates a 5-year confidentiality clause and standard non-solicitation covenants. Please review and confirm.`,
      timestamp: "2 days ago",
      priority: "URGENT",
      intent: "LEGAL",
      risk: "CONFIDENTIAL",
      unread: false,
      flagged: false,
      hasAttachment: true,
      aiDraftAvailable: true,
      aiSummary: "M&A NDA: Confidential non-disclosure agreement prepared for strategic acquisition.",
      threadHistory: [
        {
          id: `MSG_${Date.now()}_104`,
          senderName: "Dr. Aris Thorne",
          senderEmail: "aris@vancecapital.io",
          recipients: { to: [accountEmail] },
          timestamp: "2 days ago",
          body: `Hello ${userName},\n\nAttached is the mutual NDA for our strategic acquisition discussions.\n\nPlease review.`,
          isFromUser: false,
        },
      ],
    },
    {
      id: `EML_${Date.now()}_5`,
      provider: prov,
      accountEmail: accountEmail,
      accountLabel: label,
      senderName: "David Chen",
      senderEmail: "d.chen@execuai.com",
      senderRole: "Head of AI Engineering",
      avatarInitials: "DC",
      recipients: { to: [accountEmail] },
      subject: "Weekly AI Model Performance & Safety Gate Benchmark Summary",
      snippet: "Zero safety gate bypass incidents recorded during 10,000 email triage cycles...",
      body: `Hi ${userName},\n\nHere is our weekly AI benchmark report: 99.4% triage accuracy across Priority, Intent, and Risk Gate dimensions.\n\nAll financial thresholds (>₹10L) were caught and routed cleanly to the Decision Center without false negatives.`,
      timestamp: "3 days ago",
      priority: "NORMAL",
      intent: "INTERNAL",
      risk: "SAFE",
      unread: false,
      flagged: false,
      hasAttachment: false,
      aiDraftAvailable: true,
      aiSummary: "Routine Update: Weekly AI engineering benchmark metrics verified.",
      threadHistory: [
        {
          id: `MSG_${Date.now()}_105`,
          senderName: "David Chen",
          senderEmail: "d.chen@execuai.com",
          recipients: { to: [accountEmail] },
          timestamp: "3 days ago",
          body: `Hi ${userName},\n\nHere is our weekly AI benchmark report: 99.4% triage accuracy. All clear.`,
          isFromUser: false,
        },
      ],
    },
  ];
}

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, connectAccount, removeAccount: authRemoveAccount } = useAuth();

  const [selectedAccountFilter, setSelectedAccountFilter] = React.useState<string>("ALL");
  const [selectedProviderFilter, setSelectedProviderFilter] = React.useState<ProviderFilterType>("ALL");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = React.useState<CategoryFilterType>("ALL");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const connectedAccounts = user?.connectedAccounts || [];

  // Storage key scoped specifically to authenticated user ID
  const storageKey = user ? `execuai_user_emails_db_${user.id}` : null;
  const storageDraftsKey = user ? `execuai_user_drafts_db_${user.id}` : null;

  const [emails, setEmails] = React.useState<UnifiedEmailItem[]>([]);
  const [drafts, setDrafts] = React.useState<DraftItem[]>([]);

  // Initialize or re-sync emails when connected accounts change
  React.useEffect(() => {
    if (!user || !storageKey) return;

    try {
      const savedEmails = localStorage.getItem(storageKey);
      let currentEmails: UnifiedEmailItem[] = [];

      if (savedEmails) {
        currentEmails = JSON.parse(savedEmails);
      }

      // Check if we need to generate emails for newly connected accounts
      const userAccounts = user.connectedAccounts || [{ provider: "Gmail", email: user.email, connectedAt: new Date().toISOString() }];
      let updated = false;

      userAccounts.forEach((acc) => {
        const hasEmailsForAcc = currentEmails.some(
          (e) => e.accountEmail.toLowerCase() === acc.email.toLowerCase()
        );
        if (!hasEmailsForAcc) {
          const generated = generateEmailsForAccount(acc.email, acc.provider, user.name || "Executive");
          currentEmails = [...currentEmails, ...generated];
          updated = true;
        }
      });

      if (updated || !savedEmails) {
        localStorage.setItem(storageKey, JSON.stringify(currentEmails));
      }

      setEmails(currentEmails);

      // Load drafts
      if (storageDraftsKey) {
        const savedDrafts = localStorage.getItem(storageDraftsKey);
        if (savedDrafts) {
          setDrafts(JSON.parse(savedDrafts));
        }
      }
    } catch (e) {
      console.error("Error loading user email dataset", e);
    }
  }, [user, storageKey, storageDraftsKey]);

  // Helper to persist updated email array
  const persistEmails = (newEmails: UnifiedEmailItem[]) => {
    setEmails(newEmails);
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(newEmails));
    }
  };

  // Helper to persist updated drafts array
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

  // Account-scoped email dataset (for calculating card numbers based on active account filter)
  const accountScopedEmails = React.useMemo(() => {
    if (selectedAccountFilter === "ALL") return emails;
    return emails.filter((e) => e.accountEmail.toLowerCase() === selectedAccountFilter.toLowerCase());
  }, [emails, selectedAccountFilter]);

  // Dynamically calculated category counts
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

  // Actions
  const addAccount = (provider: string, accountEmail: string) => {
    connectAccount(provider, accountEmail);
  };

  const removeAccount = (accountEmail: string) => {
    authRemoveAccount(accountEmail);
    // Remove emails for that account
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

  // Reply & Draft Operations
  const saveDraftReply = (
    emailId: string,
    replyText: string
  ): { success: boolean; message: string } => {
    const targetEmail = emails.find((e) => e.id === emailId);
    if (!targetEmail) {
      return { success: false, message: "Original email thread not found." };
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
      message: `Draft reply saved under connected account (${targetEmail.accountEmail}).`,
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
      message: `Reply sent from ${targetEmail.accountEmail} to ${targetEmail.senderEmail}.`,
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
