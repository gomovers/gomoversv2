# GoMovers — project context for Claude Code

GoMovers is a removalist (moving) business serving Gold Coast, Brisbane and Byron Bay.
- Address: Unit 3/26 William St, Mermaid Beach QLD 4218
- Phone: 0452 261 274
- Domain: gomovers.com.au (Google Workspace email on same domain)
- Reviews shown on site (4.9 / 1,461) come from the Airtasker account.

## Stack
- TanStack Start + React 19, Vite, Tailwind CSS v4, shadcn/ui (Radix).
- Deployed on Cloudflare Workers (see `wrangler.jsonc`). Originally generated in Lovable (`.lovable/`).
- Package manager: bun (`bun install`, `bun run dev`, `bun run build`).

## Design system / brand
All brand color lives in `src/styles.css` as CSS variables (oklch). The two key tokens:
- `--brand` = GoMovers green (logo green). Currently `oklch(0.67 0.19 150)` (approx — confirm exact hex if available).
- `--primary` = charcoal/near-black (logo background). Currently `oklch(0.21 0.015 160)`.
Brand = green/black to match the logo (green moving truck + "GoMovers" wordmark on black).
Do NOT reintroduce the old navy/orange placeholder palette.

## Open work
1. Header logo: `src/routes/index.tsx` `Header()` uses a generic Truck icon. Replace with the real
   GoMovers logo image once it's added to `src/assets/`.
2. Confirm the exact brand green hex and update `--brand`.
3. SEO/content pass on `src/routes/index.tsx` (titles, meta, headings, structured data).

## Planned agents (future)
Lead/quote responses, review management (Google + Airtasker), Gmail triage for gomovers.com.au, SEO/content.
