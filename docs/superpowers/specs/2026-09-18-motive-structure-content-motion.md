# Addendum: real content, Motive-shaped structure, GSAP + Lenis motion

> **Superseded on 2026-09-21 for layout.** The Motive-shaped structure (navy page base, white rounded
> panels, inverting header, pinned hero, video bands) was reverted to the Claude Design layout described
> in the 2026-09-17 spec: white base, announcement bar, sticky white header, and the home sequence
> hero → stats → platform pillars → customers → why → industries → resources → demo form. The landing
> page no longer plays any video. Content, images, routes, the `DetailPage` template and the motion
> helpers below still apply.

**Date:** 2026-09-18. Extends the 2026-09-17 spec. Approved plan: `~/.claude/plans/1-now-copy-word-generic-matsumoto.md`.

## What changed

- **Content** now comes from the client's live site (smartwatchsolutions.com), transcribed into
  `src/data/` with typos corrected, US-only regulatory wording and OEM names removed, one brand set
  ("Smartwatch FM" platform, "OnTrack" app) and one support email. 14 solution pages, 6 product pages,
  hardware, about, platforms, privacy policy and terms.
- **Structure** follows gomotive.com's section order and layout only (no Motive words, images or
  branding). Dark navy page base with white 40px-radius panels; transparent sticky header whose
  colours invert over dark and light bands (`data-band` on sections drives `data-theme` on the header).
- **Every link resolves.** `src/App.links.test.tsx` renders every route, opens every menu and the
  drawer and login menu, and asserts no `#` links, valid internal routes, `target="_blank"` +
  `rel="noopener"` on external links, and that every in-page anchor target exists.
- **Motion:** GSAP + Lenis (`src/motion/`, `src/components/Reveal.tsx`, `SmoothScroll.tsx`).
  All effects are registered through `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`, so
  nothing is hidden or animated for visitors who prefer reduced motion. Lenis disables smoothing for them
  on its own.
- **Images** are the client's own (approved by the client), converted to WebP in `public/images/`; the
  corporate video is `public/video/Smartvideo.mp4`. Slots without an approved image still render the
  design's striped placeholder via `Media`.

## Templates

| Kind | Sequence |
|---|---|
| product | dark hero → sticky scroll-spy rail → feature rows → benefit cards → stats (dash cams) → hardware spotlight → resource links → FAQ → CTA band |
| solution | hero (photo when an image exists) → proof strip → benefit cards → feature rows / tabs / bullets / before-after → customer logos → related pages → CTA band |
| hardware, about, platforms | `kind: 'page'` with their own section lists |
| home | hero carousel (word tabs ↔ media) → white panel: platform intro, product rail, seven alternating rows → customers band (video) → white panel: resources → demo band → disclaimer |

Add a page: create `src/data/solutions/<slug>.ts` (or `products/`), add it to the index and to the slug
list in `src/data/site.ts`. The dead-link test then covers it automatically.

## CLIENT QUESTIONS (nothing below was invented; these need the client's confirmation)

1. FAQs on the six product pages and the hardware page are original questions answered only from facts
   on the live site; each is marked `reviewed: false` in the data. Please review and approve.
2. Netherlands office: the live site prints "331 LM Glessenburg". We used "Giessenburg" and omitted the
   postcode. Please supply the correct address line.
3. "A decade" / "10+ years" appears on the live site, but 2011 to 2026 is 15 years. Keep or update?
4. Three support emails exist on the live site (customersupport@, customerservice@, dev@). We used
   customersupport@ everywhere, including the legal pages.
5. Tracker model names (HCV5, LCV5, Pro5) and the Eco Panel's OEM ("Ruptela") were removed in favour of
   "our advanced tracker family". Confirm.
6. Site Management modules were branded "Galooli Analytics/Live" on the live site; we titled them
   Smartwatch Analytics / Smartwatch Live. Confirm the reseller arrangement allows this.
7. Dash-camera stats (70%, 10x, 72%, 25%, 40%) are migrated verbatim. Are they Smartwatch's own figures?
8. Mobile Resource Management copy on the live site is US-oriented ("reefer", reseller wording). Consider
   rewriting for the East African audience.
9. Government page benefit lists read like customs/revenue-authority claims. Confirm they belong.
10. "Satellite Tracking for NGOs" describes GPS/GSM only. Is satellite hardware actually offered?
11. Insurance page section headline was a copy of the Sustainability headline on the live site; we used
    "Look at the benefits". Supply a preferred headline if any.
12. The KPMG Top 100 Mid-Sized Companies award: year and ranking, if any, so the awards copy can say more.
13. Customer names in the credibility band (KLM, British Airways, Barclays, World Vision, CNOOC, KCB,
    Serena Hotels, Aramex) come from the live logo wall. Logo files were not migrated; text tiles are used
    until licensed logos are supplied.
14. Forms still post nowhere: `src/lib/leads.ts` `submitLead()` is the single hook for a real endpoint.
15. Spelling: data files use British spelling; some earlier copy uses American. Pick one convention.

## Follow-ups (technical)

- Bundle: ~187 KB gzipped JS. Route-level code splitting of the solution/product data would cut the
  initial load if needed.
- `public/_redirects` (or the host's equivalent SPA rewrite) is required for deep links on static hosting.
- Scroll-spy and header inversion depend on ScrollTrigger measuring after images load; `ScrollManager`
  calls `ScrollTrigger.refresh()` after each route change.
