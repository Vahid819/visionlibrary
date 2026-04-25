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
        console.log("🔥 AUTHORIZE START");

        try {
          await connectDB();
          console.log("✅ DB Connected");

          const user = await UserModel.findOne({ email: credentials.email });
          console.log("👤 User found:", user ? "YES" : "NO");
          console.log("✅ User verified:", user?.userverified);

          if (!user) return null;
          if (!user.userverified) return null;

          const isMatch = await compare(credentials.password, user.password);
          console.log("🔐 Password match:", isMatch);

          if (!isMatch) return null;

          console.log("✅ LOGIN SUCCESS");
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.firstname,
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
        // console.log("JWT USER:", user);

        token.id = user.id;
        token.email = user.email;
        token.name = user.name; // ✅ FIXED
      }
      return token;
    },

    async session({ session, token }) {
      // console.log("SESSION TOKEN:", token);

      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name; // ✅ FIXED
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
