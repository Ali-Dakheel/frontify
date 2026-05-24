# Animation Audit — Original Frontify vs my clone

Captured by scrolling https://www.frontify.com/en at 1408×715 viewport and comparing to my localhost build.

The original is a Webflow site driving **GSAP ScrollTrigger pin scenes** through **Lenis** smooth scroll. Section heights are dynamic — once a pin scene activates, GSAP injects a `pin-spacer` that grows the section to several viewports tall. After scrolling the entire page, the heights settle as:

| Section | Original height | Approx scroll budget | Mine now | Type |
|---|---:|---:|---:|---|
| Hero | 715 (1 vh) | 1 vh | 991 (1.4 vh) | static |
| Partner | 224 | 0.3 vh | 176 | static |
| Upload | **3830** | 5.4 vh pinned | 2145 (sticky 2.2 vh) | scroll-driven |
| Engine | **3081** | 4.3 vh pinned | 1380 (static) | static |
| Assistant | (lazy / pinned when in view) | 2–3 vh | 1094 (static) | static |
| Design | **2693** | 3.8 vh pinned | 2288 (sticky 2.6 vh) | scroll-driven |
| Publish | 1009 | 1.4 vh | 906 | static |
| Stories | 926 | 1.3 vh | 955 | static |
| Footer | ~1100 | normal | ~1100 | static |

Three sections that I have as **static** are scroll-pinned in the original: **Engine**, **Assistant**, **Upload (longer)**.

---

## Hero → Upload handoff (the most visible delta)

**Original behaviour, scroll 0 → 1100:**
- 0: full hero — title up top, mountain photo bg, asset card centered with `PNG`/`Magic hour` chip overlay.
- 200: title scrolls up out of viewport. The asset card visibly **grows** (its inner photo expands) and the card frame **descends** within the viewport.
- 500: title gone. Card frame is huge — almost the full viewport height. Partner logos (Microsoft, Budweiser, Telefónica, OpenAI, Bayern) start appearing on cream below.
- 800: hero photo scrolls out behind the card. The asset card is *still on screen*, now overlapping the cream upload section. The empty hero-card frame outline lingers above while the card-with-content drops down.
- 1100: partner logos at top, cream background, asset card has descended into the upload section's DAM frame area. "Upload and it's organized" heading appears above it.

**My behaviour, scroll 0 → 1100:**
- Hero is a normal static section ending at ~991.
- Partner section starts at 991.
- Upload section starts at 1207, sticky frame appears with 1 card large in the center.
- No visual continuity — there's a hard cut between hero (dark photo) and partner (cream) and upload (cream + card).

**Gap to close:** the asset card on the hero needs to **persist and grow** as you scroll, then **descend and shrink** into the upload DAM frame at the precise moment the upload section pins. The single card I land on in upload should be the **same DOM element** as the hero asset card so there's no flicker.

---

## Upload pinned scene (the cards-spread choreography)

**Original behaviour (pinned across ~5.4 viewports):**
1. Stage 0 (0–20% of pin): DAM frame visible with `Nobrand › Libraries › Media` breadcrumb. 1 large asset card centered.
2. Stage 1 (20–50%): 7 more cards fade in and **spread out** to a 4×2 grid, with subtle rotations on entry. Each card has a slight tilt.
3. Stage 2 (50–75%): Card titles fade in below each card ("Blue sky portrait", "Leaf on water", "Grass portrait", "Abstract rose", "Orange desert", "Abstract lily", "Green hills", "Industry Future"). File-type labels (PNG/JPG) appear below the titles.
4. Stage 3 (75–100%): A purple **"✦ Metadata generating…"** text fades in below the grid.

**My behaviour:** cards spread but I never show titles, file-types, or the "Metadata generating…" stage.

---

## Engine pinned scene (haven't fully observed in my latest sweep but here's what I have)

