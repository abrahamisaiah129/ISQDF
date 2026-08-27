import { useCallback, useEffect, useRef, useState } from 'react';
import { Volleyball, MapPin, Sparkles, GraduationCap, Heart } from 'lucide-react';
import Button from '../ui/Button';

/**
 * StatsPills — responsive stats block with 2 columns on mobile (2x2 grid)
 * and 4 columns on desktop (1x4 grid), with subtle internal dividers.
 *
 * Usage:
 * <StatsPills
 *   stats={[
 *     { icon: Volleyball, value: 1200, suffix: '+', label: 'Female footballers reached' },
 *     { icon: MapPin, value: 14, suffix: '', label: 'Communities served' },
 *     { icon: Sparkles, value: 9, suffix: '', label: 'Years of impact' },
 *     { icon: GraduationCap, value: 38, suffix: '+', label: 'Scholarships supported' },
 *   ]}
 *   ctaText="Do you want to be part of the vision?"
 *   ctaButtonText="Donate"
 *   ctaHref="/donate"
 * />
 */
export default function StatsPills({
  stats = [
    { icon: Volleyball, value: 1200, suffix: '+', label: 'Female footballers reached' },
    { icon: MapPin, value: 14, suffix: '', label: 'Communities served' },
    { icon: Sparkles, value: 9, suffix: '', label: 'Years of impact' },
    { icon: GraduationCap, value: 38, suffix: '+', label: 'Scholarships supported' },
  ],
  data,
  eyebrow,
  heading,
  description,
  ctaText,
  ctaButtonText = 'Donate',
  ctaHref = '/donate',
  className = '',
}) {
  const statsList = data || stats;
  if (!statsList || !statsList.length) return null;

  return (
    <div className={`max-w-5xl mx-auto px-4 sm:px-6 ${className}`}>
      {(eyebrow || heading || description) && (
        <div className="mb-8 text-center max-w-2xl mx-auto">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-600">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gray-900">
              {heading}
            </h2>
          )}
          {description && (
            <p className="mt-3 text-sm text-gray-600">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
        {statsList.map((stat, index) => (
          <StatPill
            key={stat.label || index}
            stat={stat}
            index={index}
            total={statsList.length}
          />
        ))}
      </div>

      {ctaText && (
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-xs sm:text-sm text-gray-500">{ctaText}</p>
          <Button
            as="a"
            href={ctaHref}
            variant="primary"
            size="sm"
            rightIcon={<Heart className="w-full h-full" fill="currentColor" />}
          >
            {ctaButtonText}
          </Button>
        </div>
      )}
    </div>
  );
}

function formatStatNumber(num, decimals = 0) {
  if (num >= 1000) {
    const formatted = (num / 1000).toFixed(1).replace(/\.0$/, '');
    return `${formatted}k`;
  }
  return decimals > 0 ? num.toFixed(decimals) : Math.round(num).toString();
}

function StatPill({ stat, index, total }) {
  const { icon: Icon, value, suffix = '', label, decimals = 0 } = stat;
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  const animateCount = useCallback(() => {
    const duration = 1600;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(value * eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [value]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [animateCount]);

  // Dividers for 2-column mobile layout and 4-column desktop layout
  const isLeftColumn = index % 2 === 0;
  const isTopRowMobile = index < 2 && total > 2;
  const hasRightBorderDesktop = index < total - 1;

  const borderClasses = [
    isLeftColumn ? 'border-r border-red-100' : '',
    isTopRowMobile ? 'border-b border-red-100 lg:border-b-0' : '',
    hasRightBorderDesktop ? 'lg:border-r lg:border-red-100' : 'lg:border-r-0',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={`p-4 sm:p-5 lg:p-6 flex flex-col justify-between ${borderClasses}`}
    >
      <div className="mb-3 sm:mb-4 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-red-100">
        {Icon && <Icon className="text-red-600 h-4 w-4 sm:h-[18px] sm:w-[18px]" />}
      </div>
      <div>
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight leading-none">
          {formatStatNumber(count, decimals)}
          <span className="text-red-600">{suffix}</span>
        </div>
        <p className="text-xs sm:text-sm font-medium text-gray-500 mt-1.5 leading-snug line-clamp-2">
          {label}
        </p>
      </div>
    </div>
  );
}