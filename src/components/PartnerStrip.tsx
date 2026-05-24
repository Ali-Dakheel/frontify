import Image from "next/image";

type Logo = { src: string; alt: string };

// Order curated from the live page — black-on-cream brand marks.
const LOGOS: Logo[] = [
  { src: "/images/frontify/budweiser.svg", alt: "Budweiser" },
  { src: "/images/frontify/telefo-nica.png", alt: "Telefónica" },
  { src: "/images/frontify/openai.png", alt: "OpenAI" },
  { src: "/images/frontify/microsoft.png", alt: "Microsoft" },
  { src: "/images/frontify/uber.svg", alt: "Uber" },
  { src: "/images/frontify/bayer_munchen.png", alt: "FC Bayern München" },
  { src: "/images/frontify/kia_europe.png", alt: "Kia Europe" },
  { src: "/images/frontify/lufthansa_group.png", alt: "Lufthansa Group" },
  { src: "/images/frontify/alfa-laval.svg", alt: "Alfa Laval" },
  { src: "/images/frontify/skyscanner.svg", alt: "Skyscanner" },
];

export function PartnerStrip() {
  const loop = [...LOGOS, ...LOGOS];
  return (
    <section
      className="relative isolate w-full overflow-hidden bg-paper py-12 md:py-16"
      aria-label="Customers"
    >
      {/* Marquee */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent md:w-40" />
        <ul className="flex w-max items-center gap-14 animate-marquee md:gap-20">
          {loop.map((l, i) => (
            <li
              key={`${l.alt}-${i}`}
              className="flex h-12 shrink-0 items-center text-ink"
            >
              <Image
                src={l.src}
                alt={l.alt}
                width={160}
                height={48}
                className="h-9 w-auto select-none object-contain md:h-11"
                draggable={false}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
