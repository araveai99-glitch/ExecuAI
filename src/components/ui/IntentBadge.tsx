import * as React from "react";
import { cn } from "@/lib/utils";

export type IntentCategory =
  | "LEGAL"
  | "FINANCE"
  | "CLIENT"
  | "SALES"
  | "VENDOR"
  | "HR"
  | "MEETING"
  | "SUPPORT"
  | "INTERNAL"
  | "NEWSLETTER"
  | "PERSONAL"
  | "OTHER";

export interface IntentBadgeProps {
  intent: IntentCategory | string;
  className?: string;
  size?: "sm" | "md";
}

export const IntentBadge: React.FC<IntentBadgeProps> = ({
  intent,
  className,
  size = "md",
}) => {

  const formattedLabel = String(intent).replace("_", " ");

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-sm bg-[#EFF4FF] text-[#475569] text-[10px] font-bold uppercase tracking-wider border border-[#E2E8F0]",
        className
      )}
    >
      {formattedLabel}
    </span>
  );
};
