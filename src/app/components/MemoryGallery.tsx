"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

type GalleryItem = {
  title: string;
  text: string;
  gradient: string;
};

const galleryTeasers: GalleryItem[] = [
  {
    title: "Startfältet",
    text: "Hjälmar, handslag och den där stilla stunden innan någon tar första kurvan för hårt.",
    gradient: "from-[#11170f] via-[#2a140d] to-[#d8ad62]/50",
  },
  {
    title: "Depån",
    text: "Taktiksnack, lunchpaus och rimligt mycket självförtroende mellan heaten.",
    gradient: "from-[#0b1211] via-[#16281e] to-[#b73425]/60",
  },
  {
    title: "Kvällen",
    text: "Efter racet flyttar klassikern vidare från bana till bastu, tält och stadens ljus.",
    gradient: "from-[#090806] via-[#1d1510] to-[#d8ad62]/45",
  },
  {
    title: "Brunchen",
    text: "Kaffe, historier och lugnet innan dagens första gemensamma avfärd.",
    gradient: "from-[#15100c] via-[#322018] to-[#f1c979]/45",
  },
  {
    title: "Kvalvarvet",
    text: "När teorierna tar slut och varvtiderna börjar tala sitt tydliga språk.",
    gradient: "from-[#071012] via-[#102830] to-[#d8ad62]/50",
  },
  {
    title: "Prisutdelningen",
    text: "Pokaler, applåder och starka analyser av vad som egentligen hände.",
    gradient: "from-[#100b07] via-[#2b1b0f] to-[#9d6d2f]/70",
  },
  {
    title: "Partytältet",
    text: "Vädersäkrat kamratskap med lagom mycket övertygelse i varje berättelse.",
    gradient: "from-[#12170f] via-[#1f2b18] to-[#b73425]/50",
  },
  {
    title: "Bastun",
    text: "Återhämtning, eftersnack och respektfull tystnad inför nästa moment.",
    gradient: "from-[#120c08] via-[#332018] to-[#d8ad62]/55",
  },
  {
    title: "Bussen",
    text: "Den gemensamma transporten där helgen hittar sin egen marschfart.",
    gradient: "from-[#090806] via-[#11170f] to-[#1f3a2b]/70",
  },
  {
    title: "Finalen",
    text: "Sista varvet, sista skålen och början på nästa års berättelser.",
    gradient: "from-[#10070a] via-[#281018] to-[#d8ad62]/50",
  },
];

export function MemoryGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollGallery(direction: "prev" | "next") {
    const el = scrollRef.current;

    if (!el) {
      return;
    }

    const firstCard = el.querySelector<HTMLElement>("article");

    if (!firstCard) {
      return;
    }

    const gap = Number.parseFloat(window.getComputedStyle(el).columnGap) || 0;
    const cardStep = firstCard.offsetWidth + gap;
    const visibleCards = Math.max(1, Math.floor((el.clientWidth + gap) / cardStep));
    const scrollAmount = visibleCards * cardStep;

    el.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f8efd8]/58">
          10 platshållare, byggd för fler
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Visa föregående bilder"
            onClick={() => scrollGallery("prev")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#d8ad62]/30 bg-[#11170f] text-[#d8ad62] transition hover:border-[#d8ad62] hover:bg-[#d8ad62]/10"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Visa nästa bilder"
            onClick={() => scrollGallery("next")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#d8ad62]/30 bg-[#11170f] text-[#d8ad62] transition hover:border-[#d8ad62] hover:bg-[#d8ad62]/10"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="gallery-scroll flex snap-x gap-4 overflow-x-auto pb-4"
      >
        {galleryTeasers.map((item, index) => (
          <article
            key={item.title}
            className="group w-full shrink-0 snap-start overflow-hidden rounded-md border border-[#d8ad62]/24 bg-[#11170f] shadow-2xl shadow-black/30 sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
          >
            <div className={`relative aspect-[4/3] bg-gradient-to-br ${item.gradient}`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_24%,rgba(255,246,223,0.22),transparent_28%),linear-gradient(135deg,rgba(0,0,0,0.05),rgba(0,0,0,0.58))]" />
              <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.22em] text-[#fff6df]/80">
                  Arkivbild
                </span>
                <span className="font-serif text-3xl font-bold text-[#d8ad62]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="font-serif text-2xl font-bold text-[#fff6df]">
                {item.title}
              </h3>
              <p className="mt-2 leading-7 text-[#f8efd8]/70">{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
