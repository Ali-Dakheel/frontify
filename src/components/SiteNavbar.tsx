"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, FrontifyLogo, HamburgerIcon } from "./icons";

const ITEMS = [
  { label: "Platform", hasMenu: true },
  { label: "Customers", hasMenu: true },
  { label: "Partnerships", hasMenu: true },
  { label: "Resources", hasMenu: true },
  { label: "Pricing", hasMenu: false },
];

export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-4 z-50 mx-4 md:mx-6"
      style={{ transition: "transform 0.25s ease" }}
    >
      <nav
        className="mx-auto flex max-w-[1408px] items-center justify-between rounded-full px-3 py-2 shadow-[0_2px_18px_rgba(17,17,16,0.08)] backdrop-blur"
        style={{
          background: scrolled ? "rgba(240,240,235,0.92)" : "rgba(240,240,235,0.78)",
          color: "#111110",
          transition: "background 0.3s ease",
        }}
      >
        {/* Logo */}
        <Link href="/" aria-label="Frontify" className="flex shrink-0 items-center pl-3">
          <FrontifyLogo className="h-7 w-7" />
        </Link>

        {/* Center nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {ITEMS.map((it) => (
            <li key={it.label}>
              <button
                type="button"
                className="flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium text-ink/85 hover:bg-ink/5 hover:text-ink"
              >
                {it.label}
                {it.hasMenu && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              </button>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-1.5 pr-1">
          <button
            type="button"
            className="hidden items-center gap-1 rounded-full px-3 py-2 text-[15px] font-medium text-ink/80 hover:text-ink lg:flex"
            aria-label="Language"
          >
            EN
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </button>
          <Link
            href="#"
            className="hidden rounded-full px-3 py-2 text-[15px] font-medium text-ink/80 hover:text-ink lg:inline-flex"
          >
            Login
          </Link>
          <Link href="#" className="pill pill-dark text-[15px]">
            Demo
          </Link>
          <button
            type="button"
            aria-label="Menu"
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink/5 lg:hidden"
          >
            <HamburgerIcon />
          </button>
        </div>
      </nav>
    </header>
  );
}
