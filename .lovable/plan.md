# Boriyad Youth Academy — Phase 1: Premium Public Site Redesign

Rebuild the look, feel, and copy of the 9 existing public pages into a cohesive elite-institution experience. No CMS, admin, or admissions backend in this phase (Phase 2).

## Locked design direction

- **Palette** (added to `src/styles.css` as semantic tokens in `oklch`)
  - Primary: Deep Teal `#0f4c5c`
  - Secondary: Navy Blue `#0f1b3d`
  - Accent: Premium Gold `#c9a84c`
  - Supporting: Forest Green `#2d5a3d`
  - Background: Soft Ivory `#f7f4ed`
  - Foreground: Near-black ink for body
- **Typography**: DM Serif Display (headings, display) + Fira Sans (body, UI). Loaded via Google Fonts in `__root.tsx` head.
- **Layout system**: full-width stacked sections, generous vertical rhythm, max-width 7xl container, 96–160px section padding on desktop.
- **Motion**: Framer Motion — subtle fade-up on scroll, parallax hero, animated counters, gentle hover lift on cards. No bouncy springs.
- **Imagery**: tasteful neutral stock + elegant gradient placeholders for hero/leadership slots.
- **Components**: shadcn primitives restyled via tokens — buttons with gold accent, cards with ivory surfaces + thin gold hairlines, navbar with serif wordmark.

## Pages to redesign + rewrite

All copy rewritten to an elite-institution tone (measured, confident, Harvard/Cambridge cadence).

1. **Home** (`/`) — cinematic hero, animated trust stats, about preview, 4 programs band, leadership preview, student life, achievements, news, admissions CTA, footer.
2. **About** (`/about`) — leadership message with portrait slot, story timeline, mission/vision/values, achievements, team.
3. **Academics** (`/academics`) — programs (Elementary, Primary, Secondary, Preparatory), curriculum philosophy, enrichment.
4. **Admissions** (`/admissions`) — visual-only this phase. Form UI stays present but marked "Phase 2". Process timeline, requirements, fees overview, FAQ.
5. **Student Life** (`/student-life`) — events, sports, trips, labs, clubs.
6. **Achievements / Results** (`/results`) — stat headline, university placements, awards.
7. **News** (`/news`) — restyled article grid (static content, real CMS in Phase 2).
8. **Gallery** (`/gallery`) — refined grid with gradient placeholders (image manager in Phase 2).
9. **Contact** (`/contact`) — restyled form, contact strip, location section.

## Global components

- `Navbar` — sticky, ivory/translucent, serif wordmark "Boriyad Youth Academy", gold "Apply Now" CTA.
- `Footer` — multi-column with contact, quick links, programs, socials, copyright.
- `SectionHeader`, `StatCounter`, `ProgramCard`, `LeadershipCard`, `NewsCard`, `CTABand`, `Timeline` — shared, all using design tokens.

## SEO + technical

- Per-route `head()` with unique title, description, og:title, og:description.
- Root `head()` gets sitewide defaults (fonts, theme color, favicon) — no og:image at root.
- Update `index.html` defaults, `robots.txt` allows all, `sitemap.xml` lists all 9 routes (BASE_URL placeholder).
- Single H1 per page, semantic landmarks, alt text on all imagery, lazy-loaded images.

## Out of scope (Phase 2)

- Supabase tables for applications, news, media, social links
- `/admin` auth + dashboard (admissions, news CMS, media manager, social manager, analytics)
- Functional admissions submission + reference ID generation
- Real image uploads / gallery CMS

## Technical notes

- Stack: TanStack Start + React 19 + Tailwind v4 + Framer Motion + shadcn (already installed).
- Add Framer Motion if not present: `bun add framer-motion`.
- Color tokens defined in `src/styles.css` via `@theme` + CSS variables in `oklch`; no raw hex in components.
- Fonts via `<link>` tags in root `head()`; Tailwind font families wired through CSS variables.
- Animations: a small `useScrollReveal` hook + `<MotionSection>` wrapper for consistent entry animations across pages.
- All edits are frontend-only — no DB migrations, no server functions in this phase.

## Delivery order

1. Design system foundation: tokens in `styles.css`, fonts, base components (Navbar, Footer, MotionSection, primitives restyle).
2. Home page (highest impact — most time).
3. About + Academics.
4. Student Life + Results + News.
5. Admissions + Contact + Gallery.
6. SEO sweep (per-route head, sitemap, robots).

Estimated multiple build turns. After Phase 1 ships and you approve the look, we plan Phase 2 (Supabase schema + admin portal + admissions flow).