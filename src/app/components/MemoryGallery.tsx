"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
};

const galleryImages: GalleryItem[] = Array.from({ length: 44 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");

  return {
    src: `/images/gallery/lemans-archive-${number}.webp`,
    alt: `Arkivbild ${number} från Lemans 24 Ölars`,
  };
});

export function MemoryGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [maxLoadedIndex, setMaxLoadedIndex] = useState(2);

  const getGalleryMetrics = useCallback(() => {
    const el = scrollRef.current;

    if (!el) {
      return null;
    }

    const firstCard = el.querySelector<HTMLElement>("article");

    if (!firstCard) {
      return null;
    }

    const gap = Number.parseFloat(window.getComputedStyle(el).columnGap) || 0;
    const cardStep = firstCard.offsetWidth + gap;
    const visibleCards = Math.max(1, Math.floor((el.clientWidth + gap) / cardStep));

    return { cardStep, el, visibleCards };
  }, []);

  const loadVisibleImages = useCallback(
    (startIndex: number) => {
      const metrics = getGalleryMetrics();
      const visibleCards = metrics?.visibleCards ?? 1;
      const endIndex = Math.min(
        galleryImages.length - 1,
        startIndex + visibleCards - 1,
      );

      setMaxLoadedIndex((current) => Math.max(current, endIndex));
    },
    [getGalleryMetrics],
  );

  useEffect(() => {
    function handleResize() {
      const metrics = getGalleryMetrics();

      if (!metrics) {
        return;
      }

      const currentIndex = Math.max(
        0,
        Math.round(metrics.el.scrollLeft / metrics.cardStep),
      );

      loadVisibleImages(currentIndex);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [getGalleryMetrics, loadVisibleImages]);

  function handleScroll() {
    const metrics = getGalleryMetrics();

    if (!metrics) {
      return;
    }

    const currentIndex = Math.max(
      0,
      Math.round(metrics.el.scrollLeft / metrics.cardStep),
    );

    loadVisibleImages(currentIndex);
  }

  function scrollGallery(direction: "prev" | "next") {
    const metrics = getGalleryMetrics();

    if (!metrics) {
      return;
    }

    const { cardStep, el, visibleCards } = metrics;
    const scrollAmount = visibleCards * cardStep;
    const currentIndex = Math.max(0, Math.round(el.scrollLeft / cardStep));
    const targetIndex =
      direction === "next"
        ? Math.min(galleryImages.length - 1, currentIndex + visibleCards)
        : Math.max(0, currentIndex - visibleCards);

    loadVisibleImages(targetIndex);

    el.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f8efd8]/58">
          44 arkivbilder
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
        onScroll={handleScroll}
        className="gallery-scroll flex snap-x gap-4 overflow-x-auto pb-4"
      >
        {galleryImages.map((item, index) => (
          <article
            key={item.src}
            className="group w-full shrink-0 snap-start overflow-hidden rounded-md border border-[#d8ad62]/24 bg-[#11170f] shadow-2xl shadow-black/30 sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
          >
            <div className="relative aspect-[4/3] bg-[#090806]">
              {index <= maxLoadedIndex ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 410px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(216,173,98,0.14),transparent_30%),linear-gradient(135deg,rgba(17,23,15,1),rgba(9,8,6,1))]" />
              )}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-sm border border-[#d8ad62]/30 bg-[#090806]/72 px-3 py-2 backdrop-blur">
                <span className="text-xs font-black uppercase tracking-[0.22em] text-[#d8ad62]">
                  Arkivbild {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
