"""Rebuild the Smartwatch horizontal lockup from the brand PDF so the slogan reads at header size.

Reads design/source-images/smartwatch-logo-lowercase-slogan.pdf, exports page 3 (colour) and
page 7 (white on green) with pdftocairo, and writes src/assets/logo.svg and logo-white.svg.
The layout is expressed in units of D, the mark's diameter, so both files share one geometry.
The PDF's own lockup sets the slogan at 8% of the mark's height, which is 3px tall in the 44px
header; here it is 16% with a touch of tracking and weight so it reads at that size.

Usage: python3 design/build-logo.py
"""
import re, subprocess, tempfile, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
PDF = ROOT / "design/source-images/smartwatch-logo-lowercase-slogan.pdf"
OUT = ROOT / "src/assets"
S = pathlib.Path(tempfile.mkdtemp(prefix="smartwatch-logo-"))
for page, name in ((3, "p3"), (7, "p7")):
    subprocess.run(["pdftocairo", "-svg", "-f", str(page), "-l", str(page), str(PDF), str(S / f"{name}.svg")], check=True)

# ---- tunables ---------------------------------------------------------------------------------
WORDMARK_SCALE = 1.25      # relative to the PDF's wordmark size
SLOGAN_CAP     = 0.16      # slogan cap height as a fraction of D (the PDF uses 0.080)
GAP_X          = 0.166     # mark -> wordmark gap, the PDF's own proportion
GAP_Y          = 0.075     # wordmark baseline -> slogan cap top
TRACKING       = 0.35      # letter-spacing, pt per glyph at PDF scale (about 0.03em)
STROKE         = 0.25      # hairline stroke that lifts the slogan from Regular to about Semibold

# ---- geometry measured with getBBox in Chrome on the raw page exports -------------------------
P3 = dict(mark=(116.63, 240.04, 115.43, 114.48),        # clip-1 path (sphere + swoosh)
          word_x0=252.77, word_x1=501.37, word_top=272.88, word_base=309.6, word_bot=310.26,
          slog_x0=319.32, slog_w=115.50, slog_cap=9.27, slog_top=322.45, slog_base=332.37, slog_bot=332.50)
P7_MARK = (99.22, 234.86, 125.87, 124.83)               # flat white mark path

def split(svg):
    head, rest = svg.split("<defs>", 1)
    defs, body = rest.split("</defs>", 1)
    return defs, body.rsplit("</svg>", 1)[0]

def top_level(body):
    return [m.group(0) for m in re.finditer(r"<g\b[^>]*>.*?</g>(?:\s*</g>)?|<path\b[^>]*/>", body, re.S)]

d3, b3 = split(open(S / "p3.svg").read())
d7, b7 = split(open(S / "p7.svg").read())

els3 = top_level(b3)
mark3 = els3[0] + "\n" + els3[1]                       # sphere and swoosh, each clipped and gradient-filled
wordmark3 = "\n".join(e for e in els3 if e.startswith("<path") and 'fill-rule="evenodd"' in e)
slogan3 = re.search(r'<g fill="rgb\(13[^"]*"[^>]*>.*?</g>', b3, re.S).group(0)
assert wordmark3.count("<path") == 10 and slogan3.count("<use") == 19

mark7 = [e for e in top_level(b7) if e.startswith("<path")][0]
assert 'fill="rgb(100%, 100%, 100%)"' in mark7

# Only the slogan glyphs are needed from the defs; drop cairo's page clip rectangles.
def glyph_defs(defs):
    return re.search(r"<g>\s*(<g id=\"glyph-.*?)</g>\s*(?=<clipPath|$)", defs, re.S).group(1).rstrip()

def mark_defs(defs):
    return "".join(m.group(0) for m in re.finditer(r"<(clipPath|radialGradient)\b.*?</\1>", defs, re.S))

def recolour(markup, colour):
    return re.sub(r'fill="rgb\([^"]*\)"', f'fill="{colour}"', markup)

def track(slogan, t):
    n = [0]
    def bump(m):
        x = float(m.group(1)) + n[0] * t; n[0] += 1
        return f'x="{x:.4f}"'
    return re.sub(r'x="([\d.]+)"', bump, slogan)

def embolden(slogan, w, colour):
    if w <= 0: return slogan
    return slogan.replace("<g ", f'<g stroke="{colour}" stroke-width="{w}" stroke-linejoin="round" paint-order="stroke" ', 1)

def build(mark_markup, mark_box, mark_defs_markup, word_markup, slogan_markup, slogan_colour):
    mx, my, mw, mh = mark_box
    D = mw
    kw = WORDMARK_SCALE
    word_w = (P3["word_x1"] - P3["word_x0"]) * kw
    word_h = (P3["word_base"] - P3["word_top"]) * kw
    ks = SLOGAN_CAP * D / P3["slog_cap"]
    slog_w = (P3["slog_w"] + 18 * TRACKING) * ks
    gap_y = GAP_Y * D
    stack_h = word_h + gap_y + SLOGAN_CAP * D
    top = (mh - stack_h) / 2
    word_x = D + GAP_X * D
    word_base = top + word_h
    slog_base = word_base + gap_y + SLOGAN_CAP * D
    slog_x = word_x + (word_w - slog_w) / 2

    word_tf = f"translate({word_x - kw * P3['word_x0']:.4f} {word_base - kw * P3['word_base']:.4f}) scale({kw})"
    slog_tf = f"translate({slog_x - ks * P3['slog_x0']:.4f} {slog_base - ks * P3['slog_base']:.4f}) scale({ks:.6f})"
    slogan = embolden(track(slogan_markup, TRACKING), STROKE, slogan_colour)

    right = max(word_x + word_w, slog_x + slog_w)
    bottom = max(mh, word_base + (P3["word_bot"] - P3["word_base"]) * kw, slog_base + (P3["slog_bot"] - P3["slog_base"]) * ks)
    W, H = round(right + 0.5, 2), round(bottom + 0.5, 2)
    return f"""<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
<title>Smartwatch. Total Peace of Mind</title>
<defs>
{mark_defs_markup}
{glyph_defs(d3)}
</defs>
<g transform="translate({-mx:.4f} {-my:.4f})">
{mark_markup}
</g>
<g transform="{word_tf}">
{word_markup}
</g>
<g transform="{slog_tf}">
{slogan}
</g>
</svg>
""", dict(D=D, W=W, H=H, word_cap=(P3["word_base"] - P3["word_top"]) * kw, slog_cap=SLOGAN_CAP * D, word_w=word_w, slog_w=slog_w)

NAVY = "#1f3763"   # the PDF wordmark navy, rgb(12.3%, 21.5%, 38.7%)
colour, info = build(mark3, P3["mark"], mark_defs(d3), wordmark3, slogan3, NAVY)

k = P3["mark"][2] / P7_MARK[2]                                  # normalise the white mark to the colour D
white_mark = f'<g transform="scale({k:.6f})">{mark7}</g>'
white_box = (P7_MARK[0] * k, P7_MARK[1] * k, P7_MARK[2] * k, P7_MARK[3] * k)
white, _ = build(white_mark, white_box, "", recolour(wordmark3, "#fff"), recolour(slogan3, "#fff"), "#fff")

(OUT / "logo.svg").write_text(colour)
(OUT / "logo-white.svg").write_text(white)
print("wrote", OUT / "logo.svg", "and logo-white.svg;", {k: round(v, 2) for k, v in info.items()},
      "| at 44px:", {k: round(v * 44 / info["H"], 1) for k, v in info.items() if k in ("W", "word_cap", "slog_cap")})
