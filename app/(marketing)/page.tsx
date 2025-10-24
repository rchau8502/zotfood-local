
import Link from "next/link";

function Card(props: { href: string; title: string; desc: string }) {
  return (
    <Link href={props.href} className="rounded-xl border p-5 hover:shadow focus:outline-none focus:ring">
      <h3 className="text-lg font-semibold">{props.title}</h3>
      <p className="mt-1 text-sm text-gray-600">{props.desc}</p>
    </Link>
  );
}

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ZotFood — Duolingo for Cooking</h1>
      <p className="mt-3 text-gray-700">
        Learn to cook with quick student-friendly recipes, streaks, and micro-lessons. Everything runs locally.
      </p>

      <ul className="mt-6 list-disc pl-6 text-gray-700">
        <li>Local SQLite database</li>
        <li>Filesystem uploads</li>
        <li>No external APIs</li>
      </ul>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card href="/dashboard" title="Dashboard" desc="See streaks and suggested actions." />
        <Card href="/learn"     title="Learn"     desc="Micro-lessons to build skills fast." />
        <Card href="/recipes"   title="Recipes"   desc="Browse, search, and save recipes." />
        <Card href="/pantry"    title="Pantry"    desc="Track ingredients you have on hand." />
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Demo login: <code>demo@uci.edu</code> / <code>password123</code>
      </p>
    </div>
  );
}
