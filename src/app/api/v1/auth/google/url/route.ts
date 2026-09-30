import { NextRequest, NextResponse } from "next/server";
import { GMAIL_CONNECT_SCOPES, GOOGLE_LOGIN_SCOPES } from "@/lib/config/google-oauth";

export async function GET(req: NextRequest) {
  try {
    const flow = req.nextUrl.searchParams.get("flow") || "connect_gmail";
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
    const origin = `${protocol}://${host}`;

    const clientId =
      process.env.GOOGLE_CLIENT_ID ||
      process.env.GMAIL_CLIENT_ID ||
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      "";

    const redirectUri = `${origin}/auth/google-callback`;
    const scopes = flow === "login" ? GOOGLE_LOGIN_SCOPES : GMAIL_CONNECT_SCOPES;

    const isConfigured = Boolean(clientId && clientId.trim().length > 0);

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      clientId.trim()
    )}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=${encodeURIComponent(
      scopes
    )}&access_type=offline&prompt=consent&state=${flow}`;

    return NextResponse.json({
      success: true,
      isConfigured,
      clientId: isConfigured ? `${clientId.trim().substring(0, 12)}...` : null,
      redirectUri,
      url: authUrl,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
