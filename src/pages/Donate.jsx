import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import PageBanner from '../components/components/Banner';
import DonationAmountPicker from '../components/donate/DonationAmountPicker';
import DonationForm from '../components/donate/DonationForm';
import { donationData } from '../data/donationData';
import { programsData } from '../data/programData';

const Donate = () => {
  const [searchParams] = useSearchParams();
  const programFromUrl = searchParams.get('program') || '';

  // Default selected tier to ₦10,000
  const [selectedAmount, setSelectedAmount] = useState(10000);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('general');

  // Match URL query parameter (?program=scholarships or ?program=training-academy)
  useEffect(() => {
    if (programFromUrl) {
      const match = donationData.programs.find(
        (p) => p.slug === programFromUrl || p.id === programFromUrl
      );
      if (match) {
        setSelectedProgram(match.slug);
      } else {
        // Look up against programData if custom id
        const programMatch = programsData.find((p) => p.id === programFromUrl);
        if (programMatch) {
          setSelectedProgram(programMatch.id);
        } else {
          setSelectedProgram(programFromUrl);
        }
      }
    }
  }, [programFromUrl]);

  // Actual active Naira amount passed to the form & Paystack
  const activeAmount =
    selectedAmount === 'custom' ? customAmount : selectedAmount;

  const handleTierClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomClick = () => {
    setSelectedAmount('custom');
  };

  return (
    <main className="bg-red-50/40 min-h-screen">
      {/* 1. HERO BANNER */}
      <PageBanner
        eyebrow={donationData.banner.eyebrow}
        eyebrowIcon={donationData.banner.eyebrowIcon}
        heading={donationData.banner.heading}
        description={donationData.banner.description}
        image={donationData.banner.image}
      />

      {/* 2. DONATION INTERACTION SECTION */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:px-12 items-start">
        {/* Left Column: Tiers & Impact Info */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-red-600">
            Make A Difference
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Choose your contribution
          </h2>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            {donationData.trustInfo.taxNote} Every naira directly empowers young Nigerian female athletes with gear, safe spaces, and educational opportunities.
          </p>

          {/* Amount Picker */}
          <div className="mt-8">
            <DonationAmountPicker
              amountTiers={donationData.amountTiers}
              selectedAmount={selectedAmount}
              customAmount={customAmount}
              currencySymbol={donationData.currency.symbol}
              onSelectTier={handleTierClick}
              onSelectCustom={handleCustomClick}
              onChangeCustom={setCustomAmount}
            />
          </div>

          {/* Impact Benefit List */}
          <div className="mt-8 space-y-3.5 border-t border-red-100 pt-6 text-sm text-gray-700">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Where your donation goes
            </p>
            {donationData.benefits.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Check size={13} strokeWidth={3} />
                </div>
                <span className="text-sm font-medium text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Donor Details Form & Paystack Initiation */}
        <div className="lg:sticky lg:top-8">
          <DonationForm
            activeAmount={activeAmount}
            currencySymbol={donationData.currency.symbol}
            programs={donationData.programs}
            selectedProgram={selectedProgram}
            onChangeProgram={setSelectedProgram}
          />
        </div>
      </section>
    </main>
  );
};

export default Donate;