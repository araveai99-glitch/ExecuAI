import * as React from "react";
import { cn } from "@/lib/utils";

export interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      className,
      value = "",
      onChange,
      onClear,
      placeholder = "Search emails, people, or topics...",
      ...props
    },
    ref
  ) => {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className={cn("relative w-full max-w-xl", className)}>
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[20px] pointer-events-none">
          search
        </span>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleTextChange}
          placeholder={placeholder}
          className="w-full h-10 pl-10 pr-9 bg-[#F8FAFC] rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] border border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#F15E1C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F15E1C]/30 transition-all shadow-xs"
          {...props}
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange?.("");
              onClear?.();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] p-0.5 rounded-full hover:bg-[#E2E8F0] transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>
    );
  }
);

Search.displayName = "Search";

