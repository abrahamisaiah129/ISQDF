import React from 'react';
import { siteMeta } from '../../data/siteMeta';

const TopBar = () => {
  const { topbar } = siteMeta;

  return (
    <div className="w-full bg-red-600 border-b border-red-600 py-2 px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center text-xs md:text-sm text-white">
      {/* Left side: Announcement Text */}
      <div className="mb-2 sm:mb-0 text-center sm:text-left">
        <span>{topbar.announcement}</span>
      </div>

      {/* Right side: Social Media Icons */}
      <div className="flex items-center space-x-4">
        {topbar.socials.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-100 transition-colors"
            aria-label={label}
          >
            <Icon size={16} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default TopBar;