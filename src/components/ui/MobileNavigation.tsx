import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface MobileNavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
}

export interface MobileNavigationProps {
  currentPath?: string;
  onNavigate?: (id: string) => void;
  className?: string;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentPath = "dashboard",
  onNavigate,
  className,
}) => {
  const items: MobileNavItem[] = [
    { id: "dashboard", label: "Home", href: "/dashboard", icon: "space_dashboard" },
    { id: "unified-inbox", label: "Inbox", href: "/inbox", icon: "move_to_inbox", badge: 14 },
    { id: "decision-center", label: "Decisions", href: "/decisions", icon: "gavel", badge: 5 },
    { id: "drafts", label: "Drafts", href: "/drafts", icon: "edit_note", badge: 3 },
    { id: "more", label: "More", href: "/settings", icon: "menu" },
  ];

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] z-50 flex items-center justify-around px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.04)] lg:hidden font-sans",
        className
      )}
    >
      {items.map((item) => {
        const isActive = currentPath === item.id || currentPath.includes(item.id);
        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => onNavigate?.(item.id)}
            className={cn(
              "flex flex-col items-center justify-center flex-1 py-1.5 text-[10px] font-semibold transition-all relative min-h-[48px] cursor-pointer",
              isActive ? "text-[#F15E1C] font-bold" : "text-[#475569] hover:text-[#0F172A]"
            )}
          >
            <div className="relative">
              <span className="material-symbols-outlined text-[22px]">
                {item.icon}
              </span>
              {item.badge !== undefined && (
                <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-[#F15E1C] text-white text-[9px] font-extrabold min-w-[15px] text-center border border-white">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

