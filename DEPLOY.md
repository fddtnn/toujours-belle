# Deploying Toujours Belle

Two targets, for two different needs.

## 1. GitHub Pages — static, live now

<https://fddtnn.github.io/toujours-belle/>

Served from the `gh-pages` branch. Everything works **except sign-in**, which
needs a server. Good enough for sharing the catalogue.

To redeploy after changing the site:

```bash
cd app && npx vite build --base=/toujours-belle/
```

Then run the path-rewrite step (absolute `/images/...` literals in the product
data need the `/toujours-belle/` prefix), copy `app/dist/public/` onto the
`gh-pages` branch and force-push it.

> Build from PowerShell, not Git Bash — Git Bash rewrites `--base=/toujours-belle/`
> into a Windows path and the assets come out pointing at `/Program Files/Git/...`.

## Sign-in: what only you can do

The site is static, so there is no server of ours to generate a code, send the
email or hold a session. Supabase does all three from the browser, which is
why sign-in is wired to it. The code is in place; these four steps are the
part I cannot do for you, because they need accounts in your name.

1. **Create the Supabase project** at supabase.com (free tier is enough).
   Copy *Project Settings → API → Project URL* and *anon / public key* into
   `app/.env.local`:

   ```
   VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```

2. **Make the email a code, not a link.** Supabase emails a magic link by
   default, and this card asks for 6 digits. In
   *Authentication → Emails → Magic Link*, put `{{ .Token }}` in the template
   so the message carries the code.

3. **Allow the site to come back.** In *Authentication → URL Configuration*,
   set the Site URL to `https://fddtnn.github.io/toujours-belle/` and add the
   same address under Redirect URLs. Without this, Google returns to nowhere.

4. **Google** (optional, free): create an OAuth client at
   console.cloud.google.com, paste its ID and secret into
   *Authentication → Providers → Google* in Supabase, and give Google the
   callback URL Supabase shows you on that same screen. Then set
   `VITE_AUTH_GOOGLE=on` in `app/.env.local`. Until you do, the button stays
   hidden rather than showing up broken.

   Apple is the same shape but needs the Apple Developer Program at $99/year,
   so it is left out for now.

Then rebuild and redeploy — Vite bakes `VITE_*` values into the bundle, so a
change to `.env.local` only takes effect on the next build.

Supabase's free tier sends a limited number of emails per hour from its shared
address. For real volume, point it at your own domain under
*Authentication → Emails → SMTP*.

## 2. Render — full app with a working backend

`render.yaml` at the repo root defines a single web service. The Hono server
serves both the API and the built SPA on `$PORT`, so no separate static host is
needed. There is also an `app/Dockerfile` if you'd rather deploy a container
(Fly.io, Railway, any container host).

### Required secrets

Only two are required to boot (see `app/api/lib/env.ts`):

| Variable | What it is | Where it comes from |
|---|---|---|
| `DATABASE_URL` | `mysql://user:pass@host:port/db` | your MySQL host |
| `SESSION_SECRET` | long random string, signs session cookies | `openssl rand -base64 32` |

### Email sign-in

Sign-in works by emailing a 6-digit code. Delivery goes through
[Resend](https://resend.com):

| Variable | Notes |
|---|---|
| `RESEND_API_KEY` | from <https://resend.com/api-keys>, starts with `re_` |
| `MAIL_FROM` | e.g. `Toujours Belle <bonjour@toujours-belle.com>` |

Without `RESEND_API_KEY` the server prints the code to its own console instead
of emailing it, so local development needs no account.

`MAIL_FROM` defaults to Resend's shared `onboarding@resend.dev`, which only
delivers to the email address that owns the Resend account. To email real
customers you must verify your own domain in Resend and send from it.

### Kimi OAuth — optional

`APP_ID`, `APP_SECRET`, `KIMI_AUTH_URL`, `KIMI_OPEN_URL` are all optional now.
Leave them unset and the app runs with email sign-in only; set all four and the
"Sign in with Kimi" path switches back on. The app id recorded in
`app/.backend-features.json` is `19e4cfad-fe22-803e-8000-0000d7cf4697`.

### Database

MySQL. After the first deploy, create the tables:

```bash
cd app && npm run db:push
```

Schema lives in `app/db/schema.ts` (users, local users, OTP codes).

### What the backend actually does

Only three things: a `ping` health query, Kimi OAuth sign-in, and email OTP
sign-in. The entire product catalogue is static data compiled into the frontend,
so the site is fully browsable without any of this.

> Note: `otp.sendOtp` currently generates and stores a code but there is no email
> provider wired up, so the code is never delivered. That needs an email service
> before OTP login is usable.
