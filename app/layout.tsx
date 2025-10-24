import "./globals.css"
import Link from "next/link"
import NavBar from "@/components/ui/NavBar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <SessionProvider>
          <NavBar />
          <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}


