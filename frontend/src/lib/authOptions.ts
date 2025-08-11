import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getPublicBaseUrl } from "@/lib/env";

const ALLOWED_DOMAINS = ["@fyld.pt", "@joyn.pt", "@techskill.pt"];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (
        user.email &&
        ALLOWED_DOMAINS.some((domain) =>
          user.email?.toLowerCase().endsWith(domain)
        )
      ) {
        return true;
      }
      return "/auth/signin?error=WrongDomain";
    },
    async jwt({ token, account }) {
      if (account) {
        (token as any).accessToken = (account as any).access_token;
        (token as any).refreshToken = (account as any).refresh_token;
        (token as any).expiresAt = (account as any).expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = (token as any).accessToken;
      (session as any).refreshToken = (token as any).refreshToken;
      (session as any).expiresAt = (token as any).expiresAt;
      return session;
    },

    // ⬇️ Force all post-auth redirects to the environment's public base URL
    async redirect({ url, baseUrl }) {
      const customBase = getPublicBaseUrl();

      if (url.startsWith(customBase)) return url;

      if (url.startsWith("/")) return `${customBase}${url}`;

      try {
        const u = new URL(url);
        const b = new URL(baseUrl);
        if (u.origin === b.origin) {
          return `${customBase}${u.pathname}${u.search}${u.hash}`;
        }
      } catch {
      }

      return customBase;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },

  // v4 tip: secure cookies in prod to avoid auth loops behind HTTPS
  useSecureCookies: process.env.APP_ENV === "prod",
};
