import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: {
          label: "Kullanıcı Adı",
          type: "text",
          placeholder: "admin",
        },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        await dbConnect();

        const user = await User.findOne({ username });

        if (!user) {
          throw new Error("Geçersiz kullanıcı adı veya şifre");
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          throw new Error("Geçersiz kullanıcı adı veya şifre");
        }

        return {
          id: user._id.toString(),
          name: user.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
