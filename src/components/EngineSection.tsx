import Image from "next/image";
import { SectionHead } from "./SectionHead";
import { ChevronDown, SearchIcon } from "./icons";

const FILTERS = ["Category", "Type", "Industry"];

const TILES = [
  "/images/frontify/4056c3fba8727d52bc295afd8c99136a_frame-204973630.jpg",
  "/images/frontify/3375ff78547efc5714da26d418161f90_drop.jpg",
  "/images/frontify/39c43f63f2bc50e78dbb81afca9ef390_frame-204973721.jpg",
  "/images/frontify/2ab413424a0b7a5b9a0432b0683ee443_frame-204973721.jpg",
  "/images/frontify/50806d1e004164105318177cd93cb357_frame-204973692.jpg",
  "/images/frontify/01e9c4caa45b699ba0e374bcc69238f4_frame-204973630.jpg",
  "/images/frontify/b04a5715de18287657020a9ea343b999_frame-204973692.jpg",
  "/images/frontify/4d1cea1211da09385bf5408da923e713_frame-204973284.jpg",
];

export function EngineSection() {
  return (
    <section id="engineSection" className="relative w-full bg-paper py-24 md:py-32">
      <SectionHead
        title="Find anything, instantly"
        subtitle="Smart search cuts through thousands of assets in seconds so projects move faster."
        cta={{ label: "See how it works", href: "#" }}
      />
      <div className="mx-auto mt-12 w-full max-w-[1080px] px-6 md:mt-16">
        <div
          className="flex items-center gap-3 rounded-full bg-neutral-05 pl-5 pr-2 py-2 shadow-[0_8px_24px_-12px_rgba(17,17,16,0.12)]"
          style={{ border: "1px solid #e1e1db" }}
        >
          <SearchIcon className="h-4 w-4 text-ink-tertiary" />
          <input
            placeholder="Search assets"
            className="h-10 flex-1 bg-transparent text-ink placeholder-ink-muted outline-none"
          />
          <button className="pill pill-dark text-sm">Search</button>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              className="inline-flex items-center gap-1 rounded-full bg-paper px-3.5 py-2 text-sm text-ink"
              style={{ border: "1px solid #cbcbc5" }}
            >
              {f}
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </button>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between text-sm text-ink-secondary">
          <p>
            Assets <span className="ml-2 rounded-full bg-grey-25 px-2 py-0.5 text-xs">1046</span>
          </p>
          <p>
            Sort by <span className="font-medium text-ink">Newest first</span>
          </p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          {TILES.slice(0, 8).map((src) => (
            <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-grey-25">
              <Image src={src} alt="" fill sizes="(min-width: 768px) 220px, 40vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
