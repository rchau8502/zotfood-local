import Link from "next/link"

export default function MarketingPage() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-uciblue to-indigo-700 p-10 text-white shadow-soft">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          ZotFood — Duolingo for Cooking
        </h1>
        <p className="text-white/90">
          Learn to cook with micro-lessons, budget-friendly recipes, and a pantry-matcher.
          Everything runs locally on your machine.
        </p>
        <div className="flex gap-3">
          <Link
            href="/dashboard"
            className="rounded-xl bg-white px-4 py-2.5 text-slate-900 hover:bg-white/90"
          >
            Open dashboard
          </Link>
          <Link
            href="/learn"
            className="rounded-xl bg-white/10 px-4 py-2.5 hover:bg-white/20"
          >
            Start learning
          </Link>
        </div>
      </div>
    </section>
  )
}
