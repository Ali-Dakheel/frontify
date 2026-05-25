# Animation Audit — Original Frontify vs my clone

Captured by scrolling https://www.frontify.com/en at 1408×715 viewport and comparing to my localhost build.

The original is a **Webflow + IX2** site driving its scroll animations natively (no GSAP) through **Lenis** smooth scroll. Section heights are dynamic via IX2 pin/scroll mechanics. Animation timing is exposed at runtime via `window.Webflow.require("ix2").store.getState().ixData` — 165 events, 80 action lists.

## Measured timings (2026-05-25, via chrome-devtools-mcp)

Pulled directly from Webflow IX2's action-list definitions on the live site:

| Pattern | Source action list | Duration | Easing | Y delta |
|---|---|---:|---|---:|
| **Section reveal (dominant — used 13×)** | a-87 "Filter Nav [Scroll In]" | 400ms | `ease` (CSS default) | 50px slide |
| Section out | a-88 "Product Nav [Scroll Out]" | 400ms | `ease` | 50px slide back |
| Feature image fade-in | a-56 | 600ms | `ease` | opacity only |
| Hero bg overlay/blur | a-73 "Home Hero [Scroll Down]" | 1400ms | `ease` | opacity to 0.8 |
| Pin scene fade (`.home_hero-row`) | a-79 SCROLL_PROGRESS | scrubbed kf 50→56 | linear (parameter) | opacity 1→0 |
| Hover-in icon slide | a-15 "Link [Hover - In]" | 300ms | `outQuart` | translateX 8px |
| Pill button bg | inline `transition: background-color 0.2s` | 200ms | default `ease` | — |
| Navbar bg transition | inline `transition: background-color 0.26s` on `.ff-navbar-content` | 0.26s | default `ease` | bg **never changes** on scroll |

**Key finding:** the original uses plain CSS `ease` (cubic-bezier(0.25, 0.1, 0.25, 1)) almost everywhere — *not* a custom curve. The clone was over-easing with `[0.22, 1, 0.36, 1]` (easeOutExpo) at 700–800ms, making reveals feel slow and floaty compared to the snappier 400ms `ease` original.

## Changes applied this session

- **`SiteNavbar.tsx`** — dropped the `scrolled` state entirely (original nav bg never changes on scroll), removed the `shadow-[...]` box-shadow (original has `none`), replaced Tailwind's `backdrop-blur` (12px) with inline `backdropFilter: blur(200px)` to match. Removed `"use client"` since no hooks remain.
- **`AssistantSection.tsx`** — three reveals changed from `duration: 0.7/0.8/0.5s, ease: [0.22, 1, 0.36, 1]` to `duration: 0.4s, ease: "easeOut"`; fadeUp Y delta bumped from 32 to 50px to match a-87. Title→content delay reduced from 0.15s to 0.1s.
- **`globals.css` `.pill`** — added `.pill > svg` rule with `transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)` (= `outQuart`) and `:hover` translateX 4px. Matches the IX2 a-15 sample for chevron/arrow icons (used 8px on theirs; 4px reads better at our smaller icon sizes).

The `HeroToUpload` sticky-pin scene was left alone — it's a creative reinterpretation that combines hero + partner + upload into one 500vh section, where the original has three separate sections. The progress ranges work and changing them would be redesign, not polish.

---

## Original site architecture (legacy notes, kept for context)

| Section | Original height | Approx scroll budget | Mine now | Status |
|---|---:|---:|---:|---|
| Hero | 715 (1 vh) | 1 vh | folded into HeroToUpload | ✅ shared-element morph |
| Partner | 224 | 0.3 vh | folded into HeroToUpload | ✅ slides through during pin |
| Upload | 3830 (5.4 vh pinned) | 5.4 vh | sticky 5 vh (`HeroToUpload`) | ✅ card 0→8 spread + DAM frame |
| Engine | **3081 (4.3 vh pinned)** | 4.3 vh | 1380 (static) | ⚠️ **missing pin scene** |
| Assistant | (lazy / pinned when in view) | 2–3 vh | 1094 (static, timer-driven chat) | ⚠️ **needs scroll-driven chat** |
| Design | 2693 (3.8 vh pinned) | 3.8 vh | 2288 (autoplay cycle) | ◑ functional but not scroll-driven |
| Publish | 1009 | 1.4 vh | 906 | ◑ no entrance stagger |
| Stories | 926 | 1.3 vh | 955 | ◑ no hover pause/overlay |
| Footer | ~1100 | normal | ~1100 | ✅ matches |

