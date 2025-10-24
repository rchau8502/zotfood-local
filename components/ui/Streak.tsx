export default function Streak({ days = 3 }: { days?: number }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ucigold to-amber-400 px-3 py-1.5 text-sm font-medium text-slate-900 ring-1 ring-black/5">
      <span aria-hidden>🔥</span>
      <span>{days} day streak</span>
    </div>
  )
}
