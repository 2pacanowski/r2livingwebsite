# Real Estate Brand Guidelines

_Started 2026-05-17 11:33 UTC_

---

## User

Create a 1 page brand guideline for a boutique real estate development business.

## User

Create a 1 page brand guideline for a boutique real estate development business. The brand should blend premium & technology aesthetic. It should evoke trust and professioanlism.

Brand guildelines should inlcude: color palette, typography (headings, paragrapths etc) and all other elements that are necessary to build a website and run social media accounts.

About the business: R2 Living is a boutique real estate developer that specializes in premium residential developments for families (mostly 2 unit houses / duplexes) in the suburban areas of Warsaw, Poland. Houses are characterized by unique and modern design and functional layout. Our USP is allowing customers to customize the layout of the house (e.g. move walls, move sockets, water points etc.) to create your own home. In the future the company will also offer fit out services to allow people to move in even sooner.

## User

Continue the task

## Assistant

_[tool: update_todos]_

_[tool: write_file]_

_[tool: update_todos]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Delivered a one-page brand sheet for **R2 Living**.

**Direction:** premium architectural + quietly technical — warm neutrals (Paper / Bone / Stone / Ink) with a single Moss accent for moments of emphasis, plus Sky as a cool signal. The "R²" wordmark plays on the duplex/two-unit story and a sense of precision.

**Type system:** *Instrument Serif* for warmth and craft on headings, *Geist* for clear UI/body, *Geist Mono* for technical detail (plot numbers, dimensions, coords).

**What's on the sheet:** logo system (3 colourways + clear space rules + min sizes), 6-tone palette with HEX/RGB/CMYK and a 60/30/10 usage bar, full type scale, voice & tone with do/don't examples, visual language (floor-plan style, photography direction, R² modular pattern), and applications mocked for web, Instagram, and site hoarding.

**Next steps you might want:**
- A multi-page version (logo construction grid, full type specimen, more app mockups — sales brochure, email signature, hoarding, EDM)
- Polish-language voice examples (the copy is currently in English)
- An actual logo lockup as SVG / asset files for export

Want me to expand any of these, or explore alternate accent colours (e.g. a deeper blueprint navy or warm clay instead of moss)?

## User

The branding looks good overall but we need to work more on the logo. I love the superscript idea but the enitre logo does not read very well. The "living" section seems out of place.

## Assistant

_[tool: write_file]_

Good catch — the "Living" descriptor is fighting the mark instead of supporting it. Let me explore a few cleaner lockups side-by-side so you can pick a direction, then I'll update the main guideline sheet to match.

_[tool: done]_

Four lockup directions on one page — each shown light, dark, on moss, and in a tiny form (favicon / small-cap usage):

- **A · Stacked seal** — `R²` centered above a letterspaced `LIVING`. Boutique, fob-on-a-key-ring feel.
- **B · Horizontal · ruled** — `R²` and `Living` separated by a vertical hairline, with room for a "Boutique homes · Warsaw" sublabel. My pick — most directly fixes the floating issue.
- **C · Monogram + descriptor** — Big `R²` with a small `— Living` beneath. Fashion-house cadence.
- **D · Inline · all-serif** — Single typographic gesture, `R²` upright + `Living` in italic. The most editorial.

Tell me which to roll back into the main brand sheet (or a mix — e.g. A for social avatars, B for web/print), and I'll wire it in with a proper construction grid and clear-space rules.

_[tool: fork_verifier_agent]_

Logo options are live — let me know which direction (or mix) you'd like and I'll fold it into the main brand guidelines.

## User

Lets focus more on option D. I like the direction, let's see coouple of more variats in this style

## Assistant

_[tool: write_file]_

Six variations on the inline all-serif direction. Each explores a different lever — italic vs roman, separator, spacing, superscript proportion, and small-caps treatment.

_[tool: done]_

Six variations on Direction D, each shown light, dark, and on moss:

- **D1 · Italic descriptor** — the original. Upright `R²` + italic *Living*.
- **D2 · All roman** — both upright. Quietest, most masthead.
- **D3 · Mid-dot** — `R² · Living`. Reads like a coordinate; technical.
- **D4 · Tucked superscript** — smaller, higher `²`. Most refined — the "²" behaves like a real exponent.
- **D5 · All italic** — warmest, most atelier.
- **D6 · Letterspaced caps** — most architectural, monumental on signage.

