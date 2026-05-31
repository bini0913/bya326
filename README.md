# Boriyad Youth Academy Website

TanStack Start + Vite application for the Boriyad Youth Academy marketing site and admin pages.

## Vercel deployment

This repository is configured to deploy through Vercel using Nitro's Vercel preset and Vercel's Build Output API.

### Required Vercel settings

Use these project settings in Vercel:

| Setting | Value |
| --- | --- |
| Framework Preset | Other |
| Install Command | `bun install` |
| Build Command | `bun run build:vercel` |
| Output Directory | Leave empty |
| Node.js Version | `22.x` |

The build writes Vercel's required output to `.vercel/output`, including static assets, routing config, and the server function.

### Required environment variables

Add these in **Vercel Project Settings → Environment Variables** for Production, Preview, and Development as needed:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Optional aliases supported by the server-side environment loader:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`

Only add `SUPABASE_SERVICE_ROLE_KEY` if server-only admin utilities are enabled. It must stay server-only and must not use a `VITE_` prefix.

Copy `.env.example` for local development values. Do not commit real `.env` files.

### Local verification

Run the same Vercel-targeted production build locally:

```sh
bun run vercel:check
```

That command uses the Vercel Nitro preset and verifies that the generated Build Output API files exist.
