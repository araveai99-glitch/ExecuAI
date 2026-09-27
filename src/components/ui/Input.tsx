import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#475569]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3.5 text-[#94A3B8] pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full h-11 bg-white rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] border border-[#CBD5E1] transition-all focus:outline-none focus:ring-2 focus:ring-[#F15E1C]/40 focus:border-[#F15E1C] disabled:opacity-50 disabled:bg-[#F8FAFC]",
              leftIcon ? "pl-10" : "pl-3.5",
              rightIcon ? "pr-10" : "pr-3.5",
              error && "border-[#DC2626] focus:ring-[#DC2626]/40 focus:border-[#DC2626]",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-[#94A3B8] flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-[#DC2626] flex items-center gap-1 font-medium mt-1">
            <span className="material-symbols-outlined text-[14px]">error</span>
            {error}
          </p>
        ) : hint ? (
          <p className="text-xs text-[#94A3B8] mt-1">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

