# Smartwatch Solutions website — implementation spec

**Date:** 2026-09-17
**Source of truth for visuals and copy:** Claude Design project "Smartwatch website redesign"
(`Smartwatch Site.dc.html`, project `15f3624a-ad76-4f9f-897e-51a5bf3cece7`).
This spec covers how that design becomes a real website in this repo; it does not restate the design.

## Goal

Ship the design as a static, routable marketing site for Smartwatch Solutions (Kampala fleet-management
company): five pages, shared header/footer, all interactions from the design, responsive down to phones.

## Stack

- Vite 8 + React 19 + TypeScript (existing scaffold), bun as package manager.
- `react-router-dom` for real URLs.
- CSS Modules per component; one global stylesheet (`src/index.css`) holds design tokens, reset,
  base typography and a few shared classes (`container`, `eyebrow`, `btn`, `link-arrow`).
- Plus Jakarta Sans from Google Fonts, linked in `index.html` exactly as the design does.
- Tests: vitest + Testing Library + jsdom for behaviour; browser screenshots for layout.

## Routes

| Path         | Page                       | Design screen label |
|--------------|----------------------------|---------------------|
| `/`          | HomePage                   | Home                |
| `/products`  | ProductsPage (dash cameras)| Product             |
| `/solutions` | SolutionsPage              | Solutions           |
| `/company`   | CompanyPage                | Company             |
| `/contact`   | ContactPage                | Contact             |

Navigation scrolls to top on route change (design calls `window.scrollTo(0,0)`).
Links the design leaves as `href="#"` with no target page stay as placeholders.

## Structure

```
src/
  main.tsx, App.tsx            router + route table
  index.css                    tokens, reset, base type, shared classes
  assets/logo.svg, logo-white.svg
  data/                        all copy and lists, no JSX
    site.ts pillars.ts industries.ts nav.ts content.ts
  lib/leads.ts                 submitLead(): single hook for a future backend
  components/
    Layout, AnnouncementBar, Header (nav, mega menus, phone popover, mobile drawer),
    Footer, RegionToast, Placeholder, RotatingWord, DemoForm, ContactForm
    home/  Hero, Stats, PlatformPillars, Customers, WhySmartwatch, IndustriesStrip, Resources, DemoSection
  pages/  HomePage ProductsPage SolutionsPage CompanyPage ContactPage
  test/setup.ts
```

## Behaviour to port from the design

- Announcement bar (always shown; design prop `showAnnouncement` defaults true).
- Header: hovering Solutions / Products / Resources / Company opens that mega menu; leaving the header
  closes it; hovering Contact closes it. Clicking a nav button navigates to its page and closes the menu.
  Phone number reveals a contact popover on hover (hidden under 1180px). Login link hidden under 1180px.
- Mobile (< 900px): nav is replaced by a menu button that opens a drawer listing the five pages and the
  demo CTA. This is an addition; the design only hides the nav.
- Home hero: rotating word (safety → productivity → profitability) every 2.6s with a 300ms fade.
- Platform pillars: seven tabs; clicking one swaps the detail panel (name, headline, body, points, image).
- Demo form (home): submitting shows the thank-you card with "How did you first discover Smartwatch?"
  chips; picking one shows "Your submission has been sent."; "Submit another request" resets.
- Region toast: fixed bottom-left, both buttons dismiss it. Shown once per page load (design default).
- Contact page form: same fields as design; submit calls `submitLead` and shows a sent state.

## Forms

No backend exists. `submitLead(lead)` resolves immediately and is the single place to wire a real
endpoint later. Both forms use native `required` fields and `onSubmit`, not click handlers.

## Responsive rules (addition to the design)

- Two-column section grids collapse to one column at ≤ 900px.
- Mega menus become the mobile drawer at ≤ 900px.
- Logo grid: 4 columns → 3 at ≤ 900px → 2 at ≤ 520px.
- Container gutter stays 24px; hero type uses the design's `clamp()` sizes.

## Placeholders

Every image slot in the design is a striped gradient with a monospace label. `Placeholder` renders
exactly that (light or dark variant, aspect ratio, label) so real media can replace it slot by slot.

## Out of scope

Backend for leads, CMS, analytics, real imagery, pages for Resources links, i18n / region switching.

## Testing

Behaviour tests (vitest): routing renders each page; header menu opens on hover and closes on leave;
mobile drawer toggles; pillar tabs switch content; demo form sent/reset flow; region toast dismiss;
rotating word cycles. Layout checked by screenshot at desktop and 375px against the design.
