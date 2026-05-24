"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const ASSETS = [
  "/images/frontify/b2412cb2dec095326abd1e09cecad56b_hero-1.jpg", // hero card image (woman in pink)
  "/images/frontify/3375ff78547efc5714da26d418161f90_drop.jpg",
  "/images/frontify/2c87149d4cddcea8e79908f522fa5255_frame-204973284.jpg",
  "/images/frontify/4056c3fba8727d52bc295afd8c99136a_frame-16806.jpg",
  "/images/frontify/4056c3fba8727d52bc295afd8c99136a_frame-204973630.jpg",
  "/images/frontify/2ab413424a0b7a5b9a0432b0683ee443_frame-204973721.jpg",
  "/images/frontify/50806d1e004164105318177cd93cb357_frame-204973692.jpg",
  "/images/frontify/01e9c4caa45b699ba0e374bcc69238f4_frame-204973630.jpg",
];

// Target positions in a 4x2 grid (col, row). Each cell is 200x260 px.
// 4 columns x 2 rows centred at (0,0). Column offset = (col - 1.5) * 220.
function gridTarget(i: number) {
  const col = i % 4;
  const row = Math.floor(i / 4);
  return {
    x: (col - 1.5) * 220,
    y: (row - 0.5) * 280 - 20,
  };
}

export function UploadSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="uploadSection" ref={ref} className="relative w-full bg-paper" style={{ height: "220vh" }}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* DAM frame */}
        <div
          className="relative h-[80vh] w-[min(1180px,92vw)] overflow-hidden rounded-[28px] bg-neutral-05"
          style={{ border: "1px dashed #cbcbc5" }}
        >
          <div className="flex items-center gap-3 px-6 pt-5 text-xs text-ink-tertiary">
            <span className="text-base text-ink/40">◆</span>
            <span>Nobrand</span>
            <span className="text-ink-muted">&rsaquo;</span>
            <span>Libraries</span>
            <span className="text-ink-muted">&rsaquo;</span>
            <span>Media</span>
          </div>

          {/* Asset cards — each starts centered+large, animates to grid position as scroll progresses */}
          <div className="absolute inset-0 flex items-center justify-center">
            {ASSETS.map((src, i) => (
              <AssetCard key={src} index={i} total={ASSETS.length} src={src} progress={scrollYProgress} />
            ))}
          </div>
        </div>
        {/* Caption above the frame */}
        <div className="pointer-events-none absolute inset-x-0 top-6 px-6 text-center">
          <h2 className="font-serif text-[40px] font-light leading-[1.02] tracking-[-0.005em] text-ink md:text-[56px] lg:text-[64px]">
            Upload and it&rsquo;s organized
          </h2>
          <p className="mx-auto mt-3 max-w-[600px] font-sans text-sm text-ink-secondary md:text-base">
            Every asset gets tagged, described, and structured automatically. No manual metadata entry.
          </p>
        </div>
      </div>
    </section>
  );
}

function AssetCard({
  index, total, src, progress,
}: { index: number; total: number; src: string; progress: MotionValue<number> }) {
  // Stage 0–0.35: only first card visible (large, centered).
  // Stage 0.35–0.7: cards 2..N spread out, first card shrinks toward its grid spot.
  // Stage 0.7–1: grid is settled.
  const target = gridTarget(index);

  // Position: first card has slightly different starting pose (large + center).
  // All cards animate to their grid target.
  const x = useTransform(progress, [0, 0.35, 0.7], [0, 0, target.x]);
  const y = useTransform(progress, [0, 0.35, 0.7], [0, 0, target.y]);
  const scale = useTransform(
    progress,
    [0, 0.35, 0.7],
    index === 0 ? [1.4, 1.4, 1] : [0.6, 0.6, 1]
  );

  // Opacity: card 0 starts visible; others fade in between 0.35 and 0.55.
  const startFade = index === 0 ? 0 : 0.35 + (index / total) * 0.15;
  const endFade = startFade + 0.1;
  const opacity = useTransform(progress, [0, startFade, endFade, 1], [
    index === 0 ? 1 : 0,
    index === 0 ? 1 : 0,
    1,
    1,
  ]);

  return (
    <motion.div
      style={{ x, y, scale, opacity }}
      className="absolute h-[260px] w-[200px] overflow-hidden rounded-2xl bg-grey-25 shadow-[0_20px_40px_-20px_rgba(17,17,16,0.25)]"
    >
      <Image src={src} alt="" fill sizes="240px" className="object-cover" priority={index === 0} />
    </motion.div>
  );
}
