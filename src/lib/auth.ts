import { headers } from "next/headers";
import type { User } from "./types";

export async function getCurrentUser(): Promise<User | null> {
  const requestHeaders = await headers();
  const email = requestHeaders.get("x-user-email") ?? "admin@swepoke.se";
  const adminEmails = (process.env.ADMIN_EMAILS ?? "admin@swepoke.se")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  return {
    id: "dev-user-1",
    email,
    role: adminEmails.includes(email.toLowerCase()) ? "admin" : "customer",
  };
}
