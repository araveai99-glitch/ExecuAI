"use client";

import * as React from "react";
import {
  Button,
  IconButton,
  Input,
  Search,
  Select,
  Dropdown,
  Checkbox,
  RadioGroup,
  Toggle,
  Badge,
  PriorityBadge,
  RiskBadge,
  IntentBadge,
  Card,
  EmailCard,
  Avatar,
  Modal,
  Drawer,
  Toast,
  Tooltip,
  Tabs,
  Table,
  Pagination,
  EmptyState,
  ErrorState,
  LoadingState,
  Skeleton,
  Sidebar,
  Header,
  MobileNavigation,
} from "@/components/ui";

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = React.useState("components");
  const [searchValue, setSearchValue] = React.useState("");
  const [toggleState, setToggleState] = React.useState(true);
  const [checkboxState, setCheckboxState] = React.useState(true);
  const [radioValue, setRadioValue] = React.useState("option1");
  const [selectValue, setSelectValue] = React.useState("option1");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  const sampleTableData = [
    { id: "1", sender: "Elena Rostova", intent: "LEGAL", priority: "CRITICAL", risk: "HIGH_RISK", time: "14m ago" },
    { id: "2", sender: "Marcus Brody", intent: "FINANCE", priority: "URGENT", risk: "HIGH_RISK", time: "30m ago" },
    { id: "3", sender: "Dr. Aris Thorne", intent: "MEETING", priority: "IMPORTANT", risk: "SAFE", time: "1h ago" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Frame */}
      <Sidebar currentPath="dashboard" />

      {/* Header Frame */}
      <Header onSearch={setSearchValue} />

      {/* Main Showcase Surface */}
      <main className="pl-0 lg:pl-64 pt-16 pb-20 lg:pb-12 min-h-screen bg-[#F8FAFC]">
        <div className="max-w-[1720px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Header Greeting & Title */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EFF4FF] text-[#2E936F] text-[11px] font-bold uppercase tracking-wider">
                ExecuAI Design Foundation
              </span>
              <span className="text-[#94A3B8]">•</span>
              <span className="text-xs text-[#475569]">Stitch Specification v2.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Centralized Design Tokens & Reusable Component System
            </h1>
            <p className="text-sm text-[#475569]">
              Built with Next.js, Tailwind CSS, and Inter typography based on master brand assets (#2E936F, #FFFFFF, #FFEC69, #FAB60A, #F7D7B0).
            </p>
          </div>

          {/* Color Palette Swatches */}
          <section className="bg-white rounded-2xl p-6 shadow-xs border border-[#E2E8F0] space-y-4">
            <h2 className="text-base font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2">
              1. Brand Palette Tokens
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="space-y-1.5">
                <div className="h-16 rounded-xl bg-[#2E936F] shadow-inner flex items-end p-2 text-white font-mono text-xs font-bold">
                  #2E936F
                </div>
                <div className="text-xs font-semibold text-[#0F172A]">Primary Green</div>
                <div className="text-[11px] text-[#475569]">Brand, Navigation, Approvals</div>
              </div>

              <div className="space-y-1.5">
                <div className="h-16 rounded-xl bg-white border border-[#CBD5E1] shadow-inner flex items-end p-2 text-[#0F172A] font-mono text-xs font-bold">
                  #FFFFFF
                </div>
                <div className="text-xs font-semibold text-[#0F172A]">White</div>
                <div className="text-[11px] text-[#475569]">Cards, Surfaces, Inputs</div>
              </div>

              <div className="space-y-1.5">
                <div className="h-16 rounded-xl bg-[#FFEC69] shadow-inner flex items-end p-2 text-[#0F172A] font-mono text-xs font-bold">
                  #FFEC69
                </div>
                <div className="text-xs font-semibold text-[#0F172A]">Primary Yellow</div>
                <div className="text-[11px] text-[#475569]">AI Highlights, Synthesis</div>
              </div>

              <div className="space-y-1.5">
                <div className="h-16 rounded-xl bg-[#FAB60A] shadow-inner flex items-end p-2 text-white font-mono text-xs font-bold">
                  #FAB60A
                </div>
                <div className="text-xs font-semibold text-[#0F172A]">Accent Orange</div>
                <div className="text-[11px] text-[#475569]">Warnings, Review Gates</div>
              </div>

              <div className="space-y-1.5">
                <div className="h-16 rounded-xl bg-[#F7D7B0] shadow-inner flex items-end p-2 text-[#0F172A] font-mono text-xs font-bold">
                  #F7D7B0
                </div>
                <div className="text-xs font-semibold text-[#0F172A]">Soft Beige</div>
                <div className="text-[11px] text-[#475569]">Background Accents</div>
              </div>
            </div>
          </section>

          {/* 3D Triage Badges Showcase */}
          <section className="bg-white rounded-2xl p-6 shadow-xs border border-[#E2E8F0] space-y-4">
            <h2 className="text-base font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2">
              2. Three-Dimensional Triage Badges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                  Dimension I: Priority
                </span>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <PriorityBadge priority="CRITICAL" />
                  <PriorityBadge priority="URGENT" />
                  <PriorityBadge priority="IMPORTANT" />
                  <PriorityBadge priority="NORMAL" />
                  <PriorityBadge priority="LOW" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                  Dimension II: Intent Category
                </span>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <IntentBadge intent="LEGAL" />
                  <IntentBadge intent="FINANCE" />
                  <IntentBadge intent="CLIENT" />
                  <IntentBadge intent="SALES" />
                  <IntentBadge intent="VENDOR" />
                  <IntentBadge intent="HR" />
                  <IntentBadge intent="MEETING" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                  Dimension III: Risk Gate
                </span>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <RiskBadge risk="SAFE" />
                  <RiskBadge risk="REVIEW_REQUIRED" />
                  <RiskBadge risk="HIGH_RISK" />
                  <RiskBadge risk="CONFIDENTIAL" />
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Component Library */}
          <section className="bg-white rounded-2xl p-6 shadow-xs border border-[#E2E8F0] space-y-6">
            <h2 className="text-base font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2">
              3. Interactive Triggers & Controls
            </h2>

            {/* Buttons */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#475569]">Buttons & Icon Buttons</span>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Approve & Dispatch</Button>
                <Button variant="secondary">Edit AI Draft</Button>
                <Button variant="danger">Block Auto-Reply</Button>
                <Button variant="warning">Request Human Review</Button>
                <Button variant="ghost">Secondary Action</Button>
                <IconButton
                  variant="primary"
                  ariaLabel="Add Account"
                  icon={<span className="material-symbols-outlined text-[18px]">add</span>}
                />
                <IconButton
                  variant="secondary"
                  ariaLabel="Settings"
                  icon={<span className="material-symbols-outlined text-[18px]">settings</span>}
                />
              </div>
            </div>

            {/* Inputs & Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <Input
                label="Executive Name"
                placeholder="Alexander Vance"
                defaultValue="Alexander Vance"
              />
              <Select
                label="Tone Preference"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                options={[
                  { value: "option1", label: "Professional (Default)" },
                  { value: "option2", label: "Concise" },
                  { value: "option3", label: "Formal" },
                ]}
              />
              <div className="space-y-3 pt-5">
                <Toggle
                  label="Enforce Safety Gate"
                  description="Block autonomous replies on high-risk emails"
                  checked={toggleState}
                  onChange={setToggleState}
                />
                <Checkbox
                  label="Require Dual-Signoff for >₹10L Commitments"
                  checked={checkboxState}
                  onChange={(e) => setCheckboxState(e.target.checked)}
                />
              </div>
            </div>

            {/* Tabs & Triggers */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-[#475569]">Segmented Tabs & Modals</span>
              <div className="flex flex-wrap items-center gap-4">
                <Tabs
                  variant="segmented"
                  tabs={[
                    { id: "components", label: "Components", badge: "30" },
                    { id: "tokens", label: "Tokens" },
                    { id: "layouts", label: "Layouts" },
                  ]}
                  activeTab={activeTab}
                  onChange={setActiveTab}
                />
                <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(true)}>
                  Open Decision Modal
                </Button>
                <Button variant="secondary" size="sm" onClick={() => setIsDrawerOpen(true)}>
                  Open Telemetry Drawer
                </Button>
              </div>
            </div>
          </section>

          {/* Email Card & Table Showcase */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-base font-bold text-[#0F172A]">
                4. Email Stream Card Component
              </h2>
              <EmailCard
                provider="GMAIL"
                accountEmail="ceo@company.com"
                senderName="Elena Rostova"
                subject="Series B Definitive Agreements & IP Indemnity Clause Review"
                snippet="Please review clause 14.2 regarding third-party indemnities before tomorrow's board meeting..."
                timestamp="14m ago"
                priority="CRITICAL"
                intent="LEGAL"
                risk="HIGH_RISK"
                isSelected={true}
              />
              <EmailCard
                provider="ZOHO"
                accountEmail="board@vance.io"
                senderName="Marcus Brody"
                subject="Revised Enterprise Master Services Agreement & ₹50L Quotation"
                snippet="We have updated the pricing schedule in Schedule C reflecting the discussed terms..."
                timestamp="30m ago"
                priority="URGENT"
                intent="FINANCE"
                risk="HIGH_RISK"
              />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-base font-bold text-[#0F172A]">
                5. High-Density Table & Pagination
              </h2>
              <Table
                data={sampleTableData}
                keyExtractor={(item) => item.id}
                columns={[
                  { key: "sender", header: "Sender" },
                  {
                    key: "intent",
                    header: "Intent",
                    render: (row) => <IntentBadge intent={row.intent} />,
                  },
                  {
                    key: "priority",
                    header: "Priority",
                    render: (row) => <PriorityBadge priority={row.priority as any} />,
                  },
                  {
                    key: "risk",
                    header: "Risk Gate",
                    render: (row) => <RiskBadge risk={row.risk as any} showIcon={false} />,
                  },
                  { key: "time", header: "Timestamp", align: "right" },
                ]}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={5}
                onPageChange={setCurrentPage}
              />
            </div>
          </section>

          {/* AI Explainability Card & System States */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="ai">
              <div className="flex items-center gap-2 text-[#795600] font-semibold text-sm mb-2">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
                <span>Executive AI Synthesis Card</span>
              </div>
              <p className="text-xs text-[#0F172A] leading-relaxed">
                Contains binding contractual indemnity obligations and requests formal CEO authorization.{" "}
                <mark className="bg-[#FFEC69]/50 px-1 py-0.5 rounded font-semibold text-[#0F172A]">
                  Unlimited liability exposure flagged
                </mark>{" "}
                under Section 14.3. Automatic draft generation has been programmatically blocked.
              </p>
            </Card>

            <EmptyState
              title="You're All Caught Up"
              description="Zero pending decisions require executive intervention. ExecuAI Safety Engine is actively monitoring mailboxes."
              icon="verified"
            />
          </section>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation currentPath="dashboard" />

      {/* Modal Demonstration */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm High-Risk Executive Action"
        subtitle="Decision Gate #E-4091 • Legal Liability Barrier"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
              Clear & Dispatch via Provider API
            </Button>
          </>
        }
      >
        <p className="text-xs text-[#475569] leading-relaxed">
          Executing this clearance will send the approved response through the provider send API and record an entry into the immutable cryptographic audit log.
        </p>
      </Modal>

      {/* Drawer Demonstration */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="AI Engine Telemetry & Risk Signals"
      >
        <div className="space-y-4 text-xs text-[#475569]">
          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
            <span className="font-bold text-[#0F172A]">Model Inference Path:</span>
            <p className="mt-1">Llama-3-ExecGuard-70B</p>
          </div>
          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
            <span className="font-bold text-[#0F172A]">Extracted Clause Value:</span>
            <p className="mt-1 font-mono text-[#0F172A] font-bold">₹50,00,000 ($60k equiv)</p>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
