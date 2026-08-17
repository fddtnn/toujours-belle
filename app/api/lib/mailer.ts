import { env } from "./env";

/* Resend's REST API - plain fetch, no extra dependency.
   Without RESEND_API_KEY the code is logged to the server console instead,
   which keeps local development working with no external account. */

export async function sendOtpEmail(to: string, code: string): Promise<void> {
  if (!env.resendApiKey) {
    console.log(`[OTP] no RESEND_API_KEY set - code for ${to}: ${code}`);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.mailFrom,
      to: [to],
      subject: `${code} — votre code Toujours Belle`,
      html: `
<div style="font-family:Inter,Arial,sans-serif;background:#faf6f4;padding:40px 20px">
  <div style="max-width:480px;margin:0 auto;background:#fff;border:1px solid #f0e0e0;border-radius:16px;padding:40px;text-align:center">
    <h1 style="font-family:Georgia,serif;font-weight:400;color:#0d0d0d;font-size:24px;margin:0 0 8px">Toujours Belle</h1>
    <p style="color:#6b6b6b;font-size:13px;letter-spacing:.08em;text-transform:uppercase;margin:0 0 28px">Code de connexion</p>
    <p style="font-size:36px;font-weight:600;letter-spacing:.18em;color:#0d0d0d;margin:0 0 28px">${code}</p>
    <p style="color:#6b6b6b;font-size:14px;line-height:1.6;margin:0">
      Ce code expire dans 10 minutes.<br>
      Si vous n'avez pas demandé ce code, ignorez cet e-mail.
    </p>
  </div>
</div>`.trim(),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend rejected the request (${res.status}): ${body.slice(0, 200)}`);
  }
}
