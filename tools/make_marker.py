#!/usr/bin/env python3
"""Build an AR.js pattern marker (printable .png + trained .patt) from an image.

This mirrors the AR.js marker training tool
(https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html)
so markers can be regenerated reproducibly from the command line.

Usage:
    python tools/make_marker.py <source-image> <output-basename> [--ratio 0.75]

Example:
    python tools/make_marker.py images/westerhout/2.png markers/westerhout

Writes <output-basename>.png (print or display this) and <output-basename>.patt
(loaded by the game). Requires Pillow: pip install Pillow
"""

import argparse
from pathlib import Path

from PIL import Image

MARKER_SIZE = 512
WHITE_MARGIN = 0.1  # quiet zone around the black border, as a fraction of the size
PATTERN_SIZE = 16   # AR.js samples the inner image at 16x16 per orientation


def build_marker(source: Image.Image, ratio: float) -> Image.Image:
    """Return a full marker: white margin, black border, then the image on white."""
    black_margin = (1 - 2 * WHITE_MARGIN) * ((1 - ratio) / 2)
    inner_margin = WHITE_MARGIN + black_margin

    marker = Image.new("RGB", (MARKER_SIZE, MARKER_SIZE), "white")
    border = round(MARKER_SIZE * WHITE_MARGIN)
    marker.paste("black", (border, border, MARKER_SIZE - border, MARKER_SIZE - border))

    inner = round(MARKER_SIZE * inner_margin)
    inner_size = MARKER_SIZE - 2 * inner
    canvas = Image.new("RGB", (inner_size, inner_size), "white")
    art = source.convert("RGBA")
    art.thumbnail((inner_size, inner_size), Image.LANCZOS)
    offset = ((inner_size - art.width) // 2, (inner_size - art.height) // 2)
    canvas.paste(art, offset, art)
    marker.paste(canvas, (inner, inner))
    return marker


def inner_image(marker: Image.Image, ratio: float) -> Image.Image:
    """Crop the region inside the black border, i.e. what AR.js matches against."""
    margin = WHITE_MARGIN + (1 - 2 * WHITE_MARGIN) * ((1 - ratio) / 2)
    w, h = marker.size
    return marker.crop((round(w * margin), round(h * margin),
                        round(w * (1 - margin)), round(h * (1 - margin))))


def encode_pattern(inner: Image.Image) -> str:
    """Encode the inner image as an ARToolKit .patt: 4 rotations x BGR x 16x16."""
    small = inner.convert("RGB").resize((PATTERN_SIZE, PATTERN_SIZE), Image.NEAREST)
    blocks = []
    for quarter_turns in range(4):
        pixels = small.rotate(90 * quarter_turns).load()
        rows = []
        for channel in (2, 1, 0):
            for y in range(PATTERN_SIZE):
                rows.append(" ".join(str(pixels[x, y][channel]).rjust(3)
                                     for x in range(PATTERN_SIZE)))
        blocks.append("\n".join(rows) + "\n")
    return "\n".join(blocks)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("source", type=Path, help="image to place inside the marker")
    parser.add_argument("output", type=Path, help="output path without extension")
    parser.add_argument("--ratio", type=float, default=0.75,
                        help="pattern ratio used by the existing markers (default: 0.75)")
    args = parser.parse_args()

    marker = build_marker(Image.open(args.source), args.ratio)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    marker.save(args.output.with_suffix(".png"))
    args.output.with_suffix(".patt").write_text(
        encode_pattern(inner_image(marker, args.ratio)), newline="\n")
    print(f"Wrote {args.output.with_suffix('.png')} and {args.output.with_suffix('.patt')}")


if __name__ == "__main__":
    main()
