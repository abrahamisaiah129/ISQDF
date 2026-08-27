import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import DynamicIcon from '../ui/Dynamicicon';

/**
 * CommunityComments — interactive testimonial carousel with touch swipe
 * and mouse drag navigation, dot pagination, and optional autoplay.
 */
export default function CommunityComments({
  eyebrow = 'Community Voices',
  heading = 'What Our Community Is Saying',
  comments = [],
  className = '',
}) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const mouseStartX = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    if (isPaused || comments.length < 2) return undefined;

    const timer = setInterval(() => {
      setCurrent((index) => (index + 1) % comments.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [comments.length, isPaused]);

  if (!comments.length) return null;

  const previous = () => {
    setCurrent((index) => (index - 1 + comments.length) % comments.length);
  };

  const next = () => {
    setCurrent((index) => (index + 1) % comments.length);
  };

  // Touch Swipe Handlers (Mobile & Tablet)
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    // Trigger swipe if horizontal motion is dominant and exceeds 35px threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
      if (diffX < 0) {
        next();
      } else {
        prevClick();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    setIsPaused(false);
  };

  const prevClick = () => {
    previous();
  };

  // Mouse Drag Handlers (Desktop)
  const handleMouseDown = (e) => {
    if (e.button !== 0 || e.target.closest('button')) return;
    setIsPaused(true);
    mouseStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current || mouseStartX.current === null) return;
    const diffX = e.clientX - mouseStartX.current;

    if (Math.abs(diffX) > 35) {
      if (diffX < 0) {
        next();
      } else {
        previous();
      }
    }

    mouseStartX.current = null;
    isDragging.current = false;
    setIsPaused(false);
  };

  const visibleComments = [-1, 0, 1].map(
    (offset) => comments[(current + offset + comments.length) % comments.length]
  );

  return (
    <section
      className={`w-full bg-white py-16 px-4 text-white sm:px-6 lg:px-8 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        isDragging.current = false;
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {eyebrow && (
            <div className="mb-2 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider text-red-600">
              <DynamicIcon name="FaHeart" size={16} aria-hidden="true" />
              {eyebrow}
            </div>
          )}
          {heading && (
            <h2 className="text-2xl font-bold text-black md:text-3xl lg:text-4xl">
              {heading}
            </h2>
          )}
        </div>

        <div
          className="relative mx-auto max-w-5xl select-none cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {/* Previous Arrow (Visible on desktop and tablet) */}
          <button
            type="button"
            onClick={previous}
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-red-100 bg-white text-red-600 shadow-sm transition-all hover:scale-110 hover:bg-red-50 md:flex cursor-pointer"
            aria-label="Previous community comment"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
            {visibleComments.map((comment, index) => (
              <div
                key={`${comment.name}-${current}-${index}`}
                className={
                  index === 1
                    ? 'community-card-center md:scale-105 transition-all duration-300'
                    : 'community-card-side hidden md:block md:scale-95 md:opacity-70 transition-all duration-300'
                }
              >
                <CommentCard comment={comment} featured={index === 1} />
              </div>
            ))}
          </div>

          {/* Next Arrow (Visible on desktop and tablet) */}
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-red-100 bg-white text-red-600 shadow-sm transition-all hover:scale-110 hover:bg-red-50 md:flex cursor-pointer"
            aria-label="Next community comment"
          >
            <ChevronRight size={20} />
          </button>

          {/* Centered Pagination Indicator Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {comments.map((comment, index) => (
              <button
                key={comment.name}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  index === current ? 'w-8 bg-red-600' : 'w-2 bg-red-200 hover:bg-red-400'
                }`}
                aria-label={`Show comment from ${comment.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CommentCard({ comment, featured = false }) {
  const { name, role, avatar, quote, rating } = comment;

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className={`relative rounded-2xl border bg-white p-6 shadow-sm transition-all duration-500 ${
        featured ? 'border-red-300 shadow-lg' : 'border-gray-100'
      }`}
    >
      <Quote
        size={36}
        className="absolute top-5 right-5 text-red-100 pointer-events-none"
        fill="currentColor"
        strokeWidth={0}
      />

      {rating && (
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < rating ? 'text-red-500' : 'text-gray-200'}
              fill="currentColor"
            />
          ))}
        </div>
      )}

      <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 relative z-10">
        "{quote}"
      </p>

      <div className="flex items-center gap-3">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0 pointer-events-none"
            draggable={false}
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-semibold flex-shrink-0">
            {initials}
          </div>
        )}

        <div>
          <div className="text-sm font-semibold text-gray-900">{name}</div>
          {role && <div className="text-xs text-gray-500">{role}</div>}
        </div>
      </div>
    </div>
  );
}