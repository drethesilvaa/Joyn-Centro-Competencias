import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import type { Account, Profile } from "next-auth";

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
    async signIn({ user }: { user: any }) {
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
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Send properties to the client
      (session as any).accessToken = token.accessToken;
      (session as any).refreshToken = token.refreshToken;
      (session as any).expiresAt = token.expiresAt;

      return session;
    },
  },
  session: {
    strategy: "jwt", // Make sure this is set
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
