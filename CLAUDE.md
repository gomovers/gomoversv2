# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

GoMovers is a removalist (moving) business serving Gold Coast, Brisbane and Byron Bay.
- Address: Unit 3/26 William St, Mermaid Beach QLD 4218
- Phone: 0452 261 274
- Domain: gomovers.com.au (Google Workspace email on same domain — never touch its MX/TXT records in Cloudflare, it breaks email)
- Reviews shown on site (4.9 / ~1,461) come from the Airtasker account, reconciled with Google (1,447 + 16) — don't recompute without checking both sources.

## Commands

- `bun install` / `npm install` — both lockfiles are kept in sync (`bun.lock`, `package-lock.json`); the deploy workflow uses bun.
- `npm run dev` — vite dev server
- `npm run build` — production build (client + SSR bundles); also regenerates `src/routeTree.gen.ts` from the files under `src/routes/`
- `npm run build:dev` — build in development mode
- `npm run preview` — preview the built output
- `npm run lint` — eslint
- `npm run format` — prettier --write .
- No test suite exists in this repo.
- Deploy: `npm run build && npx wrangler deploy`. `git push` by itself does not deploy from a local clone — pushing to `main` on GitHub triggers the Actions workflow, which does its own build+deploy (see Deployment below).

## Architecture

### Stack
TanStack Start + React 19, Vite, Tailwind CSS v4, shadcn/ui (Radix), deployed as a Cloudflare Worker (`wrangler.jsonc`; worker name `gomoversv2`; routes bound to `gomovers.com.au/*` and `www.gomovers.com.au/*`). Originally generated in Lovable (`.lovable/`). Backend is Supabase (project ref `dywjabdlrspxbqezovlq`), shared with an unrelated admin panel for the same business — not every table in that Supabase project belongs to this app.

### Routing & root layout
File-based routing under `src/routes/` via TanStack Router, which auto-generates `src/routeTree.gen.ts` — never hand-edit that file; run `npm run build` (or `npm run dev`) after adding/removing route files to regenerate it. `src/routes/__root.tsx` splits into:
- `RootShell` — the raw `<html>/<head>/<body>`, injects the Meta Pixel script (id `27379141638344500`) plus its `<noscript>` fallback, `<HeadContent/>`, `<Scripts/>`.
- `RootComponent` — wraps `<Outlet/>` in `QueryClientProvider`. Anything that should render on every route (a site-wide widget, banner, etc.) belongs here as a sibling of `<Outlet/>`.

### Server functions (TanStack Start)
Supabase writes go through `createServerFn` handlers in `src/server/` (`createBooking.ts`, `captureGuideLead.ts`) — there is no Supabase client anywhere in browser code. Shared shape used by both:
- `createServerFn({ method: "POST" }).inputValidator((data: unknown) => schema.parse(data)).handler(async ({ data }) => {...})`, with a Zod schema at the top of the file.
- Env vars read via `import { env } from "cloudflare:workers"`, falling back to `process.env` (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `NOTIFY_EMAIL`).
- A Supabase client is created inline per call (`createClient(supabaseUrl, supabaseKey)`); DB/config errors are re-thrown as a plain `Error` with a user-facing message.
- Optional email notification via a raw `fetch` to the Resend API, gated on `RESEND_API_KEY` being set.

Client side, forms hand-roll `useState` for fields/`loading`/`error`/`submitted` and call the server function in a try/catch/finally — react-hook-form is installed but not in active use.

### Supabase edge functions
Edge functions are not scaffolded locally — there is no `supabase/` folder in this repo; they're authored and deployed straight to the remote project. Reference implementation is `meta-leads-webhook` (Meta lead-ads webhook): a single-file `index.ts` with no import map, talking to PostgREST directly via raw `fetch` (`${SUPABASE_URL}/rest/v1/...`) rather than `@supabase/supabase-js`, with `apikey` / `Authorization: Bearer` headers set to the service role key. It always returns HTTP 200 on POST — a Meta-specific requirement so Meta doesn't disable the webhook on errors — do not carry that always-200 behavior into a browser-facing function.

Leads land in `public.meta_leads`. `status` and `priority` are free-text columns with no CHECK constraint — reuse the existing vocabulary rather than inventing new values: `status` ∈ `new/qualified/contacted/disqualified/followup_1/followup_2/followup_3/nurture/lost/opted_out/won`, `priority` ∈ `hot/warm/cold`. RLS is on with no anon INSERT policy, so inserts require the service role key server-side. A separate cron-driven `leads-followup` function runs a `+1h → +24h → +72h` cadence on rows where `status IN (contacted, followup_1, followup_2)` and `responded_by_lead = false` — inserting a row with `status='contacted'` and a populated `first_response_at` auto-enrolls it in that cadence.

### Styling / design system
Brand tokens live in `src/styles.css` under `@theme inline` (oklch): `--brand` (green, `oklch(0.67 0.19 150)`), `--primary` (charcoal, `oklch(0.21 0.015 160)`). Do not reintroduce the old navy/orange placeholder palette. shadcn config is in `components.json` ("new-york" style, `cssVariables: true`); the full primitive set lives in `src/components/ui/`. Non-ui components are flat in `src/components/` — no feature subfolders yet.

### Client-only / SSR
No `React.lazy`/`Suspense` or dynamic imports exist anywhere. The only lazy-mount pattern is a local `ClientOnly` component defined inline in `src/routes/index.tsx` (renders `null` until after the first effect), used to keep client-only libraries (the embla carousel) out of SSR.

### Analytics
No analytics abstraction exists — Meta Pixel events are fired ad hoc per component, directly after a successful server-fn call: `(window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq?.("track", "Lead")`.

### Deployment
`.github/workflows/deploy.yml` triggers on push to `main`: checkout → bun setup → `bun install --frozen-lockfile` → `bun run build` → `bunx wrangler deploy`, authenticated via the `CLOUDFLARE_API_TOKEN` GitHub secret. Locally, `wrangler dev` reads secrets from `.dev.vars` (gitignored: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `NOTIFY_EMAIL`); real production secrets are set directly in the Cloudflare dashboard (Workers > Settings > Variables and Secrets) — never pipe them through PowerShell, it corrupts the value with an extra character. Public values (e.g. the Supabase anon key) live as plain `vars` in `wrangler.jsonc` — note that entry is currently named `SUPABASE_SERVICE_ROLE_KEY` but decoding the JWT shows it's actually the anon key; the name is misleading, don't assume it's the real service-role key.

## Gotchas
- Work in `C:\dev\gomoversv2` (outside OneDrive), not any other clone — a second working copy has existed at `C:\Users\south\gomoversv2` and the two have diverged before.
- `git push` alone does not deploy from a local clone; only a push to `main` on GitHub does (via Actions).
- Real secrets (Resend key, service role key) go in the Cloudflare dashboard, never through the PowerShell pipe or into chat.
- Librerías solo-cliente (embla) van envueltas en `<ClientOnly>` o crashean el SSR.
- No tocar registros MX/TXT de Google en Cloudflare (rompe el email).
- Supabase: RLS activo necesita política de INSERT para anon en `bookings` (distinto de `meta_leads`, que no la tiene y depende de la service role key).

## Open work
1. Confirm the exact brand green hex against the logo file and update `--brand` in `src/styles.css` if it's off.
2. Lead magnet feature in progress (uncommitted as of this writing): `src/components/GuideDownload.tsx`, `src/routes/guides/`, `src/server/captureGuideLead.ts`, `public/downloads/`.

## Planned agents (future)
Lead/quote responses, review management (Google + Airtasker), Gmail triage for gomovers.com.au, SEO/content.
