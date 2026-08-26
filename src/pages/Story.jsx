import React, { useEffect, useState } from "react";
import { ArrowRight, Quote, X } from "lucide-react";
import Button from "../components/ui/Button";
import PageBanner from "../components/components/Banner";
import StatsPills from "../components/components/Stats";
import MovementCta from "../components/components/MovementCta";
import { storyData } from "../data/storyData";

function Story() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Close on Escape, and lock body scroll while open
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxOpen]);

  const { banner, narrative, pillars, quote, cta } = storyData;

  return (
    <main className="bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        eyebrow={banner.eyebrow}
        eyebrowIcon={banner.eyebrowIcon}
        heading={banner.heading}
        description={banner.description}
        image={banner.image}
      />

      {/* 2. Main Narrative */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="group relative overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 cursor-pointer"
            aria-label="Open image in full screen"
          >
            <img
              src={narrative.image}
              alt={narrative.imageAlt || "Women footballers"}
              className="h-105 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
              <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-900 opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
                View image
              </span>
            </div>
          </button>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-600">
              {narrative.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              {narrative.heading}
            </h2>
            <p className="mt-5 text-sm leading-8 text-gray-600">
              {narrative.content}
            </p>
          </div>
        </div>

        {/* Founding Pillars */}
        <div className="mt-16 border-t border-gray-100 pt-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-600">
              Our founding pillars
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              The principles that drive our movement
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button as="a" href="/#contact" rightIcon={<ArrowRight size={17} />}>
              Connect with us
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Impact Data */}
      <section className="py-6">
        <StatsPills />
      </section>

      {/* 4. Core Quote */}
      <section className="bg-red-50 px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <Quote className="mx-auto text-red-600" size={32} />
          <blockquote className="mt-5 text-2xl font-bold leading-relaxed text-gray-900 sm:text-3xl">
            {quote.text}
          </blockquote>
          <figcaption className="mt-6 text-sm text-gray-600">
            {quote.author}
          </figcaption>
        </div>
      </section>

      {/* 5. Final Call to Action */}
      <MovementCta
        eyebrow={cta.eyebrow}
        title={cta.title}
        ctaText={cta.ctaText}
      />

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close image preview"
          >
            <X size={22} />
          </button>

          <img
            src={narrative.image}
            alt={narrative.imageAlt || "Women footballers"}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
          />
        </div>
      )}
    </main>
  );
}

export default Story;
