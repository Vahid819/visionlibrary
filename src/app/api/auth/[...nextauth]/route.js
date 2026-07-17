import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

import connectDB from "@/lib/db";
import UserModel from "@/models/User";

// ✅ EXPORT THIS
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        try {
          await connectDB();

          const email = credentials?.email?.trim().toLowerCase();

          const user = await UserModel.findOne({ email });

          if (!user) return null;
          if (!user.userverified) return null;

          const isMatch = await compare(credentials.password, user.password);

          if (!isMatch) return null;
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.firstname,
            library: user.libraryname,
          };
        } catch (error) {
          console.error("🚨 AUTHORIZE ERROR:", error);
          return null;
        }
      },
    }),
  ],

  // ✅ ✅ MOVE HERE (TOP LEVEL)
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.library = user.library; // ✅ FIXED
      }
      return token;
    },

    async session({ session, token }) {

      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.library = token.library; // ✅ FIXED
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
