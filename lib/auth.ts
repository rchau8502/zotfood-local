// lib/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (creds) => {
        if (!creds?.email || !creds?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: creds.email } });
        if (!user) return null;
        const ok = await bcrypt.compare(creds.password, user.password);
        return ok ? { id: user.id, email: user.email, name: user.displayName ?? null } : null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
