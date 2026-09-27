import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from "./Search";
import { IconButton } from "./IconButton";
import { Avatar } from "./Avatar";

export interface HeaderProps {
  onSearch?: (query: string) => void;
  activeAccountFilter?: "ALL" | "GMAIL" | "ZOHO";
  onAccountFilterChange?: (filter: "ALL" | "GMAIL" | "ZOHO") => void;
  syncedCount?: number;
  userName?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  activeAccountFilter = "ALL",
  onAccountFilterChange,
  syncedCount = 3,
  userName = "Alexander Vance",
  className,
}) => {
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearch = (val: string) => {
    setSearchValue(val);
    onSearch?.(val);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white/90 backdrop-blur-xl z-40 border-b border-[#E2E8F0] shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-4 sm:px-6 flex items-center justify-between gap-4",
        className
      )}
    >
      {/* Left: Search Box */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <Search
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search emails, people, or topics..."
        />
      </div>

      {/* Right: Account Switches & Status & Profile */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Account Filter Segmented Control */}
        <div className="hidden sm:flex items-center p-1 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
          <button
            onClick={() => onAccountFilterChange?.("ALL")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              activeAccountFilter === "ALL"
                ? "bg-[#F15E1C] text-white shadow-xs"
                : "text-[#475569] hover:text-[#0F172A]"
            )}
          >
            All Accounts
          </button>
          <button
            onClick={() => onAccountFilterChange?.("GMAIL")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              activeAccountFilter === "GMAIL"
                ? "bg-[#EA4335] text-white shadow-xs"
                : "text-[#475569] hover:text-[#0F172A]"
            )}
          >
            Gmail
          </button>
          <button
            onClick={() => onAccountFilterChange?.("ZOHO")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              activeAccountFilter === "ZOHO"
                ? "bg-[#226BBA] text-white shadow-xs"
                : "text-[#475569] hover:text-[#0F172A]"
            )}
          >
            Zoho
          </button>
        </div>

        {/* Sync Status Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F4F0] border border-[#2E936F]/30">
          <span className="w-2 h-2 rounded-full bg-[#2E936F] animate-pulse" />
          <span className="text-xs font-semibold text-[#2E936F]">
            {syncedCount} Mailboxes Synced
          </span>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1">
          <IconButton
            variant="ghost"
            size="sm"
            ariaLabel="Notifications"
            icon={<span className="material-symbols-outlined text-[20px]">notifications</span>}
          />
          <IconButton
            variant="ghost"
            size="sm"
            ariaLabel="Security & Governance"
            icon={<span className="material-symbols-outlined text-[20px]">shield_locked</span>}
          />
        </div>

        {/* Profile Avatar */}
        <div className="pl-1 border-l border-[#E2E8F0]">
          <Avatar name={userName} size="sm" status="online" />
        </div>
      </div>
    </header>
  );
};

