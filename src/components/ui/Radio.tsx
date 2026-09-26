import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn("space-y-2.5", className)}>
      {options.map((opt) => {
        const optionId = `${name}-${opt.value}`;
        const isChecked = value === opt.value;

        return (
          <div key={opt.value} className="flex items-start gap-2.5 select-none">
            <input
              type="radio"
              id={optionId}
              name={name}
              value={opt.value}
              checked={isChecked}
              disabled={opt.disabled}
              onChange={() => onChange?.(opt.value)}
              className="w-4 h-4 text-[#2E936F] border-[#CBD5E1] focus:ring-[#2E936F] focus:ring-offset-0 cursor-pointer accent-[#2E936F] mt-0.5"
            />
            <label
              htmlFor={optionId}
              className={cn(
                "cursor-pointer text-sm leading-none",
                opt.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className="font-medium text-[#0F172A]">{opt.label}</span>
              {opt.description && (
                <p className="text-xs text-[#475569] mt-1">{opt.description}</p>
              )}
            </label>
          </div>
        );
      })}
    </div>
  );
};