My pick is **D4** as the primary (it directly addresses the readability you flagged — the "²" recedes so "R Living" reads first), with **D6** held back as a signage-only variant where you want maximum monumentality.

Tell me which to commit to and I'll roll it into the brand sheet with a proper construction grid + clear-space rules.

_[tool: fork_verifier_agent]_

Pick a direction (D4 + D6 is my recommendation) and I'll wire it into the main brand guidelines.

## User

Let's got with D4. Update the brand guidelines. Do not forget to create favicon and a separate R2 word mark.

## Assistant

_[tool: read_file]_

_[tool: grep]_

_[tool: str_replace_edit]_

Now I'll make the updates. Let me do them in order: CSS first, then the hero, then rebuild Section 01 with the wordmark + mark-only + favicon, then update the small instances elsewhere.

_[tool: str_replace_edit]_

Now add CSS for the favicon tiles and mark/wordmark layout, and add a construction grid:Now update the hero logo card to use the new D4 lockup:

_[tool: str_replace_edit]_

_[tool: read_file]_

_[tool: str_replace_edit]_

Now update the small logo in the web nav mock (Section 06) to use the new D4 wordmark style, and fix the IG/sign avatar in the same section:

_[tool: str_replace_edit]_

_[tool: grep]_

_[tool: show_html]_

Let me preview to make sure things look right before pushing further:

_[tool: done]_

_[tool: fork_verifier_agent]_

Updated the brand sheet with D4 as the committed wordmark:

- **Hero** now shows the full `R²Living` lockup in D4 proportions.
- **Section 01 · Logo system** rebuilt with three rows:
  - Row 1: **Wordmark** in light, ink, moss.
  - Row 2: **Mark only** (`R²`) in light + ink, and a dedicated **favicon/app-icon** cell showing 96 → 64 → 32 → 16 px tiles (ink and moss variants).
  - Row 3: **Construction & clear space** — grid overlay, cap-line, dashed clear-space frame, and a spec list (clear space = height of "²", min digital sizes per variant, min print sizes, never-do list).
- **Web nav mock** updated to use the new tiny D4 lockup.Waiting on the verifier's report on the logo section.

## User

Verifier agent check completed

## Assistant

D4 is committed. The brand sheet now carries the full wordmark, a standalone `R²` mark, and a favicon system (96 → 16 px) with construction rules. Let me know if you want me to extend it — e.g. a Polish-language voice section, more application mocks (email signature, hoarding, business card), or exported SVG/PNG asset files.

## User

Imagine you are a family looking for a house and you stumble upon a website of R2 Living that uses your branding. How do you feel about it?

## Assistant

Honest answer — let me sit in that chair for a minute.

---

**I'm 34, my wife is 32, we have a 4-year-old and a baby on the way. We've outgrown our Mokotów apartment. We've been looking for six months. I land on r2living.pl on my phone, in bed, at 11pm.**

First three seconds: *"Oh — this looks like a real company."* The serif, the moss-on-cream, the calm — it doesn't shout, doesn't have a confetti pop-up, doesn't show me a couple clinking champagne in a kitchen. I trust it instantly. I screenshot it for my wife.

Five seconds later: *"Wait — is this for us, or for people richer than us?"* It looks like a Copenhagen architecture firm. Beautiful, but there's a quiet voice asking whether I'm the target. I scroll.

I see "Plot 04 · 184 m² · ready Q3 2027." Good — concrete numbers. I see "Move walls before move-in." That sentence stops me. *That's what we wanted.* The kitchen-island fight we've been having for two months suddenly has a solution. I forward the link.

But — and this is where I want to be honest — **there's no family in this brand yet.** No kid on a balance bike on the driveway. No mum with a coffee at the window. No keys being handed over. Everything is plan, material, dimension, coordinate. I love that as someone who cares about design. But the part of me that's buying *a place where my children will learn to ride a bike* is not being spoken to.

Two more frictions:

