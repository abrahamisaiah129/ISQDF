import { useState } from 'react';
import { Heart } from 'lucide-react';

/**
 * PageBanner — reusable intro banner for the top of pages (About, Contact,
 * Story, Gallery, etc.). Falls back to a solid red background while the
 * image loads, or permanently if no image is provided / it fails to load.
 * Glass card sizing matches the hero Carousel's text panel exactly.
 *
 * Usage:
 * <PageBanner
 *   eyebrow="About ISQDF"
 *   eyebrowIcon={Heart}
 *   heading="Football can open doors that last a lifetime."
 *   description="We use the power of football to support, equip, and elevate women and girls in Nigeria."
 *   image={aboutBannerPhoto}   // optional — omit for solid color only
 * />
 */
export default function PageBanner({
  eyebrow,
  eyebrowIcon: EyebrowIcon = Heart,
  heading,
  description,
  image,
  className = '',
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const showImage = image && !imageFailed;

  return (
    <section
      className={`relative overflow-hidden bg-red-700 px-6 py-16 text-white sm:px-8 md:py-24 lg:px-12 ${className}`}
    >
      {showImage && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {showImage && <div className="absolute inset-0 bg-black/45" />}

      <div className="relative mx-auto max-w-7xl">
        {/* Glass card — sizing/style matches the hero Carousel's text panel */}
        <div className="max-w-[78%] rounded-2xl border border-white/30 p-3.5 ring-1 ring-black/10 backdrop-blur-xl sm:max-w-md sm:p-5 md:max-w-xl md:p-7">
          {eyebrow && (
            <p className="mb-3.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-200/85 sm:mb-4">
              {EyebrowIcon && <EyebrowIcon size={14} fill="currentColor" />}
              {eyebrow}
            </p>
          )}
          {heading && (
            <h1 className="text-3xl font-bold leading-[1.12] tracking-tight text-white drop-shadow-sm sm:text-4xl md:text-5xl lg:text-6xl">
              {heading}
            </h1>
          )}
          {description && (
            <p className="mt-4 text-sm leading-6 text-white/75 sm:mt-5 sm:text-base">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}