import * as React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: "segmented" | "pills" | "underline";
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = "segmented",
  className,
}) => {
  if (variant === "segmented") {
    return (
      <div className={cn("inline-flex items-center bg-[#F8FAFC] p-1 rounded-xl shadow-inner border border-[#E2E8F0]", className)}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer min-h-[36px]",
                isActive
                  ? "bg-[#F15E1C] text-white shadow-xs font-bold"
                  : "text-[#475569] hover:text-[#0F172A]",
                tab.disabled && "opacity-50 pointer-events-none"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "px-1.5 py-0.2 rounded-full text-[10px] font-bold",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#F1F5F9] text-[#475569]"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === "pills") {
    return (
      <div className={cn("flex items-center gap-1.5 overflow-x-auto", className)}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer",
                isActive
                  ? "bg-[#F15E1C] text-white shadow-xs font-bold"
                  : "bg-[#F8FAFC] text-[#475569] hover:bg-[#FDF7F0] hover:text-[#0F172A] border border-[#E2E8F0]"
              )}
            >
              {tab.label}
              {tab.badge !== undefined && (
                <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-white/20">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-6 border-b border-[#E2E8F0]", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
            className={cn(
              "pb-2.5 text-sm font-semibold transition-all border-b-2 -mb-px cursor-pointer",
              isActive
                ? "border-[#F15E1C] text-[#F15E1C] font-bold"
                : "border-transparent text-[#475569] hover:text-[#0F172A]"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

