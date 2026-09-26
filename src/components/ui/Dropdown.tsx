import * as React from "react";
import { cn } from "@/lib/utils";

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeVariant?: "primary" | "danger" | "warning" | "neutral";
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = "left",
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-1 w-56 rounded-xl bg-white p-1.5 shadow-[0_10px_15px_-3px_rgba(15,23,42,0.06),0_4px_6px_-4px_rgba(15,23,42,0.04)] border border-[#CBD5E1] transition-all animate-in fade-in-50 zoom-in-95",
            align === "right" ? "right-0" : "left-0",
            className
          )}
        >
          {items.map((item) => (
            <button
              key={item.id}
              disabled={item.disabled}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left",
                item.danger
                  ? "text-[#E11D48] hover:bg-[#FFF1F2]"
                  : "text-[#0F172A] hover:bg-[#EFF4FF]",
                item.disabled && "opacity-50 pointer-events-none"
              )}
            >
              <div className="flex items-center gap-2">
                {item.icon && <span className="text-[16px]">{item.icon}</span>}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                    item.badgeVariant === "danger"
                      ? "bg-[#FFF1F2] text-[#E11D48]"
                      : item.badgeVariant === "warning"
                      ? "bg-[#FEF7E6] text-[#795600]"
                      : "bg-[#E5EEFF] text-[#0F172A]"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
