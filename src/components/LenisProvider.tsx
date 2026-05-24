"use client";
import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis lerps the document scroll position to give that "molten" feel.
 * Components reading scroll via getBoundingClientRect() (our HeroToUpload)
 * naturally pick up Lenis's smoothed values — no extra wiring required.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
