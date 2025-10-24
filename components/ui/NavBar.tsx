"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signInAction, signOutAction } from "@/app/actions/auth";
import { useSession } from "next-auth/react";

const tabs = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/learn", label: "Learn" },
  { href: "/recipes", label: "Recipes" },
  { href: "/pantry", label: "Pantry" },
];

export default function NavBar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="font-semibold text-lg">
          ZotFood
        </Link>

        <nav className="flex gap-4 text-sm">
          {tabs.map(t => {
            const active = pathname.startsWith(t.href);
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`rounded-md px-3 py-2 ${active ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : session ? (
            <>
              <span className="text-sm text-gray-700">
                Welcome, {session.user?.name || session.user?.email}
              </span>
              <form action={signOutAction}>
                <button className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <form action={signInAction}>
              <button className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50">
                Sign in
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
