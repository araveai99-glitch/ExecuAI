"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { Tabs } from "@/components/ui/Tabs";

export default function SecurityDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<string>("accounts");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 2. ACTIVE SESSIONS STATE
  const [sessions, setSessions] = React.useState([
    {
      id: "SESS-101",
      device: 'MacBook Pro 16" - macOS Sequoia',
      browser: "Chrome 128.0 (Current Session)",
      location: "New York, NY, USA",
      ip: "198.51.100.42",
      lastActive: "Active now",
      isCurrent: true,
    },
    {
      id: "SESS-102",
      device: 'iPad Pro 12.9" - iPadOS 18',
      browser: "ExecuAI iPad App v2.4",
      location: "New York, NY, USA",
      ip: "198.51.100.88",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
    {
      id: "SESS-103",
      device: "iPhone 16 Pro - iOS 18",
      browser: "ExecuAI Mobile v2.4",
      location: "Boston, MA, USA",
      ip: "198.51.100.104",
      lastActive: "5 hours ago",
      isCurrent: false,
    },
  ]);

  // 3. SECURITY PREFERENCES STATE
  const [twoFactorAuth, setTwoFactorAuth] = React.useState(true);
  const [zeroTrustLock, setZeroTrustLock] = React.useState(true);
  const [sessionTimeout, setSessionTimeout] = React.useState("15m");
  const [ipWhitelisting, setIpWhitelisting] = React.useState(false);

  // 4. DATA CONTROLS STATE
  const [retentionPeriod, setRetentionPeriod] = React.useState("90d");
  const [zeroTrainingConfirmed] = React.useState(true);

  const handleRevokeSession = (id: string, device: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    showToast(`Revoked active session for ${device}.`);
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden pb-12">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="p-4 rounded-xl bg-[#2e936f] text-white text-xs font-bold shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-white hover:opacity-80">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Top Header */}
      <section className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight font-heading">Security & Governance Studio</h1>
              <span className="bg-[#2e936f]/10 text-[#2e936f] text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#2e936f]/20">
                AES-256 Tokens Encrypted
              </span>
              <span className="bg-[#ffec69]/40 text-[#855d00] text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#fab60a]/30">
                Zero-Trust Active
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Multi-tenant security architecture, active sessions management, and zero-training data guarantees.
            </p>
          </div>

          <Link href="/app/audit-log">
            <Button variant="secondary" size="sm" leftIcon={<span className="material-symbols-outlined text-[16px]">receipt_long</span>}>
              Cryptographic Audit Log
            </Button>
          </Link>
        </div>

        {/* 4 Required Security Tabs Navigation */}
        <div className="overflow-x-auto pb-1 border-t border-[#F8FAFC] pt-3">
          <Tabs
            variant="segmented"
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: "accounts", label: "Connected Accounts", badge: "3 OAuth" },
              { id: "sessions", label: "Active Sessions", badge: `${sessions.length} Devices` },
              { id: "preferences", label: "Security Preferences", badge: "2FA Active" },
              { id: "data", label: "Data Controls & Privacy", badge: "Zero-Training" },
            ]}
          />
        </div>
      </section>

      {/* SECTION 1: CONNECTED ACCOUNTS SECURITY */}
      {activeTab === "accounts" && (
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2E936F]">verified_user</span>
                OAuth 2.0 PKCE Account Permissions Review
              </h2>
              <p className="text-xs text-[#64748B]">Verify scopes and credentials for connected Gmail and Zoho inboxes.</p>
            </div>

            <Link href="/app/accounts">
              <Button variant="secondary" size="sm">
                Manage Accounts
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#EA4335] text-white font-bold flex items-center justify-center">G</span>
                  <span className="font-bold text-[#0F172A]">ceo@company.com (Gmail #1)</span>
                </div>
                <span className="font-bold text-[#2E936F] bg-[#EFF4FF] px-2 py-0.5 rounded border border-[#79d9b0]/30">
                  Read & Draft Scopes Only
                </span>
              </div>
              <p className="text-[#64748B]">Token Hash: <code>gsk_live_...9f82</code> (AES-256 Encrypted at rest)</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#EA4335] text-white font-bold flex items-center justify-center">G</span>
                  <span className="font-bold text-[#0F172A]">sales@company.com (Gmail #2)</span>
                </div>
                <span className="font-bold text-[#2E936F] bg-[#EFF4FF] px-2 py-0.5 rounded border border-[#79d9b0]/30">
                  Read & Draft Scopes Only
                </span>
              </div>
              <p className="text-[#64748B]">Token Hash: <code>gsk_live_...4410</code> (AES-256 Encrypted at rest)</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#2264E5] text-white font-bold flex items-center justify-center">Z</span>
                  <span className="font-bold text-[#0F172A]">director@company.com (Zoho #1)</span>
                </div>
                <span className="font-bold text-[#2E936F] bg-[#EFF4FF] px-2 py-0.5 rounded border border-[#79d9b0]/30">
                  Read & Draft Scopes Only
                </span>
              </div>
              <p className="text-[#64748B]">Token Hash: <code>zsk_live_...112c</code> (AES-256 Encrypted at rest)</p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ACTIVE SESSIONS */}
      {activeTab === "sessions" && (
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2563EB]">devices</span>
                Active Executive Sessions & Devices
              </h2>
              <p className="text-xs text-[#64748B]">Manage active browser sessions and mobile device authorizations.</p>
            </div>

            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                setSessions(sessions.filter((s) => s.isCurrent));
                showToast("Revoked all remote active sessions.");
              }}
            >
              Revoke All Remote Sessions
            </Button>
          </div>

          <div className="space-y-3">
            {sessions.map((sess) => (
              <div
                key={sess.id}
                className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#2563EB] text-[24px] mt-0.5">
                    {sess.device.includes("MacBook") ? "laptop_mac" : sess.device.includes("iPad") ? "tablet_mac" : "phone_iphone"}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 font-bold text-[#0F172A]">
                      <span>{sess.device}</span>
                      {sess.isCurrent && (
                        <span className="bg-[#EFF4FF] text-[#2E936F] text-[10px] px-2 py-0.5 rounded border border-[#79d9b0]/30 font-bold">
                          Current Session
                        </span>
                      )}
                    </div>
                    <p className="text-[#64748B] mt-0.5">
                      {sess.browser} • IP: {sess.ip} ({sess.location})
                    </p>
                    <span className="text-[10px] text-[#94A3B8]">Last active: {sess.lastActive}</span>
                  </div>
                </div>

                {!sess.isCurrent && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRevokeSession(sess.id, sess.device)}
                  >
                    Revoke Session
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: SECURITY PREFERENCES */}
      {activeTab === "preferences" && (
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#E11D48]">security</span>
                Security Controls & Authentication Safeguards
              </h2>
              <p className="text-xs text-[#64748B]">Enforce hardware security keys, zero-trust locks, and session timeouts.</p>
            </div>
            <span className="text-xs font-bold text-[#2E936F] bg-[#EFF4FF] px-2.5 py-1 rounded-full border border-[#79d9b0]/30">
              WebAuthn / Passkeys Enforced
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white">
              <Toggle
                label="Two-Factor Authentication (WebAuthn / FIDO2 Passkeys)"
                description="Require hardware YubiKey or Touch ID / Face ID passkey verification on every login."
                checked={twoFactorAuth}
                onChange={setTwoFactorAuth}
              />
            </div>

            <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white">
              <Toggle
                label="Zero-Trust Human Approval Send Barrier"
                description="Programmatically block direct LLM provider send API calls without manual executive assent."
                checked={zeroTrustLock}
                onChange={setZeroTrustLock}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-xs">
                <label className="font-bold text-[#0F172A] block uppercase text-[10px]">Session Inactivity Timeout:</label>
                <select
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-white font-bold text-xs"
                >
                  <option value="15m">15 Minutes (Strict Security)</option>
                  <option value="30m">30 Minutes (Recommended)</option>
                  <option value="1h">1 Hour (Standard Workday)</option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-xs">
                <Toggle
                  label="Enforce IP Address CIDR Whitelisting"
                  description="Restrict workspace access to designated corporate VPN IP addresses."
                  checked={ipWhitelisting}
                  onChange={setIpWhitelisting}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: DATA CONTROLS & PRIVACY */}
      {activeTab === "data" && (
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2E936F]">privacy_tip</span>
                Data Privacy, Retention & Model Isolation
              </h2>
              <p className="text-xs text-[#64748B]">Zero-training model guarantees and data export policies.</p>
            </div>
            <span className="text-xs font-bold text-[#2E936F] bg-[#EFF4FF] px-2.5 py-1 rounded-full border border-[#79d9b0]/30">
              Zero Model Training Guarantee
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#EFF4FF] border border-[#79d9b0]/40 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#2E936F] font-bold text-sm">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Zero-Training Data Privacy Policy</span>
            </div>
            <p className="text-[#0F172A] leading-relaxed">
              ExecuAI guarantees that your email content, drafts, and executive communications are <span className="font-extrabold underline">never used to train public or foundational LLM models</span>. All prompt embeddings are processed in zero-retention isolated inference enclaves.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <label className="font-bold text-[#0F172A] block uppercase text-[10px]">Data Retention Period:</label>
              <select
                value={retentionPeriod}
                onChange={(e) => setRetentionPeriod(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-white font-bold text-xs"
              >
                <option value="30d">30 Days Rolling Purge</option>
                <option value="90d">90 Days Rolling Purge (Default)</option>
                <option value="1y">1 Year Audit Archive</option>
              </select>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <label className="font-bold text-[#0F172A] block uppercase text-[10px]">Workspace Export & Purge:</label>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => showToast("Exporting encrypted workspace archive JSON...")}>
                  Export Workspace Data
                </Button>
                <Button variant="danger" size="sm" onClick={() => showToast("Purged local thread cache.")}>
                  Purge Local Cache
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
