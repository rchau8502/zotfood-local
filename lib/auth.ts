// lib/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

const credentials = CredentialsProvider({
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(creds) {
    const email =
      typeof creds?.email === "string" ? creds.email.trim().toLowerCase() : "";
    const password =
      typeof creds?.password === "string" ? creds.password : "";

    if (!email || !password) return null;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const ok = await bcrypt.compare(password, user.password);
    return ok
      ? { id: user.id, email: user.email, name: user.displayName ?? null }
      : null;
  },
});

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [credentials],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/api/auth/signin",
    signOut: "/",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // After sign out, redirect to home page
      if (url === baseUrl + "/api/auth/signout") {
        return baseUrl;
      }
      // After sign in, redirect to dashboard
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl + "/dashboard";
    },
  },
});