- **"R²"** — I don't get the pun on first read. It reads "R-two." If you'd told me it means *R squared = duplex / double unit*, I'd love it. But the brand never lets me in on the joke.
- **The italic "Living"** reads like a magazine title (*Living Etc., Elle Living*). Sophisticated, but it slightly nudges the perception toward "lifestyle media" rather than "the company that built my street."

---

### The honest signal

| What it nails | What it's missing |
|---|---|
| Trustworthy, premium, grown-up | Warmth. Hands. Children. Daylight on a real floor. |
| The "configure your layout" USP lands quickly | The pun (`R²`) never gets unpacked |
| Refuses to oversell — rare in this category | A "this is for *families*" signal — currently reads more "for design people" |
| Calm, confident, quiet | Slightly cool — wouldn't hurt to let one note of warmth in |

**Two small additions would fix most of it:**

1. **A photography direction that includes people**, not just architecture. Even one image of a family at a kitchen island would re-anchor the brand to its actual customer.
2. **One sentence somewhere — maybe on the wordmark page itself — that unpacks "R²"**: *"Two homes, side by side. One street. Squared."* Now I'm in on it, and I feel smart, not excluded.

Want me to push the brand a notch warmer — add a photography spec with people in it, and a short "about the name" panel — without losing the precision?

## User

Let's incorporate sample photography that include young families (parents 30-40 years old). Let's make the pictures minimalistic & sophisticated, yet approachable  for a modern day family aspiring for a better lifestyle - nothing too elitist. People should look confident about their future and happy. Please ensure we do not use any cliche real estate photography that you can find on websites of large developers.

## Assistant

_[tool: grep]_

Good feedback to act on — let me add a proper photography direction section that puts families at the heart, with explicit anti-cliché guardrails.

Let me first find the right insertion point and read what's there:

_[tool: read_file]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now insert the new Section 06 Photography before the Applications section, and rename Applications to 07:

_[tool: done]_

_[tool: fork_verifier_agent]_

Added a dedicated Section 06 · Photography with 8 sample frames as a moodboard — each one is a documentary brief, not a brochure shot:

- **001 · "Tuesday morning, half-eaten cereal."** Mum + 4yo at the kitchen counter, window light.
- **002 · "The wall, before the wall."** Hand mid-marker on a floor plan, coffee ring, kid's crayon drawing in the corner. The configuration moment.
- **003 · "Dad, toddler, light rain."** At the open front door.
- **004 · "We thought the swing here."** Couple on an autumn terrace with mugs, imagining the garden.
- **005 · "School run, wet morning."** Backs of the family walking to the car.
- **006 · "One box. One balance bike."** Move-in day, late afternoon.
- **007 · "Five-year-old in a site helmet."** Walking the bare shell of her future room.
- **008 · "One lamp, two heads."** Father reading to a child on a window seat.

Each frame placeholder is a hand-composed light study (window light, lamp glow, autumn horizon, rainy dusk) rather than a stock-photo proxy — so the *direction* reads even before real photography is shot.

Below the grid: a **Do / Don't** strip explicitly forbidding the keys-in-the-air pose, champagne-clinking, drone subdivisions, smiling-at-camera family shots, and stock models. Plus a tight **Direction** spec card — light (natural only), lens (35/50mm primes), people (real residents, 30–40), wardrobe (their own clothes), palette (no teal-orange grade), post (warm, slight grain).Waiting on verifier check of the new Photography section.

## User

I thought you can generate those images?

## Assistant

I can't — image generation isn't one of the tools I have in this environment. What I built are styled placeholders that communicate the *brief* (lighting, framing, scene, mood) so a photographer or stock-search has something concrete to work from.

Here's what we *can* do, in order of fidelity:

1. **You upload reference images** you like the feel of (or hand-picked Unsplash links). I'll wire them into the photography section so it looks like a real moodboard.
2. **I generate prompts** for an external image generator (Midjourney, DALL-E, Imagen, etc.) — one per frame, written to your direction. You paste, we get real images, you upload them back, I integrate. Best path for "show the actual look."
3. **I curate from a free stock library** like Unsplash via direct image URLs — but honestly, "family + home" stock is exactly the cliché territory you wanted to avoid. Risky.
4. **Keep the briefs as-is** — they're useful as-is when you brief a real photographer for the shoot.

