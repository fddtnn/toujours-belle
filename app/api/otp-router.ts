import { z } from "zod";
import { randomInt } from "node:crypto";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { otpCodes, localUsers } from "@db/schema";
import { eq, and, gt } from "drizzle-orm";
import { sendOtpEmail } from "./lib/mailer";
import {
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  getSessionUserId,
} from "./lib/session";

function generateOtp(): string {
  // crypto RNG - Math.random() is predictable and this code grants account access
  return randomInt(0, 1_000_000).toString().padStart(6, "0");
}

export const otpRouter = createRouter({
  // Send OTP to email
  sendOtp: publicQuery
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const code = generateOtp();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Mark any existing unused codes for this email as used
      await db
        .update(otpCodes)
        .set({ used: true })
        .where(and(eq(otpCodes.email, input.email), eq(otpCodes.used, false)));

      // Insert new OTP code
      await db.insert(otpCodes).values({
        email: input.email,
        code,
        expiresAt,
      });

      await sendOtpEmail(input.email, code);

      return { success: true, message: "OTP sent successfully" };
    }),

  // Verify OTP and create/sign in user
  verifyOtp: publicQuery
    .input(
      z.object({
        email: z.string().email(),
        code: z.string().length(6),
        name: z.string().optional(),
        emailNewsOffers: z.boolean().default(false),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const now = new Date();

      // Find valid OTP
      const [otpRecord] = await db
        .select()
        .from(otpCodes)
        .where(
          and(
            eq(otpCodes.email, input.email),
            eq(otpCodes.code, input.code),
            eq(otpCodes.used, false),
            gt(otpCodes.expiresAt, now)
          )
        )
        .limit(1);

      if (!otpRecord) {
        return { success: false, message: "Invalid or expired OTP code" };
      }

      // Mark OTP as used
      await db
        .update(otpCodes)
        .set({ used: true })
        .where(eq(otpCodes.id, otpRecord.id));

      // Find or create local user
      const [existingUser] = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.email, input.email))
        .limit(1);

      let userId: number;

      if (existingUser) {
        // Update last sign in
        await db
          .update(localUsers)
          .set({ lastSignInAt: now })
          .where(eq(localUsers.id, existingUser.id));
        userId = existingUser.id;
      } else {
        // Create new user
        const [newUser] = await db
          .insert(localUsers)
          .values({
            email: input.email,
            name: input.name || input.email.split("@")[0],
            emailNewsOffers: input.emailNewsOffers,
          })
          .$returningId();
        userId = newUser.id;
      }

      // Issue a signed, httpOnly session cookie. The client never handles the
      // user id, so it cannot claim to be somebody else.
      const token = await createSessionToken(userId);
      setSessionCookie(ctx.resHeaders, ctx.req.headers, token);

      return {
        success: true,
        userId,
        email: input.email,
      };
    }),

  // Current user, resolved from the session cookie only.
  me: publicQuery.query(async ({ ctx }) => {
    const userId = await getSessionUserId(ctx.req.headers);
    if (!userId) return null;

    const db = getDb();
    const [user] = await db
      .select()
      .from(localUsers)
      .where(eq(localUsers.id, userId))
      .limit(1);

    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }),

  logout: publicQuery.mutation(({ ctx }) => {
    clearSessionCookie(ctx.resHeaders, ctx.req.headers);
    return { success: true };
  }),
});
