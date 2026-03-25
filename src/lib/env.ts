export const requiredKeys = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY"
] as const;

type RequiredKey = (typeof requiredKeys)[number];

export function getEnv() {
  const env = process.env;

  const missing = requiredKeys.filter((key) => !env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  return env as NodeJS.ProcessEnv & Record<RequiredKey, string>;
}
