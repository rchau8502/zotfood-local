import { redirect } from "next/navigation";
import Link from "next/link";

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <Link href="/dashboard" className="text-sm text-blue-700 hover:underline">
        ← Back to Dashboard
      </Link>
    </div>
  );
}

export default function Home() {
  redirect("/dashboard");
}
