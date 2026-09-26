/**
 * ExecuAI Typography Tokens
 * Standardized on Inter font with precise line heights, letter spacings, and font weights.
 */

export const typography = {
  fontFamily: {
    sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
    mono: ["JetBrains Mono", "Menlo", "Monaco", "Consolas", "monospace"],
  },
  fontSize: {
    "headline-xl": {
      fontSize: "2.25rem", // 36px
      lineHeight: "2.75rem", // 44px
      letterSpacing: "-0.025em",
      fontWeight: "700",
    },
    "headline-xl-mobile": {
      fontSize: "1.75rem", // 28px
      lineHeight: "2.25rem", // 36px
      letterSpacing: "-0.02em",
      fontWeight: "700",
    },
    "headline-lg": {
      fontSize: "1.5rem", // 24px
      lineHeight: "2rem", // 32px
      letterSpacing: "-0.02em",
      fontWeight: "600",
    },
    "headline-md": {
      fontSize: "1.25rem", // 20px
      lineHeight: "1.75rem", // 28px
      letterSpacing: "-0.015em",
      fontWeight: "600",
    },
    "title-sm": {
      fontSize: "1rem", // 16px
      lineHeight: "1.5rem", // 24px
      letterSpacing: "-0.01em",
      fontWeight: "600",
    },
    "body-lg": {
      fontSize: "1.125rem", // 18px
      lineHeight: "1.75rem", // 28px
      letterSpacing: "-0.01em",
      fontWeight: "400",
    },
    "body-md": {
      fontSize: "0.875rem", // 14px
      lineHeight: "1.375rem", // 22px
      letterSpacing: "0",
      fontWeight: "400",
    },
    "body-sm": {
      fontSize: "0.8125rem", // 13px
      lineHeight: "1.25rem", // 20px
      letterSpacing: "0",
      fontWeight: "400",
    },
    "label-md": {
      fontSize: "0.875rem", // 14px
      lineHeight: "1.25rem", // 20px
      letterSpacing: "-0.005em",
      fontWeight: "500",
    },
    "label-sm": {
      fontSize: "0.75rem", // 12px
      lineHeight: "1rem", // 16px
      letterSpacing: "0.02em",
      fontWeight: "500",
    },
    "label-xs": {
      fontSize: "0.6875rem", // 11px
      lineHeight: "0.875rem", // 14px
      letterSpacing: "0.04em",
      fontWeight: "600",
    },
  },
} as const;
