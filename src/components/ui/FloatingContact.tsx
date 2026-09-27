"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const FloatingContact: React.FC = () => {
  const pathname = usePathname();

  // Hide on app dashboard or auth pages
  if (pathname.startsWith("/app") || pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <Link
      href="/contact"
      aria-label="Request Executive Briefing or Contact Team"
      className="fixed bottom-6 left-6 z-40 px-4 py-2.5 rounded-full bg-white/95 text-[#0F172A] border border-[#E2E8F0] shadow-lg hover:border-[#F15E1C] transition-all cursor-pointer flex items-center gap-2 text-xs font-bold hover:shadow-xl"
    >
      <span className="w-2.5 h-2.5 rounded-full bg-[#2E936F] animate-pulse" />
      <span>Executive Briefing</span>
      <span className="material-symbols-outlined text-[16px] text-[#F15E1C]">support_agent</span>
    </Link>
  );
};
