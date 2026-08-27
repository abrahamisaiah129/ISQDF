import { useState, useEffect, useMemo, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  ChevronDown,
  X,
  RotateCcw,
  Image as ImageIcon,
} from "lucide-react";
import { FaFacebookF, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

function formatDate(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogSection({
  posts = {},
  limit,
  showFilters = false,
  showSearch = true,
  showSort = true,
  showDateRange = true,
  showPagination = false,
  actionButtonText,
  actionButtonHref,
  itemsPerPage = 6,
  eyebrow: customEyebrow,
  title: customTitle,
  subtitle: customSubtitle,
}) {
  const postList = Array.isArray(posts) ? posts : posts?.data || [];
  const details =
    !Array.isArray(posts) && posts?.details ? posts.details : null;

  const eyebrow = customEyebrow || details?.eyebrow;
  const title = customTitle || details?.title;
  const subtitle = customSubtitle || details?.description;

  const [activePost, setActivePost] = useState(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [timeRange, setTimeRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const galleryTouchStartX = useRef(null);
  const galleryTouchStartY = useRef(null);

  // Sync modal state with URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    function isHashFunc() {
      if (hash) {
        const found = postList.find((p) => String(p.id) === hash);
        if (found) setActivePost(found);
      }
    }
    isHashFunc();
  }, [postList]);

  const openPost = (post) => {
    setActivePost(post);
    setActiveGalleryImage(
      post.image || (post.gallery && post.gallery[0]) || null,
    );
    window.history.replaceState(null, "", `#${post.id}`);
  };

  const closePost = () => {
    setActivePost(null);
    setActiveGalleryImage(null);
    window.history.replaceState(null, "", window.location.pathname);
  };

  const resetAllFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("date-desc");
    setTimeRange("all");
    setCurrentPage(1);
  };

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(postList.map((p) => p.category).filter(Boolean))),
    ];
  }, [postList]);

  // Filtering & Sorting Engine
  const processedPosts = useMemo(() => {
    let result = postList.filter((post) => {
      if (!showFilters) return true;

      const matchesCategory =
        selectedCategory === "All" ||
        post.category?.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !showSearch ||
        !query ||
        post.title?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        (typeof post.content === "string" &&
          post.content.toLowerCase().includes(query));

      let matchesTime = true;
      if (showDateRange && timeRange !== "all" && post.date) {
        const postDate = new Date(post.date).getTime();
        const now = new Date().getTime();
        const oneDay = 24 * 60 * 60 * 1000;

        if (timeRange === "month") {
          matchesTime = now - postDate <= 30 * oneDay;
        } else if (timeRange === "year") {
          matchesTime = now - postDate <= 365 * oneDay;
        }
      }

      return matchesCategory && matchesSearch && matchesTime;
    });

    if (!showFilters || !showSort) return result;

    return result.sort((a, b) => {
      if (sortBy === "date-desc")
        return new Date(b.date || 0) - new Date(a.date || 0);
      if (sortBy === "date-asc")
        return new Date(a.date || 0) - new Date(b.date || 0);
      if (sortBy === "title-asc")
        return (a.title || "").localeCompare(b.title || "");
      if (sortBy === "title-desc")
        return (b.title || "").localeCompare(a.title || "");
      return 0;
    });
  }, [
    postList,
    showFilters,
    showSearch,
    showSort,
    showDateRange,
    selectedCategory,
    searchQuery,
    timeRange,
    sortBy,
  ]);

  // Pagination vs Limit Logic
  const totalPages = Math.ceil(processedPosts.length / itemsPerPage);

  const displayedPosts = useMemo(() => {
    if (showPagination) {
      const start = (currentPage - 1) * itemsPerPage;
      return processedPosts.slice(start, start + itemsPerPage);
    }
    return limit ? processedPosts.slice(0, limit) : processedPosts;
  }, [processedPosts, showPagination, currentPage, itemsPerPage, limit]);

  const isFilteringActive =
    showFilters &&
    (searchQuery !== "" ||
      selectedCategory !== "All" ||
      timeRange !== "all" ||
      sortBy !== "date-desc");

  const shareUrl = activePost
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/blog#${activePost.id}`
    : "";

  const shareLinks = [
    {
      label: "Facebook",
      icon: FaFacebookF,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "X",
      icon: FaXTwitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(activePost?.title || "")}`,
    },
    {
      label: "WhatsApp",
      icon: FaWhatsapp,
      href: `https://wa.me/?text=${encodeURIComponent(`${activePost?.title || ""} ${shareUrl}`)}`,
    },
  ];

  // Helper to resolve gallery images for active modal post
  const currentGallery = useMemo(() => {
    if (!activePost) return [];
    if (Array.isArray(activePost.gallery) && activePost.gallery.length > 0) {
      return activePost.gallery;
    }
    if (Array.isArray(activePost.images) && activePost.images.length > 0) {
      return activePost.images;
    }
    return activePost.image ? [activePost.image] : [];
  }, [activePost]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      {(title || eyebrow || subtitle) && (
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-widest text-red-600">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-base text-gray-600">{subtitle}</p>
            )}
          </div>
        </div>
      )}

      {/* Filter / Search Bar */}
      {showFilters && (
        <div className="mb-12 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          {showSearch && (
            <div className="relative flex-1 min-w-[220px]">
              <Search
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-10 pr-9 text-sm text-gray-900 placeholder-gray-400 transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {categories.length > 1 && (
              <div className="relative flex-1 sm:flex-initial min-w-[140px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none rounded-full border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-xs font-medium uppercase tracking-wider text-gray-700 shadow-sm transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "All" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            )}

            {showDateRange && (
              <div className="relative flex-1 sm:flex-initial min-w-[130px]">
                <select
                  value={timeRange}
                  onChange={(e) => {
                    setTimeRange(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none rounded-full border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-xs font-medium uppercase tracking-wider text-gray-700 shadow-sm transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                >
                  <option value="all">Any Date</option>
                  <option value="month">Past 30 Days</option>
                  <option value="year">Past Year</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            )}

            {showSort && (
              <div className="relative flex-1 sm:flex-initial min-w-[140px]">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full appearance-none rounded-full border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-xs font-medium uppercase tracking-wider text-gray-700 shadow-sm transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="title-asc">Title (A - Z)</option>
                  <option value="title-desc">Title (Z - A)</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            )}

            {isFilteringActive && (
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                title="Reset filters"
              >
                <RotateCcw size={14} /> Reset
              </button>
            )}
          </div>
        </div>
      )}

      {/* Cards Grid */}
      {displayedPosts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayedPosts.map((post) => {
            const hasMultipleImages =
              (post.gallery && post.gallery.length > 1) ||
              (post.images && post.images.length > 1);

            return (
              <article
                key={post.id}
                onClick={() => openPost(post)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {post.image && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {post.category && (
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600 backdrop-blur-sm">
                        {post.category}
                      </span>
                    )}
                    {hasMultipleImages && (
                      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                        <ImageIcon size={12} /> Gallery
                      </span>
                    )}
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  {post.date && (
                    <time className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      {formatDate(post.date)}
                    </time>
                  )}

                  <h3 className="mt-3 text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-red-600">
                    {post.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {post.excerpt || post.description || post.summary}
                  </p>

                  <div className="mt-auto pt-6">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600">
                      Read article <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-base text-gray-500">
            No stories found matching your filter selections.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-3 text-sm font-semibold text-red-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {showPagination && totalPages > 0 && (
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 sm:flex-row">
          <p className="text-xs font-medium text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {processedPosts.length === 0
                ? 0
                : (currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900">
              {Math.min(currentPage * itemsPerPage, processedPosts.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {processedPosts.length}
            </span>{" "}
            stories
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage <= 1}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-40"
            >
              <ArrowLeft size={14} /> Prev
            </button>

            {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 rounded-lg text-xs font-semibold transition ${
                    currentPage === page
                      ? "bg-red-600 text-white shadow-sm"
                      : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage >= totalPages}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-40"
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Action / View All Button */}
      {actionButtonText && actionButtonHref && !showPagination && (
        <div className="mt-12 text-center">
          <a
            href={actionButtonHref}
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            {actionButtonText} <ArrowRight size={16} />
          </a>
        </div>
      )}

      {/* Reader Modal with Small Gallery */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6 lg:p-8">
          <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-6 py-4 backdrop-blur-sm">
              <button
                onClick={closePost}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={closePost}
                className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-8 sm:px-10">
              <div className="mx-auto max-w-2xl">
                {activePost.category && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-600">
                    {activePost.category}
                  </span>
                )}
                <h2 className="mt-2 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                  {activePost.title}
                </h2>
                {activePost.date && (
                  <p className="mt-3 text-sm font-medium text-gray-500">
                    Published on {formatDate(activePost.date)}
                  </p>
                )}

                {/* Primary Featured Display */}
                {activeGalleryImage && (
                  <div
                    className="mt-6 overflow-hidden rounded-2xl bg-gray-100 select-none cursor-grab active:cursor-grabbing"
                    onTouchStart={(e) => {
                      galleryTouchStartX.current = e.touches[0].clientX;
                      galleryTouchStartY.current = e.touches[0].clientY;
                    }}
                    onTouchEnd={(e) => {
                      if (
                        galleryTouchStartX.current === null ||
                        galleryTouchStartY.current === null ||
                        currentGallery.length <= 1
                      )
                        return;

                      const diffX =
                        e.changedTouches[0].clientX -
                        galleryTouchStartX.current;
                      const diffY =
                        e.changedTouches[0].clientY -
                        galleryTouchStartY.current;

                      if (
                        Math.abs(diffX) > Math.abs(diffY) &&
                        Math.abs(diffX) > 35
                      ) {
                        const currentIdx = currentGallery.findIndex(
                          (img) => img === activeGalleryImage,
                        );
                        if (diffX < 0) {
                          // Swipe left -> next image
                          const nextIdx =
                            (currentIdx + 1) % currentGallery.length;
                          setActiveGalleryImage(currentGallery[nextIdx]);
                        } else {
                          // Swipe right -> prev image
                          const prevIdx =
                            (currentIdx - 1 + currentGallery.length) %
                            currentGallery.length;
                          setActiveGalleryImage(currentGallery[prevIdx]);
                        }
                      }
                      galleryTouchStartX.current = null;
                      galleryTouchStartY.current = null;
                    }}
                  >
                    <img
                      src={activeGalleryImage}
                      alt={activePost.title}
                      className="aspect-video w-full object-cover transition-all duration-300 pointer-events-none"
                      draggable={false}
                    />
                  </div>
                )}

                {/* Small Gallery Thumbnail Strip */}
                {currentGallery.length > 1 && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-medium text-gray-500">
                      Photo Gallery ({currentGallery.length} photos)
                    </p>
                    <div className="flex gap-2.5 overflow-x-auto pb-2">
                      {currentGallery.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveGalleryImage(img)}
                          className={`relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                            activeGalleryImage === img
                              ? "border-red-600 shadow-sm scale-105"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Gallery thumbnail ${idx + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Body Text */}
                <div className="mt-8 space-y-4 text-base leading-relaxed text-gray-700">
                  {activePost.content ? (
                    typeof activePost.content === "string" ? (
                      <p>{activePost.content}</p>
                    ) : (
                      activePost.content
                    )
                  ) : (
                    <p>{activePost.excerpt || activePost.description}</p>
                  )}
                </div>

                {/* Social Share */}
                <div className="mt-12 border-t border-gray-100 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Share this story
                  </p>
                  <div className="mt-3 flex gap-3">
                    {shareLinks.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-red-600 hover:text-white"
                        aria-label={`Share on ${item.label}`}
                      >
                        <item.icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
