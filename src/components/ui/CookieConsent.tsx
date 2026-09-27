"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "./Button";

export const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [preferences, setPreferences] = React.useState({
    essential: true, // always required
    preferences: true,
    analytics: false,
  });

  React.useEffect(() => {
    const consent = localStorage.getItem("execuai_cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent = { essential: true, preferences: true, analytics: true };
    localStorage.setItem("execuai_cookie_consent", JSON.stringify(fullConsent));
    setShowBanner(false);
    setShowModal(false);
  };

  const handleEssentialOnly = () => {
    const essentialConsent = { essential: true, preferences: false, analytics: false };
    localStorage.setItem("execuai_cookie_consent", JSON.stringify(essentialConsent));
    setShowBanner(false);
    setShowModal(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("execuai_cookie_consent", JSON.stringify(preferences));
    setShowBanner(false);
    setShowModal(false);
  };

  if (!showBanner && !showModal) return null;

  return (
    <>
      {/* Floating Bottom Cookie Banner */}
      {showBanner && !showModal && (
        <div
          role="region"
          aria-label="Cookie Privacy Controls"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-white/95 backdrop-blur-xl border border-[#E2E8F0] p-5 rounded-2xl shadow-xl space-y-3"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F15E1C]" />
            <h4 className="text-sm font-bold text-[#0F172A] font-heading">
              Privacy & Security Controls
            </h4>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed">
            We use essential cookies for secure authentication and optional telemetry cookies for workspace performance. We do <strong>not</strong> use advertising tracking cookies. Read our{" "}
            <Link href="/cookies" className="text-[#F15E1C] underline font-semibold">
              Cookie Policy
            </Link>
            .
          </p>
          <div className="flex items-center gap-2 pt-1">
            <Button variant="primary" size="sm" onClick={handleAcceptAll} className="flex-1">
              Accept All
            </Button>
            <Button variant="secondary" size="sm" onClick={handleEssentialOnly} className="flex-1">
              Essential Only
            </Button>
            <button
              onClick={() => setShowModal(true)}
              className="text-xs text-[#64748B] hover:text-[#0F172A] underline font-semibold px-2 cursor-pointer"
            >
              Preferences
            </button>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-[#E2E8F0]">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <h3 className="text-lg font-bold text-[#0F172A] font-heading">
                Customize Cookie Preferences
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#94A3B8] hover:text-[#0F172A] cursor-pointer"
                aria-label="Close Modal"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#0F172A]">Essential Security Cookies</div>
                  <div className="text-[#64748B] text-[11px]">Required for authentication and CSRF token protection.</div>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#2E936F] bg-[#E8F4F0] px-2 py-1 rounded">Required</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#0F172A]">Workspace Preferences</div>
                  <div className="text-[#64748B] text-[11px]">Remembers Safety Gate thresholds and UI layout state.</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.preferences}
                  onChange={(e) => setPreferences({ ...preferences, preferences: e.target.checked })}
                  className="accent-[#F15E1C] w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#0F172A]">Anonymous Performance Telemetry</div>
                  <div className="text-[#64748B] text-[11px]">Measures latency & error rates without personal data.</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="accent-[#F15E1C] w-4 h-4 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="secondary" size="sm" onClick={handleEssentialOnly}>
                Reject Non-Essential
              </Button>
              <Button variant="primary" size="sm" onClick={handleSavePreferences}>
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
