type Env = Record<string, string | undefined>;

function getProcessEnv(): Env {
  if (typeof process === "undefined") {
    return {};
  }

  return process.env;
}

function firstDefined(...values: Array<string | undefined>): string | undefined {
  return values.find((value) => typeof value === "string" && value.length > 0);
}

export function getSupabaseUrl(): string | undefined {
  const env = getProcessEnv();
  return firstDefined(import.meta.env.VITE_SUPABASE_URL, env.VITE_SUPABASE_URL, env.SUPABASE_URL);
}

export function getSupabasePublishableKey(): string | undefined {
  const env = getProcessEnv();
  return firstDefined(
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    env.VITE_SUPABASE_PUBLISHABLE_KEY,
    env.SUPABASE_PUBLISHABLE_KEY,
  );
}

export function getSupabaseServiceRoleKey(): string | undefined {
  return getProcessEnv().SUPABASE_SERVICE_ROLE_KEY;
}

export function formatMissingSupabaseEnvMessage(missing: string[]): string {
  return `Missing Supabase environment variable(s): ${missing.join(
    ", ",
  )}. Add them to your deployment environment (for Vercel, set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY; server-only admin code also needs SUPABASE_SERVICE_ROLE_KEY).`;
}
