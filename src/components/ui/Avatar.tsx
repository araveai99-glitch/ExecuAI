import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "offline" | "busy" | "syncing";
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  initials,
  size = "md",
  status,
  className,
  ...props
}) => {
  const getInitials = (n?: string) => {
    if (initials) return initials;
    if (!n) return "EX";
    const parts = n.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  const sizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-11 h-11 text-base",
  };

  const statusColors = {
    online: "bg-[#2E936F]",
    offline: "bg-[#94A3B8]",
    busy: "bg-[#E11D48]",
    syncing: "bg-[#FAB60A] animate-pulse",
  };

  return (
    <div className="relative inline-block shrink-0">
      <div
        className={cn(
          "rounded-full bg-[#2E936F] text-white font-semibold flex items-center justify-center overflow-hidden shadow-xs border border-white",
          sizes[size],
          className
        )}
        title={name}
        {...props}
      >
        {src ? (
          <img src={src} alt={name || "Avatar"} className="w-full h-full object-cover" />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white",
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};
