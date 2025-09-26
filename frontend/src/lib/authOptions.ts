// lib/authOptions.ts
import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

async function refreshAccessToken(token: any) {
  try {
    if (!token.refreshToken) {
      // No refresh token available; user needs to sign in again with consent
      return { ...token, error: "NoRefreshToken" as const };
    }

    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    });

    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await res.json();
    if (!res.ok) throw data;

    // Google often does NOT return refresh_token on refresh; keep the old one
    return {
      ...token,
      accessToken: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000, // ms
      refreshToken: data.refresh_token ?? token.refreshToken,
      error: undefined,
    };
  } catch (e) {
    console.error("Failed to refresh Google access token", e);
    return { ...token, error: "RefreshAccessTokenError" as const };
  }
}

const ALLOWED_DOMAINS = [
  "@fyld.pt",
  "@joyn-group.com",
  "@uniksystem.com",
  "@docdigitizer.com",
  "@infosistema.com",
  "@growin.com",
  "@growin.pt",
  "@landskill.pt",
  "@landskill.com",
];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          // Ensure we can get a refresh_token and the right scopes
          access_type: "offline",
          prompt: "consent",
          include_granted_scopes: "true",
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar.readonly",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (
        user.email &&
        ALLOWED_DOMAINS.some((domain) =>
          user?.email?.toLowerCase().endsWith(domain)
        )
      ) {
        return true;
      }
      return "/auth/signin?error=WrongDomain";
    },

    async jwt({ token, account }) {
      // Initial sign-in: stash tokens and normalize expiry to ms
      if (account) {
        (token as any).accessToken = account.access_token;
        (token as any).refreshToken = account.refresh_token; // may be undefined on subsequent logins
        // Google gives seconds since epoch in `expires_at`
        const expiresSec = (account as any).expires_at as number | undefined;
        (token as any).expiresAt = expiresSec
          ? expiresSec * 1000
          : Date.now() + ((account as any).expires_in ?? 3600) * 1000;
      }

      // If we have a token and it hasn't expired, return it
      if (
        (token as any).accessToken &&
        (token as any).expiresAt &&
        Date.now() < (token as any).expiresAt - 60_000
      ) {
        return token;
      }

      // Otherwise refresh
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      (session as any).accessToken = (token as any).accessToken;
      (session as any).refreshToken = (token as any).refreshToken;
      (session as any).expiresAt = (token as any).expiresAt;
      (session as any).error = (token as any).error;
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },

  // keep your cookie setting
  useSecureCookies: process.env.APP_ENV === "prod",
};
