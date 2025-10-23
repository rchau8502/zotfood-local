import './globals.css'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="w-full border-b bg-[color:var(--uci-blue)] text-white">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-4">
            <Link href="/" className="font-bold">ZotFood</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/pantry">Pantry</Link>
              <Link href="/recipes">Recipes</Link>
              <Link href="/learn">Learn</Link>
              <Link href="/submit">Submit</Link>
              <Link href="/admin">Admin</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      </body>
    </html>
  )
}
