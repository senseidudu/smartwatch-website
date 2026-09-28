"""Convert the brand's CMYK colours to the RGB the brand manual actually shows, and recolour the logo.

Every colour in the brand guideline and in the logo PDF is CMYK. The hex codes printed beside the
guideline's swatches do not match the swatches themselves (#4d9734 is printed; the green swatch shows
91,141,75), and pdftocairo, which build-logo.py uses, converts CMYK with a plain formula, so the logo
came out greener and bluer than the manual. The reference is the manual as macOS renders it,
expressed in sRGB: this script draws each CMYK value as a swatch in a scratch PDF, renders it with
`sips` (Quartz, the same conversion Preview shows), converts the render from its Display P3 tag to
sRGB, and reads the pixels back. The P3 step matters: on a wide-gamut Mac a colour picker in native
values reads the green swatch as 91,141,75, and that same colour expressed in sRGB is 74,143,66 —
one colour, two colour spaces. The site ships sRGB, so it uses the sRGB numbers.

It prints the guideline palette, then rewrites the flat fills and every gradient stop in
src/assets/logo.svg and public/favicon.svg. Run it after build-logo.py. macOS only (needs `sips`).

Usage: python3 design/brand-colours.py
"""
import pathlib, re, subprocess, tempfile, zlib

import pypdf
from pypdf.generic import DecodedStreamObject, NameObject
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
LOGO_PDF = ROOT / "design/source-images/smartwatch-logo-lowercase-slogan.pdf"
TARGETS = [ROOT / "src/assets/logo.svg", ROOT / "public/favicon.svg"]

# The guideline's swatch fills, read from the content streams of pages 18 and 26.
GUIDELINE = {
    "green": (0.742, 0.184, 1, 0.038),
    "navy": (1, 0.867, 0.369, 0.289),
    "cyan": (0.721, 0.094, 0.054, 0),
    "yellow": (0.017, 0.178, 1, 0),
    "pale lime": (0.18, 0.016, 0.602, 0),
    "grey": (0.606, 0.522, 0.516, 0.218),
    "black": (0.75, 0.679, 0.671, 0.901),
}
# The logo PDF's flat fills (page 3) and the pdftocairo rgb() each became in the SVGs.
LOGO_FLAT = {
    "rgb(27.784729%, 60.496521%, 21.713257%)": (0.738, 0.188, 1, 0.039),  # "watch", swoosh shadow
    "rgb(12.307739%, 21.498108%, 38.699341%)": (1, 0.836, 0.344, 0.23),  # "Smart", slogan
    "rgb(27.720642%, 60.115051%, 21.614075%)": (0.738, 0.191, 1, 0.043),  # favicon swoosh shadow
    "rgb(13.293457%, 19.833374%, 36.44104%)": (0.98, 0.855, 0.352, 0.262),  # slogan glyphs
    "#1f3763": (1, 0.836, 0.344, 0.23),  # the slogan's thickening stroke (build-logo.py NAVY)
}

CELL, COLS, SCALE = 10, 24, 4


