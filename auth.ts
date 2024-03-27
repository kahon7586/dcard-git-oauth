import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { adminList } from "./app/data/admin";

// callback will tirgger before being called,
// so you can modify data such as session, token from argument then return it

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      account(account) {
        return {
          access_token: account.access_token,
        };
        // this returned value will be the callback parameter in jwt
      },
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      authorization: {
        params: {
          scope: "repo",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token; // this returned token will be the callback parameter in session callback
    },
    async session({ token, session }) {
      if (token.accessToken && session.user) {
        session.user.accessToken = token.accessToken as string;
        // set token value in session

        const userName = session.user.name as string;
        session.user.role = adminList.includes(userName) ? "admin" : "user";
        // set user role in session
      }

      return session; // this session will be returned when calling auth() in server side
    },
  },
  trustHost: true,
});
