import { useEffect, useMemo, useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ArrowUpDown,
  Search,
} from "lucide-react";
import fallbackLogo from "../assets/images/isqdf_logo.png";
import PageBanner from "../components/components/Banner";
import { galleryBanner } from "../data/galleryData";
import { blogPosts } from "../data/blog";
import Button from "../components/ui/Button";
import DynamicIcon from "../components/ui/Dynamicicon";
const ITEMS_PER_PAGE = 6;

const SORT_OPTIONS = [
  { key: "date-desc", label: "Newest first" },
  { key: "date-asc", label: "Oldest first" },
  { key: "title-asc", label: "Title A–Z" },
  { key: "title-desc", label: "Title Z–A" },
];

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function sortItems(items, sortKey) {
  const sorted = [...items];
  switch (sortKey) {
    case "date-asc":
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    case "date-desc":
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
}

function Gallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState("date-desc");
  const [pageResetKey, setPageResetKey] = useState(`${sortKey}-${searchQuery}`);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  // Filter by search query then sort
  const filteredAndSortedItems = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    const filtered = trimmed
      ? blogPosts.data.filter((item) =>
        item.title?.toLowerCase().includes(trimmed),
      )
      : blogPosts.data;
    return sortItems(filtered, sortKey);
  }, [searchQuery, sortKey]);

  // Reset page to 0 if sort or search query changes without an extra effect
  const currentResetKey = `${sortKey}-${searchQuery}`;
  if (currentResetKey !== pageResetKey) {
    setPageResetKey(currentResetKey);
    setPage(0);
  }

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE),
  );
  const start = page * ITEMS_PER_PAGE;
  const visibleItems = filteredAndSortedItems.slice(
    start,
    start + ITEMS_PER_PAGE,
  );

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  // useEffect(() => { -not really giving good user experience 
  //   const section = document.getElementById("gallery-grid");
  //   if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  // }, [page]);

  const activeSortLabel = SORT_OPTIONS.find((o) => o.key === sortKey)?.label;

  return (
    <main className="bg-white">
      <PageBanner
        eyebrow={galleryBanner.eyebrow}
        eyebrowIcon={galleryBanner.eyebrowIcon}
        heading={galleryBanner.heading}
        description={galleryBanner.description}
        image={galleryBanner.image}
      />

      <section
        id="gallery-grid"
        className="scroll-mt-24 bg-white px-6 py-16 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-600">
                Gallery
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                Photographs from the field
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                {filteredAndSortedItems.length}{" "}
                {filteredAndSortedItems.length === 1 ? "moment" : "moments"},
                captured on and off the pitch
              </p>
            </div>

            {/* Controls: Search & Sort */}
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search photos..."
                  className="w-full rounded-full border border-gray-200 bg-gray-50/50 py-2 pl-9 pr-8 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortMenuOpen((v) => !v)}
                  className="flex w-full items-center justify-between gap-2 rounded-full border border-red-200 bg-red-50/50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 sm:w-auto"
                >
                  <span className="flex items-center gap-2">
                    <ArrowUpDown size={14} />
                    {activeSortLabel}
                  </span>
                </button>

                {sortMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-44 overflow-hidden rounded-xl border border-red-100 bg-white shadow-lg">
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => {
                          setSortKey(option.key);
                          setSortMenuOpen(false);
                        }}
                        className={`block w-full px-4 py-2.5 text-left text-sm transition-colors ${option.key === sortKey
                          ? "bg-red-600 text-white"
                          : "text-gray-700 hover:bg-red-50"
                          }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card grid or Empty State */}
          {visibleItems.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleItems.map((item, index) => (
                <GalleryCard
                  key={`${item.title}-${item.image}-${start + index}`}
                  item={item}
                  onClick={() =>
                    setActiveIndex(
                      filteredAndSortedItems.findIndex((i) => i === item),
                    )
                  }
                />
              ))}
            </div>
          ) : (
            <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-16 text-center">
              <Search className="h-10 w-10 text-gray-300" />
              <p className="mt-3 text-base font-medium text-gray-700">
                No matching photographs found
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Try searching for a different keyword or clear your search.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <PagerArrow
                direction="left"
                onClick={goPrev}
                disabled={page === 0}
              />

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                  aria-current={i === page}
                  className={`flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm font-semibold transition-all ${i === page
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-500 ring-1 ring-gray-200 hover:bg-red-50 hover:text-red-600"
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <PagerArrow
                direction="right"
                onClick={goNext}
                disabled={page === totalPages - 1}
              />
            </div>
          )}
        </div>
      </section>

      {activeIndex !== null && (
        <Lightbox
          items={filteredAndSortedItems}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </main>
  );
}

function PagerArrow({ direction, onClick, disabled }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous page" : "Next page"}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-red-200 text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
    >
      <Icon size={18} />
    </button>
  );
}

function GalleryCard({ item, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [prevImage, setPrevImage] = useState(item.image);

  // Render-time state adjustment without useEffect: resets state if image changes
  if (item.image !== prevImage) {
    setPrevImage(item.image);
    setLoaded(false);
    setFailed(false);
  }

  return (
    <figure className="group relative overflow-hidden rounded-2xl border border-red-100 bg-red-50 shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={onClick}
        aria-label={`View ${item.title} full size`}
        className="relative block aspect-4/5 min-h-75 w-full overflow-hidden"
      >
        {(!loaded || failed) && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50">
            <img
              src={fallbackLogo}
              alt=""
              aria-hidden="true"
              className={`h-10 w-10 object-contain opacity-40 ${!failed ? "animate-pulse" : ""
                }`}
            />
          </div>
        )}

        {!failed && (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"
              }`}
          />
        )}

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-left">
          {item.date && (
            <p className="text-xs font-medium uppercase tracking-wide text-white/70">
              {formatDate(item.date)}
            </p>
          )}
          <h3 className="mt-1 text-base font-bold text-white drop-shadow-sm">
            {item.title}
          </h3>
        </div>
      </button>
    </figure>
  );
}

function Lightbox({ items, index, onClose, onNavigate }) {
  const total = items.length;
  const item = items[index];
  const [loaded, setLoaded] = useState(false);
  const [loadedForIndex, setLoadedForIndex] = useState(index);

  // Render-time state adjustment when lightbox image index changes
  if (index !== loadedForIndex) {
    setLoadedForIndex(index);
    setLoaded(false);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % total);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + total) % total);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, total, onClose, onNavigate]);

  const goPrev = () => onNavigate((index - 1 + total) % total);
  const goNext = () => onNavigate((index + 1) % total);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35 && total > 1) {
      if (diffX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm select-none"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex items-center justify-between px-4 py-4 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-sm font-medium text-white/70">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <X size={18} />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        {!loaded && (
          <img
            src={fallbackLogo}
            alt=""
            aria-hidden="true"
            className="absolute h-14 w-14 animate-pulse object-contain opacity-40"
          />
        )}

        <img
          src={item.image}
          alt={item.title}
          onLoad={() => setLoaded(true)}
          className={`max-h-full max-w-full rounded-xl object-contain transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"
            }`}
        />

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      <div
        className="px-6 pb-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {item.date && (
          <p className="text-xs font-medium uppercase tracking-wide text-white/60">
            {formatDate(item.date)}
          </p>
        )}
        <h3 className="mt-1 text-lg font-bold text-white">{item.title}</h3>
        <Button
          as="a"
          href={`/blog#${item.id}`}
          rightIcon={<DynamicIcon name="Image" className="w-full h-full" />}
          size="sm"
        >View on Blog</Button>
      </div>
    </div>
  );
}

export default Gallery;
