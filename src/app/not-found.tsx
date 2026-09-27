import * as React from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <PublicHeader />

      <main id="main-content" className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full text-center space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#E2E8F0] shadow-sm">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF2EC] text-[#F15E1C] text-xs font-extrabold border border-[#F15E1C]/30">
            <span className="w-2 h-2 rounded-full bg-[#F15E1C] animate-pulse" />
            HTTP 404 — PAGE NOT FOUND
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] font-heading tracking-tight">
              Lost in the Executive Pipeline?
            </h1>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-md mx-auto">
              The requested route or resource does not exist or has been moved to a new destination under our workspace architecture.
            </p>
          </div>

          {/* Recovery Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto">
                Return to Homepage
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto">
                Contact Executive Support
              </Button>
            </Link>
          </div>

          {/* Popular Destinations */}
          <div className="pt-6 border-t border-[#E2E8F0] text-left">
            <div className="text-xs font-bold uppercase text-[#94A3B8] tracking-wider mb-3 text-center">
              Popular Quick Links
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-center">
              <Link href="/features" className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] hover:border-[#F15E1C]/40 transition-colors">
                Features
              </Link>
              <Link href="/security" className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] hover:border-[#2E936F]/40 transition-colors">
                Security
              </Link>
              <Link href="/pricing" className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] hover:border-[#F15E1C]/40 transition-colors">
                Pricing
              </Link>
              <Link href="/how-it-works" className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] hover:border-[#2E936F]/40 transition-colors">
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
