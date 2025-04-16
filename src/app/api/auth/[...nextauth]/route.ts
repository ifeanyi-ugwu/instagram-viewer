import NextAuth from "next-auth";
import InstagramProvider from "./instagram-provider";

const handler = NextAuth({
  providers: [
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID as string,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.accessTokenExpiry = Math.floor(Date.now() / 1000 + 3600);
        token.id = profile.sub;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessTokenExpiry = token.accessTokenExpiry as number;
      session.user.id = token.id as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
