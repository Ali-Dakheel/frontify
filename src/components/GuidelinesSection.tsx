import Image from "next/image";
import { SearchIcon } from "./icons";
import { SectionHead } from "./SectionHead";

export function GuidelinesSection() {
  return (
    <section id="guidelinesSection" className="relative w-full bg-paper py-20 md:py-32">
      <SectionHead
        title="Check brand standards as you work"
        subtitle="Guidelines live alongside assets so teams stay compliant without switching tools or breaking their flow."
        cta={{ label: "See guidelines in action", href: "#" }}
      />
      <div className="mx-auto mt-16 w-[min(1080px,92vw)] md:mt-20">
        <div
          className="overflow-hidden rounded-[28px] bg-neutral-05 shadow-[0_30px_60px_-30px_rgba(17,17,16,0.2)]"
          style={{ border: "1px solid #e1e1db" }}
        >
          <div className="flex items-center justify-between border-b border-grey-25 bg-paper px-6 py-4">
            <p className="font-serif text-xl text-[#e7461e]">
              nobrand<sup className="-top-1 text-xs">®</sup>
            </p>
            <div className="flex items-center gap-3 text-ink-tertiary">
              <SearchIcon className="h-4 w-4" />
              <span className="inline-flex items-center gap-1">
                <span className="h-0.5 w-4 bg-current rounded" />
                <span className="h-0.5 w-4 bg-current rounded" />
              </span>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6 px-6 py-10 md:px-12 md:py-14">
            <div className="col-span-12 md:col-span-5">
              <h3 className="font-serif text-[44px] leading-[1.02] text-[#e7461e]">Photography</h3>
              <p className="mt-6 text-sm text-ink-secondary">
                Nobrand&rsquo;s photography reflects the brand&rsquo;s values of innovation, trust, and
                empowerment. It captures real-life moments, combining authenticity, diversity, and modern
                aesthetics.
              </p>
              <a href="#" className="pill pill-dark mt-7 inline-flex">
                Image library
              </a>
            </div>
            <div className="col-span-12 md:col-span-7">
              <div className="grid grid-cols-2 gap-3">
                {[
                  "/images/frontify/2c87149d4cddcea8e79908f522fa5255_frame-204973284.jpg",
                  "/images/frontify/4056c3fba8727d52bc295afd8c99136a_frame-16806.jpg",
                  "/images/frontify/b04a5715de18287657020a9ea343b999_frame-204973692.jpg",
                  "/images/frontify/3375ff78547efc5714da26d418161f90_drop.jpg",
                ].map((src) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-xl bg-grey-25">
                    <Image src={src} alt="" fill sizes="(min-width: 768px) 280px, 45vw" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
