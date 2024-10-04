import { connectDB } from "@/utils/connect";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/schema/admin";
import bcrypt from "bcrypt";
async function login(credentials) {
  try {
    connectDB();
    const user = await User.findOne({ username: credentials.username });
    if (!user) throw new Error("Wrong Credentials.");
    const isCorrect = await bcrypt.compare(credentials.password, user.password);
    if (!isCorrect) throw new Error("Wrong Credentials.");
    return user;
  } catch (error) {
    console.log("error while logging in.");
    throw new Error("Something went wrong.");
  }
}
export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        try {
          const user = await login(credentials);
          console.log({ credentials });
          return user;
        } catch (error) {
          throw new Error("Failed to login.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.id = token.id;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