def quartz(cmyks):
    """Render CMYK swatches with Quartz and return the sRGB hex it paints for each."""
    rows = -(-len(cmyks) // COLS)
    w, h = COLS * CELL, rows * CELL
    ops = []
    for i, (c, m, y, k) in enumerate(cmyks):
        x, top = (i % COLS) * CELL, h - (i // COLS + 1) * CELL
        ops.append(f"{c:.5f} {m:.5f} {y:.5f} {k:.5f} k {x} {top} {CELL} {CELL} re f")
    writer = pypdf.PdfWriter()
    page = writer.add_blank_page(width=w, height=h)
    stream = DecodedStreamObject()
    stream.set_data("\n".join(ops).encode())
    page[NameObject("/Contents")] = writer._add_object(stream)
    tmp = pathlib.Path(tempfile.mkdtemp(prefix="brand-colours-"))
    writer.write(tmp / "swatches.pdf")
    subprocess.run(["sips", "-s", "format", "png", "-Z", str(max(w, h) * SCALE), str(tmp / "swatches.pdf"),
                    "--out", str(tmp / "swatches.png")], check=True, capture_output=True)
    # Quartz renders the PDF tagged Display P3; convert to sRGB so the numbers mean what CSS means.
    subprocess.run(["sips", "--matchTo", "/System/Library/ColorSync/Profiles/sRGB Profile.icc",
                    str(tmp / "swatches.png")], check=True, capture_output=True)
    im = Image.open(tmp / "swatches.png").convert("RGB")
    sx, sy = im.width / w, im.height / h
    out = []
    for i in range(len(cmyks)):
        cx, cy = ((i % COLS) + 0.5) * CELL * sx, ((i // COLS) + 0.5) * CELL * sy
        out.append("#%02x%02x%02x" % im.getpixel((int(cx), int(cy))))
    return out


def shading_samples(name):
    """The 64 CMYK samples of one of the logo's radial shadings, in PDF order."""
    fn = pypdf.PdfReader(LOGO_PDF).pages[2]["/Resources"]["/Shading"][name].get_object()["/Function"]
    sub = fn.get_object()["/Functions"][0].get_object()
    raw = sub.get_data()
    return [tuple(raw[i + j] / 255 for j in range(4)) for i in range(0, len(raw), 4)]


def cmyk_at(samples, offset):
    """CMYK at a gradient stop. The stitching function's Encode [1, 0] runs the samples backwards."""
    pos = (1 - offset) * (len(samples) - 1)
    i = min(int(pos), len(samples) - 2)
    f = pos - i
    return tuple(a + (b - a) * f for a, b in zip(samples[i], samples[i + 1]))


def naive(cmyk):
    c, m, y, k = cmyk
    return ((1 - c) * (1 - k), (1 - m) * (1 - k), (1 - y) * (1 - k))


def pct(stop):
    return tuple(float(v) / 100 for v in re.findall(r"([\d.]+)%", stop))


def main():
    names = list(GUIDELINE)
    palette = quartz([GUIDELINE[n] for n in names])
    print("Guideline swatches as the manual renders them:")
    for n, hexv in zip(names, palette):
        print(f"  {n:10s} {hexv}")

    shadings = [shading_samples("/Sh0"), shading_samples("/Sh1")]
    for path in TARGETS:
        svg = path.read_text()
        gradients = list(re.finditer(r"<radialGradient\b.*?</radialGradient>", svg, re.S))
        assert len(gradients) == 2, path
        jobs = []  # (span of the stop-color value, cmyk)
        for g in gradients:
            stops = list(re.finditer(r'offset="([\d.]+)" stop-color="(rgb\([^"]*\))"', g.group(0)))
            if not stops:  # already converted on an earlier run
                continue
            # pdftocairo numbers the patterns in drawing order; pick the shading whose plain conversion
            # reproduces these stops, which also proves the offset-to-sample mapping.
            def err(samples):
                return sum(sum((a - b) ** 2 for a, b in zip(naive(cmyk_at(samples, float(s.group(1)))), pct(s.group(2))))
                           for s in stops)
            # pdftocairo's own conversion is not quite the plain formula, so the fit is loose, but the
            # right shading must fit clearly better than the other.
            best, other = sorted(shadings, key=err)
            assert err(best) / len(stops) < 0.06 and err(best) * 2 < err(other), f"{path.name}: no shading fits"
            samples = best
            for s in stops:
                start = g.start() + s.start(2)
                jobs.append(((start, start + len(s.group(2))), cmyk_at(samples, float(s.group(1)))))
        flats = [(m.span(1), LOGO_FLAT[m.group(1)]) for m in
                 re.finditer(r'(?:fill|stroke)="(' + "|".join(re.escape(k) for k in LOGO_FLAT) + ')"', svg)]
        jobs += flats
        colours = quartz([cmyk for _, cmyk in jobs])
        for (span, _), hexv in sorted(zip(jobs, colours), key=lambda j: -j[0][0][0]):
            svg = svg[: span[0]] + hexv + svg[span[1]:]
        path.write_text(svg)
        print(f"recoloured {path.relative_to(ROOT)}: {len(jobs) - len(flats)} gradient stops, {len(flats)} flat fills")


if __name__ == "__main__":
    main()
