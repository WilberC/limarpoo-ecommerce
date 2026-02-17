"use server";

import { cookies } from "next/headers";
import { AUTH_URL } from "./constants";

export async function loginAction(email: string, password: string) {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    return { error: data.error || "Error al iniciar sesión" };
  }

  const cookieStore = await cookies();
  cookieStore.set("token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return { user: data.user, token: data.token };
}

export async function registerAction(email: string, password: string) {
  const res = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    return { error: data.error || "Error al registrarse" };
  }

  // Auto-login after register
  return loginAction(email, password);
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}
