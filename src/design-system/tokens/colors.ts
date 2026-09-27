/**
 * ExecuAI Centralized Color Tokens
 * Derived strictly from the approved brand color palette design document:
 * - Primary Orange: #f15e1c
 * - Green: #2e936f
 * - White: #ffffff
 * - Light Yellow: #ffec69
 * - Golden Yellow: #fab60a
 * - Light Peach: #f7d7b0
 */

export const colors = {
  // APPROVED BRAND PALETTE
  primaryOrange: "#F15E1C",
  primaryOrangeHover: "#D84C0E",
  primaryOrangeLight: "#FDE8DF",
  primaryOrangeContainer: "#FFF2EC",

  primaryGreen: "#2E936F",
  primaryGreenHover: "#24785A",
  primaryGreenLight: "#E8F4F0",
  primaryGreenContainer: "#188461",

  white: "#FFFFFF",

  lightYellow: "#FFEC69",
  lightYellowSurface: "#FFFDE6",

  goldenYellow: "#FAB60A",
  goldenYellowSurface: "#FEF6E0",

  lightPeach: "#F7D7B0",
  lightPeachSurface: "#FDF7F0",

  // Danger / Alert Crimson (for security/critical flags only)
  danger: "#DC2626",
  dangerSurface: "#FEF2F2",
  dangerBorder: "#FCA5A5",

  // Slate / Neutrals (UI structure & typography)
  surfaceCanvas: "#F8FAFC",
  surfaceCard: "#FFFFFF",
  surfaceContainerLow: "#F1F5F9",
  surfaceContainer: "#E2E8F0",
  surfaceContainerHigh: "#CBD5E1",

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

