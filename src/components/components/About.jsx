import { Heart, Circle } from 'lucide-react';
import Button from '../ui/Button';
import DynamicIcon from '../ui/Dynamicicon';

export default function AboutSection({
  image,
  imagePosition = 'left',
  eyebrow,
  heading,
  description,
  points = [],
  stat,
  ctaText,
  ctaHref = '#',
}) {
  const isImageRight = imagePosition === 'right';

  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className={`relative ${isImageRight ? 'md:order-2' : 'md:order-1'}`}>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={image}
              alt={heading || 'About image'}
              className="w-full h-[420px] md:h-[480px] object-cover"
            />
          </div>

          {stat && (
            <div className={`absolute -bottom-6 ${isImageRight ? 'left-6 md:left-10' : 'right-6 md:right-10'} bg-red-600 text-white rounded-xl px-5 py-4 shadow-xl flex items-center gap-3`}>
              <span className="text-3xl md:text-4xl font-bold leading-none">{stat.number}</span>
              <span className="text-xs md:text-sm font-medium leading-tight whitespace-pre-line">{stat.label}</span>
            </div>
          )}
        </div>

        <div className={isImageRight ? 'md:order-1' : 'md:order-2'}>
          {eyebrow && (
            <div className="flex items-center gap-2 text-red-600 font-semibold text-sm mb-3">
              <Heart size={16} fill="currentColor" />
              <span>{eyebrow}</span>
            </div>
          )}

          {heading && <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug mb-4">{heading}</h2>}

          {description && <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-6">{description}</p>}

          {points.length > 0 && (
            <div className="space-y-5 mb-8">
              {points.map((point, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                    <Circle size={10} fill="currentColor" className="text-red-600" />
                  </div>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    <span className="font-semibold text-gray-900">{point.label}: </span>
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {ctaText && (
            <Button
              as="a"
              href={ctaHref}
              variant="primary"
              rightIcon={<DynamicIcon name="Search" className="w-full h-full" />}
            >
              {ctaText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}