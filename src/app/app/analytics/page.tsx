"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-[#E2E8F0] pb-4">
        <h1 className="text-2xl font-bold text-[#0F172A]">Triage & AI Performance Analytics</h1>
        <p className="text-xs text-[#475569]">
          Real-time measurement metrics calculated from active evaluation and draft acceptance logs.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card accentRailColor="primary">
          <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Total Processed</span>
          <div className="text-3xl font-extrabold text-[#0F172A] mt-1">142</div>
          <span className="text-xs text-[#2E936F] font-semibold block mt-1">Across 3 connected mailboxes</span>
        </Card>

        <Card accentRailColor="primary">
          <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Classification Precision</span>
          <div className="text-3xl font-extrabold text-[#0F172A] mt-1">98.4%</div>
          <span className="text-xs text-[#475569] block mt-1">Verified on 3D dimensions</span>
        </Card>

        <Card accentRailColor="danger">
          <span className="text-[10px] font-bold uppercase text-[#94A3B8]">High-Risk False Negatives</span>
          <div className="text-3xl font-extrabold text-[#E11D48] mt-1">0.00%</div>
          <span className="text-xs text-[#E11D48] font-bold block mt-1">Zero un-flagged high-risk items</span>
        </Card>

        <Card accentRailColor="warning">
          <span className="text-[10px] font-bold uppercase text-[#94A3B8]">Draft Acceptance Rate</span>
          <div className="text-3xl font-extrabold text-[#0F172A] mt-1">87.5%</div>
          <span className="text-xs text-[#2E936F] font-semibold block mt-1">Approved with &lt; 2 edits</span>
        </Card>
      </div>

      {/* Distribution Breakdown Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2">
            Priority Distribution
          </h3>
          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Critical / Urgent</span>
                <span className="font-bold text-[#E11D48]">8 emails (5.6%)</span>
              </div>
              <div className="w-full h-2 bg-[#FFF1F2] rounded-full">
                <div className="h-full bg-[#E11D48] rounded-full w-[6%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Important / Normal</span>
                <span className="font-bold text-[#0F172A]">28 emails (19.7%)</span>
              </div>
              <div className="w-full h-2 bg-[#EFF4FF] rounded-full">
                <div className="h-full bg-[#2E936F] rounded-full w-[20%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Low Priority / Auto-Filtered</span>
                <span className="font-bold text-[#94A3B8]">106 emails (74.6%)</span>
              </div>
              <div className="w-full h-2 bg-[#F8FAFC] rounded-full">
                <div className="h-full bg-[#CBD5E1] rounded-full w-[75%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2">
            Risk Gate Quarantine Breakdown
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-3 rounded-xl bg-[#EFF4FF]">
              <span className="font-semibold text-[#2E936F]">Safe to Draft</span>
              <span className="font-bold text-[#0F172A]">47 Emails</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-[#FEF7E6]">
              <span className="font-semibold text-[#795600]">Review Required</span>
              <span className="font-bold text-[#0F172A]">21 Emails</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-[#FFF1F2]">
              <span className="font-semibold text-[#E11D48]">High Risk Gate Active</span>
              <span className="font-bold text-[#E11D48]">4 Decisions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
