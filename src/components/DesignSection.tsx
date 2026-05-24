"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { SectionHead } from "./SectionHead";

const STAGES = [
  { label: "Frontify Templates", img: "/images/frontify/4056c3fba8727d52bc295afd8c99136a_frame-204973630.jpg" },
  { label: "Figma", img: "/images/frontify/2ab413424a0b7a5b9a0432b0683ee443_hero.jpg" },
  { label: "Webflow", img: "/images/frontify/01e9c4caa45b699ba0e374bcc69238f4_frame-204973630.jpg" },
];

const TOOLBAR = ["Logo", "Text", "Background", "Button", "Box", "Headline", "Image"];

export function DesignSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="designSection" ref={ref} className="relative w-full bg-paper" style={{ height: "260vh" }}>
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-start pt-20 md:pt-24">
        <SectionHead
          title="Adapt, localize, and publish"
          subtitle="Lock brand standards to unlock creativity with templates that allow teams to create with confidence."
          cta={{ label: "Explore templates", href: "#" }}
        />
        <div className="mx-auto mt-8 w-[min(1180px,92vw)] md:mt-10">
          <div className="flex flex-wrap justify-center gap-2">
            {STAGES.map((s, i) => (
              <Tab key={s.label} index={i} total={STAGES.length} progress={scrollYProgress} label={s.label} />
            ))}
          </div>
          <div
            className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-[24px] bg-neutral-05 shadow-[0_30px_60px_-30px_rgba(17,17,16,0.18)]"
            style={{ border: "1px solid #e1e1db" }}
          >
            {STAGES.map((s, i) => (
              <Canvas key={i} index={i} total={STAGES.length} progress={scrollYProgress} src={s.img} label={s.label} />
            ))}
            <div className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/95 px-2 py-1 shadow-sm">
              {TOOLBAR.map((t) => (
                <button key={t} className="rounded-full px-2.5 py-1 text-[11px] font-medium text-ink hover:bg-paper">
                  {t}
                </button>
              ))}
            </div>
            <div className="absolute right-6 bottom-6 z-10 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-ink shadow-sm">
              Headline · Move forwards
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function rangesFor(index: number, total: number) {
  const slice = 1 / total;
  const start = Math.max(0, index * slice - 0.06);
  const fullIn = index * slice + 0.04;
  const fullOut = (index + 1) * slice - 0.04;
  const end = Math.min(1, (index + 1) * slice + 0.06);
  return [start, fullIn, fullOut, end] as const;
}

function Tab({
  index, total, progress, label,
}: { index: number; total: number; progress: MotionValue<number>; label: string }) {
  const [a, b, c, d] = rangesFor(index, total);
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const bg = useTransform(
    progress,
    isFirst ? [b, c, d] : isLast ? [a, b, c] : [a, b, c, d],
    isFirst ? ["#111110", "#111110", "#f0f0eb"] :
    isLast ? ["#f0f0eb", "#111110", "#111110"] :
    ["#f0f0eb", "#111110", "#111110", "#f0f0eb"]
  );
  const fg = useTransform(
    progress,
    isFirst ? [b, c, d] : isLast ? [a, b, c] : [a, b, c, d],
    isFirst ? ["#f0f0eb", "#f0f0eb", "#111110"] :
    isLast ? ["#111110", "#f0f0eb", "#f0f0eb"] :
    ["#111110", "#f0f0eb", "#f0f0eb", "#111110"]
  );
  return (
    <motion.span
      style={{ backgroundColor: bg, color: fg }}
      className="rounded-full px-3.5 py-1.5 text-xs font-medium"
    >
      {label}
    </motion.span>
  );
}

function Canvas({
  index, total, progress, src, label,
}: { index: number; total: number; progress: MotionValue<number>; src: string; label: string }) {
  const [a, b, c, d] = rangesFor(index, total);
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const opacity = useTransform(
    progress,
    isFirst ? [b, c, d] : isLast ? [a, b, c] : [a, b, c, d],
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );
  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <Image src={src} alt={label} fill sizes="(min-width: 768px) 1180px, 100vw" className="object-cover" priority={isFirst} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </motion.div>
  );
}
