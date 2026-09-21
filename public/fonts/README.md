# Fonts

The site is designed for **Maison Neue** (Milieu Grotesque). It is a commercial typeface, so the
font files are not in this repository.

## Right now

The site renders in **Hanken Grotesk**, loaded from Google Fonts in `index.html`. It is free under
the SIL Open Font License and is a close match for Maison Neue's proportions.

## Switching to Maison Neue

Buy a **webfont licence** for the three styles the design uses:

| Style | Weight |
|---|---|
| Book | 400 |
| Medium | 500 |
| Demi | 600 |

Buying those three styles is enough. The full family only pays off if you later want italics or the
extra weights.

Then drop the `.woff2` files into this folder with exactly these names:

```
public/fonts/MaisonNeueWEB-Book.woff2
public/fonts/MaisonNeueWEB-Medium.woff2
public/fonts/MaisonNeueWEB-Demi.woff2
```

Nothing else needs to change. The `@font-face` rules at the top of `src/index.css` already point at
these paths, and the font stack lists Maison Neue ahead of Hanken Grotesk, so the browser switches
over as soon as the files are present. Until then those sources simply fail to load and the stack
falls through.

Once Maison Neue is live you can drop the Google Fonts `<link>` from `index.html` if you no longer
want Hanken Grotesk as the fallback.
