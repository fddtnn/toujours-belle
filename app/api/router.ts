import { authRouter } from "./auth-router";
import { otpRouter } from "./otp-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  otp: otpRouter,
});

export type AppRouter = typeof appRouter;