My recommendation: **option 2**. Want me to draft 8 photo-generation prompts (one per frame) calibrated to your direction — daylight only, documentary, 35/50mm primes, real wardrobe, Polish autumn — so you can paste them into Midjourney or DALL-E and bring the images back?

## User

Yes do that, but for Nano Banana

## Assistant

_[tool: write_file]_

Building a prompt sheet — eight Nano Banana prompts, one per frame, with copy buttons and the gradient placeholder beside each as a visual reference.

_[tool: done]_

Eight Nano Banana prompts, one per frame, in a companion sheet:

- **A universal "house style" suffix** at the top — paste once, append to every prompt. Defines lighting, palette, lens, wardrobe, post, *and* the anti-cliché list (no keys-in-the-air, no champagne, no drone subdivision, no teal-orange grade).
- **Eight prompt cards** — each shows the placeholder beside the full prompt, with a **Copy** button that strips formatting and writes clean prose to your clipboard.
- **Specs chips** on each (ratio, lens, light, cast) for quick scanning.
- **Working notes** at the bottom on how to use Nano Banana well — iterate via edit, don't re-roll; maintain face/location continuity by referencing previous outputs.

Workflow: paste → generate → bring the keepers back into the project, and tell me which image maps to which frame (e.g. "photo-001.jpg → R2 · PHOTO · 001"). I'll swap the gradient placeholders for the real photos in Section 06 of the brand sheet, and refresh the web/social/signage mocks too.

_[tool: fork_verifier_agent]_

Waiting on the verifier — should know shortly whether the Copy buttons behave.

## User

Verifier agent check completed

## Assistant

Copy buttons confirmed working. Generate when you're ready and drop the images back here — I'll wire them into Section 06 (and the web / IG / hoarding mocks) in place of the gradient stand-ins.

## User

Using the brand guidelines and images of buildings in the uploads folder create a mockup of the website.

## Assistant

_[tool: list_files]_

_[tool: list_files]_

_[tool: list_files]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: copy_files]_

Great — I've got four real Łomianki renderings. Let me copy them into a clean assets folder and build a high-fidelity website mockup using the brand system + this Porzeczkowa development as the featured project.

_[tool: write_file]_

_[tool: done]_

High-fidelity website mockup built around your real Łomianki renderings, used as the actual hero / gallery imagery (no stand-ins). It's a development detail page — **r2living.pl/porzeczkowa** — wrapped in a subtle browser-bar frame so it reads as a website mockup, not a rogue HTML file.

**Sections:**

1. **Sticky nav** — wordmark, links, EN/PL toggle, "Reserve" CTA
2. **Hero** — full-bleed front render, big serif headline ("Two homes. One quiet *street.*"), coordinates eyebrow, vertical scroll indicator, and a dark **fact stripe** along the bottom (plot, units, area, ready date, energy class)
3. **Section 01 · The development** — editorial three-paragraph intro + a typographic spec sheet (address, units, area, energy, heating, etc.) using Instrument Serif values with mono labels
4. **Section 02 · Renderings** — staggered gallery using all four of your renders, each captioned with mono labels
5. **Section 03 · The configurator** — duplex floor plan in SVG (with dashed moss "movable wall" and "relocatable wet point" legend) beside a four-step process (Reserve → Configure → Sign → Move in)
6. **Section 04 · Plots** — dark table-style picker: Plot A available, Plot B reserved (status dots, "Reserve" / "Waitlist" CTAs)
7. **Section 05 · Specification** — 8 material cards (Silka walls, Schüco glazing, heat pump, MVHR, oak floors, PV-ready roof, EV carport, garden)
8. **Pull quote** — full-bleed moss section with a quote + four big serif figures (build duration, configuration window, etc.)
9. **Section 06 · About R2** — three principles (precision over polish; the home is the hero; configurable not complicated)
10. **Section 07 · Reserve a viewing** — explanatory left column + working form (name, email, plot of interest, preferred day) with a confirmation on submit
11. **Footer** — wordmark, mission line, four columns (developments, company, connect, legal), legal stripe

**Notes you might want to address:**

- I used `Porzeczkowa 14A / 14B` as plot names — swap to real ones if different.
- Status: I marked **A as available, B as reserved** to demo both states. Flip as needed.
- The price is intentionally not shown — boutique convention. Easy to add if you'd like.
- Polish copy: site is currently EN with PL toggle visible but not implemented. If you want a PL version, I can build one or do a stacked bilingual layout.

