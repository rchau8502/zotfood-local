export function Stat({
  label,
  value,
  emoji,
}: {
  label: string;
  value: string | number;
  emoji?: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200 text-center">
      <div className="text-2xl">{emoji ?? "✨"}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
    </div>
  );
}
