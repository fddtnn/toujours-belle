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

## 2. Render — full app with a working backend

`render.yaml` at the repo root defines a single web service. The Hono server
serves both the API and the built SPA on `$PORT`, so no separate static host is
needed. There is also an `app/Dockerfile` if you'd rather deploy a container
(Fly.io, Railway, any container host).

### Required secrets

The server **refuses to boot in production** unless all of these are set
(see `app/api/lib/env.ts`):

| Variable | What it is | Where it comes from |
|---|---|---|
| `APP_ID` | Kimi application id | Kimi platform |
| `APP_SECRET` | Kimi application secret, signs JWTs | Kimi platform |
| `KIMI_AUTH_URL` | Kimi OAuth server URL | Kimi platform |
| `KIMI_OPEN_URL` | Kimi Open Platform URL | Kimi platform |
| `DATABASE_URL` | `mysql://user:pass@host:port/db` | your MySQL host |
| `OWNER_UNION_ID` | optional — this user becomes `admin` on first login | Kimi profile |

The app id recorded in `app/.backend-features.json` is
`19e4cfad-fe22-803e-8000-0000d7cf4697`.

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
