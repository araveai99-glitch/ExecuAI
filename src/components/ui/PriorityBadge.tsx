import * as React from "react";
import { cn } from "@/lib/utils";

export type PriorityLevel =
  | "CRITICAL"
  | "URGENT"
  | "IMPORTANT"
  | "NORMAL"
  | "LOW"
  | "SPAM";

export interface PriorityBadgeProps {
  priority: PriorityLevel;
  className?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  className,
}) => {
  const configs: Record<
    PriorityLevel,
    { label: string; styles: string; icon?: string }
  > = {
    CRITICAL: {
      label: "Critical",
      styles: "bg-[#FFF1F2] text-[#E11D48] font-bold",
      icon: "priority_high",
    },
    URGENT: {
      label: "Urgent",
      styles: "bg-[#FFF1F2] text-[#E11D48] font-semibold",
    },
    IMPORTANT: {
      label: "Important",
      styles: "bg-[#FEF7E6] text-[#795600] font-semibold",
    },
    NORMAL: {
      label: "Normal",
      styles: "bg-[#E5EEFF] text-[#475569] font-medium",
    },
    LOW: {
      label: "Low Priority",
      styles: "bg-[#F8FAFC] text-[#94A3B8] border border-[#E2E8F0] font-medium",
    },
    SPAM: {
      label: "Spam",
      styles: "bg-[#F8FAFC] text-[#94A3B8] border border-[#E2E8F0] font-medium",
    },
  };

  const config = configs[priority] || configs.NORMAL;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase transition-colors",
        config.styles,
        className
      )}
    >
      {config.icon && (
        <span className="material-symbols-outlined text-[12px]">
          {config.icon}
        </span>
      )}
      <span>{config.label}</span>
    </span>
  );
};
