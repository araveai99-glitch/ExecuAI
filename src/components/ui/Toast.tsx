import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  id?: string;
  type?: "success" | "danger" | "warning" | "info";
  title: string;
  message?: string;
  onClose?: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  type = "info",
  title,
  message,
  onClose,
  className,
}) => {
  const configs = {
    success: {
      bg: "bg-white border-[#2E936F]",
      text: "text-[#2E936F]",
      icon: "check_circle",
    },
    danger: {
      bg: "bg-white border-[#E11D48]",
      text: "text-[#E11D48]",
      icon: "error",
    },
    warning: {
      bg: "bg-white border-[#FAB60A]",
      text: "text-[#795600]",
      icon: "warning",
    },
    info: {
      bg: "bg-white border-[#CBD5E1]",
      text: "text-[#0F172A]",
      icon: "info",
    },
  };

  const config = configs[type];

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl shadow-lg border-l-4 border-y border-r border-y-[#E2E8F0] border-r-[#E2E8F0] max-w-sm w-full bg-white transition-all animate-in slide-in-from-bottom-5",
        config.bg,
        className
      )}
      role="alert"
    >
      <span className={cn("material-symbols-outlined text-[20px] shrink-0 mt-0.5", config.text)}>
        {config.icon}
      </span>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-[#0F172A]">{title}</h4>
        {message && <p className="text-xs text-[#475569] mt-0.5">{message}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-[#94A3B8] hover:text-[#0F172A] p-0.5 rounded transition-colors"
          aria-label="Dismiss toast"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      )}
    </div>
  );
};
