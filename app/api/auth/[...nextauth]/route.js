import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
        rememberMe: {},
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        const isValid =
          username === process.env.ADMIN_USER_NAME &&
          password === process.env.ADMIN_PASSWORD;
        if (isValid) {
          return { id: "admin-1", name: "Admin", role: "admin" };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // default 1 day
  },
  jwt: {
    maxAge: 60 * 60 * 24, // default 1 day
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // On first login, persist user info
      if (user) {
        token.user = user;
      }

      // Handle rememberMe from session update
      if (session?.rememberMe) {
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 48; // 48h
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
