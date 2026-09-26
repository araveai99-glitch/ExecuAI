import * as React from "react";
import { cn } from "@/lib/utils";
import { PriorityBadge, PriorityLevel } from "./PriorityBadge";
import { RiskBadge, RiskLevel } from "./RiskBadge";
import { IntentBadge, IntentCategory } from "./IntentBadge";

export interface EmailCardProps extends React.HTMLAttributes<HTMLDivElement> {
  provider: "GMAIL" | "ZOHO";
  accountEmail: string;
  senderName: string;
  subject: string;
  snippet: string;
  timestamp: string;
  priority: PriorityLevel;
  intent: IntentCategory | string;
  risk: RiskLevel;
  isSelected?: boolean;
  isUnread?: boolean;
}

export const EmailCard: React.FC<EmailCardProps> = ({
  provider,
  accountEmail,
  senderName,
  subject,
  snippet,
  timestamp,
  priority,
  intent,
  risk,
  isSelected = false,
  isUnread = false,
  className,
  onClick,
  ...props
}) => {
  const providerLabel = provider === "GMAIL" ? "G" : "Z";

  return (
    <article
      onClick={onClick}
      className={cn(
        "p-4 rounded-xl bg-white shadow-xs cursor-pointer transition-all duration-200 border relative hover:shadow-md",
        isSelected
          ? "border-[#2E936F] bg-[#EFF4FF]/30 ring-1 ring-[#2E936F]"
          : "border-[#E2E8F0] hover:border-[#CBD5E1]",
        isUnread && "font-medium",
        className
      )}
      {...props}
    >
      {/* Left indicator rail for High Risk / Critical */}
      {priority === "CRITICAL" || risk === "HIGH_RISK" ? (
        <div className="w-1.5 absolute left-0 top-3 bottom-3 bg-[#E11D48] rounded-r" />
      ) : risk === "REVIEW_REQUIRED" ? (
        <div className="w-1.5 absolute left-0 top-3 bottom-3 bg-[#FAB60A] rounded-r" />
      ) : null}

      <div className="flex items-start justify-between gap-2 mb-1.5 pl-1">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-1.5 py-0.5 rounded bg-[#E5EEFF] text-[#0F172A] text-[10px] font-bold">
            {providerLabel}
          </span>
          <span className="text-xs text-[#475569] truncate max-w-[140px]">
            {accountEmail}
          </span>
          <span className="text-[#94A3B8]">•</span>
          <span className="text-xs font-semibold text-[#0F172A] truncate">
            {senderName}
          </span>
        </div>
        <span className="text-xs text-[#475569] shrink-0 font-medium">
          {timestamp}
        </span>
      </div>

      <div className="pl-1">
        <h3 className="text-sm font-semibold text-[#0F172A] truncate">
          {subject}
        </h3>
        <p className="text-xs text-[#475569] line-clamp-2 mt-1 leading-snug">
          {snippet}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2 pl-1 border-t border-[#F8FAFC]">
        <PriorityBadge priority={priority} />
        <IntentBadge intent={intent} />
        <RiskBadge risk={risk} showIcon={false} />
      </div>
    </article>
  );
};
