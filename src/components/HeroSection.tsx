"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { PlayTriangle, SparkleIcon } from "./icons";

const STAGES = [
  { label1: "PNG", label2: "Magic hour" },
  { label1: "JPG", label2: "Editorial" },
  { label1: "MP4", label2: "Cinematic" },
  { label1: "PNG", label2: "Lifestyle" },
];

export function HeroSection() {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setStage((s) => (s + 1) % STAGES.length), 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#0c1a2e] text-white">
      <div className="relative isolate flex min-h-screen w-full flex-col items-center pt-28 pb-20 md:pt-32 md:pb-28">
        <Image
          src="/images/frontify/1b7dcc6820ea7481c8657b6221c43db2_hero.avif"
          alt="Mountain landscape at twilight"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0c1a2e]/35 via-transparent to-[#0c1a2e]/55" />

        <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[860px] font-serif text-[40px] font-light leading-[1.04] tracking-[-0.005em] text-white sm:text-[52px] md:text-[64px] lg:text-[76px]"
          >
            The command center for brand work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-[600px] font-sans text-base text-white/90 md:text-lg"
          >
            Bring your brand to life with the platform that unites resources and intelligent workflows.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <a href="#" className="pill pill-dark">Book demo</a>
            <a href="#" className="pill pill-outline-dark">
              See the platform
              <PlayTriangle className="h-2.5 w-2.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-10 inline-flex w-[240px] flex-col items-center rounded-3xl bg-white/10 p-2 backdrop-blur-md sm:w-[280px] md:mt-14 md:w-[320px]"
            style={{ border: "1px solid rgba(255,255,255,0.16)" }}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/frontify/2ab413424a0b7a5b9a0432b0683ee443_hero.jpg"
                alt="Asset preview"
                fill
                sizes="(min-width: 768px) 320px, 70vw"
                className="object-cover"
              />
            </div>
            {/* Cycling label row — single slot, AnimatePresence swaps between stages */}
            <div className="relative -mt-5 h-9 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 flex items-center justify-center gap-1.5"
                >
                  <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-ink shadow-sm">
                    {STAGES[stage].label1}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-ink shadow-sm">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-grey-50" />
                    {STAGES[stage].label2}
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#b60ae3] text-white shadow-sm">
                    <SparkleIcon className="h-3.5 w-3.5" />
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
