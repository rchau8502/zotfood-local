import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from './db'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthConfig = {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null
        const email = String(creds.email).toLowerCase().trim()
        const restrict = process.env.RESTRICT_UCI === 'true'
        if (restrict && !email.endsWith('@uci.edu')) return null

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return null
        const ok = await bcrypt.compare(String(creds.password), user.password)
        if (!ok) return null
        return { id: user.id, email: user.email, name: user.displayName }
      }
    })
  ],
  pages: {},
}
