"use server";

import { signIn, signOut } from "@/lib/auth";

export async function signInAction() {
  await signIn();            // You can pass options if you want a specific callbackUrl
}

export async function signOutAction() {
  await signOut();
}