---

## What's now DONE (this session)

### Hero ↔ Upload shared-element morphing ✅
`src/components/HeroToUpload.tsx` (~250 lines). 500vh container with sticky `h-screen` child. One asset card persists across both sections:

- **0 → 0.18 (hero pose):** card centered, scale 1.4, PNG/Magic hour chip overlay visible, mountain photo behind
- **0.18 → 0.32 (transition):** scale swells to 1.6 (the "zoom in" effect from the original)
- **0.32 → 0.40 (handoff):** card descends + shrinks to grid slot 0. Hero photo + text fade out. Cream backdrop + DAM frame + "Upload and it's organized" + "Nobrand › Libraries › Media" breadcrumb all fade in. Partner-logo strip swipes through.
- **0.40 → 0.65 (spread):** cards 1–7 fade in from center and translate to their 4×2 grid slots with a tilt-on-entry
- **0.65 → 0.85 (settle):** grid flat
- **0.85 → 1.00 (meta):** "✦ Metadata generating…" caption fades in

### Lenis smooth scroll ✅
`src/components/LenisProvider.tsx` — plain `new Lenis({ lerp: 0.08 })` mounted at the layout root. No special wiring; the custom scroll handler reads `getBoundingClientRect()` which picks up Lenis's lerped values automatically.

### Custom scroll handler instead of Motion's `useScroll` ✅
Discovery: Motion 12's `useScroll`/`useTransform` returned inconsistent computed values in nested sticky-pin scenes (inline `opacity:1` rendering as computed `0.39`). Replaced with a ~20-line `useEffect` + `requestAnimationFrame` listener that updates a single `progress` React state. Animations are plain CSS `transform`/`opacity` interpolated from `lerp()` / `range()` helpers. Predictable, debuggable, no spring init quirks.

---

## What's still MISSING

### 1. Engine — needs scroll-pinned scene (highest impact)
Original pins for 4.3 viewports. Search bar contents auto-type cycle ("magazine cover" → "summer campaign" → "product photography"), tiles reveal staggered, results count animates. Mine is a static section.

**Implementation:** copy the `HeroToUpload.tsx` pattern — 400vh container, sticky h-screen child, custom scroll handler. Inside: search input value driven by progress thresholds, tile opacity/translateY staggered by progress.

### 2. Assistant — convert timer-driven chat to scroll-driven
Mine uses `setTimeout` to reveal chat messages every 1.7s on viewport entry. Original reveals as user scrolls through the pin. Easy fix: same custom scroll handler, map each message's opacity to a progress slice.

### 3. Design — make pin scene scroll-driven (currently autoplay)
Mine cycles tabs/canvas on a 3.6s timer when in view. Original drives the cycle from scroll position. Same pattern as above.

### 4. Stories hover overlay
Pure CSS: on `:hover` of each card, pause video (`onMouseEnter` → `video.pause()`) and slide up an info overlay (`transform: translateY(0)` on hover, `translateY(100%)` default).

### 5. Publish tile entrance stagger
Wrap each tile in a Motion `whileInView` with `transition.delay = index * 0.05`.

### 6. Cursor follower
The original has a small custom dot cursor that follows the pointer with a tiny lerp. A `mousemove` handler + `requestAnimationFrame` + a `position: fixed` 8×8 white circle would do it.

### 7. 3D / Spline / Rive embed for visual lift
The original is pure 2D scroll choreography. Adding a Spline scene or Rive interactive in one section (maybe the hero or Design) would elevate beyond the original. This is a deliberate scope-extension, not parity work.

---

## Recommended pickup order

For the next session, in order:

1. **Engine scroll pin scene** — biggest visible gap, same pattern as Upload.
2. **Assistant scroll-driven chat** — easy port of existing timer code.
3. **Stories hover overlay** — pure CSS, ~15 min.
4. **Publish tile stagger** — pure Motion `whileInView`, ~10 min.
5. **Cursor follower** — small client component at the layout root.
6. **3D embed** — optional polish; pick Spline or Rive and integrate where it makes most visual sense.

The custom scroll handler pattern (`progress` state + `lerp`/`range` helpers + plain CSS transforms) should be the default for items 1–3. Don't use Motion's `useScroll` for these — see saved memory.
