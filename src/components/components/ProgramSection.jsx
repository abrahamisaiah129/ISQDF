import { useEffect, useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import { FaFacebook, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import fallbackImage from "../../assets/images/isqdf_logo.png";
import Button from "../ui/Button";

/**
 * ProgramsSection — paginated row of ISQDF programs with touch and mouse drag
 * swipe support so users can swipe with their hand to flip cards.
 * Each card shows a funding progress bar. Clicking a card opens a lightbox
 * with full details, an interactive swipeable gallery, share buttons, and Donate CTA.
 */
export default function ProgramsSection({
  eyebrow = "What We Run",
  heading = "Programs Girls Can Actually Join",
  description,
  programs = [],
  className = "",
}) {
  const itemsPerPage = useResponsiveItemsPerPage();
  const [page, setPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const mouseStartX = useRef(null);
  const isDragging = useRef(false);

  if (!programs.length) return null;

  const totalPages = Math.max(1, Math.ceil(programs.length / itemsPerPage));

  // Compute safe active page directly during render without useEffect
  const safePage = Math.min(page, totalPages - 1);

  const start = safePage * itemsPerPage;
  const visiblePrograms = programs.slice(start, start + itemsPerPage);

  const goPrevPage = () => setPage((p) => Math.max(0, p - 1));
  const goNextPage = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  // Touch Swipe Handlers for mobile card flipping
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX < 0) {
        goNextPage();
      } else {
        goPrevPage();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Mouse Drag Handlers for desktop swiping
  const handleMouseDown = (e) => {
    if (e.button !== 0 || e.target.closest('button')) return;
    mouseStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current || mouseStartX.current === null) return;
    const diffX = e.clientX - mouseStartX.current;
    if (Math.abs(diffX) > 40) {
      if (diffX < 0) {
        goNextPage();
      } else {
        goPrevPage();
      }
    }
    mouseStartX.current = null;
    isDragging.current = false;
  };

  return (
    <section
      id="programs"
      className={`w-full bg-white px-4 py-16 sm:px-6 md:px-8 lg:px-12 ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-600">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-sm leading-relaxed text-gray-500 sm:text-base">
                {description}
              </p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="hidden items-center gap-2 sm:flex">
              <PaginationArrow
                direction="left"
                onClick={goPrevPage}
                disabled={safePage === 0}
              />
              <span className="px-1 text-sm font-medium text-gray-500">
                {safePage + 1} / {totalPages}
              </span>
              <PaginationArrow
                direction="right"
                onClick={goNextPage}
                disabled={safePage === totalPages - 1}
              />
            </div>
          )}
        </div>

        <div
          className="mt-10 grid gap-4 sm:gap-5 md:gap-6 select-none cursor-grab active:cursor-grabbing"
          style={{
            gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {visiblePrograms.map((program, i) => (
            <ProgramCard
              key={program.id}
              program={program}
              onClick={() => setActiveIndex(start + i)}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
            <PaginationArrow
              direction="left"
              onClick={goPrevPage}
              disabled={safePage === 0}
              small
            />
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === safePage ? "w-6 bg-red-600" : "w-2 bg-red-200"
                }`}
              />
            ))}
            <PaginationArrow
              direction="right"
              onClick={goNextPage}
              disabled={safePage === totalPages - 1}
              small
            />
          </div>
        )}
      </div>

      {activeIndex !== null && (
        <ProgramLightbox
          program={programs[activeIndex]}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </section>
  );
}

