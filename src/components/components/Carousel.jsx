import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Button from '../ui/Button';
import DynamicIcon from '../ui/Dynamicicon';

export default function Carousel({ data = [], slides = data, autoPlay = true, interval = 5000 }) {
  const items = slides && slides.length ? slides : [];
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState(() => new Set());

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const mouseStartX = useRef(null);
  const isDragging = useRef(false);

  const goTo = useCallback((index) => {
    if (!items.length) return;
    setCurrent((index + items.length) % items.length);
  }, [items.length]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    if (!isPlaying || !items.length) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, isPlaying, interval, items.length]);

  // Touch Swipe Handlers (Mobile & Tablets)
  const handleTouchStart = (e) => {
    setControlsVisible(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    // Trigger swipe if horizontal displacement is greater than vertical and exceeds threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX < 0) {
        next();
      } else {
        prev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Mouse Drag Handlers (Desktop Swiping)
  const handleMouseDown = (e) => {
    // Only drag with main mouse button, not right click or clicking buttons/links
    if (e.button !== 0 || e.target.closest('button') || e.target.closest('a')) return;
    mouseStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current || mouseStartX.current === null) return;
    const diffX = e.clientX - mouseStartX.current;

    if (Math.abs(diffX) > 40) {
      if (diffX < 0) {
        next();
      } else {
        prev();
      }
    }

    mouseStartX.current = null;
    isDragging.current = false;
  };

  if (!items.length) {
    return null;
  }

  return (
    <div
      className="group relative w-full h-[400px] md:h-[510px] lg:h-[560px] overflow-hidden bg-zinc-900 select-none cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => {
        setControlsVisible(false);
        isDragging.current = false;
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {items.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 ${
            index === current ? 'carousel-slide-active z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            onLoad={() => setLoadedImages((loaded) => new Set(loaded).add(index))}
            className={`h-full w-full object-cover brightness-[0.88] contrast-[1.05] saturate-[1.08] transition-all duration-700 ease-site pointer-events-none ${
              loadedImages.has(index)
                ? 'scale-100 opacity-100 blur-0'
                : 'scale-105 opacity-0 blur-xl'
            }`}
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/5" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/35 to-transparent" />

          {/* Glassmorphism text panel — rest of the banner stays clear */}
          <div className="absolute inset-0 flex flex-col justify-end items-start p-4 pb-10 sm:p-6 sm:pb-12 md:p-10 md:pb-16 lg:px-20">
            <div className="carousel-glass-card max-w-[78%] rounded-2xl border border-white/30 p-3.5 ring-1 ring-black/10 backdrop-blur-xl sm:max-w-xs sm:p-4 md:max-w-sm md:p-5">
              <div className={`mb-3.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200/85 ${index === current ? 'carousel-stagger-item carousel-stagger-1' : 'opacity-0'}`}>
                <DynamicIcon name={slide.icon} size={14} aria-hidden="true" />
                <span>{slide.category}</span>
              </div>
              <h2 className={`mb-2 text-lg font-bold leading-[1.12] tracking-tight text-white drop-shadow-sm sm:mb-2.5 sm:text-xl md:text-2xl lg:text-2xl ${index === current ? 'carousel-stagger-item carousel-stagger-2' : 'opacity-0'}`}>
                {slide.title}
              </h2>
              <p className={`mb-4 max-w-xs text-xs leading-6 text-white/75 sm:mb-5 sm:text-sm ${index === current ? 'carousel-stagger-item carousel-stagger-3' : 'opacity-0'}`}>
                {slide.description}
              </p>
              <div className={`flex gap-5 ${index === current ? 'carousel-stagger-item carousel-stagger-4' : 'opacity-0'}`}>
                <Button
                  as="a"
                  href={slide.seeMoreHref || '#'}
                  size="sm"
                >
                  {slide.buttonText || 'Learn More'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows (Visible only on desktop and mid/large tablets) */}
      <button
        onClick={prev}
        className={`absolute left-4 top-1/2 z-20 hidden md:flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/25 text-white/80 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 ease-site hover:scale-110 hover:border-white hover:bg-white hover:text-red-600 active:scale-95 cursor-pointer ${controlsVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-label="Previous slide"
      >
        <ChevronLeft size={36} strokeWidth={1} />
      </button>
      <button
        onClick={next}
        className={`absolute right-4 top-1/2 z-20 hidden md:flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/25 text-white/80 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 ease-site hover:scale-110 hover:border-white hover:bg-white hover:text-red-600 active:scale-95 cursor-pointer ${controlsVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-label="Next slide"
      >
        <ChevronRight size={36} strokeWidth={1} />
      </button>

      {/* Autoplay Pause / Play Toggle (Bottom Right of Banner) */}
      <button
        onClick={togglePlay}
        className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:right-8 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/35 bg-black/40 text-white shadow-lg shadow-black/25 backdrop-blur-md transition-all duration-300 ease-site hover:scale-110 hover:border-white hover:bg-black/60 active:scale-95 cursor-pointer"
        aria-label={isPlaying ? "Pause banner slideshow" : "Play banner slideshow"}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause size={15} className="text-red-500 fill-red-500 sm:size-4" />
        ) : (
          <Play size={15} className="text-red-500 fill-red-500 ml-0.5 sm:size-4" />
        )}
      </button>
    </div>
  );
}