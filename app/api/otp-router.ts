import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { otpCodes, localUsers } from "@db/schema";
import { eq, and, gt } from "drizzle-orm";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
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

      // In production, send email here via nodemailer/sendgrid
      // For demo, we log and return the code
      console.log(`[OTP] Code for ${input.email}: ${code}`);

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
    .mutation(async ({ input }) => {
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

      return {
        success: true,
        userId,
        email: input.email,
      };
    }),

  // Get user by ID (for session)
  me: publicQuery
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [user] = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.id, input.userId))
        .limit(1);

      if (!user) return null;
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    }),
});
