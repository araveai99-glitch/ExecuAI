import { NextRequest, NextResponse } from "next/server";
import { signUserId, getCanonicalUserId } from "@/lib/server/auth-session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, email } = body;

    if (!userId || typeof userId !== "string" || !userId.trim()) {
      return NextResponse.json(
        { success: false, error: "Valid userId is required to set session" },
        { status: 400 }
      );
    }

    const cleanUserId = userId.trim();
    const signedValue = signUserId(cleanUserId);
    const isProd = process.env.NODE_ENV === "production";

    console.log(`[AUTH SESSION API] Establishing server-authenticated session for userId: ${cleanUserId} (HttpOnly: true, Secure: ${isProd}, SameSite: Lax)`);

    const response = NextResponse.json({
      success: true,
      userId: cleanUserId,
      email: email || null,
      message: "Server session cookie established successfully.",
    });

    response.cookies.set("execuai_user_id", signedValue, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error: any) {
    console.error("[AUTH SESSION API ERROR]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const canonicalUserId = getCanonicalUserId(req);
    if (!canonicalUserId) {
      return NextResponse.json(
        { success: false, authenticated: false, userId: null },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      userId: canonicalUserId,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Server session cookie cleared.",
    });

    response.cookies.set("execuai_user_id", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
