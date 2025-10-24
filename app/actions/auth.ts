"use server";

import { signIn, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn(undefined, { callbackUrl: "/dashboard" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
