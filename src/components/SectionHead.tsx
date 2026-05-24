import type { ReactNode } from "react";

export function SectionHead({
  title,
  subtitle,
  cta,
}: {
  title: ReactNode;
  subtitle: ReactNode;
  cta?: { label: string; href: string };
}) {
  return (
    <div className="mx-auto flex max-w-[900px] flex-col items-center px-6 text-center">
      <h2 className="font-serif text-[40px] font-light leading-[1.02] tracking-[-0.005em] text-ink md:text-[56px] lg:text-[68px]">
        {title}
      </h2>
      <p className="mt-5 max-w-[640px] font-sans text-base text-ink-secondary md:text-lg">
        {subtitle}
      </p>
      {cta && (
        <a href={cta.href} className="pill pill-dark mt-8">
          {cta.label}
        </a>
      )}
    </div>
  );
}
