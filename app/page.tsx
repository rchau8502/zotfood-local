// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold">ZotFood — Duolingo for Cooking</h1>

      <ul className="list-disc pl-6 text-sm">
        <li>Local SQLite database</li>
        <li>Filesystem uploads</li>
        <li>No external APIs</li>
      </ul>

      <nav className="flex gap-3">
        <Link href="/dashboard" className="rounded border px-3 py-2">Dashboard</Link>
        <Link href="/learn" className="rounded border px-3 py-2">Learn</Link>
        <Link href="/recipes" className="rounded border px-3 py-2">Recipes</Link>
        <Link href="/pantry" className="rounded border px-3 py-2">Pantry</Link>
      </nav>
    </main>
  );
}
