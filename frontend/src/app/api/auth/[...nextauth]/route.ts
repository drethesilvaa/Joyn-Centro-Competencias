import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ALLOWED_DOMAINS = ["@fyld.pt", "@joyn.pt", "@techskill.pt"];

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
  },
  pages: {
    signIn: "/auth/signin",
  },
});

export { handler as GET, handler as POST };
