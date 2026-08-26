import {
  FaHouse,
  FaImages,
  FaUserTie,
  FaEnvelope,
  FaHeart,
  FaBookOpen,
  FaFacebook,
  FaXTwitter,
  FaYoutube,
  FaInstagram,
} from 'react-icons/fa6';
import isqdfLogo from '../assets/images/isqdf_logo.png';
import isqdfLogoWhite from '../assets/images/isqdf_logo_white.png';

export const siteMeta = {
  brand: {
    name: 'ISQDF',
    fullName: 'IMO Striker Queens Development Foundation',
    tagline: 'Driving change on and off the pitch.',
    logo: isqdfLogo,
    logoWhite: isqdfLogoWhite,
  },
  topbar: {
    announcement: 'Welcome to ISQDF, IMO Striker Queens Development Foundation',
    joinText: 'JOIN US!',
    socials: [
      { icon: FaFacebook, iconName: 'FaFacebook', label: 'Facebook', href: 'https://facebook.com/isqdf' },
      { icon: FaXTwitter, iconName: 'FaXTwitter', label: 'Twitter', href: 'https://twitter.com/isqdf' },
      { icon: FaYoutube, iconName: 'FaYoutube', label: 'YouTube', href: 'https://youtube.com/isqdf' },
      { icon: FaInstagram, iconName: 'FaInstagram', label: 'Instagram', href: 'https://instagram.com/isqdf' },
    ],
  },
  navLinks: [
    { name: 'Home', href: '/', icon: FaHouse, isCta: false },
    { name: 'About', href: '/about', icon: FaImages, isCta: false },
    { name: 'Gallery', href: '/gallery', icon: FaImages, isCta: false },
    { name: 'Blog', href: '/blog', icon: FaBookOpen, isCta: false },
    { name: 'Story', href: '/story', icon: FaUserTie, isCta: false },
    { name: 'Contact', href: '/#contact', icon: FaEnvelope, isCta: false },
    { name: 'Donate', href: '/donate', icon: FaHeart, isCta: true },
  ],
  footer: {
    about:
      'ISQDF is a foundation committed to empowering women and girls through football, creating opportunities, confidence, and stronger communities for the future.',
    exploreLinks: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Blog', href: '/blog' },
      { label: 'Story', href: '/story' },
      { label: 'Contact', href: '/#contact' },
      { label: 'Donate', href: '/donate' },
    ],
    getInvolvedTitle: 'Get involved',
    getInvolvedText: 'Help us open more doors for women and girls through sport.',
    ctaButtonText: 'Support the foundation',
    copyright: 'ISQDF. All rights reserved.',
  },
};

export default siteMeta;
