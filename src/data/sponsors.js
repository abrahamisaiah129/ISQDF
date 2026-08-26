import isqdfLogo from '../assets/images/isqdf_logo.png';
import nikeLogo from '../assets/images/Nike.png';
import sportsDirectLogo from '../assets/images/Sports-Direct.png';
import adidasLogo from '../assets/images/adidas.png';

export const sponsors = [
  { name: 'Nike', logo: nikeLogo, href: 'https://www.nike.com' },
  { name: 'Sports Direct', logo: sportsDirectLogo, href: 'https://www.sportsdirect.com' },
  { name: 'Adidas', logo: adidasLogo, href: 'https://www.adidas.com' },
  { name: 'ISQDF', logo: isqdfLogo, href: '/' },
];

export const sponsorMarqueeData = {
  sponsors,
  speed: 'normal',
  direction: 'left',
  grayscale: false,
  title: 'Our Sponsors & Partners',
  ctaText: 'Become a Sponsor',
  ctaHref: '/contact',
};
