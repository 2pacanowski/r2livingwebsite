#!/usr/bin/env python3
# Dev-only: overlay extracted room polygons on the rasterized floor plan for visual QA.
import json
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "site" / "assets" / "wspolna-floor-plans"
SCRATCH = Path("/tmp/claude-0/-home-user-r2livingwebsite/54f88ad6-341a-5fc6-bf5a-d6cf5e083a22/scratchpad/rooms")

regions = json.loads((ASSETS / "room-regions.json").read_text())
COLORS = [
    (255, 0, 0, 90), (0, 150, 0, 90), (0, 0, 255, 90), (255, 150, 0, 90),
    (200, 0, 200, 90), (0, 200, 200, 90), (150, 75, 0, 90), (100, 100, 255, 90),
]

for unit, floors in regions.items():
    for floor, data in floors.items():
        rooms = data["rooms"]
        png = SCRATCH / f"wspolna-{unit}-{floor}-raster.png"
        base = Image.open(png).convert("RGBA")
        # raster is at SCALE=4 in svg units; polygons are in svg units, so scale up
        overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)
        for i, (num, poly) in enumerate(sorted(rooms.items())):
            pts = [(x * 4, y * 4) for x, y in poly]
            draw.polygon(pts, fill=COLORS[i % len(COLORS)], outline=(0, 0, 0, 255))
        combined = Image.alpha_composite(base, overlay)
        out_path = SCRATCH / f"{unit}-{floor}-overlay.png"
        combined.convert("RGB").save(out_path)
        print(out_path)
