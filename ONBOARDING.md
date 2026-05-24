# Onboarding — Frontify.com clone

You're picking up a Next.js 16 clone of https://www.frontify.com/en. The current state is a working build with the headline scroll animation (hero → upload card morph) in place, plus several supporting sections. The remaining work is mostly **converting the static feature sections into scroll-pinned scenes** to match the original's depth.

## Stack

- **Next.js 16.2.1** (App Router, React 19, Turbopack) — read `node_modules/next/dist/docs/` before assuming APIs; v16 has breaking changes.
- **Tailwind v4** via `@theme inline` in `src/app/globals.css`. Custom tokens for `--color-paper`, `--color-ink`, `--color-marker-purple`, the grey ramp.
- **Self-hosted fonts**: `ABC Diatype` (body) + `Cranny` (display serif). Loaded via `next/font/local` in `src/app/layout.tsx`.
- **Motion 12** (`motion/react`) for hover/reveal animations, `AnimatePresence` swaps, timer-driven cycles.
- **Lenis 1** for smooth document scroll, mounted in `src/components/LenisProvider.tsx` at the layout root.
- **shadcn/ui + Radix** scaffolding already in place (unused so far — sections are bespoke).

## Repo map

```
src/
  app/
    layout.tsx            # Root layout, fonts, LenisProvider
    page.tsx              # Section composition
    globals.css           # Frontify design tokens, marquee + pill utilities
  components/
    SiteNavbar.tsx        # Floating cream pill nav
    HeroToUpload.tsx      # 500vh scroll-driven scene with shared asset card morph
    EngineSection.tsx     # Static search demo (TODO: scroll-pinned scene)
    GuidelinesSection.tsx # Static nobrand portal panel
    AssistantSection.tsx  # Timer-driven chat (TODO: scroll-driven)
    DesignSection.tsx     # Autoplay tab cycle (TODO: scroll-driven)
    PublishSection.tsx    # Marquee + grids
    StoriesSection.tsx    # 4 autoplay video cards (TODO: hover overlay)
    SiteFooter.tsx        # Dark footer
    SectionHead.tsx       # Shared heading + subhead + CTA pill
    LenisProvider.tsx     # Lenis lerp scroll
    icons.tsx             # Inline SVG icons
public/
  fonts/                  # 18 woff2 files (8 Diatype + 10 Cranny)
  images/frontify/        # 39 brand/asset images
  videos/frontify/        # 6 mp4 + 4 poster jpgs
docs/research/
  PAGE_TOPOLOGY.md        # Section layout of the original
  DESIGN_TOKENS.md        # Color palette, fonts, spacing
  BEHAVIORS.md            # Interaction behavior bible
  ANIMATION_AUDIT.md      # ← READ THIS — gap analysis + pickup order
scripts/
  discover-assets.mjs     # Crawls the live page for asset URLs
  download-assets.mjs     # Mirrors them to public/
  _asset-map.json         # public path → original URL mapping
```

## Commands

```bash
npm run dev       # http://localhost:3000
npm run build     # Production build (Turbopack)
npm run typecheck # tsc --noEmit
npm run lint
npm run check     # lint + typecheck + build
```

## Critical gotchas (saved as memory, worth re-reading)

### 1. Don't use Motion's `useScroll` for scroll-pinned scenes
Motion 12's `useScroll` + `useTransform` was unreliable in nested sticky-pin layouts here — elements with inline `style="opacity:1"` rendered as computed `0.39`. Couldn't track to a root cause.

**Use the pattern from `HeroToUpload.tsx` instead:**
```tsx
const [progress, setProgress] = useState(0);
useEffect(() => {
  const section = ref.current; if (!section) return;
  let raf = 0;
  function update() {
    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    setProgress(clamp(-rect.top / total));
  }
  function onScroll() { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  return () => { /* cleanup */ };
}, []);

// then for each animated element:
const heroOpacity = 1 - range(progress, 0.20, 0.34);
return <div style={{ opacity: heroOpacity, transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})` }} />
```

Motion is still great for `whileInView`, `AnimatePresence`, hover/tap states — just not the long sticky pin choreography.

### 2. Don't use `<Image fill />` inside opacity-animated motion divs
Next.js `Image` with `fill` rendered inside a `motion.div` that has its `style.opacity` updating every frame **does not paint visibly**, even though `getComputedStyle(img).opacity === "1"`. Swap to plain `<img class="absolute inset-0 h-full w-full object-cover">` inside scroll-driven scenes. `next/image` is fine for static sections.

### 3. Lenis needs zero integration with the custom scroll handler
Don't wire `lenis.on("scroll", ...)` to anything. Don't drive Lenis from GSAP's ticker. The plain `requestAnimationFrame(lenis.raf)` setup in `LenisProvider.tsx` works because `getBoundingClientRect()` reads the document scroll natively, and Lenis updates that scroll position — so the bounding rect naturally reflects the lerped value. Any additional integration broke things.

## What's done & what's next

See **`docs/research/ANIMATION_AUDIT.md`** — it's the source of truth.

**TL;DR:**
- ✅ Hero → Upload shared-element scroll morph (the headline animation)
- ✅ Lenis smooth scroll
- ✅ All 11 sections render with correct content/typography/colors
- ⚠️ Engine, Assistant, Design need conversion from static/timer to scroll-pinned scenes
- ⚠️ Stories needs hover pause + info overlay
- ◑ Polish: cursor follower, entrance stagger on Publish tiles, possibly a Spline/Rive 3D embed

**Recommended next change:** Engine scroll pin scene. Same pattern as `HeroToUpload.tsx`. The original pins for 4.3 viewports with auto-typed search + staggered tile reveal.

## Source URL

The original is at https://www.frontify.com/en. Open it in a browser and scroll slowly to understand the choreography before changing animations.
