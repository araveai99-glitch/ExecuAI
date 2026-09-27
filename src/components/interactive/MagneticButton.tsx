"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "green" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
}

export function MagneticButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  icon,
}: MagneticButtonProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Pull intensity factor (0.2 = subtle magnetic pull)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary:
      "bg-[#f15e1c] text-white hover:bg-[#d84c0e] shadow-lg shadow-[#f15e1c]/25 border border-transparent hover:shadow-xl hover:shadow-[#f15e1c]/40",
    green:
      "bg-[#2e936f] text-white hover:bg-[#24785a] shadow-lg shadow-[#2e936f]/25 border border-transparent hover:shadow-xl hover:shadow-[#2e936f]/40",
    secondary:
      "bg-white text-[#0F172A] border border-[#E2E8F0] hover:border-[#f15e1c]/40 hover:bg-[#F8FAFC] shadow-xs",
    outline:
      "bg-transparent text-[#f15e1c] border-2 border-[#f15e1c] hover:bg-[#f15e1c] hover:text-white shadow-xs",
  };

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs font-bold rounded-xl gap-1.5 min-h-[38px]",
    md: "px-5 py-2.5 text-xs font-bold rounded-xl gap-2 min-h-[44px]",
    lg: "px-7 py-3.5 text-sm font-extrabold rounded-2xl gap-2.5 min-h-[52px]",
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.5 }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex items-center justify-center font-heading transition-colors cursor-pointer select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <motion.span
            className="inline-block transition-transform duration-200 group-hover:translate-x-1"
          >
            {icon}
          </motion.span>
        )}
      </span>

      {/* Subtle shine overlay */}
      <span className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.button>
  );
}
