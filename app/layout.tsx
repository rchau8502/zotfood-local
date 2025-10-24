import "./globals.css"
import Link from "next/link"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {/* Top bar */}
        <header className="bg-uciblue text-white shadow-soft">
          <div className="container flex items-center justify-between py-4">
            <Link href="/" className="font-semibold tracking-tight text-lg">
              ZotFood
            </Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/dashboard" className="hover:text-ucigold">Dashboard</Link>
              <Link href="/learn" className="hover:text-ucigold">Learn</Link>
              <Link href="/recipes" className="hover:text-ucigold">Recipes</Link>
              <Link href="/pantry" className="hover:text-ucigold">Pantry</Link>
              <Link href="/api/auth/signin" className="rounded-md bg-white/10 px-3 py-1.5 hover:bg-white/20">
                Sign in
              </Link>
            </nav>
          </div>
        </header>

        {/* Page container */}
        <main className="container py-8">{children}</main>

        <footer className="py-8 text-center text-xs text-slate-500">
          Built for UCI — runs locally, no external APIs.
        </footer>
      </body>
    </html>
  )
}
