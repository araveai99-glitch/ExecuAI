import * as React from "react";
import { cn } from "@/lib/utils";

export interface LoadingStateProps {
  label?: string;
  sublabel?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  label = "AI Engine Analyzing Communications...",
  sublabel = "Evaluating priority, intent, and safety parameters",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center space-y-3 font-sans",
        className
      )}
    >
      <div className="relative flex items-center justify-center w-12 h-12">
        <span className="w-12 h-12 rounded-full border-2 border-[#FFF2EC] border-t-[#F15E1C] animate-spin" />
        <span className="material-symbols-outlined absolute text-[#F15E1C] text-[20px]">
          psychology
        </span>
      </div>
      <h4 className="text-sm font-bold text-[#0F172A] tracking-tight mt-2">
        {label}
      </h4>
      {sublabel && <p className="text-xs text-[#94A3B8] max-w-xs">{sublabel}</p>}
    </div>
  );
};

