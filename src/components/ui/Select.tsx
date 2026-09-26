import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  hint?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, hint, id, ...props }, ref) => {
    const selectId = id || React.useId();

    return (
      <div className="w-full space-y-1">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#475569]"
          >
            {label}
          </label>
        )}
        <div className="relative w-full">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "w-full h-10 pl-3.5 pr-10 bg-white rounded-xl text-sm text-[#0F172A] border border-[#CBD5E1] appearance-none focus:outline-none focus:ring-2 focus:ring-[#2E936F] focus:border-transparent transition-all cursor-pointer shadow-xs disabled:opacity-50 disabled:bg-[#F8FAFC]",
              error && "border-[#E11D48] focus:ring-[#E11D48]",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[20px] pointer-events-none">
            expand_more
          </span>
        </div>
        {error ? (
          <p className="text-xs text-[#E11D48] flex items-center gap-1 font-medium mt-1">
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

Select.displayName = "Select";
