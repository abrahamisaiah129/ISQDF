import { useCallback, useEffect, useRef, useState } from 'react';
import { Volleyball, MapPin, Sparkles, GraduationCap, Heart } from 'lucide-react';
import Button from '../ui/Button';

/**
 * StatsPills — reusable single-row stats block with dividers.
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
  ctaText,
  ctaButtonText = 'Donate',
  ctaHref = '/donate',
  className = '',
}) {
  if (!stats.length) return null;

  return (
    <div className={`max-w-5xl mx-auto px-4 sm:px-6 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white rounded-2xl shadow-sm border border-red-100 divide-y lg:divide-y-0 lg:divide-x divide-red-100 overflow-hidden">
        {stats.map((stat, index) => (
          <StatPill key={index} stat={stat} />
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

function StatPill({ stat }) {
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

  return (
    <div ref={ref} className="p-6 flex flex-col justify-between">
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
        {Icon && <Icon size={18} className="text-red-600" />}
      </div>
      <div>
        <div className="text-3xl font-bold text-gray-900 tracking-tight">
          {formatStatNumber(count, decimals)}
          <span className="text-red-600">{suffix}</span>
        </div>
        <p className="text-sm font-medium text-gray-500 mt-1">{label}</p>
      </div>
    </div>
  );
}