function useResponsiveItemsPerPage() {
  const getCount = () => {
    if (typeof window === "undefined") return 4;
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 768) return 2;
    if (w < 1024) return 3;
    return 4;
  };

  const [count, setCount] = useState(getCount);

  useEffect(() => {
    const handleResize = () => setCount(getCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return count;
}

function PaginationArrow({ direction, onClick, disabled, small = false }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const size = small ? "h-8 w-8" : "h-9 w-9";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous page" : "Next page"}
      className={`flex ${size} items-center justify-center rounded-full border border-red-200 text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer`}
    >
      <Icon size={small ? 16 : 18} />
    </button>
  );
}

function formatAmount(amount, currencySymbol) {
  if (amount == null) return null;
  return `${currencySymbol}${amount.toLocaleString()}`;
}

function ProgramCard({ program, onClick }) {
  const {
    icon: Icon,
    image,
    title,
    summary,
    goalAmount,
    raisedAmount,
    currencySymbol = "₦",
  } = program;

  const cover = image || fallbackImage;
  const progress =
    goalAmount && raisedAmount != null
      ? Math.min((raisedAmount / goalAmount) * 100, 100)
      : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-red-100 bg-white text-left shadow-sm transition-shadow hover:shadow-md cursor-pointer"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-red-100">
        <img
          src={cover}
          alt={title}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none ${
            !image ? "p-8 opacity-70" : ""
          }`}
          draggable={false}
        />
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        {Icon && (
          <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 sm:h-9 sm:w-9">
            <Icon className="text-red-600" size={16} />
          </div>
        )}

        <h3 className="text-sm font-bold leading-snug text-gray-900 sm:text-base">
          {title}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-5 text-gray-600 sm:text-sm">
          {summary}
        </p>

        {progress !== null && (
          <div className="mt-3">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-red-100">
              <div
                className="h-full rounded-full bg-red-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-gray-500 sm:text-xs">
              <span className="font-semibold text-gray-900">
                {formatAmount(raisedAmount, currencySymbol)}
              </span>
              <span>of {formatAmount(goalAmount, currencySymbol)}</span>
            </div>
          </div>
        )}

        <span className="mt-3 text-xs font-semibold text-red-600 group-hover:underline sm:text-sm">
          View details →
        </span>
      </div>
    </button>
  );
}

function ProgramLightbox({ program, onClose }) {
  const {
    icon: Icon,
    image,
    images = [],
    title,
    fullDescription,
    summary,
    goalAmount,
    raisedAmount,
    currencySymbol = "₦",
    donateHref = "/donate",
    donateLabel = "Support This Program",
    shareUrl,
  } = program;

  const gallery = images.length ? images : image ? [image] : [fallbackImage];
  const [activeImage, setActiveImage] = useState(0);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setActiveImage((i) => (i + 1) % gallery.length);
      if (e.key === "ArrowLeft")
        setActiveImage((i) => (i - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gallery.length, onClose]);

  // Touch Swipe for Lightbox image
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35 && gallery.length > 1) {
      if (diffX < 0) {
        setActiveImage((i) => (i + 1) % gallery.length);
      } else {
        setActiveImage((i) => (i - 1 + gallery.length) % gallery.length);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const progress =
    goalAmount && raisedAmount != null
      ? Math.min((raisedAmount / goalAmount) * 100, 100)
      : null;

  const resolvedShareUrl =
    shareUrl || (typeof window !== "undefined" ? window.location.href : "");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 cursor-pointer"
        >
          <X size={18} />
        </button>

        <div
          className="relative h-52 w-full flex-shrink-0 overflow-hidden bg-red-100 sm:h-64 select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={gallery[activeImage]}
            alt={`${title} — image ${activeImage + 1}`}
            className={`h-full w-full object-cover pointer-events-none ${
              !image ? "p-16 opacity-70" : ""
            }`}
            draggable={false}
          />

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setActiveImage(
                    (i) => (i - 1 + gallery.length) % gallery.length,
                  )
                }
                aria-label="Previous image"
                className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => setActiveImage((i) => (i + 1) % gallery.length)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>

              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === activeImage
                        ? "w-5 bg-white"
                        : "w-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="overflow-y-auto p-5 sm:p-7">
          {Icon && (
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
              <Icon className="text-red-600" size={20} />
            </div>
          )}

          <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
            {title}
          </h3>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-600 sm:text-base">
            {fullDescription || summary}
          </p>

          {progress !== null && (
            <div className="mt-5">
              <div className="h-2 w-full overflow-hidden rounded-full bg-red-100">
                <div
                  className="h-full rounded-full bg-red-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  {formatAmount(raisedAmount, currencySymbol)} raised
                </span>
                <span>of {formatAmount(goalAmount, currencySymbol)} goal</span>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              as="a"
              href={donateHref}
              variant="primary"
              size="md"
              rightIcon={
                <Heart className="w-full h-full" fill="currentColor" />
              }
            >
              {donateLabel}
            </Button>

            <ShareRow title={title} url={resolvedShareUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ShareRow({ title, url }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      icon: FaFacebook,
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      icon: FaXTwitter,
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      icon: FaWhatsapp,
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore copy error
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
        Share
      </span>
      {shareLinks.map(({ icon: SocialIcon, label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 transition-colors hover:bg-red-600 hover:text-white"
        >
          <SocialIcon size={15} />
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 transition-colors hover:bg-red-600 hover:text-white cursor-pointer"
      >
        {copied ? <Check size={15} /> : <LinkIcon size={15} />}
      </button>
    </div>
  );
}
