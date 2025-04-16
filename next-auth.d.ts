import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessTokenExpiry: number;
    user: User;
  }

  interface User extends DefaultUser {
    id: string;
  }
}
