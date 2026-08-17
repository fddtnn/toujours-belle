import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

function optional(name: string, fallback = ""): string {
  return process.env[name] ?? fallback;
}

export const env = {
  isProduction: process.env.NODE_ENV === "production",

  // Required: the app cannot serve accounts without a database.
  databaseUrl: required("DATABASE_URL"),

  // Signs session cookies. Required in production so sessions can't be forged.
  sessionSecret: required("SESSION_SECRET"),

  // Email delivery for one-time sign-in codes. Without a key the code is
  // logged to the server console instead (fine for local development).
  resendApiKey: optional("RESEND_API_KEY"),
  mailFrom: optional("MAIL_FROM", "Toujours Belle <onboarding@resend.dev>"),

  // Kimi OAuth is optional. Set all four to re-enable "Sign in with Kimi";
  // when they are absent the app falls back to email sign-in only.
  appId: optional("APP_ID"),
  appSecret: optional("APP_SECRET"),
  kimiAuthUrl: optional("KIMI_AUTH_URL"),
  kimiOpenUrl: optional("KIMI_OPEN_URL"),
  ownerUnionId: optional("OWNER_UNION_ID"),
};

export const kimiEnabled = Boolean(
  env.appId && env.appSecret && env.kimiAuthUrl && env.kimiOpenUrl,
);
