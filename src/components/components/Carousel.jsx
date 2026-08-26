import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import DynamicIcon from '../ui/Dynamicicon';

export default function Carousel({ data = [], slides = data, autoPlay = true, interval = 5000 }) {
  const items = slides && slides.length ? slides : [];
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState(() => new Set());

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

  if (!items.length) {
    return null;
  }

  return (
    <div
      className="group relative w-full h-[400px] md:h-[510px] lg:h-[560px] overflow-hidden bg-zinc-900"
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => setControlsVisible(false)}
      onTouchStart={() => setControlsVisible(true)}
    >
      {items.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 ${
            index === current ? 'carousel-slide-active z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            onLoad={() => setLoadedImages((loaded) => new Set(loaded).add(index))}
            className={`h-full w-full object-cover brightness-[0.88] contrast-[1.05] saturate-[1.08] transition-all duration-700 ease-site ${
              loadedImages.has(index)
                ? 'scale-100 opacity-100 blur-0'
                : 'scale-105 opacity-0 blur-xl'
            }`}
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

      {/* Subtle Navigation Arrows */}
      <button
        onClick={prev}
        className={`absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/25 text-white/80 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 ease-site hover:scale-110 hover:border-white hover:bg-white hover:text-red-600 active:scale-95 ${controlsVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-label="Previous slide"
      >
        <ChevronLeft size={36} strokeWidth={1} />
      </button>
      <button
        onClick={next}
        className={`absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/25 text-white/80 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 ease-site hover:scale-110 hover:border-white hover:bg-white hover:text-red-600 active:scale-95 ${controlsVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-label="Next slide"
      >
        <ChevronRight size={36} strokeWidth={1} />
      </button>

      {/* Navigation Indicators & Pause — red pill, glass backdrop */}
      <div className={`absolute right-4 bottom-4 z-20 flex items-center gap-4 rounded-full border border-white/35 bg-black/25 px-5 py-2.5 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 ease-site sm:right-8 md:right-16 lg:right-24 ${controlsVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-6 h-6 opacity-80 hover:opacity-100 transition-opacity"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <div className="flex gap-[3px]">
              <div className="w-[3px] h-3.5 bg-red-500 rounded-sm"></div>
              <div className="w-[3px] h-3.5 bg-red-500 rounded-sm"></div>
            </div>
          ) : (
            <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[10px] border-l-red-500 border-b-[7px] border-b-transparent ml-1"></div>
          )}
        </button>

        <div className="flex items-center gap-3">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`transition-all duration-300 ${
                index === current
                  ? 'w-10 h-[2px] bg-red-500'
                  : 'w-1.5 h-1.5 rounded-full bg-red-500/40 hover:bg-red-500/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}