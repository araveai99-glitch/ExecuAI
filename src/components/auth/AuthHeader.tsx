import * as React from "react";
import Link from "next/link";

export const AuthHeader: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-8 flex items-center justify-between border-b border-[#E2E8F0] bg-white">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-[#F15E1C] text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
          E
        </div>
        <span className="text-xl font-heading font-extrabold tracking-tight text-[#0F172A]">
          ExecuAI
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFF2EC] text-[#F15E1C] border border-[#FDE8DF] hidden sm:inline-block">
          SaaS Assistant
        </span>
      </Link>
      <div className="flex items-center gap-2 text-xs text-[#475569]">
        <span className="material-symbols-outlined text-[#2E936F] text-[18px]">lock</span>
        <span className="font-semibold text-[#0F172A]">256-Bit Encrypted Workspace</span>
      </div>
    </header>
  );
};

