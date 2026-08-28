/**
 * ==============================================================================
 * ISQDF MASTER CMS DATA REPOSITORY (src/data/data.js)
 * ==============================================================================
 * This file serves as the centralized single source of truth for all content,
 * layout configurations, copy, media assets, and donation workflows across the
 * entire IMO Striker Queens Development Foundation (ISQDF) web application.
 *
 * It aggregates modular datasets from dedicated files while re-exporting
 * all global media assets and structured models for seamless frontend consumption
 * and future fullstack Headless CMS / API integration (e.g., Strapi, Sanity,
 * Payload, Supabase, or custom Node.js/Vercel serverless endpoints).
 *
 * ==============================================================================
 * CMS / API REQUEST & RESPONSE DATA STRUCTURE EXAMPLES:
 * ==============================================================================
 *
 * 1. GET /api/v1/site-data
 * ------------------------------------------------------------------------------
 * Request:
 *   GET /api/v1/site-data HTTP/1.1
 *   Host: api.isqdf.org
 *   Authorization: Bearer <JWT_TOKEN>
 *   Accept: application/json
 *
 * Response (200 OK):
 *   {
 *     "status": "success",
 *     "data": {
 *       "meta": { "brandName": "ISQDF", ... },
 *       "heroSlides": [ { "id": "1", "title": "Every Girl Deserves a Chance", ... } ],
 *       "about": { "sections": [ ... ], "stats": [ ... ] },
 *       "programs": [ { "id": "scholarships", "title": "...", "goalAmount": 750000, "raisedAmount": 265000 } ],
 *       "story": { "narrative": { ... }, "pillars": [ ... ] },
 *       "gallery": [ { "id": "1", "title": "...", "image": "https://..." } ],
 *       "blog": { "posts": [ ... ] },
 *       "donation": { "currency": "NGN", "tiers": [ 5000, 10000, 25000, 50000 ] },
 *       "contact": { "email": "hello@isqdf.org", ... }
 *     },
 *     "meta": { "version": "1.0.0", "updatedAt": "2026-08-25T18:00:00Z" }
 *   }
 *
 * 2. POST /api/v1/donations/initialize-payment (Paystack Backend Handshake)
 * ------------------------------------------------------------------------------
 * Request:
 *   POST /api/v1/donations/initialize-payment HTTP/1.1
 *   Content-Type: application/json
 *
 *   {
 *     "email": "donor@example.com",
 *     "amount": 25000,
 *     "currency": "NGN",
 *     "firstName": "Ada",
 *     "lastName": "Okafor",
 *     "program": "Scholarship & Education Support",
 *     "metadata": {
 *       "source": "web_donation_form",
 *       "campaign": "2026_growth"
 *     }
 *   }
 *
 * Response (200 OK):
 *   {
 *     "status": "success",
 *     "message": "Authorization URL created",
 *     "data": {
 *       "authorization_url": "https://checkout.paystack.com/0123456789",
 *       "access_code": "0123456789",
 *       "reference": "ISQDF_DON_1724601234"
 *     }
 *   }
 *
 * 3. POST /api/v1/contact
 * ------------------------------------------------------------------------------
 * Request:
 *   POST /api/v1/contact HTTP/1.1
 *   Content-Type: application/json
 *
 *   {
 *     "name": "Chidi Nwachukwu",
 *     "email": "chidi@example.com",
 *     "subject": "Partnership Inquiry",
 *     "message": "We would like to sponsor 10 new football kits for the upcoming season."
 *   }
 *
 * Response (201 Created):
 *   {
 *     "status": "success",
 *     "message": "Your message has been received. Our team will get back to you shortly."
 *   }
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// GLOBAL IMAGE ASSETS (Funneled across all pages & components)
// ------------------------------------------------------------------------------
import isqdfLogo from '../assets/images/isqdf_logo.png';
import isqdfLogoWhite from '../assets/images/isqdf_logo_white.png';
import nikeLogo from '../assets/images/Nike.png';
import sportsDirectLogo from '../assets/images/Sports-Direct.png';
import adidasLogo from '../assets/images/adidas.png';
import girls1Image from '../assets/images/girls_1.jfif';
import girls2Image from '../assets/images/girls_2.jfif';
import girlsPlayingFootballImage from '../assets/images/girls playing football.webp';

export const globalAssets = {
  logos: {
    primary: isqdfLogo,
    white: isqdfLogoWhite,
    partners: {
      nike: nikeLogo,
      sportsDirect: sportsDirectLogo,
      adidas: adidasLogo,
    },
  },
  photography: {
    girls1: girls1Image,
    girls2: girls2Image,
    girlsPlayingFootball: girlsPlayingFootballImage,
  },
};

// ------------------------------------------------------------------------------
// MODULAR DATASET IMPORTS
// ------------------------------------------------------------------------------
import { siteMeta } from './siteMeta';
import { heroSlides } from './heroSlides';
import { aboutSections, aboutPageData } from './aboutSection';
import { programsData } from './programData';
import { stats } from './stats';
import { sponsors, sponsorMarqueeData } from './sponsors';
import { galleryItems, galleryBanner, galleryPageData } from './galleryData';
import { blogPosts, blogBanner } from './blog';
import { comments } from './comments';
import { founderData, leaders } from './founderData';
import { storyData } from './storyData';
import { donationData } from './donationData';
import { contactData } from './contactData';

// ------------------------------------------------------------------------------
// RE-EXPORTS FOR MODULAR COMPONENT CONSUMPTION
// ------------------------------------------------------------------------------
export {
  siteMeta,
  heroSlides,
  aboutSections,
  aboutPageData,
  programsData,
  stats,
  sponsors,
  sponsorMarqueeData,
  galleryItems,
  galleryBanner,
  galleryPageData,
  blogPosts,
  blogBanner,
  comments,
  founderData,
  leaders,
  storyData,
  donationData,
  contactData,
};

// ------------------------------------------------------------------------------
// FULL CONSOLIDATED SITE DATA (CMS Single Source of Truth)
// ------------------------------------------------------------------------------
export const siteData = {
  version: '1.0.0',
  lastUpdated: '2026-08-25',
  assets: globalAssets,
  siteMeta,
  home: {
    hero: heroSlides,
    sponsors: sponsorMarqueeData,
    stats,
    aboutPreview: aboutSections,
    storiesPreview: blogPosts,
    testimonials: comments,
    contact: contactData,
  },
  about: aboutPageData,
  founder: founderData,
  leaders: leaders,
  story: founderData,
  programs: programsData,
  gallery: galleryPageData,
  blog: {
    banner: blogBanner,
    posts: blogPosts,
  },
  donation: donationData,
  contact: contactData,
  testimonials: comments,
  partners: sponsors,
  metrics: stats,
};

export default siteData;
