/**
 * ExecuAI Centralized Color Tokens
 * Derived strictly from stitch_execuai_platform_design_system and executive_precision/DESIGN.md
 */

export const colors = {
  // Brand Base Palette
  primaryGreen: "#2E936F",
  primaryGreenDark: "#00694b",
  primaryGreenContainer: "#188461",
  primaryGreenLight: "#79d9b0",
  primaryGreenFixed: "#95f6cb",
  
  white: "#FFFFFF",
  
  yellowHighlight: "#FFEC69",
  yellowSurface: "#FFFDEB",
  
  orangeWarning: "#FAB60A",
  orangeWarningSurface: "#FEF7E6",
  
  softBeige: "#F7D7B0",
  softBeigeSurface: "#FDF8F3",

  // Danger / Alert Crimson
  danger: "#E11D48",
  dangerSurface: "#FFF1F2",
  dangerBorder: "#FECDD3",

  // Slate / Neutrals
  surfaceCanvas: "#F8FAFC",
  surfaceCard: "#FFFFFF",
  surfaceContainerLow: "#EFF4FF",
  surfaceContainer: "#E5EEFF",
  surfaceContainerHigh: "#DCE9FF",
  surfaceContainerHighest: "#D3E4FE",
  
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textTertiary: "#94A3B8",
  
  borderSubtle: "#E2E8F0",
  borderStrong: "#CBD5E1",
  
  // Account Provider Tokens
  providerGmail: "#EA4335",
  providerZoho: "#226BBA",
} as const;

export type ColorToken = keyof typeof colors;
