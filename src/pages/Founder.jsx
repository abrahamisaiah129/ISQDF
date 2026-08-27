import React, { useEffect, useState } from "react";
import { ArrowRight, Quote, X, CheckCircle2, User } from "lucide-react";
import Button from "../components/ui/Button";
import PageBanner from "../components/components/Banner";
import StatsPills from "../components/components/Stats";
import MovementCta from "../components/components/MovementCta";
import fallbackLogo from "../assets/images/isqdf_logo.png";
import { founderData } from "../data/founderData";

function Founder() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  // Close lightbox on Escape, and lock body scroll while open
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

  const { banner, founder, pillars, quote, cta } = founderData;

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

      {/* 2. Main Narrative / Founder Profile */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Founder Portrait Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="group relative overflow-hidden rounded-2xl border border-red-100 bg-red-50/60 shadow-lg transition-all duration-300 hover:shadow-xl">
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="relative block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 cursor-pointer"
                  aria-label="Open portrait in full screen"
                >
                  {/* Loading/Fallback Placeholder */}
                  {(!imgLoaded || imgFailed) && (
                    <div className="flex h-[420px] w-full flex-col items-center justify-center bg-gradient-to-br from-red-50 via-gray-100 to-red-100 p-8 text-center sm:h-[480px]">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-red-600 shadow-inner">
                        <User size={48} strokeWidth={1.5} />
                      </div>
                      <p className="mt-4 text-base font-bold text-gray-800">
                        {founder.name}
                      </p>
                      <p className="text-xs text-red-600 font-semibold uppercase tracking-wider">
                        {founder.role}
                      </p>
                      <img
                        src={fallbackLogo}
                        alt="ISQDF Logo"
                        className="mt-6 h-8 w-auto opacity-60"
                      />
                    </div>
                  )}

                  {!imgFailed && (
                    <img
                      src={founder.image}
                      alt={founder.imageAlt || `${founder.name} - ${founder.role}`}
                      onLoad={() => setImgLoaded(true)}
                      onError={() => setImgFailed(true)}
                      className={`h-[420px] w-full object-cover object-top transition-all duration-700 group-hover:scale-105 sm:h-[480px] ${
                        imgLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
                      }`}
                    />
                  )}

                  {/* Hover Overlay */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
                    <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-900 opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                      View photo
                    </span>
                  </div>

                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-sm backdrop-blur-sm">
                      {founder.badge || "Founder"}
                    </span>
                  </div>
                </button>

                {/* Founder Details Footer Bar */}
                <div className="border-t border-red-100 bg-white p-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    {founder.name}
                  </h3>
                  <p className="text-sm font-semibold text-red-600">
                    {founder.role}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {founder.organization}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Letter / Story Content */}
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-600">
              {founder.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              {founder.heading}
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-8 text-gray-600 sm:text-base sm:leading-8">
              {founder.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Strategic Highlights */}
            {founder.highlights && founder.highlights.length > 0 && (
              <div className="mt-8 rounded-2xl border border-red-100 bg-red-50/40 p-6">
                <h4 className="text-base font-bold text-gray-900">
                  Key Strategic Pillars
                </h4>
                <div className="mt-4 space-y-3">
                  {founder.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="mt-1 flex-shrink-0 text-red-600"
                      />
                      <p className="text-sm text-gray-700">
                        <strong className="font-semibold text-gray-900">
                          {item.title}:{" "}
                        </strong>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Signature sign-off */}
            {founder.signature && (
              <div className="mt-8 border-t border-gray-100 pt-6">
                <p className="font-serif text-xl italic text-gray-900">
                  {founder.signature.name}
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider text-red-600 mt-1">
                  {founder.signature.title}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Founding Pillars */}
        <div className="mt-20 border-t border-gray-100 pt-16">
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
          <figcaption className="mt-6 text-sm font-semibold text-gray-700">
            {quote.author}
          </figcaption>
          {quote.role && (
            <p className="text-xs text-red-600 uppercase tracking-widest mt-1 font-medium">
              {quote.role}
            </p>
          )}
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Founder portrait preview"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            aria-label="Close image preview"
          >
            <X size={22} />
          </button>

          <div
            className="flex max-h-[85vh] max-w-2xl flex-col items-center justify-center overflow-hidden rounded-2xl bg-black/40 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={founder.image}
              alt={founder.imageAlt || founder.name}
              className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            <p className="mt-3 text-center text-sm font-semibold text-white">
              {founder.name} — {founder.role}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Founder;
