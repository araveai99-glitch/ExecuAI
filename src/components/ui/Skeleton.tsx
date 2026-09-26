import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "card" | "circle" | "badge";
  width?: string | number;
  height?: string | number;
  radius?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "text",
  width,
  height,
  radius,
  style,
  ...props
}) => {
  const baseStyles = "animate-pulse bg-[#E2E8F0]/70 rounded-md";

  const variants = {
    text: "h-4 w-full",
    card: "h-24 w-full rounded-xl",
    circle: "h-9 w-9 rounded-full",
    badge: "h-5 w-16 rounded-full",
  };

  const customStyle: React.CSSProperties = {
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
    ...(radius !== undefined && { borderRadius: radius }),
    ...style,
  };

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      style={customStyle}
      {...props}
    />
  );
};

