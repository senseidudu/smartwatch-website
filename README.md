# Smartwatch Solutions website

Marketing site for Smartwatch Solutions, a Kampala-based fleet and mobile asset management company.
Built from the Claude Design project "Smartwatch website redesign" (`Smartwatch Site.dc.html`).

## Stack

- Vite 8, React 19, TypeScript, bun
- `react-router-dom` for routing
- CSS Modules per component; design tokens in `src/index.css`
- vitest + Testing Library for behaviour tests

## Commands

```bash
bun install        # once
bun run dev        # http://localhost:5173
bun run test       # vitest, single run
bun run lint       # oxlint
bun run build      # type-check + production build into dist/
bun run preview    # serve dist/
```

## Pages

| Path         | Page                                  |
|--------------|---------------------------------------|
| `/`          | Home                                  |
| `/products`  | Products (Driver Safety Dash Cameras) |
| `/solutions` | Solutions by industry                 |
| `/company`   | Company                               |
| `/contact`   | Contact and demo request              |

## Where things live

- `src/data/` — all copy and lists (products, industries, menu links, stats, news). Edit text here, not in components.
- `src/components/` — shared UI: header with mega menus and mobile drawer, footer, forms, placeholders.
- `src/components/home/` — the home page sections.
- `src/pages/` — one file per route.
- `src/lib/leads.ts` — `submitLead()`, the single place to wire the demo and contact forms to a real backend. It currently resolves immediately and logs in development.
- `src/assets/` — brand logos (light and white variants).

## Replacing placeholders

Every image and video slot renders the `Placeholder` component with the label from the design
(for example "hero video: fleet on the road"). Replace each one with real media when it is available.

## Design spec

See `docs/superpowers/specs/2026-09-17-smartwatch-site-design.md` for the implementation decisions
(routing, styling, responsive rules, what was added beyond the design).
