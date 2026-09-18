# Smartwatch Solutions website

Marketing site for Smartwatch Solutions, a Kampala-based fleet and mobile asset management company.
Visual design from the Claude Design project "Smartwatch website redesign"; section structure benchmarked
on gomotive.com (layout only); copy migrated from the client's live site.

## Stack

- Vite 8, React 19, TypeScript, bun
- `react-router-dom` for routing
- CSS Modules per component; design tokens in `src/index.css`
- GSAP (ScrollTrigger) + Lenis for scroll effects and smooth scrolling
- vitest + Testing Library for behaviour tests (animation libraries are mocked in tests)

## Commands

```bash
bun install        # once
bun run dev        # http://localhost:5173
bun run test       # vitest, single run
bun run lint       # oxlint
bun run build      # type-check + production build into dist/
bun run preview    # serve dist/
```

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/products`, `/products/:slug` | Products index and six product pages |
| `/solutions`, `/solutions/:slug` | Solutions index and fourteen industry pages |
| `/hardware` | Hardware & accessories |
| `/platforms` | Platform logins |
| `/about` (`/company` redirects) | Company |
| `/contact` | Contact, support, offices, demo form |
| `/privacy-policy`, `/terms` (`/terms-and-conditions` redirects) | Legal |

## Where things live

- `src/data/` — all copy and lists. `solutions/` and `products/` hold one file per page; `hardware.ts`,
  `about.ts`, `platforms.ts`, `legal.ts` the rest; `site.ts` has routes, anchors, offices, stats and the
  platform portals; `nav.ts` builds the menus. Edit text here, not in components.
- `src/data/types.ts` — the `DetailPage` / `Section` types every page is written against.
- `src/pages/DetailPage.tsx` + `src/components/sections/` — the single template that renders any page.
- `src/components/home/` — the homepage sections.
- `src/components/Header.tsx` — transparent colour-inverting header, mega menus, login menu, drawer.
- `src/motion/` and `src/components/Reveal.tsx` — GSAP setup, reveal-on-scroll, hero entrances.
- `src/lib/leads.ts` — `submitLead()`, the single place to wire the demo and contact forms to a backend.
- `public/images/`, `public/video/` — the client's approved imagery (WebP) and corporate video.

## Adding a page

1. Create `src/data/solutions/<slug>.ts` (or `products/`) exporting `page: DetailPage`.
2. Add it to the folder's `index.ts` and to `solutionSlugs` / `productSlugs` in `src/data/site.ts`.
3. Run `bun run test`: the route test and the dead-link test pick it up automatically.

## Specs

- `docs/superpowers/specs/2026-09-17-smartwatch-site-design.md` — first build from the mockup.
- `docs/superpowers/specs/2026-09-18-motive-structure-content-motion.md` — content migration, Motive-shaped
  structure, motion, and the list of questions the client needs to answer.
