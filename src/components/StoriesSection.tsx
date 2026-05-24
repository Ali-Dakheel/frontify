import Image from "next/image";
import { SectionHead } from "./SectionHead";

type Card = {
  name: string;
  role: string;
  video: string;
  poster: string;
  logo: string;
};

const CARDS: Card[] = [
  {
    name: "Shayla Love",
    role: "Senior Executive Producer at Uber",
    video: "/videos/frontify/rutxq5gtzzpkxy9x.mp4",
    poster: "/videos/frontify/posters/igsmahb43q3vqknd.jpg",
    logo: "/images/frontify/9e0c78ead4071f87ce0f74fec3485609_uber.svg",
  },
  {
    name: "Rishaad Sacoor",
    role: "Senior Manager Brand Strategy at Kia",
    video: "/videos/frontify/tlngfcscrcnyk8n7.mp4",
    poster: "/videos/frontify/posters/umooqtqh37rgspkj.jpg",
    logo: "/images/frontify/becc672ca9c9edf910e129f7f0ce87bd_kia_europe.svg",
  },
  {
    name: "Kim Gustafsson",
    role: "Digital Brand Lead at Alfa Laval",
    video: "/videos/frontify/gvd81qgmcwboksxc.mp4",
    poster: "/videos/frontify/posters/kahb1wg13fgnqapw.jpg",
    logo: "/images/frontify/alfa-laval.svg",
  },
  {
    name: "Andre Le Masurier",
    role: "Global Head of Brand and Creative at Skyscanner",
    video: "/videos/frontify/ivkpuyfb4hld97uwk9vy.mp4",
    poster: "/videos/frontify/posters/wmp3ybpj3wsypyfxrt1m.png",
    logo: "/images/frontify/skyscanner.svg",
  },
];

export function StoriesSection() {
  return (
    <section className="relative w-full bg-paper py-20 md:py-28">
      <SectionHead
        title={<>Built for the world&rsquo;s leading brands</>}
        subtitle=""
        cta={{ label: "Read customer stories", href: "#" }}
      />
      <ul className="mx-auto mt-12 grid w-full max-w-[1180px] grid-cols-1 gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
        {CARDS.map((c) => (
          <li key={c.name} className="group">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-grey-25">
              <video
                src={c.video}
                poster={c.poster}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <Image
                src={c.logo}
                alt=""
                width={80}
                height={24}
                className="absolute left-4 bottom-4 h-5 w-auto opacity-95 invert"
              />
            </div>
            <p className="mt-4 font-sans text-base font-medium text-ink">{c.name}</p>
            <p className="mt-1 text-sm text-ink-secondary">{c.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
