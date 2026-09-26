import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Synchronization Interrupted",
  description = "ExecuAI encountered a temporary connection issue. Please verify credentials or attempt reconnection.",
  actionLabel = "Retry Action",
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-[#FFF1F2] border border-[#FECDD3] space-y-3 max-w-lg mx-auto my-6",
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3] flex items-center justify-center">
        <span className="material-symbols-outlined text-[28px]">error</span>
      </div>
      <h3 className="text-base font-bold text-[#E11D48] tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-[#475569] max-w-sm leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="pt-2">
          <Button variant="danger" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
