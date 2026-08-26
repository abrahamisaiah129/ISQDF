import React from 'react';

/**
 * DonationAmountPicker — provides an interactive grid of preset donation tiers
 * with their associated impact statements, plus a custom amount input option.
 */
export default function DonationAmountPicker({
  amountTiers = [],
  selectedAmount = null,
  customAmount = '',
  currencySymbol = '₦',
  onSelectTier,
  onSelectCustom,
  onChangeCustom,
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {amountTiers.map(({ amount, label, impact }) => {
          const isActive = selectedAmount === amount;
          const displayLabel = label || `${currencySymbol}${amount.toLocaleString()}`;

          return (
            <button
              key={amount}
              type="button"
              onClick={() => onSelectTier(amount)}
              aria-pressed={isActive}
              className={`flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'border-red-600 bg-red-600 text-white shadow-sm ring-2 ring-red-600/30'
                  : 'border-red-100 bg-white text-red-700 hover:border-red-600 hover:bg-red-50/50'
              }`}
            >
              <span className="text-xl font-bold tracking-tight">
                {displayLabel}
              </span>
              <span
                className={`text-xs leading-snug ${
                  isActive ? 'text-red-100' : 'text-gray-600'
                }`}
              >
                {impact}
              </span>
            </button>
          );
        })}

        {/* Custom / Other Amount Button */}
        <button
          type="button"
          onClick={onSelectCustom}
          aria-pressed={selectedAmount === 'custom'}
          className={`sm:col-span-2 flex items-center justify-between rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${
            selectedAmount === 'custom'
              ? 'border-red-600 bg-red-600 text-white shadow-sm ring-2 ring-red-600/30'
              : 'border-red-100 bg-white text-red-700 hover:border-red-600 hover:bg-red-50/50'
          }`}
        >
          <div className="flex flex-col">
            <span className="text-base font-bold">Other amount</span>
            <span
              className={`text-xs ${
                selectedAmount === 'custom' ? 'text-red-100' : 'text-gray-500'
              }`}
            >
              Give any amount in Naira (₦) that feels right
            </span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/20">
            Custom
          </span>
        </button>
      </div>

      {/* Custom Amount Input Field */}
      {selectedAmount === 'custom' && (
        <div className="pt-2 animate-fadeIn">
          <label htmlFor="customAmountInput" className="block text-xs font-medium text-gray-700 mb-1">
            Enter donation amount in Naira ({currencySymbol})
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-gray-500">
              {currencySymbol}
            </span>
            <input
              id="customAmountInput"
              type="number"
              min="100"
              step="500"
              inputMode="numeric"
              value={customAmount}
              onChange={(e) => onChangeCustom(e.target.value)}
              placeholder="e.g. 15000"
              autoFocus
              className="w-full rounded-xl border border-red-200 bg-white py-3 pl-9 pr-4 text-base font-bold text-gray-900 placeholder:font-normal placeholder:text-gray-400 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-100 shadow-xs"
            />
          </div>
          <p className="mt-1.5 text-[12px] text-gray-500">
            Minimum contribution: {currencySymbol}100
          </p>
        </div>
      )}
    </div>
  );
}
