
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
            <Link href="/" className="font-semibold">ZotFood</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/learn">Learn</Link>
            <Link href="/recipes">Recipes</Link>
            <Link href="/pantry">Pantry</Link>
            <a href="/api/auth/signin" className="ml-auto">Sign in</a>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