**Original (pinned across ~4.3 viewports):** Search bar with cycling auto-typed queries (likely "magazine cover" → "summer campaign" → etc.), filter chips animating in, asset tiles appearing in the grid one-by-one as the search "executes."

**Mine:** static — search bar + 4×2 tile grid all rendered at once. No cycling typed queries, no tile reveal animation.

---

## Guidelines (`nobrand` portal)

**Original:** scrolls in normally with a subtle fade-up. Photo grid is static.

**Mine:** matches — static section, looks correct.

---

## Assistant chat

**Original:** when pinned, the chat messages reveal one-by-one as scroll progresses through the pin. The 4 turns appear over the section's scroll range.

**Mine:** messages reveal one-by-one on a **timer** (every 1.7s) when the section enters viewport. Not scroll-driven.

---

## Design (3-platform cycle)

**Original (pinned across ~3.8 viewports):** three tab pills `Frontify Templates` / `Figma` / `Webflow` cycle. Active tab is dark-filled, others light. Canvas image cross-fades to match.

**Mine:** matches structurally — sticky pin, 3 tabs cycle, canvas cross-fades. The timing/easing might feel slightly different from the original but the choreography is right.

---

## Publish (marquee + tiles)

**Original:** file-format chip strip (AI/DOCX/SVG/JPEG/PNG/PDF/MP4/PSD) marquees horizontally. Template & integration tiles fade in.

**Mine:** matches structurally — marquee works, tiles render. No entrance fade on tiles (they just render).

---

## Stories (4 video cards)

**Original:** 4 cards in a row, each plays a looping muted video. On hover, the video pauses and an overlay info card slides up.

**Mine:** 4 cards in a row playing looping muted videos. No hover overlay animation.

---

## Plan (in priority order)

The user picked **"true shared-element morphing"** for fidelity. Here's what that needs:

### 1. Hero → Upload shared asset card (the headline change)

Wrap **both** Hero and Upload sections in a single parent that owns a `useScroll` covering the combined scroll range. The asset card is a single `motion.div` whose position/size/opacity is driven by that combined progress:
- Range 0–0.3 (hero scroll): card sits in hero, grows ~20% in scale.
- Range 0.3–0.5 (between sections): card descends and shrinks toward the DAM frame center.
- Range 0.5–1 (upload scroll): card sits as "card 0" in the DAM frame; the other 7 cards fade in and spread.

This way there's literally one DOM element morphing from hero to upload — no flicker, perfect continuity.

### 2. Add Lenis smooth scroll (the feel change)

Lenis intercepts wheel events and interpolates scroll position with `lerp`. Motion's `useScroll` reads from native `window.scrollY`, which Lenis updates each frame — they're compatible without special wiring. Smooth scroll is the single biggest "this feels like the original" lever.

### 3. Wrap scroll progress in `useSpring`

Inside each scroll-driven section, `const smoothed = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })` — this catches up to scroll with a small lag and a tiny overshoot, making cross-fades feel less mechanical.

### 4. Upload pinned scene additions

Add the stages I'm missing inside the sticky frame:
- Card titles (`Blue sky portrait`, etc.) fade in beneath each card around 0.55 of the upload pin's progress.
- File-type tags (PNG/JPG) fade in below titles at 0.7.
- `✦ Metadata generating…` text fades in below grid at 0.85.

### 5. Engine pinned scene rebuild

Convert Engine from static to a sticky pin scene where:
- Search bar contents auto-type cycle ("magazine cover" → "summer campaign" → "product photography") driven by scroll.
- Tiles reveal staggered as scroll progresses.

### 6. Assistant scroll-driven chat

Convert from timer-based reveal to scroll-progress-driven reveal — same visual but the messages appear as you scroll, like the original.

### 7. Stories hover overlay

Add a hover state where the card video pauses and an info slide rises up. Pure CSS hover would do this.

---

## What to implement now

User wants the headline change (shared-element morphing), so the next code step is **#1 + #2 + #3** as a unit. The remaining items can be added once that handoff feels right.
