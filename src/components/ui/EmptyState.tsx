import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = "verified",
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-[#FDF8F3] border border-[#F7D7B0] space-y-3 max-w-lg mx-auto my-6",
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-[#F7D7B0]/40 text-[#795600] flex items-center justify-center">
        <span className="material-symbols-outlined text-[28px]">{icon}</span>
      </div>
      <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-[#475569] max-w-sm leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="pt-2">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
