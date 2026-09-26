"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { IntentBadge } from "@/components/ui/IntentBadge";

export default function DraftsPage() {
  const [selectedTone, setSelectedTone] = React.useState("professional");
  const [selectedLength, setSelectedLength] = React.useState("medium");
  const [draftText, setDraftText] = React.useState(
    `Hi Marcus,\n\nThank you for sharing the revised MSA. I have reviewed Schedule C regarding the ₹50,00,000 licensing fee and 30-day term. We accept the pricing schedule subject to our standard commercial liability cap of 2x annual fees.\n\nPlease confirm agreement so our finance team can finalize the deployment schedule.\n\nRegards,\nAlexander Vance\nChief Executive Officer`
  );
  const [isDispatched, setIsDispatched] = React.useState(false);

  const handleApprove = () => {
    setIsDispatched(true);
  };

  return (
    <div className="space-y-6">
      {/* Context Bar */}
      <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center shrink-0 font-bold">
            <span className="material-symbols-outlined text-[22px]">gavel</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-[#0F172A]">Decision Gate #E-4091</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FFF1F2] text-[#E11D48] text-[10px] font-bold">
                Autonomous Send Blocked
              </span>
            </div>
            <p className="text-xs text-[#475569] mt-0.5">
              High-Value Contract Acceptance & Financial Liability Review • Requires CEO clearance before dispatch
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse" />
          <span className="text-xs font-semibold text-[#475569]">Execution SLA: 42m remaining</span>
        </div>
      </div>

      {/* Main Split Studio Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT PANE: Inbound Payload & Explainability (5 cols) */}
        <div className="xl:col-span-5 space-y-4">
          {/* Inbound Email Viewer */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#94A3B8] uppercase tracking-wider">Origin Payload</span>
              <span className="px-2 py-0.5 rounded bg-[#E5EEFF] text-[#0F172A] font-bold">G • ceo@company.com</span>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#0F172A]">
                Revised Enterprise Master Services Agreement & ₹50L Quotation Confirmation
              </h2>
              <div className="text-xs text-[#475569] mt-1 font-semibold">
                Marcus Brody &lt;m.brody@nordicenterprises.com&gt;
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] text-xs text-[#0F172A] leading-relaxed space-y-2">
              <p>Dear Alexander,</p>
              <p>
                Following our negotiation call, attached is the revised MSA.{" "}
                <mark className="bg-[#FFEC69]/50 px-1 py-0.5 rounded font-bold text-[#0F172A]">
                  Please confirm acceptance of the ₹50,00,000 annual licensing fee and 30-day payment term
                </mark>{" "}
                so we can issue the final invoice today and finalize seat provisions for Q3.
              </p>
              <p className="pt-2 text-[#475569]">Best,<br />Marcus Brody (Nordic Enterprises)</p>
            </div>
          </div>

          {/* Deep AI Explainability Card */}
          <Card variant="ai" className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#FAB60A]/30">
              <div className="flex items-center gap-2 text-[#795600] font-bold text-xs">
                <span className="material-symbols-outlined text-[20px]">security</span>
                <span>Deep AI Explainability & Risk Surface</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FEF7E6] text-[#795600]">
                Audit ID #EX-882
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 bg-white rounded border border-[#E2E8F0]">
                <span className="text-[10px] text-[#94A3B8] uppercase block">Priority</span>
                <PriorityBadge priority="URGENT" />
              </div>
              <div className="p-2 bg-white rounded border border-[#E2E8F0]">
                <span className="text-[10px] text-[#94A3B8] uppercase block">Intent</span>
                <IntentBadge intent="FINANCE" />
              </div>
              <div className="p-2 bg-white rounded border border-[#E2E8F0]">
                <span className="text-[10px] text-[#94A3B8] uppercase block">Risk</span>
                <RiskBadge risk="HIGH_RISK" showIcon={false} />
              </div>
            </div>

            {/* Explainability Breakdown Points */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-white rounded-lg border border-[#E2E8F0]">
                <span className="font-bold text-[#E11D48] text-[11px] block uppercase">Financial Commitment Detection</span>
                <p className="text-[#475569] mt-0.5">Extracted clause value: <strong>₹50,00,000</strong>. Exceeds auto-authorization threshold of ₹10,00,000.</p>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-[#E2E8F0]">
                <span className="font-bold text-[#795600] text-[11px] block uppercase">Legal Acceptance Request</span>
                <p className="text-[#475569] mt-0.5">Detected semantic terms: <em>"confirm acceptance"</em> and <em>"issue final invoice"</em>.</p>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT PANE: Response Studio Terminal (7 cols) */}
        <div className="xl:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
              <div>
                <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                  Executive AI Response Studio
                  <span className="material-symbols-outlined text-[#2E936F] text-[18px]">auto_awesome</span>
                </h2>
                <p className="text-xs text-[#475569]">Synthesized response matching Alexander Vance voice profile.</p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FEF7E6] text-[#795600] self-start sm:self-auto">
                Draft Prepared — Awaiting Review
              </span>
            </div>

            {/* Strategy Selectors */}
            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#94A3B8] uppercase text-[10px]">Tone:</span>
                {["professional", "concise", "friendly", "formal"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTone(t)}
                    className={`px-2.5 py-1 rounded-lg capitalize font-semibold transition-all ${
                      selectedTone === t ? "bg-white text-[#0F172A] shadow-xs" : "text-[#475569]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#94A3B8] uppercase text-[10px]">Length:</span>
                {["short", "medium", "detailed"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setSelectedLength(l)}
                    className={`px-2.5 py-1 rounded-lg capitalize font-semibold transition-all ${
                      selectedLength === l ? "bg-white text-[#0F172A] shadow-xs" : "text-[#475569]"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Rich Draft Editor */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                Editable AI Response Draft
              </label>
              <textarea
                rows={9}
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                className="w-full p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-mono text-[#0F172A] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#2E936F] focus:bg-white"
              />
            </div>

            {/* Approval Action Controls */}
            {isDispatched ? (
              <div className="p-4 rounded-xl bg-[#EFF4FF] border border-[#79d9b0] text-center space-y-2">
                <div className="text-xs font-bold text-[#2E936F] flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Approved & Dispatched via Gmail API</span>
                </div>
                <p className="text-[11px] text-[#475569]">
                  Cryptographic Log Entry #AUD-99102 created. Status updated to Dispatched.
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E2E8F0]">
                <Button variant="danger" size="sm">
                  Do Not Respond
                </Button>

                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm">
                    Save Draft to Gmail
                  </Button>
                  <Button variant="primary" size="md" onClick={handleApprove} leftIcon={<span className="material-symbols-outlined text-[18px]">send</span>}>
                    Approve & Dispatch via API
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