_[tool: fork_verifier_agent]_

Waiting on verifier — should hear back shortly on the full page render.

## User

Verifier agent check completed

## Assistant

All clear. Website mockup is live with your real Łomianki renderings doing the heavy visual lifting. Let me know what to push on next — a Polish-language pass, a homepage above this product page, social/email templates that match, or interior renders / photo direction to fill the still-image-only sections.

## User

Apply comment

## Assistant

_[tool: str_replace_edit]_

_[tool: done]_

Swapped the two columns in the plot picker:

- **Removed:** Bedrooms · Orientation
- **Added:** Total price · Per m²

Numbers I plugged in (placeholders — adjust to your actual pricing):
- **14A** · 3 290 000 PLN · 17 880 PLN/m² · Available
- **14B** · 3 380 000 PLN · 18 370 PLN/m² · Reserved

Polish thousands-space format used. Let me know the real prices and I'll drop them in.

## User

Apply comment

## Assistant

_[tool: str_replace_edit]_

Looking at the hero, two real issues:
1. The 128px headline sits over the white walls of the building with no protected backdrop — it's hard to read.
2. The stamp, scroll indicator, and main text block are positioned independently and don't line up.

Let me fix both — strengthen the overlay, restructure the layout into a clean grid, and tune the type:

_[tool: done]_

Fixes:

- **Readability**: stronger left-side and bottom gradient on the hero image (the building is darker now), subtle text-shadow on the headline and lede, and the italic accent (`street.`) shifted from warm stone to a pale sage that contrasts better against the white walls.
- **Type scale**: headline reduced from 128px → 104px so it breathes without wrapping awkwardly.
- **Alignment**: hero restructured to a clean 3-row grid — `meta-row + stamp` at top, headline + lede + CTAs anchored as one unified block at the bottom-left, all sharing the same 56px left edge.
- **Stamp** moved into normal flow (top-right of the meta row) instead of floating absolutely.
- **Scroll indicator** lifted above the bottom fact stripe so they no longer overlap.
- **Stripe** now full-width with a centered inner container at the same 1440px width — aligns with the rest of the page.

_[tool: fork_verifier_agent]_

Waiting on the verifier's read on the hero alignment.

## User

Apply comment

## Assistant

_[tool: str_replace_edit]_

Redesigning the configurator as a proper interactive floor-plan viewer with unit + floor toggles. Let me replace the section's CSS and markup:Now replace the configurator section markup with the new viewer:

_[tool: str_replace_edit]_

Now add the JS for tab switching just before `</body>`:

_[tool: str_replace_edit]_

_[tool: done]_

Configurator redesigned around the floor plans:

- **Tabs row** at the top — **Unit A / Unit B** on the left (each with status indicator), **Ground / First / Top** floor on the right. Active tab fills with ink.
- **Plan canvas** with a subtle grid background that reads like drafting paper, compass (N), scale indicator, and plan number top-left.
- **Three floor plans** drawn as proper architectural SVGs:
  - **Ground · 92 m²** — entry, cloak, WC, utility, kitchen with island, open living/dining, stairs
  - **First · 74 m²** — master + ensuite + walk-in, two front bedrooms with balcony access, family bath, landing
  - **Top · 18 m² + 42 m² terrace** — flex/studio, small bath, large rooftop terrace with planters
- **Movable walls** dashed in moss, **wet points** as moss dots, **fixed walls** solid black
- **Side panel** updates per floor — room-by-room list (number, name, sub-description, m²), plus a "Configurable on this floor" box that shows movable wall + wet-point counts for the current floor
- **Switching to Unit B mirrors the entire plan** via CSS transform; labels counter-flip so they stay readable
- **Footer legend** showing the three line/symbol meanings + a soft CTA to book a configuration session

_[tool: fork_verifier_agent]_

Waiting on the verifier's check of the tab interactions and the mirror behavior.

## User

Verifier agent check completed

## Assistant

All five tabs working, floor plans switch cleanly, Unit B mirrors correctly with labels staying readable. Let me know what's next — interior renders, a Polish-language pass, or any other section tweaks.

