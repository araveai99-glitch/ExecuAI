"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";

interface PersonalRule {
  id: string;
  title: string;
  description: string;
  active: boolean;
  category: "Legal" | "Finance" | "Governance" | "Routing";
}

export default function RulesAndPreferencesPage() {
  const [activeTab, setActiveTab] = React.useState<string>("safety");
  const [toastNotice, setToastNotice] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(null), 4000);
  };

  // 1. COMMUNICATION SAFETY TOGGLES (7 Mandatory Rules)
  const [neverAutoSend, setNeverAutoSend] = React.useState(true);
  const [neverRespondConfidential, setNeverRespondConfidential] = React.useState(true);
  const [neverNegotiatePricing, setNeverNegotiatePricing] = React.useState(true);
  const [neverApproveContracts, setNeverApproveContracts] = React.useState(true);
  const [neverFinancialCommitments, setNeverFinancialCommitments] = React.useState(true);
  const [neverRespondLegalNotices, setNeverRespondLegalNotices] = React.useState(true);
  const [neverRespondHRMatters, setNeverRespondHRMatters] = React.useState(true);

  // Financial Threshold Input
  const [financialCap, setFinancialCap] = React.useState("1000000");

  // 2. WRITING STYLE PREFERENCES
  const [tone, setTone] = React.useState<"professional" | "concise" | "friendly" | "formal" | "authoritative">("professional");
  const [length, setLength] = React.useState<"short" | "medium" | "detailed">("medium");
  const [greeting, setGreeting] = React.useState("Dear [Name],");
  const [customGreeting, setCustomGreeting] = React.useState("");
  const [signOff, setSignOff] = React.useState("Best regards,\nAlexander Vance\nChief Executive Officer");
  const [formalityLevel, setFormalityLevel] = React.useState<"Balanced" | "Formal" | "Strict Executive">("Formal");

  // 3. PERSONAL RULES DATASET
  const [personalRules, setPersonalRules] = React.useState<PersonalRule[]>([
    {
      id: "RULE-1",
      title: "Emails from our legal team always require review.",
      description: "Any inbound message from legal counsel domains (@apexlaw.com, @corporatelegal.io) is automatically escalated to the Decision Center.",
      active: true,
      category: "Legal",
    },
    {
      id: "RULE-2",
      title: "Emails containing financial commitments always require approval.",
      description: "Any email mentioning quotations, invoices, or binding financial amounts above ₹10,00,000 ($10k equiv) blocks automated drafting.",
      active: true,
      category: "Finance",
    },
    {
      id: "RULE-3",
      title: "Emails from board members always flag as Urgent.",
      description: "Messages originating from governance board members (Vance Capital, Board Lead) are categorized as Urgent Priority.",
      active: true,
      category: "Governance",
    },
    {
      id: "RULE-4",
      title: "Routine cloud infrastructure invoices forward to Accounts Payable.",
      description: "Vendor invoices tagged as SAFE without legal changes auto-route to ap-invoices@company.com with notification.",
      active: false,
      category: "Routing",
    },
  ]);

  // Modal for Adding Custom Rule
  const [showAddRuleModal, setShowAddRuleModal] = React.useState(false);
  const [newRuleTitle, setNewRuleTitle] = React.useState("");
  const [newRuleCategory, setNewRuleCategory] = React.useState<"Legal" | "Finance" | "Governance" | "Routing">("Legal");

  // Toggle Personal Rule Active State
  const togglePersonalRule = (id: string) => {
    setPersonalRules((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextState = !r.active;
          showToast(nextState ? `Activated rule: "${r.title}"` : `Deactivated rule: "${r.title}"`);
          return { ...r, active: nextState };
        }
        return r;
      })
    );
  };

  // Add Custom Rule
  const handleAddCustomRule = () => {
    if (!newRuleTitle.trim()) return;
    const created: PersonalRule = {
      id: `RULE-${Date.now()}`,
      title: newRuleTitle,
      description: `Custom executive preference rule configured under category ${newRuleCategory}.`,
      active: true,
      category: newRuleCategory,
    };
    setPersonalRules([created, ...personalRules]);
    setNewRuleTitle("");
    setShowAddRuleModal(false);
    showToast(`Added custom personal rule: "${created.title}"`);
  };

  // Delete Personal Rule
  const handleDeleteRule = (id: string) => {
    setPersonalRules((prev) => prev.filter((r) => r.id !== id));
    showToast("Deleted personal rule.");
  };

  const handleSaveAll = () => {
    showToast("All communication safety rules, writing style preferences, and personal policies saved successfully.");
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden pb-12">
      {/* Toast Notice */}
      {toastNotice && (
        <div className="p-4 rounded-xl bg-[#2e936f] text-white text-xs font-bold shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{toastNotice}</span>
          </div>
          <button onClick={() => setToastNotice(null)} className="text-white hover:opacity-80">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Top Header & Save Trigger */}
      <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight font-heading">Rules & Preferences Studio</h1>
              <span className="bg-[#2e936f]/10 text-[#2e936f] text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#2e936f]/20">
                Zero-Trust Boundaries Active
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Configure communication safety blockers, executive writing style tuning, and plain-language personal policies.
            </p>
          </div>

          <Button variant="primary" size="md" onClick={handleSaveAll} leftIcon={<span className="material-symbols-outlined text-[18px]">save</span>}>
            Save All Preferences
          </Button>
        </div>

        {/* Category Navigation Tabs */}
        <div className="overflow-x-auto pb-1 border-t border-[#F8FAFC] pt-3">
          <Tabs
            variant="segmented"
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: "safety", label: "Communication Safety", badge: "7 Enforced" },
              { id: "style", label: "Writing Style Tuning", badge: tone.toUpperCase() },
              { id: "personal", label: "Personal Rules Engine", badge: `${personalRules.length} Active` },
            ]}
          />
        </div>
      </section>

      {/* SECTION 1: COMMUNICATION SAFETY */}
      {activeTab === "safety" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2 font-heading">
                  <span className="material-symbols-outlined text-[#f15e1c]">security</span>
                  Communication Safety Boundaries
                </h2>
                <p className="text-xs text-[#64748B]">Strict hard-coded safety gates that cannot be bypassed by the AI engine.</p>
              </div>
              <span className="text-xs font-bold text-[#f15e1c] bg-[#fff2ec] px-2.5 py-1 rounded-full border border-[#f15e1c]/20">
                Zero-Trust Locked
              </span>
            </div>

            {/* Financial Commitment Threshold */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider text-[10px]">
                Financial Authorization Threshold
              </h4>
              <Input
                label="Maximum Executive Auto-Triage Financial Cap (₹ INR)"
                type="number"
                value={financialCap}
                onChange={(e) => setFinancialCap(e.target.value)}
                hint="Emails mentioning pricing, quotations, or agreements above ₹10,00,000 ($10,000) automatically block draft auto-dispatch and enforce Decision Center approval."
              />
            </div>

            {/* 7 Mandatory Toggles */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-1 hover:border-[#CBD5E1] transition-all">
                <Toggle
                  label="Never automatically send emails"
                  description="Master Zero-Trust Lock: AI synthesizes draft suggestions locally, but will NEVER call or trigger a provider send API automatically."
                  checked={neverAutoSend}
                  onChange={setNeverAutoSend}
                />
              </div>

              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-1 hover:border-[#CBD5E1] transition-all">
                <Toggle
                  label="Never respond to confidential emails"
                  description="Automatically quarantine emails containing credentials, passwords, M&A notes, or board secrecy agreements."
                  checked={neverRespondConfidential}
                  onChange={setNeverRespondConfidential}
                />
              </div>

              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-1 hover:border-[#CBD5E1] transition-all">
                <Toggle
                  label="Never negotiate pricing"
                  description="Block AI from proposing commercial discounts, pricing concessions, or altering rate cards."
                  checked={neverNegotiatePricing}
                  onChange={setNeverNegotiatePricing}
                />
              </div>

              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-1 hover:border-[#CBD5E1] transition-all">
                <Toggle
                  label="Never approve contracts"
                  description="Block automatic drafting or confirmation on MSAs, SOWs, IP indemnities, or binding agreements."
                  checked={neverApproveContracts}
                  onChange={setNeverApproveContracts}
                />
              </div>

              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-1 hover:border-[#CBD5E1] transition-all">
                <Toggle
                  label="Never make financial commitments"
                  description="Prevent AI from issuing binding assurances on budget approvals, expense reimbursements, or credit lines."
                  checked={neverFinancialCommitments}
                  onChange={setNeverFinancialCommitments}
                />
              </div>

              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-1 hover:border-[#CBD5E1] transition-all">
                <Toggle
                  label="Never respond to legal notices"
                  description="Quarantine subpoenas, SLA outage rebate penalty claims, and external legal counsel dispute notices."
                  checked={neverRespondLegalNotices}
                  onChange={setNeverRespondLegalNotices}
                />
              </div>

              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-1 hover:border-[#CBD5E1] transition-all">
                <Toggle
                  label="Never respond to HR-sensitive matters"
                  description="Protect employee salary inquiries, performance evaluations, grievances, and executive hiring communications."
                  checked={neverRespondHRMatters}
                  onChange={setNeverRespondHRMatters}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: WRITING STYLE */}
      {activeTab === "style" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2E936F]">edit_note</span>
                  Executive Writing Style & Tone Tuning
                </h2>
                <p className="text-xs text-[#64748B]">Personalize the AI draft engine to emulate your unique voice profile.</p>
              </div>
              <span className="text-xs font-bold text-[#2E936F] bg-[#EFF4FF] px-2.5 py-1 rounded-full border border-[#79d9b0]/30">
                Alexander Vance Profile
              </span>
            </div>

            {/* Tone Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider text-[10px] block">
                Default Executive Tone:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: "professional", label: "Professional", desc: "Balanced & polite" },
                  { id: "concise", label: "Concise", desc: "Short & direct" },
                  { id: "friendly", label: "Friendly", desc: "Warm & open" },
                  { id: "formal", label: "Formal", desc: "Corporate & precise" },
                  { id: "authoritative", label: "Authoritative", desc: "Decisive & firm" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      tone === t.id
                        ? "bg-[#2E936F] text-white border-[#2E936F] shadow-xs"
                        : "bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:bg-white"
                    }`}
                  >
                    <p className="font-bold text-xs">{t.label}</p>
                    <p className={`text-[10px] ${tone === t.id ? "text-white/80" : "text-[#64748B]"}`}>{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Length Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider text-[10px] block">
                Default Draft Length:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "short", label: "Short (1-2 Paragraphs)", desc: "Quick acknowledgement and direct action point." },
                  { id: "medium", label: "Balanced Medium (2-3 Paragraphs)", desc: "Standard executive response with clear rationale." },
                  { id: "detailed", label: "Detailed Executive Summary", desc: "Comprehensive breakdown with structured bullet points." },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLength(l.id as any)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      length === l.id
                        ? "bg-[#0F172A] text-white border-[#0F172A] shadow-xs"
                        : "bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:bg-white"
                    }`}
                  >
                    <p className="font-bold text-xs">{l.label}</p>
                    <p className={`text-[11px] mt-0.5 ${length === l.id ? "text-white/80" : "text-[#64748B]"}`}>{l.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Greeting & Sign-Off Customization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2 text-xs">
                <label className="font-bold text-[#0F172A] block uppercase text-[10px]">Preferred Salutation / Greeting:</label>
                <select
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] font-semibold text-xs text-[#0F172A] focus:ring-2 focus:ring-[#2E936F]"
                >
                  <option value="Dear [Name],">Dear [Name], (Formal)</option>
                  <option value="Hi [Name],">Hi [Name], (Professional)</option>
                  <option value="Hello [Name],">Hello [Name], (Standard)</option>
                  <option value="Good morning [Name],">Good morning [Name], (Polite)</option>
                </select>
              </div>

              <div className="space-y-2 text-xs">
                <label className="font-bold text-[#0F172A] block uppercase text-[10px]">Formality Calibration:</label>
                <div className="flex items-center gap-2 pt-1">
                  {(["Balanced", "Formal", "Strict Executive"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFormalityLevel(f)}
                      className={`flex-1 py-2 px-2 rounded-xl text-center font-bold text-xs border transition-all ${
                        formalityLevel === f
                          ? "bg-[#2563EB] text-white border-[#2563EB]"
                          : "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sign-Off Text Area */}
            <div className="space-y-2 text-xs">
              <label className="font-bold text-[#0F172A] block uppercase text-[10px]">Executive Sign-Off Template:</label>
              <textarea
                rows={3}
                value={signOff}
                onChange={(e) => setSignOff(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-mono text-[#0F172A] focus:ring-2 focus:ring-[#2E936F]"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: PERSONAL RULES ENGINE */}
      {activeTab === "personal" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-3">
              <div>
                <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2E936F]">rule</span>
                  Plain-Language Personal Rules Engine
                </h2>
                <p className="text-xs text-[#64748B]">Define custom business logic in plain English without complex coding.</p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowAddRuleModal(true)}
                leftIcon={<span className="material-symbols-outlined text-[16px]">add</span>}
              >
                Add Personal Rule
              </Button>
            </div>

            {/* List of Personal Rules */}
            <div className="space-y-3">
              {personalRules.map((rule) => (
                <div
                  key={rule.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 ${
                    rule.active
                      ? "bg-white border-[#E2E8F0] shadow-xs"
                      : "bg-[#F8FAFC] border-[#CBD5E1] opacity-75"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-[#2E936F] bg-[#EFF4FF] px-2.5 py-0.5 rounded-full border border-[#79d9b0]/30">
                          "{rule.title}"
                        </span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569]">
                          {rule.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] pt-1 leading-relaxed">{rule.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => togglePersonalRule(rule.id)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                          rule.active
                            ? "bg-[#2E936F] text-white border-[#2E936F]"
                            : "bg-[#E2E8F0] text-[#64748B] border-[#CBD5E1]"
                        }`}
                      >
                        {rule.active ? "Active" : "Paused"}
                      </button>

                      <button
                        onClick={() => handleDeleteRule(rule.id)}
                        className="p-1.5 rounded-lg text-[#CBD5E1] hover:text-[#E11D48] hover:bg-[#FFF1F2]"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Personal Rule Modal */}
      {showAddRuleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2E936F]">add_task</span>
                Add Custom Executive Rule
              </h3>
              <button onClick={() => setShowAddRuleModal(false)} className="text-[#94A3B8] hover:text-[#0F172A]">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#0F172A] block mb-1">Plain-Language Rule Statement:</label>
                <input
                  type="text"
                  value={newRuleTitle}
                  onChange={(e) => setNewRuleTitle(e.target.value)}
                  placeholder='e.g., "Emails from vendor domains default to Low Priority."'
                  className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs focus:ring-2 focus:ring-[#2E936F]"
                />
              </div>

              <div>
                <label className="font-bold text-[#0F172A] block mb-1">Rule Category:</label>
                <select
                  value={newRuleCategory}
                  onChange={(e) => setNewRuleCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-semibold focus:ring-2 focus:ring-[#2E936F]"
                >
                  <option value="Legal">Legal & Compliance</option>
                  <option value="Finance">Finance & Commercial</option>
                  <option value="Governance">Governance & Board</option>
                  <option value="Routing">Routing & Operations</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowAddRuleModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleAddCustomRule}>
                Create Rule
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
