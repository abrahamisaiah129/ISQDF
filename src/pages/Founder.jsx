import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, Quote, X, CheckCircle2, User, ChevronRight, Sparkles } from "lucide-react";
import Button from "../components/ui/Button";
import PageBanner from "../components/components/Banner";
import StatsPills from "../components/components/Stats";
import MovementCta from "../components/components/MovementCta";
import fallbackLogo from "../assets/images/isqdf_logo.png";
import { founderData } from "../data/founderData";

function Founder() {
  const { banner, leaders = [], founder, pillars, quote, cta } = founderData;

  // Fallback to founder object if leaders array is not provided
  const allLeaders = leaders.length > 0 ? leaders : founder ? [founder] : [];

  const [activeLeaderId, setActiveLeaderId] = useState(
    () => allLeaders[0]?.id || "president"
  );
  const [lightboxData, setLightboxData] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const storySectionRef = useRef(null);

  // Active leader lookup with robust fallback to first leader or founder
  const activeLeader =
    allLeaders.find((l) => l.id === activeLeaderId) ||
    allLeaders[0] ||
    founder ||
    {};

  // Reset image load state whenever active leader changes
  useEffect(() => {
    setImgLoaded(false);
    setImgFailed(false);
  }, [activeLeaderId]);

  // Close lightbox on Escape, and lock body scroll while open
  useEffect(() => {
    if (!lightboxData) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setLightboxData(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxData]);

  const handleSelectLeader = (leaderId, shouldScroll = false) => {
    setActiveLeaderId(leaderId);
    if (shouldScroll && storySectionRef.current) {
      storySectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Safe bio parsing (handles array or single string)
  const bioParagraphs = Array.isArray(activeLeader.bio)
    ? activeLeader.bio
    : typeof activeLeader.bio === "string"
    ? [activeLeader.bio]
    : [
        "Dedicated to empowering young female footballers and creating transformative opportunities through sports and education.",
      ];

  const currentQuote = activeLeader.quote
    ? {
        text: activeLeader.quote,
        author: `— ${activeLeader.name}`,
        role: `${activeLeader.role}, ISQDF`,
      }
    : quote;

  return (
    <main className="bg-white">
      {/* 1. Header Banner */}
      <PageBanner
        eyebrow={banner?.eyebrow || "Leadership & Vision"}
        eyebrowIcon={banner?.eyebrowIcon}
        heading={banner?.heading || "Driving change on and off the pitch."}
        description={
          banner?.description ||
          "Meet the leadership and vision behind the IMO Striker Queens Development Foundation."
        }
        image={banner?.image}
      />

      {/* 2. Main Narrative / Active Leader Profile */}
      <section
        id="leadership-story"
        ref={storySectionRef}
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 scroll-mt-24"
      >
        {/* Dynamic Leadership Navigation Tabs */}
        {allLeaders.length > 1 && (
          <div className="mb-14">
            <div className="flex flex-col items-center justify-between gap-4 border-b border-gray-100 pb-6 md:flex-row">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                  ISQDF Leadership Council
                </p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                  Select a Leader's Profile
                </h2>
              </div>
              <p className="text-sm text-gray-500 max-w-md md:text-right">
                Explore the perspectives, strategic visions, and philosophies of our executive board and technical leaders.
              </p>
            </div>

            {/* Scrollable / Responsive Tab List */}
            <div
              role="tablist"
              aria-label="ISQDF Leaders"
              className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3"
            >
              {allLeaders.map((leader, index) => {
                const isSelected =
                  (leader.id || `leader-${index}`) === activeLeaderId;
                const Icon = leader.icon;
                return (
                  <button
                    key={leader.id || index}
                    role="tab"
                    aria-selected={isSelected}
                    type="button"
                    onClick={() => handleSelectLeader(leader.id || `leader-${index}`)}
                    className={`group relative inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-red-600 text-white shadow-md shadow-red-600/25 scale-[1.02]"
                        : "bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-red-700 border border-gray-200/80"
                    }`}
                  >
                    {Icon ? (
                      <Icon
                        size={16}
                        className={`transition-colors ${
                          isSelected ? "text-white" : "text-red-600"
                        }`}
                      />
                    ) : (
                      <Sparkles
                        size={15}
                        className={`transition-colors ${
                          isSelected ? "text-white" : "text-red-600"
                        }`}
                      />
                    )}
                    <span>{leader.role || leader.name}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-gray-200/70 text-gray-600 group-hover:bg-red-100 group-hover:text-red-700"
                      }`}
                    >
                      {leader.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Active Leader Portrait Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="group relative overflow-hidden rounded-2xl border border-red-100 bg-red-50/60 shadow-lg transition-all duration-300 hover:shadow-xl">
                <button
                  type="button"
                  disabled={!activeLeader.image}
                  onClick={() => {
                    if (activeLeader.image) {
                      setLightboxData({
                        image: activeLeader.image,
                        alt:
                          activeLeader.imageAlt ||
                          `${activeLeader.name} - ${activeLeader.role}`,
                        name: activeLeader.name,
                        role: activeLeader.role,
                      });
                    }
                  }}
                  className={`relative block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 ${
                    activeLeader.image ? "cursor-pointer" : "cursor-default"
                  }`}
                  aria-label={
                    activeLeader.image
                      ? `Open photo of ${activeLeader.name} in full screen`
                      : activeLeader.name
                  }
                >
                  {/* Loading/Fallback Placeholder */}
                  {(!imgLoaded || imgFailed || !activeLeader.image) && (
                    <div className="flex h-[420px] w-full flex-col items-center justify-center bg-gradient-to-br from-red-50 via-gray-100 to-red-100 p-8 text-center sm:h-[480px]">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-red-600 shadow-inner">
                        <User size={48} strokeWidth={1.5} />
                      </div>
                      <p className="mt-4 text-base font-bold text-gray-800">
                        {activeLeader.name || "ISQDF Leader"}
                      </p>
                      <p className="text-xs text-red-600 font-semibold uppercase tracking-wider">
                        {activeLeader.role || "Executive"}
                      </p>
                      <img
                        src={fallbackLogo}
                        alt="ISQDF Logo"
                        className="mt-6 h-8 w-auto opacity-60"
                      />
                    </div>
                  )}

                  {!imgFailed && activeLeader.image && (
                    <img
                      src={activeLeader.image}
                      alt={
                        activeLeader.imageAlt ||
                        `${activeLeader.name} - ${activeLeader.role}`
                      }
                      onLoad={() => setImgLoaded(true)}
                      onError={() => setImgFailed(true)}
                      className={`h-[420px] w-full object-cover object-top transition-all duration-700 group-hover:scale-105 sm:h-[480px] ${
                        imgLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
                      }`}
                    />
                  )}

                  {/* Hover Overlay */}
                  {activeLeader.image && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
                      <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-900 opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                        View photo
                      </span>
                    </div>
                  )}

                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-sm backdrop-blur-sm">
                      {activeLeader.badge || activeLeader.role || "Leadership"}
                    </span>
                  </div>
                </button>

                {/* Leader Details Footer Bar */}
                <div className="border-t border-red-100 bg-white p-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    {activeLeader.name}
                  </h3>
                  <p className="text-sm font-semibold text-red-600">
                    {activeLeader.role}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {activeLeader.organization ||
                      "IMO Striker Queens Development Foundation"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Letter / Story Content for Active Leader */}
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-600">
              {activeLeader.eyebrow || `Message from ${activeLeader.role || activeLeader.name}`}
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              {activeLeader.heading || `Driving purpose and impact at ISQDF.`}
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-8 text-gray-600 sm:text-base sm:leading-8">
              {bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Strategic Highlights (optional/graceful) */}
            {activeLeader.highlights && activeLeader.highlights.length > 0 && (
              <div className="mt-8 rounded-2xl border border-red-100 bg-red-50/40 p-6">
                <h4 className="text-base font-bold text-gray-900">
                  Key Strategic Priorities & Focus
                </h4>
                <div className="mt-4 space-y-3">
                  {activeLeader.highlights.map((item, idx) => (
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

            {/* Signature sign-off (optional/graceful) */}
            {activeLeader.signature && (
              <div className="mt-8 border-t border-gray-100 pt-6">
                <p className="font-serif text-xl italic text-gray-900">
                  {activeLeader.signature.name}
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider text-red-600 mt-1">
                  {activeLeader.signature.title}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 3. Leadership & Executive Team Grid Showcase */}
        {allLeaders.length > 1 && (
          <div className="mt-24 border-t border-gray-100 pt-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-600">
                Executive & Governance
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                The Board & Leadership Team
              </h2>
              <p className="mt-3 text-sm text-gray-600">
                United by a shared passion to uplift young female athletes and transform communities across Nigeria.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {allLeaders.map((leader, index) => {
                const isSelected =
                  (leader.id || `leader-${index}`) === activeLeaderId;
                const snippet =
                  leader.shortBio ||
                  (Array.isArray(leader.bio) ? leader.bio[0] : leader.bio) ||
                  "Leading foundational empowerment and athletic development.";

                return (
                  <div
                    key={leader.id || index}
                    className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      isSelected
                        ? "border-red-500 ring-2 ring-red-500/20 shadow-red-100"
                        : "border-gray-100 hover:border-red-200"
                    }`}
                  >
                    <div>
                      {/* Photo Thumbnail */}
                      <div className="relative mb-5 overflow-hidden rounded-xl bg-gray-100 aspect-[4/3]">
                        {leader.image ? (
                          <img
                            src={leader.image}
                            alt={leader.imageAlt || leader.name}
                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-red-50 text-red-600">
                            <User size={36} />
                          </div>
                        )}
                        <div className="absolute top-2 left-2">
                          <span className="rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                            {leader.badge || leader.role || "Executive"}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        {leader.name}
                      </h3>
                      <p className="text-xs font-semibold text-red-600 mt-0.5">
                        {leader.role}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-gray-600 line-clamp-3">
                        {snippet}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-50">
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectLeader(leader.id || `leader-${index}`, true)
                        }
                        className={`inline-flex w-full items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-red-600 text-white"
                            : "bg-red-50 text-red-700 hover:bg-red-600 hover:text-white"
                        }`}
                      >
                        <span>{isSelected ? "Viewing Profile" : "Read Full Story"}</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. Founding Pillars */}
        {pillars && pillars.length > 0 && (
          <div className="mt-24 border-t border-gray-100 pt-16">
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
                  {Icon && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                  )}
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
        )}
      </section>

      {/* 5. Impact Data */}
      <section className="py-6">
        <StatsPills />
      </section>

      {/* 6. Core Quote */}
      {currentQuote && (
        <section className="bg-red-50 px-6 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto text-red-600" size={32} />
            <blockquote className="mt-5 text-2xl font-bold leading-relaxed text-gray-900 sm:text-3xl">
              {currentQuote.text}
            </blockquote>
            <figcaption className="mt-6 text-sm font-semibold text-gray-700">
              {currentQuote.author}
            </figcaption>
            {currentQuote.role && (
              <p className="text-xs text-red-600 uppercase tracking-widest mt-1 font-medium">
                {currentQuote.role}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 7. Final Call to Action */}
      {cta && (
        <MovementCta
          eyebrow={cta.eyebrow}
          title={cta.title}
          ctaText={cta.ctaText}
        />
      )}

      {/* Lightbox Modal */}
      {lightboxData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm"
          onClick={() => setLightboxData(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Leader portrait preview"
        >
          <button
            type="button"
            onClick={() => setLightboxData(null)}
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
              src={lightboxData.image}
              alt={lightboxData.alt}
              className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            <p className="mt-3 text-center text-sm font-semibold text-white">
              {lightboxData.name} — {lightboxData.role}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Founder;

