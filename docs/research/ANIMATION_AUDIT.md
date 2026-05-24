# Animation Audit — Original Frontify vs my clone

Captured by scrolling https://www.frontify.com/en at 1408×715 viewport and comparing to my localhost build.

The original is a Webflow site driving **GSAP ScrollTrigger pin scenes** through **Lenis** smooth scroll. Section heights are dynamic — once a pin scene activates, GSAP injects a `pin-spacer` that grows the section to several viewports tall.

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
