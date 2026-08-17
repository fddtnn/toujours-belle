import { SignJWT, jwtVerify } from "jose";
import { env } from "./env";

const COOKIE_NAME = "tb_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function secretKey(): Uint8Array {
  return new TextEncoder().encode(env.sessionSecret);
}

/** Signed token identifying a locally-authenticated (email OTP) user. */
export async function createSessionToken(userId: number): Promise<string> {
  return new SignJWT({ uid: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secretKey());
}

export async function readSessionToken(token: string): Promise<number | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    const uid = payload.uid;
    return typeof uid === "number" ? uid : null;
  } catch {
    return null;
  }
}

function parseCookies(header: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i === -1) continue;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

/** Resolve the signed-in local user id from the request's cookies, if any. */
export async function getSessionUserId(headers: Headers): Promise<number | null> {
  const token = parseCookies(headers.get("cookie"))[COOKIE_NAME];
  if (!token) return null;
  return readSessionToken(token);
}

function isLocalhost(headers: Headers): boolean {
  const host = headers.get("host") || "";
  return host.startsWith("localhost:") || host.startsWith("127.0.0.1:");
}

function serialize(value: string, headers: Headers, maxAge: number): string {
  const localhost = isLocalhost(headers);
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    `Max-Age=${maxAge}`,
    `SameSite=${localhost ? "Lax" : "None"}`,
  ];
  if (!localhost) parts.push("Secure");
  return parts.join("; ");
}

export function setSessionCookie(res: Headers, req: Headers, token: string): void {
  res.append("set-cookie", serialize(token, req, MAX_AGE_SECONDS));
}

export function clearSessionCookie(res: Headers, req: Headers): void {
  res.append("set-cookie", serialize("", req, 0));
}
