import { HandHeart } from 'lucide-react';
import donationBannerImage from '../assets/images/girls_1.jfif';

export const donationData = {
  banner: {
    eyebrow: 'Make an Impact',
    eyebrowIcon: HandHeart,
    heading: 'Your support creates more room to grow.',
    description:
      'Every contribution helps fund football programs, mentorship, and opportunities for women and girls in Nigeria.',
    image: donationBannerImage,
  },
  currency: {
    symbol: '₦',
    code: 'NGN',
    name: 'Nigerian Naira',
  },
  amountTiers: [
    { amount: 5000, label: '₦5,000', impact: 'Provides basic training gear' },
    { amount: 10000, label: '₦10,000', impact: "Supports one athlete's equipment" },
    { amount: 25000, label: '₦25,000', impact: 'Helps create safer playing spaces' },
    { amount: 50000, label: '₦50,000', impact: 'Funds mentorship programs for a season' },
  ],
  programs: [
    {
      id: 'general',
      slug: 'general',
      name: 'General Foundation Fund',
      description: 'Allocated where the need is greatest across all foundation activities.',
    },
    {
      id: 'scholarships',
      slug: 'scholarships',
      name: 'Scholarship & Education Support',
      description: 'Covers school fees, learning materials, and academic grants.',
    },
    {
      id: 'training-academy',
      slug: 'training-academy',
      name: 'Grassroots Training Academy',
      description: 'Funds weekly pitch coaching, fitness equipment, and match days.',
    },
    {
      id: 'mentorship',
      slug: 'mentorship',
      name: 'Mentorship Program',
      description: 'Connects young players with seasoned mentors and life coaches.',
    },
    {
      id: 'kits',
      slug: 'kits',
      name: 'Kits & Equipment Fund',
      description: 'Supplies quality football boots, shin guards, and team jerseys.',
    },
  ],
  benefits: [
    'Supports football training and athletic equipment',
    'Helps create safe, inclusive playing spaces',
    'Strengthens youth mentorship and leadership programs',
    'Directly funds educational scholarships for young players',
  ],
  trustInfo: {
    badgeText: 'Secure donation details',
    encryptionNote: 'Transactions are 100% secure, encrypted, and powered by Paystack.',
    taxNote: 'Select an amount below to make a direct contribution.',
  },
};

export default donationData;
