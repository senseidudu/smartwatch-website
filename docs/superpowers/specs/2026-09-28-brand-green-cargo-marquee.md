# Brand green, Cargo Tracking, customer marquee (2026-09-28)

Targeted changes after client review. The layout is unchanged; colour, one new homepage section and the
logo strip move.

## What the client asked for

1. The site's green was not theirs. PR #9 had recoloured it navy `#0b2a5b` and lime `#a7d439`; neither is
   in the brand guideline.
2. Their green should lead ("80/20"): more visible than any other colour, as on their old site.
3. Borrow colour distribution from mobileye.com, navixy.com and finsprint.io.
4. Front Cargo Tracking as a major product.
5. A customer marquee like the old site's: slower, more visible, full page width.

## Source: Smartwatch Solutions Brand Guidelines v1.0 (July 2022), pp. 16, 18 and 26

**The swatches are the truth, read in sRGB.** Every swatch in the manual is CMYK. Three numbers exist
for its green and none of them agree until colour management is accounted for:

- the hex printed beside the swatch, #4d9734 — visibly more yellow than the swatch it labels;
- a native-value colour pick on a wide-gamut Mac, 91,141,75 — the swatch in the display's P3 space;
- the swatch converted to sRGB, **74,143,66 = #4a8f42** — the same colour the client's picker reads,
  expressed in the space CSS ships. A P3 screenshot of the manual converts to exactly this value.

`design/brand-colours.py` renders each swatch the way Preview does (Quartz via `sips`), converts the
render from its Display P3 tag to sRGB, and reads it back. On a P3 Mac, a native pick of the site's
#4a8f42 reads ≈91,141,75 — matching the manual side by side, which is the client's own test.

| Swatch | Printed hex | Used (sRGB of the swatch) | Role on the site |
|---|---|---|---|
| Green | #4d9734 | **#4a8f42** | the brand colour: bands, ticks, icons, strokes, tabs, the hero phrase |
| Navy | #17315b | **#1b2845** | headings, every button, the "Smart" of the wordmark |
| Grey | #636363 | **#5c5c5a** | muted text |
| Black | #000000 | **#0a0b09** | |
| 70% black (p. 18, "supporting colour") | | **#4d4d4d** | body copy |
| Cyan, yellow, pale lime | | #24a6cb, #f6c824, #d2dc82 | **not used**: primaries and green shades only |

**The logo goes through the same pipeline.** Its PDF is CMYK too; `brand-colours.py` recolours every
flat fill and all 392 gradient stops of `src/assets/logo.svg` and `public/favicon.svg`, so the
wordmark's flat green is exactly #4a8f42 — the mark and the bands are one green. Run it
after `build-logo.py`.

**Green ladder:** every tint shares the brand green's hue (114°), and only lightness steps:
50 #f3f9f3, 100 #e8f4e7, 200 #d3e9d0, 300 #b3daaf, 400 #85c37e, **brand #4a8f42**. **The brand green is
the darkest green on the site**: the client asked for nothing darker, so there are no deeper shades,
and no gradient runs from the brand green into a darker one. The manual defines no lighter tints of
the green either, so the green panels are flat.

**Fonts (p. 16):** Century Gothic for headings, Open Sans for body. Open Sans loads from Google Fonts.
Century Gothic is a licensed Monotype face with no free web version. Visitors who have it installed
(Windows, Microsoft Office) see it; everyone else sees Questrial. The client chose to keep it that way
for now. An exact match everywhere needs a Century Gothic web licence; TeX Gyre Adventor is the closest
free alternative.

**Two conflicts in the guideline:**
- p. 18 calls navy the "base" colour and asks for green "with restraint", while the collateral and the
  client lead with green. The site follows the client, with navy for headings.
- p. 28 ("Digital & Web: Typography") specifies Times for H1 and #AEC914 for H2, H4 and links. #AEC914
  is in no palette and reads 1.9:1 on white. It looks like template text and was not followed; p. 16's
  fonts were.

## How "80/20" is read

The old site is mostly white and light grey, with green as its only strong colour. So the target is that
**most of the colour on a page is green**, not that 80% of the page is painted green.

Measured on the homepage at 1440px, photos excluded:

| | Before | After |
|---|---|---|
| Brand green | 0% | ~24% (bands, pale grounds, CTAs) |
| Navy | ~16% (the footer) | none as a fill; headings only |

## Colour rules (`src/index.css`)

The exact green is 3.96:1 against white: enough for large type (18.7px bold, or 24px) and graphics,
short of AA (4.5:1) for small text. The client saw the AA-driven darker bands next to the manual and
rejected them — the manual's own divider pages are the exact green with small white type — so:

- **The bands are the exact #4a8f42, flat** (announcement bar, Stats, Cargo panel, CTA band, spotlight,
  footer), exactly as the manual paints its divider pages. Small white text on them is 3.96:1, below
  AA — a documented client decision, matching their collateral. Band text is white at high opacity;
  the accent on bands is the pale `--green-100`.
- **Exact #4a8f42** gives every tick, icon, stroke and card rule its colour, plus the hero's key
  phrase.
- **Buttons are the brand navy** #1b2845 (white on it 14.6:1), hovering to `--navy-900` #111a2e. The
  client asked for this after review; on green bands the buttons stay white pills.
- **Chips, active tabs, section-tab pills and step numbers** are the exact #4a8f42 with white labels.
- **Green text on white** (links, eyebrows, "Explore →") is the exact #4a8f42, hovering to navy. At
  3.96:1 it is below AA (4.5:1) for small text, the same client decision as the bands. Setting
  `--accent-text` to navy would restore AA for small links without touching anything else.
- **Photo heroes carry no colour overlay.** The copy takes the right-hand column, and a brand-black
  shade (66% to 62%) falls in from that edge, fading out before the photo's subject on the left. On
  narrow screens the shade covers the whole photo, with a 3px blur. White text measures at least
  8.7:1 on the Cargo Tracking still at every width.

## What was borrowed

| Site | Borrowed |
|---|---|
| Navixy | one CTA colour everywhere, one keyword in the headline in the brand colour ("protecting fleets."), neutrals tinted toward the brand |
| Finsprint | a rhythm of deep brand-green bands between white sections (announcement bar, Cargo panel, Stats, CTA band, footer) |
| Mobileye | soft brand-tint washes behind heroes, and one large rounded brand panel (Cargo) |

Not borrowed: Finsprint's fully dark hero (the client chose the balanced option) and Mobileye's 3D imagery.

## Cargo Tracking

The page stays at `/solutions/electronic-cargo-tracking`. It is surfaced in these places:

- a "New" pill above the homepage headline;
- a deep-green spotlight straight after the platform tabs (`CargoSpotlight`);
- the Products menu promo;
- first place in `pillars`, so the tabs, menus, products page and footer all open on it;
- a photo hero on its own page, with a demo button.

The copy lives in `cargoFeature` (`src/data/content.ts`). Moving the page to `/products/cargo-tracking`
later only needs a route and a redirect.

## Customer marquee

- **Full width:** the rows sit outside `.container`.
- **About 50px/s,** matching the old site's Swiper (5000ms per 244px slide). The speed is set as seconds
  per logo (`--per-logo`) times the logo count, and each breakpoint keeps the pitch-to-time ratio.
- **Logos straight on the page,** no tiles: 200×100 with 48px gaps, about 6 across at 1440px.
- **A Pause button** meets WCAG 2.2.2 for touch and keyboard users. Hover and focus still pause, and
  reduced motion still shows a static, scrollable row.
