"use client";

import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
};

type VideoItem = {
  src: string;
  poster: string;
  title: string;
};

type ActiveMedia =
  | {
      index: number;
      type: "image";
    }
  | {
      index: number;
      type: "video";
    };

type CarouselControls = {
  canNext: boolean;
  canPrevious: boolean;
};

const galleryImages: GalleryItem[] = Array.from({ length: 44 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");

  return {
    src: `/images/gallery/lemans-archive-${number}.webp`,
    alt: `Arkivbild ${number} från Lemans 24 Ölars`,
  };
});

const archiveVideos: VideoItem[] = Array.from({ length: 5 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");

  return {
    src: `/videos/lemans-archive-video-${number}.mp4`,
    poster: `/images/video-posters/lemans-archive-video-${number}.webp`,
    title: `Filmklipp ${number}`,
  };
});

export function MemoryGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoScrollRef = useRef<HTMLDivElement>(null);
  const [activeMedia, setActiveMedia] = useState<ActiveMedia | null>(null);
  const [galleryControls, setGalleryControls] = useState<CarouselControls>({
    canNext: true,
    canPrevious: false,
  });
  const [videoControls, setVideoControls] = useState<CarouselControls>({
    canNext: true,
    canPrevious: false,
  });
  const [modalLoading, setModalLoading] = useState(false);

  const getCarouselMetrics = useCallback((el: HTMLDivElement | null) => {
    if (!el) {
      return null;
    }

    const firstCard = el.querySelector<HTMLElement>("[data-carousel-card]");

    if (!firstCard) {
      return null;
    }

    const gap = Number.parseFloat(window.getComputedStyle(el).columnGap) || 0;
    const cardStep = firstCard.offsetWidth + gap;
    const visibleCards = Math.max(1, Math.floor((el.clientWidth + gap) / cardStep));

    return { cardStep, el, visibleCards };
  }, []);

  const getCarouselControls = useCallback((el: HTMLDivElement | null) => {
    if (!el) {
      return {
        canNext: false,
        canPrevious: false,
      };
    }

    const scrollableDistance = el.scrollWidth - el.clientWidth;
    const scrollLeft = Math.max(0, el.scrollLeft);

    return {
      canNext: scrollLeft < scrollableDistance - 2,
      canPrevious: scrollLeft > 2,
    };
  }, []);

  const getGalleryMetrics = useCallback(
    () => getCarouselMetrics(scrollRef.current),
    [getCarouselMetrics],
  );

  const getVideoMetrics = useCallback(
    () => getCarouselMetrics(videoScrollRef.current),
    [getCarouselMetrics],
  );

  const updateGalleryControls = useCallback(() => {
    setGalleryControls(getCarouselControls(scrollRef.current));
  }, [getCarouselControls]);

  const updateVideoControls = useCallback(() => {
    setVideoControls(getCarouselControls(videoScrollRef.current));
  }, [getCarouselControls]);

  useEffect(() => {
    function handleResize() {
      updateGalleryControls();
      updateVideoControls();
    }

    window.addEventListener("resize", handleResize);

    window.requestAnimationFrame(() => {
      updateGalleryControls();
      updateVideoControls();
    });

    return () => window.removeEventListener("resize", handleResize);
  }, [updateGalleryControls, updateVideoControls]);

  const closeModal = useCallback(() => {
    setActiveMedia(null);
    setModalLoading(false);
  }, []);

  const openMedia = useCallback((media: ActiveMedia) => {
    setModalLoading(true);
    setActiveMedia(media);
  }, []);

  const showNextMedia = useCallback(() => {
    setModalLoading(true);
    setActiveMedia((current) => {
      if (!current) {
        return current;
      }

      const count =
        current.type === "image" ? galleryImages.length : archiveVideos.length;

      return {
        ...current,
        index: (current.index + 1) % count,
      };
    });
  }, []);

  const showPreviousMedia = useCallback(() => {
    setModalLoading(true);
    setActiveMedia((current) => {
      if (!current) {
        return current;
      }

      const count =
        current.type === "image" ? galleryImages.length : archiveVideos.length;

      return {
        ...current,
        index: (current.index - 1 + count) % count,
      };
    });
  }, []);

  useEffect(() => {
    if (!activeMedia) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }

      if (event.key === "ArrowRight") {
        showNextMedia();
      }

      if (event.key === "ArrowLeft") {
        showPreviousMedia();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeMedia, closeModal, showNextMedia, showPreviousMedia]);

  function handleScroll() {
    updateGalleryControls();
  }

  function handleVideoScroll() {
    updateVideoControls();
  }

  function scrollGallery(direction: "prev" | "next") {
    const metrics = getGalleryMetrics();

    if (!metrics) {
      return;
    }

    const { cardStep, el, visibleCards } = metrics;
    const scrollAmount = visibleCards * cardStep;

    el.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });

    window.setTimeout(updateGalleryControls, 350);
  }

  function scrollVideos(direction: "prev" | "next") {
    const metrics = getVideoMetrics();

    if (!metrics) {
      return;
    }

    const { cardStep, el, visibleCards } = metrics;
    const scrollAmount = visibleCards * cardStep;

    el.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });

    window.setTimeout(updateVideoControls, 350);
  }

  return (
    <div className="relative">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f8efd8]/58">
          44 arkivbilder
        </p>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Visa föregående bilder"
            disabled={!galleryControls.canPrevious}
            onClick={() => scrollGallery("prev")}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-sm border border-[#d8ad62]/30 bg-[#11170f] text-[#d8ad62] transition hover:border-[#d8ad62] hover:bg-[#d8ad62]/10 disabled:cursor-not-allowed disabled:border-[#d8ad62]/12 disabled:text-[#f8efd8]/24 disabled:hover:bg-[#11170f]"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Visa nästa bilder"
            disabled={!galleryControls.canNext}
            onClick={() => scrollGallery("next")}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-sm border border-[#d8ad62]/30 bg-[#11170f] text-[#d8ad62] transition hover:border-[#d8ad62] hover:bg-[#d8ad62]/10 disabled:cursor-not-allowed disabled:border-[#d8ad62]/12 disabled:text-[#f8efd8]/24 disabled:hover:bg-[#11170f]"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="gallery-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4"
      >
        {galleryImages.map((item, index) => (
          <button
            key={item.src}
            type="button"
            data-carousel-card
            aria-label={`Visa arkivbild ${String(index + 1).padStart(2, "0")} större`}
            onClick={() => openMedia({ index, type: "image" })}
            className="group w-full shrink-0 cursor-zoom-in snap-start snap-always overflow-hidden rounded-md border border-[#d8ad62]/24 bg-[#11170f] text-left shadow-2xl shadow-black/30 transition hover:border-[#d8ad62]/70 focus:outline-none focus:ring-2 focus:ring-[#d8ad62] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
          >
            <div className="relative aspect-[4/3] bg-[#090806]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 410px, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100 group-focus-visible:bg-black/30 group-focus-visible:opacity-100">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#d8ad62]/60 bg-[#090806]/78 text-[#d8ad62] shadow-2xl shadow-black/40 backdrop-blur">
                  <Search size={24} aria-hidden="true" />
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-sm border border-[#d8ad62]/30 bg-[#090806]/72 px-3 py-2 backdrop-blur">
                <span className="text-xs font-black uppercase tracking-[0.22em] text-[#d8ad62]">
                  Arkivbild {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 border-t border-[#d8ad62]/16 pt-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f8efd8]/58">
              5 filmklipp
            </p>
            <h3 className="mt-2 font-serif text-3xl font-bold text-[#fff6df]">
              Rörligt från tidigare varv.
            </h3>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              aria-label="Visa föregående filmklipp"
              disabled={!videoControls.canPrevious}
              onClick={() => scrollVideos("prev")}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-sm border border-[#d8ad62]/30 bg-[#11170f] text-[#d8ad62] transition hover:border-[#d8ad62] hover:bg-[#d8ad62]/10 disabled:cursor-not-allowed disabled:border-[#d8ad62]/12 disabled:text-[#f8efd8]/24 disabled:hover:bg-[#11170f]"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Visa nästa filmklipp"
              disabled={!videoControls.canNext}
              onClick={() => scrollVideos("next")}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-sm border border-[#d8ad62]/30 bg-[#11170f] text-[#d8ad62] transition hover:border-[#d8ad62] hover:bg-[#d8ad62]/10 disabled:cursor-not-allowed disabled:border-[#d8ad62]/12 disabled:text-[#f8efd8]/24 disabled:hover:bg-[#11170f]"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={videoScrollRef}
          onScroll={handleVideoScroll}
          className="gallery-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4"
        >
          {archiveVideos.map((item, index) => (
            <button
              key={item.src}
              type="button"
              data-carousel-card
              aria-label={`Visa ${item.title.toLowerCase()} större`}
              onClick={() => openMedia({ index, type: "video" })}
              className="group w-full shrink-0 cursor-zoom-in snap-start snap-always overflow-hidden rounded-md border border-[#d8ad62]/24 bg-[#11170f] text-left shadow-2xl shadow-black/30 transition hover:border-[#d8ad62]/70 focus:outline-none focus:ring-2 focus:ring-[#d8ad62] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
            >
              <div className="relative aspect-video bg-[#090806]">
                <Image
                  src={item.poster}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100 group-focus-visible:bg-black/30 group-focus-visible:opacity-100">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#d8ad62]/60 bg-[#090806]/78 text-[#d8ad62] shadow-2xl shadow-black/40 backdrop-blur">
                    <Maximize2 size={23} aria-hidden="true" />
                  </span>
                </div>
              </div>
              <div className="border-t border-[#d8ad62]/16 px-4 py-3">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d8ad62]">
                  {item.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeMedia ? (
        <MediaModal
          activeMedia={activeMedia}
          isLoading={modalLoading}
          onClose={closeModal}
          onLoaded={() => setModalLoading(false)}
          onNext={showNextMedia}
          onPrevious={showPreviousMedia}
        />
      ) : null}
    </div>
  );
}

function MediaModal({
  activeMedia,
  isLoading,
  onClose,
  onLoaded,
  onNext,
  onPrevious,
}: {
  activeMedia: ActiveMedia;
  isLoading: boolean;
  onClose: () => void;
  onLoaded: () => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const isImage = activeMedia.type === "image";
  const item = isImage
    ? galleryImages[activeMedia.index]
    : archiveVideos[activeMedia.index];
  const count = isImage ? galleryImages.length : archiveVideos.length;
  const label = isImage
    ? `Arkivbild ${String(activeMedia.index + 1).padStart(2, "0")}`
    : archiveVideos[activeMedia.index].title;

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/88 p-4 backdrop-blur-md sm:p-6"
      role="dialog"
    >
      <button
        type="button"
        aria-label="Stäng genom att klicka utanför"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out"
      />

      <div className="relative z-10 flex h-full max-h-[92vh] w-full max-w-6xl flex-col">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d8ad62]">
            {label} / {count}
          </p>
          <button
            type="button"
            aria-label="Stäng"
            onClick={onClose}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-sm border border-[#d8ad62]/30 bg-[#11170f] text-[#d8ad62] transition hover:border-[#d8ad62] hover:bg-[#d8ad62]/10"
          >
            <X size={21} aria-hidden="true" />
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-md border border-[#d8ad62]/24 bg-[#090806] shadow-2xl shadow-black/60">
          {isLoading ? (
            <div className="absolute inset-0 z-10 grid place-items-center bg-[#090806]">
              <div className="text-center">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d8ad62]">
                  Laddar
                </p>
                <div className="mx-auto mt-4 h-1 w-24 overflow-hidden rounded-full bg-[#d8ad62]/18">
                  <div className="h-full w-1/2 animate-pulse rounded-full bg-[#d8ad62]" />
                </div>
              </div>
            </div>
          ) : null}
          {isImage ? (
            <Image
              key={(item as GalleryItem).src}
              src={(item as GalleryItem).src}
              alt={(item as GalleryItem).alt}
              fill
              sizes="100vw"
              className={`object-contain transition-opacity duration-150 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={onLoaded}
              priority
            />
          ) : (
            <video
              key={(item as VideoItem).src}
              autoPlay
              className={`max-h-full max-w-full bg-[#090806] object-contain transition-opacity duration-150 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              controls
              onLoadedData={onLoaded}
              playsInline
              preload="metadata"
              poster={(item as VideoItem).poster}
            >
              <source src={(item as VideoItem).src} type="video/mp4" />
            </video>
          )}
        </div>

        <div className="pointer-events-none absolute inset-y-14 left-0 right-0 z-20 flex items-center justify-between px-2 sm:px-4">
          <button
            type="button"
            aria-label="Visa föregående"
            onClick={onPrevious}
            className="pointer-events-auto relative z-30 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-sm border border-[#d8ad62]/30 bg-[#11170f]/86 text-[#d8ad62] shadow-xl shadow-black/40 transition hover:border-[#d8ad62] hover:bg-[#d8ad62]/10"
          >
            <ChevronLeft size={25} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Visa nästa"
            onClick={onNext}
            className="pointer-events-auto relative z-30 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-sm border border-[#d8ad62]/30 bg-[#11170f]/86 text-[#d8ad62] shadow-xl shadow-black/40 transition hover:border-[#d8ad62] hover:bg-[#d8ad62]/10"
          >
            <ChevronRight size={25} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
