"use client";

import { useEffect, useRef, useState } from "react";
import { PlayTriangle, SparkleIcon } from "./icons";

/**
 * Combined hero → upload scene with shared asset card morphing.
 * Uses a simple scroll listener + React state for the scroll progress
 * (0 → 1 over the section's full scroll range). All animations are
 * pure CSS transforms driven from this progress value.
 */

const GRID = [
  { src: "/images/frontify/1b7dcc6820ea7481c8657b6221c43db2_hero.avif", title: "Magic hour",       ext: "PNG", op: "center bottom" },
  { src: "/images/frontify/b2412cb2dec095326abd1e09cecad56b_hero-1.jpg",     title: "Blue sky portrait",ext: "JPG", op: "center" },
  { src: "/images/frontify/3375ff78547efc5714da26d418161f90_drop.jpg",       title: "Leaf on water",    ext: "JPG", op: "center" },
  { src: "/images/frontify/2c87149d4cddcea8e79908f522fa5255_frame-204973284.jpg", title: "Grass portrait", ext: "PNG", op: "center" },
  { src: "/images/frontify/4056c3fba8727d52bc295afd8c99136a_frame-16806.jpg",     title: "Abstract rose",  ext: "JPG", op: "center" },
  { src: "/images/frontify/4056c3fba8727d52bc295afd8c99136a_frame-204973630.jpg", title: "Orange desert",  ext: "PNG", op: "center" },
  { src: "/images/frontify/2ab413424a0b7a5b9a0432b0683ee443_frame-204973721.jpg", title: "Abstract lily",  ext: "JPG", op: "center" },
  { src: "/images/frontify/50806d1e004164105318177cd93cb357_frame-204973692.jpg", title: "Green hills",    ext: "PNG", op: "center" },
];

const CELL_W = 240;
const CELL_H = 320;
function gridPos(i: number) {
  const col = i % 4;
  const row = Math.floor(i / 4);
  return { x: (col - 1.5) * CELL_W, y: (row - 0.5) * CELL_H };
}

