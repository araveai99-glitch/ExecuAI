"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
import { Tabs } from "@/components/ui/Tabs";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState<string>("general");
  const [toastNotice, setToastNotice] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(null), 4000);
  };

  // 1. GENERAL SETTINGS STATE
  const [fullName, setFullName] = React.useState("Alexander Vance");
  const [execRole, setExecRole] = React.useState("Chief Executive Officer");
  const [primaryEmail] = React.useState("alexander@execuai.com");
  const [workspaceName, setWorkspaceName] = React.useState("ExecuAI Executive Suite");
  const [timezone, setTimezone] = React.useState("EST (UTC-05:00)");

  // 2. NOTIFICATIONS STATE
  const [emailAlerts, setEmailAlerts] = React.useState(true);
  const [pushAlerts, setPushAlerts] = React.useState(true);
  const [smsAlerts, setSmsAlerts] = React.useState(true);
  const [mobileNumber, setMobileNumber] = React.useState("+1 (555) 234-5678");
  const [briefingTime, setBriefingTime] = React.useState("08:00 AM EST");

  // 3. PREFERENCES STATE
  const [defaultView, setDefaultView] = React.useState<"split" | "list">("split");
  const [autoArchive, setAutoArchive] = React.useState(true);
  const [warningTone, setWarningTone] = React.useState<"standard" | "subdued">("standard");
  const [themeMode, setThemeMode] = React.useState<"light" | "system">("light");

  const handleSave = () => {
    showToast("Settings and executive preferences saved successfully.");
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden pb-12">
      {/* Toast Notice */}
      {toastNotice && (
        <div className="p-4 rounded-xl bg-[#2E936F] text-white text-xs font-bold shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{toastNotice}</span>
          </div>
          <button onClick={() => setToastNotice(null)} className="text-white hover:opacity-80">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Header */}
      <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">Account & Executive Settings</h1>
              <span className="bg-[#EFF4FF] text-[#2E936F] text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#79d9b0]/30">
                Verified Executive Profile
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Manage your profile, notification dispatch rules, and workspace preferences.
            </p>
          </div>

          <Button variant="primary" size="md" onClick={handleSave} leftIcon={<span className="material-symbols-outlined text-[18px]">save</span>}>
            Save Changes
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="overflow-x-auto pb-1 border-t border-[#F8FAFC] pt-3">
          <Tabs
            variant="segmented"
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: "general", label: "General & Profile", badge: "Profile" },
              { id: "notifications", label: "Notifications & Briefings", badge: "Alerts On" },
              { id: "preferences", label: "Workspace Preferences", badge: "UI Theme" },
            ]}
          />
        </div>
      </section>

      {/* GENERAL SETTINGS */}
      {activeTab === "general" && (
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2E936F]">person</span>
              Executive Identity & Workspace
            </h2>
            <span className="text-xs font-bold text-[#64748B]">Organization ID: org_exec_9910</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Executive Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              label="Executive Role / Title"
              value={execRole}
              onChange={(e) => setExecRole(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Primary Account Email"
              value={primaryEmail}
              disabled
              hint="Managed via OAuth SSO connector"
            />
            <Input
              label="Workspace Name"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </div>

          <div className="space-y-2 text-xs">
            <label className="font-bold text-[#0F172A] block uppercase text-[10px]">Timezone & Localization:</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full sm:w-1/2 p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-semibold text-[#0F172A]"
            >
              <option value="EST (UTC-05:00)">Eastern Standard Time (EST - New York)</option>
              <option value="PST (UTC-08:00)">Pacific Standard Time (PST - San Francisco)</option>
              <option value="GMT (UTC+00:00)">Greenwich Mean Time (GMT - London)</option>
              <option value="IST (UTC+05:30)">India Standard Time (IST - New Delhi)</option>
            </select>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS SETTINGS */}
      {activeTab === "notifications" && (
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2563EB]">notifications</span>
              Executive Notification Channels
            </h2>
            <span className="text-xs font-bold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-[#93C5FD]">
              Real-time Alerts
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white">
              <Toggle
                label="Email Notifications for Critical Items"
                description="Receive instant email notifications when a Critical priority or High-Risk email is ingested."
                checked={emailAlerts}
                onChange={setEmailAlerts}
              />
            </div>

            <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white">
              <Toggle
                label="Browser & Mobile Push Notifications"
                description="Show instant desktop push banners when an email requires Decision Center approval."
                checked={pushAlerts}
                onChange={setPushAlerts}
              />
            </div>

            <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-3">
              <Toggle
                label="Emergency High-Risk SMS / WhatsApp Escalations"
                description="Dispatch SMS alerts if a Critical SLA decision has < 15 minutes remaining."
                checked={smsAlerts}
                onChange={setSmsAlerts}
              />

              {smsAlerts && (
                <div className="pt-2 max-w-sm">
                  <Input
                    label="Emergency Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-xs">
              <label className="font-bold text-[#0F172A] block uppercase text-[10px]">Daily Executive Briefing Digest Time:</label>
              <select
                value={briefingTime}
                onChange={(e) => setBriefingTime(e.target.value)}
                className="w-full sm:w-1/3 p-2.5 rounded-xl border border-[#E2E8F0] bg-white font-bold text-xs"
              >
                <option value="07:00 AM EST">07:00 AM EST (Early Morning)</option>
                <option value="08:00 AM EST">08:00 AM EST (Standard Morning)</option>
                <option value="09:00 AM EST">09:00 AM EST (Workday Start)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* PREFERENCES SETTINGS */}
      {activeTab === "preferences" && (
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2E936F]">tune</span>
              Workspace & UI Preferences
            </h2>
            <span className="text-xs font-bold text-[#64748B]">Personalized View</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2 text-xs">
              <label className="font-bold text-[#0F172A] block uppercase text-[10px]">Default Inbox Workbench Layout:</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDefaultView("split")}
                  className={`flex-1 py-3 px-3 rounded-xl border text-center font-bold transition-all ${
                    defaultView === "split"
                      ? "bg-[#2E936F] text-white border-[#2E936F]"
                      : "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]"
                  }`}
                >
                  Split 2-Pane View
                </button>
                <button
                  onClick={() => setDefaultView("list")}
                  className={`flex-1 py-3 px-3 rounded-xl border text-center font-bold transition-all ${
                    defaultView === "list"
                      ? "bg-[#2E936F] text-white border-[#2E936F]"
                      : "bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]"
                  }`}
                >
                  Full Master Stream
                </button>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-bold text-[#0F172A] block uppercase text-[10px]">High-Risk Warning Tone Style:</label>
              <select
                value={warningTone}
                onChange={(e) => setWarningTone(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] font-semibold text-xs text-[#0F172A]"
              >
                <option value="standard">Standard Restrained Warning (Recommended)</option>
                <option value="subdued">Subdued Minimal Border</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white">
            <Toggle
              label="Auto-Archive Emails After Decision Approval"
              description="Automatically archive resolved threads once an executive approval is granted in the Decision Center."
              checked={autoArchive}
              onChange={setAutoArchive}
            />
          </div>
        </div>
      )}
    </div>
  );
}
