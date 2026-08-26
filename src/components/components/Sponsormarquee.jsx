import { useMemo } from 'react';

/**
 * SponsorMarquee — reusable infinite-scrolling sponsor/partner logo strip.
 *
 * Usage:
 * <SponsorMarquee
 *   sponsors={[
 *     { name: 'Acme Sports', logo: acmeLogo, href: 'https://acme.com' },
 *     { name: 'Local Bank', logo: bankLogo },
 *   ]}
 *   speed="normal"     // "slow" | "normal" | "fast"
 *   direction="left"   // "left" | "right"
 *   grayscale={true}   // logos render gray, full color on hover
 *   ctaText="Become a Sponsor"   // omit to hide CTA entirely
 *   ctaHref="/partner-with-us"
 * />
 *
 * Requires this in your global CSS (e.g. index.css), inside @layer utilities:
 *
 * @keyframes marquee-left {
 *   from { transform: translateX(0); }
 *   to   { transform: translateX(-33.3333%); }
 * }
 * @keyframes marquee-right {
 *   from { transform: translateX(-33.3333%); }
 *   to   { transform: translateX(0); }
 * }
 */
export default function SponsorMarquee({
  sponsors = [],
  speed = 'normal',
  direction = 'left',
  grayscale = false,
  title = 'Our Sponsors & Partners',
  className = '',
}) {
  // Tripled (not doubled) — with a small sponsor list, 2x can still be
  // narrower than the viewport on wide screens, causing a visible gap/jump
  // right at the loop seam. 3x guarantees the track is always wider than
  // any reasonable viewport, so the -33.333% loop point is always seamless.
  const looped = useMemo(() => [...sponsors, ...sponsors, ...sponsors], [sponsors]);

  if (!sponsors.length) return null;

  const durations = {
    slow: '50s',
    normal: '32s',
    fast: '18s',
  };

  const animationName = direction === 'right' ? 'marquee-right' : 'marquee-left';

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

      {/* Fade mask on edges so logos don't hard-cut at the viewport boundary */}
      <div
        className="group relative w-full"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div
          className="flex w-max items-center gap-16 px-6 sm:gap-20 [animation-play-state:running] group-hover:[animation-play-state:paused]"
          style={{
            animation: `${animationName} ${durations[speed]} linear infinite`,
            willChange: 'transform',
          }}
        >
          {looped.map((sponsor, index) => {
            const img = (
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className={`h-6 md:h-9 w-auto object-contain transition-all duration-300 ${
                  grayscale
                    ? 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
                    : ''
                }`}
                draggable={false}
              />
            );

            return (
              <div key={`${sponsor.name}-${index}`} className="flex-shrink-0">
                {sponsor.href ? (
                  <a
                    href={sponsor.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={sponsor.name}
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