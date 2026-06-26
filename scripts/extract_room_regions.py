#!/usr/bin/env python3
# Dev-only tool: derive per-room hover polygons for Wspolna floor-plan SVGs.
# For each SVG: rasterize via render_svg.js, parse circle/text room markers from
# the XML, flood-fill from each marker's pixel position (walls = barrier), trace
# the resulting region's contour, and write simplified polygons (in SVG viewBox
# units) to room-regions.json.
import json
import math
import re
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import binary_dilation, label
from skimage.measure import approximate_polygon, find_contours

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "site" / "assets" / "wspolna-floor-plans"
SCRATCH = Path("/tmp/claude-0/-home-user-r2livingwebsite/54f88ad6-341a-5fc6-bf5a-d6cf5e083a22/scratchpad/rooms")
SCRATCH.mkdir(parents=True, exist_ok=True)
RENDER_SCRIPT = ROOT / "scripts" / "render_svg.js"
SCALE = 4
DARK_THRESHOLD = 150  # grayscale value below which a pixel counts as "wall"
DILATE_ITERS = 1  # close anti-aliasing gaps in hatched walls

# Rooms 1 (hall), 2 (living/dining), 3 (kitchen) share one true open-plan space
# with no dividing wall, so flood-fill alone merges them into a single region.
# These are eyeballed straight-line dividers (in SVG viewBox units, not real
# walls) added only to split that open area into approximate per-room zones
# for hover purposes.
MANUAL_DIVIDERS = {
    "wspolna-unitA-ground": [
        (200, 120, 200, 560),  # kitchen (x<200) vs living/hall (x>200)
        (200, 460, 400, 460),  # living (y<460) vs hall (y>460), right of kitchen
    ],
    "wspolna-unitB-ground": [
        (470, 120, 470, 560),  # kitchen (x>470) vs living/hall (x<470)
        (230, 460, 470, 460),  # living (y<460) vs hall (y>460), left of kitchen
    ],
}


def parse_markers(svg_text):
    circles = [
        (float(m.group("cx")), float(m.group("cy")), float(m.group("r")))
        for m in re.finditer(
            r'<circle[^>]*\bcx="(?P<cx>[\d.]+)"[^>]*\bcy="(?P<cy>[\d.]+)"[^>]*\br="(?P<r>[\d.]+)"',
            svg_text,
        )
    ]
    texts = []
    for m in re.finditer(
        r'<text[^>]*transform="translate\(([\d.\-]+) ([\d.\-]+)\)"[^>]*><tspan[^>]*>(\d+)</tspan>',
        svg_text,
    ):
        texts.append((float(m.group(1)), float(m.group(2)), m.group(3)))
    if not texts:
        # fallback: any text/tspan pair without transform on the <text> itself
        for m in re.finditer(r'<text[^>]*x="([\d.\-]+)"[^>]*y="([\d.\-]+)"[^>]*><tspan[^>]*>(\d+)</tspan>', svg_text):
            texts.append((float(m.group(1)), float(m.group(2)), m.group(3)))

    markers = {}
    for cx, cy, r in circles:
        best = min(texts, key=lambda t: math.hypot(t[0] - cx, t[1] - cy))
        num = best[2].zfill(2)
        markers[num] = (cx, cy, r)
    return markers


def rasterize(svg_path, png_path):
    out = subprocess.run(
        ["node", str(RENDER_SCRIPT), str(svg_path), str(png_path), str(SCALE)],
        capture_output=True, text=True, check=True,
    )
    return json.loads(out.stdout.strip())


def flood_fill_region(barrier_mask, seed_xy, start_radius, max_search_radius=200):
    # The marker is a filled circle (with a light-colored digit glyph punched into
    # it) drawn in the same color as walls, so we must search starting just past
    # the circle's own radius -- otherwise the search finds the glyph's light
    # pixels and mistakes the inside of the digit for the surrounding room.
    h, w = barrier_mask.shape
    sx, sy = int(round(seed_xy[0])), int(round(seed_xy[1]))
    found = False
    for r in range(start_radius, max_search_radius):
        for dy in range(-r, r + 1):
            for dx in range(-r, r + 1):
                if abs(dy) != r and abs(dx) != r:
                    continue  # only the ring at this radius
                ny, nx = sy + dy, sx + dx
                if 0 <= ny < h and 0 <= nx < w and not barrier_mask[ny, nx]:
                    sy, sx = ny, nx
                    found = True
                    break
            if found:
                break
        if found:
            break
    if not found:
        raise RuntimeError(f"could not find free pixel near seed {seed_xy}")

    free = ~barrier_mask
    labels, _ = label(free)
    return labels == labels[sy, sx]


def trace_polygon(region_mask, tolerance=2.5):
    contours = find_contours(region_mask.astype(float), level=0.5)
    if not contours:
        return None
    contour = max(contours, key=len)
    simplified = approximate_polygon(contour, tolerance=tolerance)
    # contour coords are (row, col) = (y, x); flip to (x, y)
    return [[float(p[1]), float(p[0])] for p in simplified]


def process(svg_path, scale_for_dilate=1):
    svg_text = svg_path.read_text()
    markers = parse_markers(svg_text)

    png_path = SCRATCH / (svg_path.stem + "-raster.png")
    meta = rasterize(svg_path, png_path)
    scale = meta["scale"]

    img = np.array(Image.open(png_path).convert("L"))
    barrier = img < DARK_THRESHOLD
    if DILATE_ITERS:
        barrier = binary_dilation(barrier, iterations=DILATE_ITERS)

    dividers = MANUAL_DIVIDERS.get(svg_path.stem)
    if dividers:
        barrier_img = Image.fromarray(barrier)
        draw = ImageDraw.Draw(barrier_img)
        for x1, y1, x2, y2 in dividers:
            draw.line(
                [(x1 * scale, y1 * scale), (x2 * scale, y2 * scale)],
                fill=1, width=max(2, int(2 * scale)),
            )
        barrier = np.array(barrier_img)

    regions = {}
    for num, (cx, cy, r) in markers.items():
        px, py = cx * scale, cy * scale
        start_radius = int(r * scale) + 4
        region_mask = flood_fill_region(barrier, (px, py), start_radius)
        poly_px = trace_polygon(region_mask)
        if poly_px is None:
            continue
        poly_svg = [[round(x / scale, 2), round(y / scale, 2)] for x, y in poly_px]
        regions[num] = poly_svg

    return regions, meta, img.shape


def main():
    targets = [
        ("unitA", "ground", ASSETS / "wspolna-unitA-ground.svg"),
        ("unitB", "ground", ASSETS / "wspolna-unitB-ground.svg"),
    ]
    out = {}
    for unit, floor, svg_path in targets:
        regions, meta, shape = process(svg_path)
        out.setdefault(unit, {})[floor] = {
            "viewBox": f"0 0 {meta['vbW']} {meta['vbH']}",
            "rooms": regions,
        }
        print(f"{unit}/{floor}: {len(regions)} rooms, raster {shape}", file=sys.stderr)

    out_path = ASSETS / "room-regions.json"
    out_path.write_text(json.dumps(out, separators=(",", ":")))
    print(f"wrote {out_path}")


if __name__ == "__main__":
    main()
