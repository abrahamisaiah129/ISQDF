import { useMemo, useRef, useEffect } from 'react';

/**
 * SponsorMarquee — interactive sponsor/partner logo strip.
 * Features:
 * - Direct touch & drag swiping (users can swipe with their hand to see logos).
 * - Automatic seamless scrolling when idle.
 * - Pauses on touch or hover so user stays in full control.
 */
export default function SponsorMarquee({
  sponsors = [],
  speed = 'normal',
  direction = 'left',
  grayscale = false,
  title = 'Our Sponsors & Partners',
  className = '',
}) {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const isInteracting = useRef(false);

  // Repeat items for seamless looping
  const looped = useMemo(
    () => [...sponsors, ...sponsors, ...sponsors, ...sponsors],
    [sponsors]
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !sponsors.length) return;

    let animId;
    const speedPx = speed === 'fast' ? 1.0 : speed === 'slow' ? 0.35 : 0.6;

    const step = () => {
      if (!isInteracting.current && el) {
        if (direction === 'left') {
          el.scrollLeft += speedPx;
          if (el.scrollLeft >= el.scrollWidth / 2) {
            el.scrollLeft -= el.scrollWidth / 4;
          }
        } else {
          el.scrollLeft -= speedPx;
          if (el.scrollLeft <= 0) {
            el.scrollLeft += el.scrollWidth / 4;
          }
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [sponsors.length, speed, direction]);

  if (!sponsors.length) return null;

  // Touch Handlers (Mobile / Tablets)
  const handleTouchStart = () => {
    isInteracting.current = true;
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      isInteracting.current = false;
    }, 1500);
  };

  // Mouse Drag Handlers (Desktop)
  const handleMouseDown = (e) => {
    if (!scrollRef.current || e.button !== 0) return;
    isDragging.current = true;
    isInteracting.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setTimeout(() => {
      isInteracting.current = false;
    }, 1500);
  };

  return (
    <section
      className={`w-full overflow-hidden bg-white px-4 py-3 sm:px-8 lg:px-12 ${className}`}
      aria-label={title || 'Sponsors and partners'}
    >
      {title && (
        <h2 className="mb-12 text-center text-2xl font-bold leading-snug text-gray-900 md:text-3xl lg:text-4xl">
          {title}
        </h2>
      )}

      {/* Fade mask on edges with interactive scrollable track */}
      <div
        className="group relative w-full select-none cursor-grab active:cursor-grabbing"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
        onMouseEnter={() => {
          isInteracting.current = true;
        }}
        onMouseLeave={() => {
          isInteracting.current = false;
          isDragging.current = false;
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          ref={scrollRef}
          className="flex w-full items-center gap-14 overflow-x-auto px-6 py-2 sm:gap-20 [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {looped.map((sponsor, index) => {
            const img = (
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className={`h-6 md:h-9 w-auto max-w-none object-contain transition-all duration-300 pointer-events-none ${
                  grayscale
                    ? 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
                    : ''
                }`}
                draggable={false}
              />
            );

            return (
              <div
                key={`${sponsor.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center min-w-[90px] sm:min-w-[120px]"
              >
                {sponsor.href ? (
                  <a
                    href={sponsor.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={sponsor.name}
                    className="block"
                    onClick={(e) => {
                      // Prevent navigating if dragged
                      if (Math.abs(scrollRef.current.scrollLeft - scrollLeftStart.current) > 5) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {img}
                  </a>
                ) : (
                  img
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}