// import { connectDB } from "@mongodb";
import { connectdb } from "@/lib/connectdb";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, req) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter your email and password");
        }

        const db = await connectdb();
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isMatch = await compare(credentials.password, user.password);

        if (!isMatch) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const db = await connectdb();
      const user = await db
        .collection("users")
        .findOne({ email: session.user.email });

      if (user) {
        session.user.id = user._id.toString();
        session.user = { ...session.user, ...user };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
