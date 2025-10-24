export function Card({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`rounded-2xl bg-white shadow-md ring-1 ring-black/5 ${className || ""}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-slate-100 p-5">
      <h3 className="text-base font-semibold">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
}

export function CardBody({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`p-5 ${className || ""}`}>{children}</div>;
}
