import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import DynamicIcon from '../ui/Dynamicicon';
/**
 * CommunityComments — reusable testimonial / community-voice grid.
 *
 * Usage:
 * <CommunityComments
 *   eyebrow="Community Voices"
 *   heading="What Our Community Is Saying"
 *   comments={[
 *     {
 *       name: 'Amaka O.',
 *       role: 'Parent of a player',
 *       avatar: amakaPhoto,      // optional — falls back to initials
 *       quote: 'My daughter found confidence she never had before joining ISQDF.',
 *       rating: 5,               // optional, omit to hide stars
 *     },
 *     ...
 *   ]}
 * />
 */
export default function CommunityComments({
  eyebrow = 'Community Voices',
  heading = 'What Our Community Is Saying',
  comments = [],
  className = '',
}) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || comments.length < 2) return undefined;

    const timer = setInterval(() => {
      setCurrent((index) => (index + 1) % comments.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [comments.length, isPaused]);

  if (!comments.length) return null;

  const previous = () => {
    setCurrent((index) => (index - 1 + comments.length) % comments.length);
  };

  const next = () => {
    setCurrent((index) => (index + 1) % comments.length);
  };

  const visibleComments = [-1, 0, 1].map(
    (offset) => comments[(current + offset + comments.length) % comments.length]
  );

  return (
    <section
      className={`w-full bg-white py-16 px-4 text-white sm:px-6 lg:px-8 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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

        <div className="relative mx-auto max-w-5xl">
          <button
            type="button"
            onClick={previous}
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white text-red-600 shadow-sm transition-all hover:scale-110 hover:bg-red-50 sm:flex"
            aria-label="Previous community comment"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
            {visibleComments.map((comment, index) => (
              <div
                key={`${comment.name}-${current}-${index}`}
                className={index === 1 ? 'community-card-center md:scale-105' : 'community-card-side hidden md:block md:scale-95 md:opacity-70'}
              >
                <CommentCard comment={comment} featured={index === 1} />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white text-red-600 shadow-sm transition-all hover:scale-110 hover:bg-red-50 sm:flex"
            aria-label="Next community comment"
          >
            <ChevronRight size={20} />
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {comments.map((comment, index) => (
              <button
                key={comment.name}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${index === current ? 'w-8 bg-red-600' : 'w-2 bg-red-300 hover:bg-red-600'}`}
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
    <div className={`relative rounded-2xl border bg-white p-6 shadow-sm transition-all duration-500 ${featured ? 'border-red-300 shadow-lg' : 'border-gray-100'}`}>
      <Quote
        size={36}
        className="absolute top-5 right-5 text-red-100"
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
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
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