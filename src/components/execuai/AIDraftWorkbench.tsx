"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { IntentBadge } from "@/components/ui/IntentBadge";
import { UnifiedEmailItem, DraftTone, DraftLength } from "@/lib/types/execuai";

interface AIDraftWorkbenchProps {
  email: UnifiedEmailItem;
  onBack?: () => void;
}

export const AIDraftWorkbench: React.FC<AIDraftWorkbenchProps> = ({ email, onBack }) => {
  // State for Tone & Length
  const [tone, setTone] = React.useState<DraftTone>("professional");
  const [length, setLength] = React.useState<DraftLength>("medium");

  // State for Draft Content
  const [draftRecipient, setDraftRecipient] = React.useState<string>(email.senderEmail);
  const [draftSubject, setDraftSubject] = React.useState<string>(`Re: ${email.subject}`);
  const [draftBody, setDraftBody] = React.useState<string>(
    `Dear ${email.senderName.split(" ")[0]},\n\nThank you for reaching out regarding "${email.subject}". I have reviewed the details provided.\n\nWe accept the general framework subject to our standard commercial liability cap of 2x aggregate fees ($10M limit) and standard indemnification terms.\n\nPlease confirm agreement so our team can finalize the deployment schedule.\n\nBest regards,\nAlexander Vance\nCEO, ExecuAI`
  );

  // Workflow State Progression: "REVIEW" | "EDITED" | "REGENERATING" | "APPROVED" | "CONTROLLED_SEND_QUEUED" | "DISPATCHED"
  const [workflowStatus, setWorkflowStatus] = React.useState<
    "REVIEW" | "EDITED" | "REGENERATING" | "APPROVED" | "DISPATCHED"
  >("REVIEW");

  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [showControlledSendModal, setShowControlledSendModal] = React.useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Regeneration Handler (Simulates LLM response generation matching Tone & Length)
  const handleRegenerate = () => {
    setWorkflowStatus("REGENERATING");
    setTimeout(() => {
      let newBody = "";
      if (tone === "concise" || length === "short") {
        newBody = `Hi ${email.senderName.split(" ")[0]},\n\nReviewed your note on "${email.subject}". Approved subject to standard 2x liability cap.\n\nPlease confirm so we can proceed.\n\nBest,\nAlexander Vance`;
      } else if (tone === "formal" || length === "detailed") {
        newBody = `Dear ${email.senderName},\n\nThis letter confirms receipt and executive review of your correspondence regarding "${email.subject}".\n\nFollowing internal review, ExecuAI agrees in principle to the terms outlined, subject to the incorporation of a mutual liability cap equal to 2x aggregate investment fees ($10,000,000 ceiling).\n\nKindly acknowledge receipt and confirm agreement to initiate final contract execution.\n\nSincerely,\nAlexander Vance\nChief Executive Officer`;
      } else if (tone === "friendly") {
        newBody = `Hi ${email.senderName.split(" ")[0]}!\n\nThanks for sending over "${email.subject}". Everything looks great on our end! Just need one small tweak to include our standard 2x liability cap.\n\nLet me know if that works and we're good to go.\n\nWarmly,\nAlexander`;
      } else {
        newBody = `Dear ${email.senderName.split(" ")[0]},\n\nThank you for reaching out regarding "${email.subject}". I have reviewed the details provided.\n\nWe accept the general framework subject to our standard commercial liability cap of 2x aggregate fees ($10M limit) and standard indemnification terms.\n\nPlease confirm agreement so our team can finalize the deployment schedule.\n\nBest regards,\nAlexander Vance\nCEO, ExecuAI`;
      }
      setDraftBody(newBody);
      setWorkflowStatus("REVIEW");
      showToast(`Regenerated draft matching [Tone: ${tone.toUpperCase()}, Length: ${length.toUpperCase()}].`);
    }, 800);
  };

  // Copy Draft Action
  const handleCopy = () => {
    navigator.clipboard.writeText(draftBody);
    showToast("Draft copied to clipboard.");
  };

  // Save Draft Action
  const handleSave = () => {
    setWorkflowStatus("EDITED");
    showToast(`Draft saved to mailbox buffer (${email.accountLabel}).`);
  };

  // Approve Action (Opens Controlled Send Gateway)
  const handleApprove = () => {
    setWorkflowStatus("APPROVED");
    setShowControlledSendModal(true);
  };

  // Controlled Send Dispatch Execution
  const handleFinalDispatch = () => {
    setShowControlledSendModal(false);
    setWorkflowStatus("DISPATCHED");
    showToast("Controlled Send Executed! Draft dispatched via Provider API.");
  };

  const rationale = email.aiRationale || {
    plainLanguageReason: `High risk because this email contains a financial amount or legal term and asks for executive approval.`,
    requiresHumanApproval: true,
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
    ],
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden pb-12 font-sans">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="p-4 rounded-xl bg-[#F15E1C] text-white text-xs font-bold shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-white hover:opacity-80 cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Top Workflow Flow Navigator Indicator */}
      <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F8FAFC] pb-3">
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
            <div>
              <h1 className="text-xl font-heading font-extrabold text-[#0F172A] tracking-tight">AI Executive Response Studio</h1>
              <p className="text-xs text-[#64748B]">
                Synthesized draft review & controlled human approval workflow
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                email.provider === "GMAIL"
                  ? "bg-[#FFF2EC] text-[#EA4335] border border-[#FDE8DF]"
                  : "bg-[#F1F5F9] text-[#226BBA] border border-[#E2E8F0]"
              }`}
            >
              Routed via {email.accountLabel} ({email.accountEmail})
            </span>
          </div>
        </div>

        {/* Visual Workflow Steps Ribbon */}
        <div className="overflow-x-auto pb-1">
          <div className="flex items-center gap-2 min-w-[700px] text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] text-[#64748B] font-semibold border border-[#E2E8F0]">
              <span className="w-5 h-5 rounded-full bg-[#CBD5E1] text-[#0F172A] text-[10px] font-bold flex items-center justify-center">1</span>
              <span>Inbound Email</span>
            </div>
            <span className="text-[#CBD5E1]">→</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] text-[#64748B] font-semibold border border-[#E2E8F0]">
              <span className="w-5 h-5 rounded-full bg-[#CBD5E1] text-[#0F172A] text-[10px] font-bold flex items-center justify-center">2</span>
              <span>AI Analysis</span>
            </div>
            <span className="text-[#CBD5E1]">→</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] text-[#64748B] font-semibold border border-[#E2E8F0]">
              <span className="w-5 h-5 rounded-full bg-[#CBD5E1] text-[#0F172A] text-[10px] font-bold flex items-center justify-center">3</span>
              <span>Generate Draft</span>
            </div>
            <span className="text-[#CBD5E1]">→</span>
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold border ${
                workflowStatus === "DISPATCHED"
                  ? "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]"
                  : "bg-[#F15E1C] text-white border-[#F15E1C] shadow-xs"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white text-[#F15E1C] text-[10px] font-extrabold flex items-center justify-center">4</span>
              <span>Draft Review & Edit</span>
            </div>
            <span className="text-[#CBD5E1]">→</span>
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold border ${
                workflowStatus === "APPROVED" || workflowStatus === "DISPATCHED"
                  ? "bg-[#2E936F] text-white border-[#2E936F] shadow-xs"
                  : "bg-[#F8FAFC] text-[#94A3B8] border-[#E2E8F0]"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white text-[#0F172A] text-[10px] font-bold flex items-center justify-center">5</span>
              <span>Human Approval</span>
            </div>
            <span className="text-[#CBD5E1]">→</span>
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold border ${
                workflowStatus === "DISPATCHED"
                  ? "bg-[#226BBA] text-white border-[#226BBA] shadow-xs"
                  : "bg-[#F8FAFC] text-[#94A3B8] border-[#E2E8F0]"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white text-[#0F172A] text-[10px] font-bold flex items-center justify-center">6</span>
              <span>Controlled Send</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Studio Workbench Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Original Email + AI Analysis (5 cols on xl) */}
        <div className="xl:col-span-5 space-y-6">
          {/* Original Email Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Inbound Original Email</span>
              <span className="text-xs text-[#94A3B8] font-medium">{email.timestamp}</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#0F172A] leading-tight">{email.subject}</h3>
              <p className="text-xs font-semibold text-[#0F172A]">
                {email.senderName} <span className="text-[#64748B] font-normal">&lt;{email.senderEmail}&gt;</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F172A] leading-relaxed whitespace-pre-line font-sans">
              {email.body}
            </div>
          </div>

          {/* AI Analysis & Explainability Card */}
          <Card variant="ai" className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#FAB60A]/30">
              <div className="flex items-center gap-2 text-[#795600] font-bold text-xs">
                <span className="material-symbols-outlined text-[18px]">psychology</span>
                <span>AI Classification & Explainability</span>
              </div>
              <span className="bg-[#FEF6E0] text-[#795600] text-[10px] font-bold px-2 py-0.5 rounded border border-[#FAB60A]/40">
                ExecuAI AI Engine
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 bg-white rounded border border-[#E2E8F0]">
                <span className="text-[10px] text-[#94A3B8] font-bold uppercase block">Priority</span>
                <PriorityBadge priority={email.priority} size="sm" />
              </div>
              <div className="p-2 bg-white rounded border border-[#E2E8F0]">
                <span className="text-[10px] text-[#94A3B8] font-bold uppercase block">Intent</span>
                <IntentBadge intent={email.intent} size="sm" />
              </div>
              <div className="p-2 bg-white rounded border border-[#E2E8F0]">
                <span className="text-[10px] text-[#94A3B8] font-bold uppercase block">Risk</span>
                <RiskBadge risk={email.risk} size="sm" />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] space-y-1">
              <h5 className="text-[10px] font-bold text-[#94A3B8] uppercase">Plain-Language Classification Rationale</h5>
              <p className="text-xs text-[#0F172A] font-medium leading-relaxed">
                "{rationale.plainLanguageReason}"
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <h5 className="text-xs font-bold text-[#795600] uppercase tracking-wider text-[10px]">
                Detected Factors:
              </h5>
              {rationale.detectedFactors.map((f, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#FAB60A]">{f.icon}</span>
                  <div>
                    <span className="font-bold text-[#0F172A]">{f.title}: </span>
                    <span className="text-[#64748B]">{f.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: AI Draft Workbench & Controls (7 cols on xl) */}
        <div className="xl:col-span-7 space-y-6">
          {/* Zero-Trust Human Approval Security Guardrail Banner */}
          <div className="p-4 rounded-2xl bg-[#FFF2EC] border border-[#FDE8DF] space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#F15E1C] font-bold text-xs sm:text-sm">
                <span className="material-symbols-outlined text-[20px]">security</span>
                <span>Human Approval Required — Zero-Trust Send Gate Active</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#F15E1C] border border-[#FDE8DF]">
                Enforced
              </span>
            </div>
            <p className="text-xs text-[#0F172A] leading-relaxed">
              The AI LLM model will <span className="font-extrabold underline">never directly call or trigger</span> a provider send API. Your explicit manual approval is mandatory before any communication is dispatched.
            </p>
          </div>

          {/* Response Studio Workspace Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
              <div>
                <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                  AI Draft Workspace & Response Controls
                  <span className="material-symbols-outlined text-[#F15E1C] text-[18px]">auto_awesome</span>
                </h2>
                <p className="text-xs text-[#64748B]">Synthesizing executive voice profile for {email.senderName}</p>
              </div>

              <span
                className={`text-xs font-bold px-3 py-1 rounded-full text-center ${
                  workflowStatus === "DISPATCHED"
                    ? "bg-[#F1F5F9] text-[#226BBA]"
                    : workflowStatus === "APPROVED"
                    ? "bg-[#E8F4F0] text-[#2E936F]"
                    : "bg-[#FEF6E0] text-[#795600]"
                }`}
              >
                {workflowStatus === "DISPATCHED"
                  ? "Status: Controlled Send Completed"
                  : workflowStatus === "APPROVED"
                  ? "Status: Approved & Queued"
                  : "Status: Draft Under Review"}
              </span>
            </div>

            {/* Controls Bar: Tone & Length Selectors */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Tone Control */}
                <div className="space-y-1.5">
                  <span className="font-bold text-[#94A3B8] uppercase text-[10px] tracking-wider block">
                    Response Tone:
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {(["professional", "concise", "friendly", "formal"] as DraftTone[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`px-3 py-1 rounded-lg capitalize font-bold text-xs transition-all cursor-pointer ${
                          tone === t
                            ? "bg-[#F15E1C] text-white shadow-xs"
                            : "bg-white text-[#475569] border border-[#E2E8F0] hover:text-[#0F172A]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Length Control */}
                <div className="space-y-1.5">
                  <span className="font-bold text-[#94A3B8] uppercase text-[10px] tracking-wider block">
                    Response Length:
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {(["short", "medium", "detailed"] as DraftLength[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLength(l)}
                        className={`px-3 py-1 rounded-lg capitalize font-bold text-xs transition-all cursor-pointer ${
                          length === l
                            ? "bg-[#0F172A] text-white shadow-xs"
                            : "bg-white text-[#475569] border border-[#E2E8F0] hover:text-[#0F172A]"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recipient & Subject Header Fields */}
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">Recipient (To):</label>
                  <input
                    type="email"
                    value={draftRecipient}
                    onChange={(e) => setDraftRecipient(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-xs font-mono focus:ring-2 focus:ring-[#F15E1C]/40 focus:border-[#F15E1C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">Draft Subject Line:</label>
                  <input
                    type="text"
                    value={draftSubject}
                    onChange={(e) => setDraftSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-xs font-semibold focus:ring-2 focus:ring-[#F15E1C]/40 focus:border-[#F15E1C] focus:outline-none"
                  />
                </div>
              </div>

              {/* Editable Draft Body Textarea */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#0F172A] block uppercase text-[10px] tracking-wider">
                    Editable Draft Content:
                  </label>
                  <span className="text-[10px] text-[#94A3B8]">
                    {draftBody.length} chars • {draftBody.split(/\s+/).length} words
                  </span>
                </div>

                <div className="relative">
                  <textarea
                    rows={10}
                    value={draftBody}
                    onChange={(e) => {
                      setDraftBody(e.target.value);
                      if (workflowStatus === "REVIEW") setWorkflowStatus("EDITED");
                    }}
                    className={`w-full p-4 rounded-xl border text-xs sm:text-sm font-sans text-[#0F172A] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#F15E1C]/40 focus:border-[#F15E1C] focus:bg-white transition-all ${
                      workflowStatus === "REGENERATING"
                        ? "bg-[#F8FAFC] opacity-50 animate-pulse border-[#CBD5E1]"
                        : "bg-[#F8FAFC] border-[#CBD5E1]"
                    }`}
                  />
                  {workflowStatus === "REGENERATING" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-2xs rounded-xl font-bold text-xs text-[#F15E1C]">
                      <span className="material-symbols-outlined animate-spin text-[20px] mr-2">
                        progress_activity
                      </span>
                      Synthesizing new LLM draft variant...
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Bar (Edit, Regenerate, Copy, Save, Approve) */}
            <div className="pt-3 border-t border-[#E2E8F0] space-y-3">
              {workflowStatus === "DISPATCHED" ? (
                <div className="p-4 rounded-xl bg-[#E8F4F0] border border-[#2E936F]/40 text-center space-y-2">
                  <div className="text-xs font-bold text-[#2E936F] flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                    <span>Approved & Dispatched via {email.accountLabel} Provider API</span>
                  </div>
                  <p className="text-[11px] text-[#64748B]">
                    Controlled send completed. Cryptographic Audit Entry #AUD-99410 logged to system ledger.
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Left Utilities: Regenerate & Copy */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleRegenerate}
                      isLoading={workflowStatus === "REGENERATING"}
                      leftIcon={<span className="material-symbols-outlined text-[16px]">refresh</span>}
                    >
                      Regenerate
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      leftIcon={<span className="material-symbols-outlined text-[16px]">content_copy</span>}
                    >
                      Copy Text
                    </Button>
                  </div>

                  {/* Right Primary Actions: Save Draft & Approve */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleSave}
                      leftIcon={<span className="material-symbols-outlined text-[16px]">save</span>}
                    >
                      Save Draft
                    </Button>

                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleApprove}
                      leftIcon={<span className="material-symbols-outlined text-[18px]">verified</span>}
                    >
                      Approve & Prepare Send
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Controlled Send Execution Confirmation Gateway Modal */}
      {showControlledSendModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2 text-[#0F172A] font-bold text-base">
                <span className="material-symbols-outlined text-[#F15E1C]">send</span>
                <span>Controlled Send Authorization Gateway</span>
              </div>
              <button
                onClick={() => setShowControlledSendModal(false)}
                className="text-[#94A3B8] hover:text-[#0F172A] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#94A3B8] font-bold uppercase text-[10px]">Target Account:</span>
                <span className="font-bold text-[#226BBA]">{email.accountLabel} ({email.accountEmail})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#94A3B8] font-bold uppercase text-[10px]">Recipient:</span>
                <span className="font-bold text-[#0F172A]">{draftRecipient}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#94A3B8] font-bold uppercase text-[10px]">Risk Clearance:</span>
                <span className="font-bold text-[#2E936F]">Human Executive Assent Confirmed</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#E8F4F0] border border-[#2E936F]/40 text-xs text-[#0F172A] space-y-1">
              <p className="font-bold text-[#2E936F]">Zero-Trust Security Verification Passed</p>
              <p className="text-[11px] text-[#64748B]">
                Clicking "Confirm & Dispatch" executes the provider OAuth send endpoint on your behalf.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button variant="ghost" size="sm" onClick={() => setShowControlledSendModal(false)}>
                Cancel
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={handleFinalDispatch}
                leftIcon={<span className="material-symbols-outlined text-[18px]">send</span>}
              >
                Confirm & Dispatch via Provider API
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

