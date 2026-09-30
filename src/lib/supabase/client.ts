import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getSupabaseAuthClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || supabaseUrl;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || supabaseAnonKey;
  return createClient(url, key);
}

/**
 * Supabase Google OAuth helper with full Gmail scopes and offline refresh token request.
 */
export async function signInWithSupabaseGoogleOAuth(flow: "login" | "connect_gmail" = "connect_gmail") {
  const client = getSupabaseAuthClient();
  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

  const scopes =
    flow === "connect_gmail"
      ? "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.readonly"
      : "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

  const { data, error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      scopes,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `${origin}/auth/callback`,
    },
  });

  return { data, error };
}
