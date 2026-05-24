"use client";

import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  FacebookIcon,
  FrontifyLogo,
  InstagramIcon,
  LinkedInIcon,
} from "./icons";

type Column = {
  title: string;
  groups: { heading?: string; links: { label: string; href: string }[] }[];
};

const COLUMNS: Column[] = [
  {
    title: "Platform",
    groups: [
      {
        heading: "Platform",
        links: [
          { label: "Platform overview", href: "#" },
          { label: "Digital Asset Management", href: "#" },
          { label: "AI", href: "#" },
          { label: "Guidelines", href: "#" },
          { label: "Templates", href: "#" },
          { label: "Analytics", href: "#" },
          { label: "Integrations", href: "#" },
        ],
      },
      {
        heading: "By role",
        links: [
          { label: "Marketing", href: "#" },
          { label: "Brand", href: "#" },
          { label: "Creative", href: "#" },
          { label: "Sales enablement", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Partnerships",
    groups: [
      {
        links: [
          { label: "Become a partner", href: "#" },
          { label: "Find a partner", href: "#" },
          { label: "Solutions partners", href: "#" },
          { label: "Technology partners", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Learn",
    groups: [
      {
        links: [
          { label: "Blog", href: "#" },
          { label: "Customer stories", href: "#" },
          { label: "Webinars & events", href: "#" },
          { label: "Reports & guides", href: "#" },
          { label: "Help center", href: "#" },
          { label: "Brand glossary", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Frontify",
    groups: [
      {
        links: [
          { label: "About us", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Press", href: "#" },
          { label: "Contact", href: "#" },
          { label: "Trust center", href: "#" },
        ],
      },
    ],
  },
];

export function SiteFooter() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <footer
      className="relative mt-0 w-full overflow-hidden text-paper"
      style={{ background: "#111110", color: "#f0f0eb" }}
    >
      <div className="mx-auto w-full max-w-[1408px] px-6 pt-16 pb-10 md:px-10 md:pt-24 md:pb-14">
        {/* Top row */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-center">
          <div className="flex items-center gap-6">
            <FrontifyLogo className="h-9 w-9" />
            <div className="flex items-center gap-3 text-paper/80">
              <a href="#" aria-label="LinkedIn" className="rounded-full p-2 hover:bg-white/5">
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="rounded-full p-2 hover:bg-white/5">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Facebook" className="rounded-full p-2 hover:bg-white/5">
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 text-paper/70">
            <span className="font-serif text-xl text-paper">B</span>
            <span className="text-xs uppercase tracking-[0.18em] text-paper/60">Corporation</span>
          </div>
        </div>

        {/* Sitemap — desktop grid / mobile accordion */}
        <div className="hidden grid-cols-2 gap-12 pt-14 md:grid md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-sans text-sm font-medium uppercase tracking-[0.14em] text-paper/55">
                {col.title}
              </h4>
              <div className="mt-6 space-y-7">
                {col.groups.map((g, i) => (
                  <div key={i}>
                    {g.heading && i > 0 && (
                      <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-paper/40">
                        {g.heading}
                      </p>
                    )}
                    <ul className="space-y-3">
                      {g.links.map((l) => (
                        <li key={l.label}>
                          <a
                            href={l.href}
                            className="text-[15px] text-paper/85 hover:text-paper"
                          >
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="mt-10 divide-y divide-white/10 md:hidden">
          {COLUMNS.map((col) => {
            const isOpen = open === col.title;
            return (
              <div key={col.title}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : col.title)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="flex items-center gap-3 text-paper">
                    <span className="h-1.5 w-1.5 rounded-full bg-paper" />
                    {col.title}
                  </span>
                  <ChevronDown
                    className="h-4 w-4 text-paper/70 transition-transform"
                    style={{ transform: isOpen ? "rotate(180deg)" : undefined }}
                  />
                </button>
                {isOpen && (
                  <div className="pb-6 pl-5">
                    {col.groups.flatMap((g) => g.links).map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        className="block py-1.5 text-[15px] text-paper/85 hover:text-paper"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Newsletter */}
        <div className="mt-16 md:mt-24">
          <h2 className="font-serif text-4xl text-paper md:text-5xl">
            Brand news straight to your inbox:
          </h2>
          <form
            className="mt-8 flex items-center gap-3 border-b border-white/15 pb-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email"
              className="w-full bg-transparent font-serif text-3xl text-paper placeholder-paper/30 outline-none md:text-5xl"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper text-ink hover:bg-white md:h-14 md:w-14"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-paper/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Frontify AG. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li><a className="hover:text-paper" href="#">Privacy Policy</a></li>
            <li><a className="hover:text-paper" href="#">Terms of Service</a></li>
            <li><a className="hover:text-paper" href="#">Cookie Settings</a></li>
            <li><a className="hover:text-paper" href="#">Sitemap</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
