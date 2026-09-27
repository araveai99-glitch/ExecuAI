"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "orange" | "green" | "yellow" | "peach";
  tiltMaxAngle?: number;
  scaleOnHover?: number;
}

export function TiltCard({
  children,
  className = "",
  glowColor = "orange",
  tiltMaxAngle = 12,
  scaleOnHover = 1.02,
}: TiltCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Motion values for tilt angles
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid 3D tilt movement
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltMaxAngle, -tiltMaxAngle]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltMaxAngle, tiltMaxAngle]), {
    stiffness: 250,
    damping: 25,
  });

  // Spotlight position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    // Relative mouse position normalized between -0.5 and 0.5
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glowColorMap = {
    orange: "rgba(241, 94, 28, 0.18)",
    green: "rgba(46, 147, 111, 0.18)",
    yellow: "rgba(250, 182, 10, 0.18)",
    peach: "rgba(247, 215, 176, 0.35)",
  };

  const borderColorMap = {
    orange: "hover:border-[#f15e1c]/40",
    green: "hover:border-[#2e936f]/40",
    yellow: "hover:border-[#fab60a]/40",
    peach: "hover:border-[#f7d7b0]",
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: scaleOnHover }}
      transition={{ duration: 0.2 }}
      className={`relative rounded-2xl bg-white/90 backdrop-blur-md border border-[#E2E8F0] shadow-sm transition-shadow duration-300 ${borderColorMap[glowColor]} ${className}`}
    >
      {/* Dynamic Cursor Spotlight Radial Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${glowColorMap[glowColor]}, transparent 80%)`,
        }}
      />

      {/* Content wrapper with preserve-3d offset */}
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}