function clamp(v: number, min = 0, max = 1) { return Math.max(min, Math.min(max, v)); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function range(p: number, start: number, end: number) {
  return clamp((p - start) / (end - start));
}

export function HeroToUpload() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    let raf = 0;
    function update() {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress 0 when section top hits viewport top; 1 when section bottom hits viewport bottom.
      const total = section.offsetHeight - vh;
      const scrolled = -rect.top;
      setProgress(clamp(scrolled / total));
    }
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Visibility ranges
  const heroBgOpacity   = 1 - range(progress, 0.20, 0.34);
  const heroTextOpacity = 1 - range(progress, 0.05, 0.14);
  const heroTextY       = -40 * range(progress, 0, 0.14);

  const partnerOpacity  = (() => {
    if (progress < 0.14) return 0;
    if (progress < 0.20) return range(progress, 0.14, 0.20);
    if (progress < 0.28) return 1;
    return 1 - range(progress, 0.28, 0.34);
  })();
  const partnerY        = lerp(40, 0, range(progress, 0.14, 0.22));

  const uploadHeadingOpacity = range(progress, 0.28, 0.40);
  const uploadHeadingY       = lerp(28, 0, range(progress, 0.28, 0.40));
  const damFrameOpacity      = range(progress, 0.26, 0.38);

  const metaOpacity = range(progress, 0.80, 0.92);

  // Card morph
  const target0 = gridPos(0);
  // Scale: hero pose (1.4) → transition swell (1.6) → upload pose (1.0)
  let cardScale = 1.4;
  if (progress < 0.18) cardScale = 1.4 + 0.2 * range(progress, 0, 0.18);
  else if (progress < 0.32) cardScale = 1.6 - 0.6 * range(progress, 0.18, 0.32);
  else cardScale = lerp(1.0, 1.0, 1);

  // Position: hero pose (y=110, x=0) → upload grid slot 0
  let cardX = 0;
  let cardY = 110;
  if (progress < 0.18) {
    cardX = 0;
    cardY = lerp(110, 140, range(progress, 0, 0.18));
  } else if (progress < 0.40) {
    const t = range(progress, 0.18, 0.40);
    cardX = lerp(0, target0.x, t);
    cardY = lerp(140, target0.y, t);
  } else {
    cardX = target0.x;
    cardY = target0.y;
  }

  // Hero chip overlay
  const chipOpacity = 1 - range(progress, 0.05, 0.18);

  return (
    <section ref={ref} className="relative w-full" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Cream backdrop */}
        <div className="absolute inset-0 z-0 bg-paper" />

        {/* Hero photo */}
        <div className="absolute inset-0 z-[1]" style={{ opacity: heroBgOpacity }}>
          <img
            src="/images/frontify/1b7dcc6820ea7481c8657b6221c43db2_hero.avif"
            alt="Mountain landscape at twilight"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a2e]/30 via-transparent to-[#0c1a2e]/55" />
        </div>

        {/* Hero text */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[14vh] z-30 mx-auto flex max-w-[1180px] flex-col items-center px-6 text-center text-white"
          style={{ opacity: heroTextOpacity, transform: `translateY(${heroTextY}px)` }}
        >
          <h1 className="max-w-[860px] font-serif text-[40px] font-light leading-[1.04] tracking-[-0.005em] sm:text-[52px] md:text-[64px] lg:text-[76px]">
            The command center for brand work
          </h1>
          <p className="mt-5 max-w-[600px] font-sans text-base text-white/90 md:text-lg">
            Bring your brand to life with the platform that unites resources and intelligent workflows.
          </p>
          <div className="pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href="#" className="pill pill-dark">Book demo</a>
            <a href="#" className="pill pill-outline-dark">
              See the platform
              <PlayTriangle className="h-2.5 w-2.5" />
            </a>
          </div>
        </div>

        {/* Partner strip */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[16vh] z-30 mx-auto flex max-w-[1408px] flex-wrap items-center justify-center gap-x-14 gap-y-6 px-6"
          style={{ opacity: partnerOpacity, transform: `translateY(${partnerY}px)` }}
        >
          {[
            { src: "/images/frontify/microsoft.png", alt: "Microsoft" },
            { src: "/images/frontify/budweiser.svg", alt: "Budweiser" },
            { src: "/images/frontify/telefo-nica.png", alt: "Telefónica" },
            { src: "/images/frontify/openai.png", alt: "OpenAI" },
            { src: "/images/frontify/bayer_munchen.png", alt: "Bayern München" },
          ].map((l) => (
            <img key={l.alt} src={l.src} alt={l.alt} className="h-7 w-auto object-contain opacity-80" />
          ))}
        </div>

        {/* Upload heading */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[10vh] z-30 mx-auto flex max-w-[1180px] flex-col items-center px-6 text-center"
          style={{ opacity: uploadHeadingOpacity, transform: `translateY(${uploadHeadingY}px)` }}
        >
          <h2 className="max-w-[820px] font-serif text-[40px] font-light leading-[1.02] tracking-[-0.005em] text-ink md:text-[56px] lg:text-[64px]">
            Upload and it&rsquo;s organized
          </h2>
          <p className="mt-4 max-w-[620px] font-sans text-base text-ink-secondary">
            Every asset gets tagged, described, and structured automatically. No manual metadata entry.
          </p>
        </div>

        {/* DAM frame */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[82vh] w-[min(1240px,94vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px]"
          style={{ opacity: damFrameOpacity }}
        >
          <div className="absolute inset-0 rounded-[28px] bg-neutral-05" style={{ border: "1px dashed #cbcbc5" }} />
          <div className="absolute inset-x-0 top-0 flex items-center gap-3 px-6 pt-5 text-xs text-ink-tertiary">
            <span className="text-base text-ink/40">◆</span>
            <span>Nobrand</span><span className="text-ink-muted">›</span>
            <span>Libraries</span><span className="text-ink-muted">›</span>
            <span>Media</span>
          </div>
        </div>

        {/* Cards 1..7 spread */}
        {GRID.slice(1).map((g, i) => (
          <SpreadCard key={g.src} index={i + 1} progress={progress} src={g.src} title={g.title} op={g.op} />
        ))}

        {/* Shared asset card */}
        <div
          className="absolute z-20 -ml-[100px] -mt-[130px] h-[260px] w-[200px] overflow-hidden rounded-2xl bg-grey-25 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate3d(${cardX}px, ${cardY}px, 0) scale(${cardScale})`,
          }}
        >
          <img
            src={GRID[0].src}
            alt={GRID[0].title}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: GRID[0].op }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5"
            style={{ opacity: chipOpacity }}
          >
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-medium text-ink shadow-sm">PNG</span>
            <span className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-medium text-ink shadow-sm">
              <span className="inline-block h-1 w-1 rounded-full bg-grey-50" />
              Magic hour
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#b60ae3] text-white shadow-sm">
              <SparkleIcon className="h-2.5 w-2.5" />
            </span>
          </div>
        </div>

        {/* Metadata caption */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[10vh] z-30 flex items-center justify-center gap-2 text-center"
          style={{ opacity: metaOpacity }}
        >
          <SparkleIcon className="h-5 w-5 text-marker-purple" />
          <span className="font-serif text-2xl text-ink">
            Metadata <span className="text-marker-purple">generating</span> …
          </span>
        </div>
      </div>
    </section>
  );
}

function SpreadCard({
  index, progress, src, title, op,
}: { index: number; progress: number; src: string; title: string; op: string }) {
  const target = gridPos(index);
  const start = 0.42 + index * 0.018;
  const end = start + 0.10;
  const t = range(progress, start, end);
  const opacity = t;
  const x = lerp(0, target.x, t);
  const y = lerp(0, target.y, t);
  const scale = lerp(0.4, 1.0, t);
  const rotate = lerp(index % 2 === 0 ? -8 : 8, index % 2 === 0 ? -2 : 2, t);

  return (
    <div
      className="absolute z-10 -ml-[100px] -mt-[130px] h-[260px] w-[200px] overflow-hidden rounded-2xl bg-grey-25 shadow-[0_20px_40px_-20px_rgba(17,17,16,0.3)]"
      style={{
        left: "50%",
        top: "50%",
        opacity,
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`,
      }}
    >
      <img src={src} alt={title} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: op }} />
    </div>
  );
}
