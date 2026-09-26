"use client";

import * as React from "react";
import { AIDraftWorkbench } from "@/components/execuai/AIDraftWorkbench";
import { initialUnifiedEmails } from "@/lib/data/mockExecuData";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { IntentBadge } from "@/components/ui/IntentBadge";
import { Tabs } from "@/components/ui/Tabs";

export default function DraftsPage() {
  const [selectedEmailId, setSelectedEmailId] = React.useState<string>("EMAIL-1001");
  const [activeTab, setActiveTab] = React.useState<string>("ALL");

  // Draft items derived from initialUnifiedEmails that have AI drafts available
  const draftEmails = React.useMemo(() => {
    return initialUnifiedEmails.filter((e) => e.aiDraftAvailable || e.risk === "HIGH_RISK" || e.risk === "REVIEW");
  }, []);

  const filteredDraftEmails = React.useMemo(() => {
    if (activeTab === "HIGH_RISK") {
      return draftEmails.filter((e) => e.risk === "HIGH_RISK" || e.risk === "REVIEW");
    }
    if (activeTab === "GMAIL") {
      return draftEmails.filter((e) => e.provider === "GMAIL");
    }
    if (activeTab === "ZOHO") {
      return draftEmails.filter((e) => e.provider === "ZOHO");
    }
    return draftEmails;
  }, [draftEmails, activeTab]);

  const selectedEmail = React.useMemo(() => {
    return draftEmails.find((e) => e.id === selectedEmailId) || draftEmails[0];
  }, [draftEmails, selectedEmailId]);

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden pb-12">
      {/* Top Header & Draft Stream Filter */}
      <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">AI Drafts Studio</h1>
              <span className="bg-[#EFF4FF] text-[#2E936F] text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#79d9b0]/30">
                {draftEmails.length} Prepared Drafts
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF1F2] text-[#E11D48] text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse" />
                Human Approval Mandatory
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              AI synthesizes responses matching your executive voice. Human approval is strictly required prior to dispatch.
            </p>
          </div>

          <Tabs
            variant="segmented"
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: "ALL", label: "All Drafts", badge: `${draftEmails.length}` },
              { id: "HIGH_RISK", label: "High Risk Gates", badge: `${draftEmails.filter((e) => e.risk === "HIGH_RISK" || e.risk === "REVIEW").length}` },
              { id: "GMAIL", label: "Gmail Account", badge: `${draftEmails.filter((e) => e.provider === "GMAIL").length}` },
              { id: "ZOHO", label: "Zoho Account", badge: `${draftEmails.filter((e) => e.provider === "ZOHO").length}` },
            ]}
          />
        </div>

        {/* Horizontal Draft Stream Selector Pills */}
        <div className="overflow-x-auto pb-1 border-t border-[#F8FAFC] pt-3">
          <div className="flex items-center gap-3 min-w-max">
            {filteredDraftEmails.map((item) => {
              const isSelected = item.id === selectedEmail.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedEmailId(item.id)}
                  className={`p-3 rounded-xl border text-left transition-all max-w-xs cursor-pointer ${
                    isSelected
                      ? "bg-white border-[#2E936F] shadow-xs ring-1 ring-[#2E936F]"
                      : "bg-[#F8FAFC] border-[#E2E8F0] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1 text-[10px]">
                    <span
                      className={`font-extrabold px-2 py-0.5 rounded ${
                        item.provider === "GMAIL" ? "bg-[#FFF1F2] text-[#E11D48]" : "bg-[#EFF6FF] text-[#2563EB]"
                      }`}
                    >
                      {item.accountLabel}
                    </span>
                    <span className="text-[#94A3B8] font-medium">{item.timestamp}</span>
                  </div>

                  <p className="text-xs font-bold text-[#0F172A] truncate max-w-[220px]">{item.subject}</p>
                  <p className="text-[11px] text-[#64748B] truncate">{item.senderName}</p>

                  <div className="flex items-center gap-1 mt-2">
                    <PriorityBadge priority={item.priority} size="sm" />
                    <RiskBadge risk={item.risk} size="sm" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Draft Workbench Component */}
      <AIDraftWorkbench email={selectedEmail} />
    </div>
  );
}
