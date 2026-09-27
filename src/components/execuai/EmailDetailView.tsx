"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { IntentBadge } from "@/components/ui/IntentBadge";
import { Card } from "@/components/ui/Card";
import { UnifiedEmailItem } from "@/lib/types/execuai";

interface EmailDetailViewProps {
  email: UnifiedEmailItem;
  onBack?: () => void;
  onActionSuccess?: (message: string) => void;
}

export const EmailDetailView: React.FC<EmailDetailViewProps> = ({
  email,
  onBack,
  onActionSuccess,
}) => {
  const [showDraftModal, setShowDraftModal] = React.useState(false);
  const [showForwardModal, setShowForwardModal] = React.useState(false);
  const [actionNotice, setActionNotice] = React.useState<string | null>(null);

  const handleAction = (label: string) => {
    setActionNotice(label);
    if (onActionSuccess) onActionSuccess(label);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const rationale = email.aiRationale || {
    plainLanguageReason: `High risk because this email contains a financial amount or legal term and asks for executive approval.`,
    requiresHumanApproval: email.risk === "HIGH_RISK" || email.risk === "REVIEW_REQUIRED" || email.risk === "REVIEW",
    humanApprovalReason: "Human approval required. Automated draft dispatch is programmatically blocked.",
    detectedFactors: [
      {
        icon: "gavel",
        title: "Contract language detected",
        detail: "Contains legal indemnity or binding terms requiring explicit assent.",
      },
      {
        icon: "rate_review",
        title: "Approval requested",
        detail: "Sender explicitly asks for executive sign-off before proceeding.",
      },
      {
        icon: "payments",
        title: "Financial amount detected",
        detail: "Transaction value exceeds automatic authorization limit.",
      },
      {
        icon: "verified_user",
        title: "External sender",
        detail: `Verified external domain: ${email.senderEmail}`,
      },
    ],
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden font-sans">
      {/* Toast Notification Bar */}
      {actionNotice && (
        <div className="p-4 rounded-xl bg-[#F15E1C] text-white text-xs font-bold shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-white hover:opacity-80 cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Top Source Account Header & Nav */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {onBack ? (
            <button
              onClick={onBack}
              className="p-2 px-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] hover:bg-[#FDF7F0] font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back</span>
            </button>
          ) : (
            <Link
              href="/app/inbox"
              className="p-2 px-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] hover:bg-[#FDF7F0] font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Inbox</span>
            </Link>
          )}

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                email.provider === "GMAIL"
                  ? "bg-[#FFF2EC] text-[#EA4335] border border-[#FDE8DF]"
                  : "bg-[#F1F5F9] text-[#226BBA] border border-[#E2E8F0]"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {email.provider === "GMAIL" ? "mail" : "domain"}
              </span>
              Routed via {email.accountLabel} ({email.accountEmail})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#64748B] font-medium">{email.timestamp}</span>
          <button
            onClick={() => handleAction("Thread starred for executive tracking.")}
            className="p-2 rounded-lg border border-[#E2E8F0] hover:bg-[#FEF6E0] text-[#FAB60A] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">star</span>
          </button>
        </div>
      </div>

      {/* Main Grid Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Email Subject, Sender, Recipients, Thread History (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Email Card Header */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-5">
            {/* Subject Line */}
            <div className="space-y-2 border-b border-[#F8FAFC] pb-4">
              <div className="flex items-center flex-wrap gap-2">
                <PriorityBadge priority={email.priority} />
                <IntentBadge intent={email.intent} />
                <RiskBadge risk={email.risk} />
              </div>
              <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-[#0F172A] tracking-tight leading-tight">
                {email.subject}
              </h1>
            </div>

            {/* Sender & Recipients Detailed Metadata */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 text-xs">
              {/* Sender Details */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm text-white ${
                      email.provider === "GMAIL" ? "bg-[#EA4335]" : "bg-[#226BBA]"
                    }`}
                  >
                    {email.avatarInitials || email.senderName.substring(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-sm">{email.senderName}</h4>
                    <p className="text-[#64748B] font-medium">{email.senderRole || "External Correspondent"}</p>
                    <p className="text-[#F15E1C] font-mono text-[11px]">&lt;{email.senderEmail}&gt;</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-[#E8F4F0] text-[#2E936F] font-bold text-[10px] uppercase border border-[#2E936F]/30 inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                    DKIM & DMARC Verified
                  </span>
                </div>
              </div>

              {/* Recipients Detail List */}
              <div className="pt-2 border-t border-[#E2E8F0]/80 space-y-1.5 text-[11px]">
                <div className="flex items-start gap-2">
                  <span className="text-[#94A3B8] font-bold uppercase w-10">To:</span>
                  <div className="flex flex-wrap gap-1 font-medium text-[#0F172A]">
                    {(email.recipients?.to || [email.accountEmail]).map((r, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white border border-[#E2E8F0]">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {email.recipients?.cc && email.recipients.cc.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-[#94A3B8] font-bold uppercase w-10">Cc:</span>
                    <div className="flex flex-wrap gap-1 font-medium text-[#64748B]">
                      {email.recipients.cc.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white border border-[#E2E8F0]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Email Message Body */}
            <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] text-xs sm:text-sm text-[#0F172A] leading-relaxed whitespace-pre-line font-normal space-y-4">
              {email.body}
            </div>

            {/* Attachments Section */}
            {email.hasAttachment && (
              <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
                <h5 className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#64748B]">attach_file</span>
                  Attachments (2 Files)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-[#DC2626] text-[20px]">picture_as_pdf</span>
                      <div className="min-w-0">
                        <p className="font-bold text-[#0F172A] truncate">Series_B_Definitive_Draft_v4.pdf</p>
                        <span className="text-[10px] text-[#94A3B8]">2.4 MB • Signed PDF</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleAction("Downloading attachment...")}>
                      Download
                    </Button>
                  </div>

                  <div className="p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-[#226BBA] text-[20px]">description</span>
                      <div className="min-w-0">
                        <p className="font-bold text-[#0F172A] truncate">Indemnity_Risk_Summary_Note.docx</p>
                        <span className="text-[10px] text-[#94A3B8]">480 KB • Word Document</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleAction("Downloading attachment...")}>
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chronological Thread History Timeline */}
          {email.threadHistory && email.threadHistory.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2 px-1">
                <span className="material-symbols-outlined text-[18px] text-[#2E936F]">forum</span>
                Email Thread History ({email.threadHistory.length} Messages)
              </h3>

              <div className="space-y-3 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#E2E8F0]">
                {email.threadHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all relative ml-8 ${
                      msg.isFromUser
                        ? "bg-[#FDF7F0] border-[#F7D7B0]"
                        : "bg-white border-[#E2E8F0] shadow-xs"
                    }`}
                  >
                    {/* Timeline Node Badge */}
                    <div className="absolute -left-8 top-5 w-4 h-4 rounded-full border-2 border-white bg-[#2E936F] shadow-xs" />

                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#0F172A]">{msg.senderName}</span>
                        <span className="text-[11px] text-[#64748B]">&lt;{msg.senderEmail}&gt;</span>
                      </div>
                      <span className="text-[11px] text-[#94A3B8]">{msg.timestamp}</span>
                    </div>

                    <p className="text-xs text-[#0F172A] pt-3 leading-relaxed whitespace-pre-line">
                      {msg.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: AI Analysis, Explainability, Rationale, Guardrail, Actions (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6 sticky top-6">
          {/* High-Risk Human Approval Guardrail Banner */}
          {rationale.requiresHumanApproval && (
            <div className="p-4 rounded-2xl bg-[#FFF2EC] border border-[#FDE8DF] space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-[#F15E1C] font-bold text-sm">
                <span className="material-symbols-outlined text-[20px]">security</span>
                <span>Human approval required.</span>
              </div>
              <p className="text-xs text-[#0F172A] leading-relaxed">
                {rationale.humanApprovalReason ||
                  "Human approval required. High-risk communication contains binding legal/financial commitment. Automated draft dispatch has been programmatically blocked."}
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] text-[#F15E1C] font-semibold">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span>Zero-Trust Auto-Reply Barrier Active</span>
              </div>
            </div>
          )}

          {/* AI Analysis & Classification Card */}
          <Card variant="ai" className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#FAB60A]/30">
              <div className="flex items-center gap-2 text-[#795600] font-bold text-sm">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
                <span>AI Forensic Analysis</span>
              </div>
              <span className="bg-[#FEF6E0] text-[#795600] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#FAB60A]/40">
                ExecuAI Certified
              </span>
            </div>

            {/* Plain Language Rationale Explanation */}
            <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2">
              <h4 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                Executive Classification Rationale
              </h4>
              <p className="text-xs font-semibold text-[#0F172A] leading-relaxed">
                "{rationale.plainLanguageReason}"
              </p>
            </div>

            {/* "Why did AI classify this?" Detected Factors */}
            <div className="space-y-3 pt-1">
              <h4 className="text-xs font-bold text-[#795600] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">search</span>
                Why did AI classify this?
              </h4>

              <div className="space-y-2">
                {rationale.detectedFactors.map((factor, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white border border-[#E2E8F0] flex items-start gap-3 shadow-2xs"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#FEF6E0] text-[#FAB60A] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px]">{factor.icon}</span>
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <h5 className="text-xs font-bold text-[#0F172A]">{factor.title}</h5>
                      <p className="text-[11px] text-[#64748B] leading-normal">{factor.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Primary Action Suite */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A]">Executive Quick Actions</h3>

            <div className="space-y-2.5">
              <Button
                variant="primary"
                fullWidth
                size="md"
                onClick={() => setShowDraftModal(true)}
                leftIcon={<span className="material-symbols-outlined text-[18px]">auto_fix_high</span>}
              >
                Generate AI Draft
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  fullWidth
                  size="sm"
                  onClick={() => handleAction("Thread marked as Done and archived.")}
                  leftIcon={<span className="material-symbols-outlined text-[16px]">check_circle</span>}
                >
                  Mark as Done
                </Button>

                <Button
                  variant="secondary"
                  fullWidth
                  size="sm"
                  onClick={() => setShowForwardModal(true)}
                  leftIcon={<span className="material-symbols-outlined text-[16px]">forward</span>}
                >
                  Forward
                </Button>
              </div>

              <Button
                variant="danger"
                fullWidth
                size="sm"
                onClick={() => handleAction("Thread set to Do Not Respond. Auto-reply suppressed.")}
                leftIcon={<span className="material-symbols-outlined text-[16px]">block</span>}
              >
                Do Not Respond
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Draft Generator Modal */}
      {showDraftModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#F15E1C]">auto_fix_high</span>
                <h3 className="text-base font-bold text-[#0F172A]">AI Executive Draft Assistant</h3>
              </div>
              <button
                onClick={() => setShowDraftModal(false)}
                className="text-[#94A3B8] hover:text-[#0F172A] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 text-xs">
              <span className="text-[#94A3B8] font-bold block text-[10px] uppercase">Replying To:</span>
              <p className="font-bold text-[#0F172A]">{email.senderName} ({email.senderEmail})</p>
              <p className="text-[#64748B] line-clamp-1">{email.subject}</p>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-bold text-[#0F172A] block">Select Executive Response Strategy:</label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => {
                    setShowDraftModal(false);
                    handleAction("Generated AI Draft proposing 2x liability cap under Section 14.2.");
                  }}
                  className="p-3 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#F15E1C] hover:bg-[#FFF2EC]/40 text-left transition-all cursor-pointer"
                >
                  <p className="font-bold text-[#0F172A]">Redline Indemnity Cap (Recommended)</p>
                  <p className="text-[11px] text-[#64748B]">Propose a $10M liability cap and exclude secondary software derivative claims.</p>
                </button>

                <button
                  onClick={() => {
                    setShowDraftModal(false);
                    handleAction("Generated AI Draft requesting legal team review.");
                  }}
                  className="p-3 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#F15E1C] hover:bg-[#FFF2EC]/40 text-left transition-all cursor-pointer"
                >
                  <p className="font-bold text-[#0F172A]">Defer to External Counsel</p>
                  <p className="text-[11px] text-[#64748B]">Request Apex Law to coordinate directly with target lead counsel.</p>
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowDraftModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Forward Thread Modal */}
      {showForwardModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#226BBA]">forward</span>
                Forward Email Thread
              </h3>
              <button
                onClick={() => setShowForwardModal(false)}
                className="text-[#94A3B8] hover:text-[#0F172A] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#0F172A] block mb-1">Recipient Email:</label>
                <input
                  type="email"
                  defaultValue="legal-team@company.com"
                  className="w-full p-2.5 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-xs focus:ring-2 focus:ring-[#F15E1C]/40 focus:border-[#F15E1C] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#0F172A] block mb-1">Executive Instruction Note:</label>
                <textarea
                  rows={3}
                  defaultValue="Please review the attached Section 14.2 indemnity clause and coordinate redline adjustments."
                  className="w-full p-2.5 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-xs focus:ring-2 focus:ring-[#F15E1C]/40 focus:border-[#F15E1C] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowForwardModal(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setShowForwardModal(false);
                  handleAction("Email thread forwarded to legal-team@company.com.");
                }}
              >
                Send Forward
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

