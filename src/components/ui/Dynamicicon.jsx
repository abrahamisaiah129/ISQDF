import * as FaIcons from 'react-icons/fa6';
import { Search as SearchIcon } from 'lucide-react';

/**
 * DynamicIcon — renders a react-icons/fa6 or supported Lucide icon by name.
 * Falls back gracefully if the name doesn't exist, instead of crashing.
 *
 * Usage:
 * <DynamicIcon name="FaHeart" size={20} className="text-red-600" />
 * <DynamicIcon name="Search" size={20} className="text-red-600" />
 */
export default function DynamicIcon({ name, size = 20, className = '', ...props }) {
  const Icon = FaIcons[name] || (name === 'Search' ? SearchIcon : null);

  if (!Icon) {
    console.warn(`DynamicIcon: "${name}" not found in the supported icon sets`);
    return null;
  }

  return <Icon size={size} className={className} {...props} />;
}