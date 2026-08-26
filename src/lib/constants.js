/**
 * Application-wide constants and configuration
 */

export const PAYSTACK_PUBLIC_KEY =
  import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ||
  'pk_test_7e4c27fbc61050198959912567af3d053ac799a4';

export const CURRENCY = {
  code: 'NGN',
  symbol: '₦',
  name: 'Nigerian Naira',
};

export const DEFAULT_DONATION_TIERS = [
  { amount: 5000, impact: 'Provides basic training gear' },
  { amount: 10000, impact: "Supports one athlete's equipment" },
  { amount: 25000, impact: 'Helps create safer playing spaces' },
  { amount: 50000, impact: 'Funds mentorship programs for a season' },
];
