"use client";

import * as React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";

export default function SubscriptionExpiredPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 sm:p-6 font-sans text-[#0F172A]">
      <div className="w-full max-w-lg bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-xl space-y-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-[#FEF2F2] text-[#DC2626] font-bold flex items-center justify-center mx-auto border border-[#FCA5A5]/40 shadow-xs">
          <span className="material-symbols-outlined text-[32px]">lock_reset</span>
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-[#FEF2F2] text-[#DC2626] text-xs font-bold uppercase tracking-wider border border-[#FCA5A5]/30">
            Subscription Required
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0F172A] tracking-tight">
            Portal Access Suspended
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            The 14-day trial or active subscription for <strong className="text-[#0F172A]">{user?.email || "your account"}</strong> has expired or requires administrative clearance.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F172A] space-y-2 text-left">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
            <span className="font-bold text-[#64748B] uppercase text-[10px]">Account Email:</span>
            <span className="font-mono text-[#F15E1C] font-bold">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
            <span className="font-bold text-[#64748B] uppercase text-[10px]">Current Plan:</span>
            <span className="font-bold text-[#0F172A]">{user?.subscription?.plan || "14-Day Trial"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#64748B] uppercase text-[10px]">Access Status:</span>
            <span className="font-bold text-[#DC2626]">Restricted by Admin / Expired</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Link href="/pricing" className="w-full block">
            <Button variant="primary" size="md" className="w-full">
              Upgrade Subscription Plan →
            </Button>
          </Link>

          <Link href="/admin" className="w-full block">
            <Button variant="secondary" size="md" className="w-full">
              Open Admin Console (Manage Licenses)
            </Button>
          </Link>

          <button
            type="button"
            onClick={logout}
            className="text-xs font-bold text-[#64748B] hover:text-[#0F172A] cursor-pointer pt-1"
          >
            Sign out of workspace
          </button>
        </div>
      </div>
    </div>
  );
}
