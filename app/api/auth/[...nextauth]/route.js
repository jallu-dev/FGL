import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "checkbox" },
      },
      async authorize(credentials) {
        const { username, password, rememberMe } = credentials;

        const isValid =
          username.toLocaleLowerCase() ===
            process.env.ADMIN_USER_NAME.toLocaleLowerCase() &&
          password === process.env.ADMIN_PASSWORD;

        if (isValid) {
          return {
            id: "admin-1",
            name: "Admin",
            role: "admin",
            rememberMe: rememberMe === "true" || rememberMe === true,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    // maxAge: 2 * 60 * 60, // 2 hours default (will be overridden by JWT callback)
  },
  jwt: {
    // maxAge: 2 * 60 * 60, // 2 hours default (will be overridden by JWT callback)
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // On first login, persist user info
      if (user) {
        token.user = user;
        token.role = user.role;

        // Set expiration based on rememberMe
        if (user.rememberMe) {
          // Remember me: 2 days
          token.exp = Math.floor(Date.now() / 1000) + 2 * 24 * 60 * 60;
        } else {
          // Regular session: 2 hours
          token.exp = Math.floor(Date.now() / 1000) + 2 * 60 * 60;
        }
      }

      // Handle session updates (if you're using update() method)
      if (trigger === "update" && session?.rememberMe) {
        token.exp = Math.floor(Date.now() / 1000) + 2 * 24 * 60 * 60;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user || session.user;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom login page (optional)
    error: "/login", // Redirect to login on error
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development", // Enable debug in development
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
