import Image from "next/image";
import { PlusIcon } from "./icons";
import { SectionHead } from "./SectionHead";

const FORMATS = ["AI", "DOCX", "SVG", "JPEG", "PNG", "PDF", "MP4", "PSD"];

const TEMPLATES = [
  "Case study library",
  "Onboarding hub",
  "Brand Guideline",
  "Campaign",
  "Internal portal",
];

const INTEGRATIONS = [
  { src: "/images/frontify/figma.png", name: "Figma" },
  { src: "/images/frontify/gettyimages.png", name: "Getty Images" },
  { src: "/images/frontify/google.png", name: "Google" },
  { src: "/images/frontify/okta.png", name: "Okta" },
  { src: "/images/frontify/hubspot.png", name: "HubSpot" },
  { src: "/images/frontify/webflow.png", name: "Webflow" },
  { src: "/images/frontify/adobe-cc.png", name: "Adobe CC" },
  { src: "/images/frontify/sketch.png", name: "Sketch" },
  { src: "/images/frontify/wordpress.png", name: "WordPress" },
];

export function PublishSection() {
  return (
    <section id="publishSection" className="relative w-full bg-paper py-20 md:py-32">
      <SectionHead
        title="Connects to your tech stack"
        subtitle="Push assets directly to your CMS, design tools, and marketing platforms — no reformatting, no re-uploading."
        cta={{ label: "Browse integrations", href: "#" }}
      />

      <div className="relative mt-14 w-full overflow-hidden md:mt-20">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent md:w-40" />
        <ul className="flex w-max items-center gap-4 animate-marquee">
          {[...FORMATS, ...FORMATS, ...FORMATS].map((f, i) => (
            <li
              key={`${f}-${i}`}
              className="flex h-32 w-44 shrink-0 items-center justify-center rounded-2xl bg-grey-25 font-sans text-2xl font-medium text-ink-tertiary"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-8 w-full max-w-[1180px] px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {TEMPLATES.map((t) => (
            <div
              key={t}
              className="flex flex-col gap-3 rounded-2xl bg-neutral-05 p-4"
              style={{ border: "1px solid #e1e1db" }}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-grey-25 text-ink">
                <PlusIcon className="h-3.5 w-3.5" />
              </div>
              <p className="text-sm font-medium text-ink">{t}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-3 gap-4 md:grid-cols-9">
          {INTEGRATIONS.map((i) => (
            <div
              key={i.name}
              className="flex h-16 items-center justify-center rounded-xl bg-paper"
              style={{ border: "1px solid #e1e1db" }}
              title={i.name}
            >
              <Image
                src={i.src}
                alt={i.name}
                width={80}
                height={32}
                className="h-7 w-auto object-contain opacity-80"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
