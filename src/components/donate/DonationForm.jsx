import React, { useState } from 'react';
import { LockKeyhole, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { initializePaystackPayment } from '../../lib/paystack';

/**
 * DonationForm — handles donor contact information, targeted program selection,
 * form validation, and triggers the browser-based Paystack popup.
 */
export default function DonationForm({
  activeAmount,
  currencySymbol = '₦',
  programs = [],
  selectedProgram = '',
  onChangeProgram,
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [program, setProgram] = useState(selectedProgram || 'general');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  // Sync internal state if selectedProgram prop changes from parent
  React.useEffect(() => {
    if (selectedProgram) {
      setProgram(selectedProgram);
    }
  }, [selectedProgram]);

  const handleProgramChange = (e) => {
    const val = e.target.value;
    setProgram(val);
    if (typeof onChangeProgram === 'function') {
      onChangeProgram(val);
    }
  };

  const getSelectedProgramName = () => {
    const match = programs.find((p) => p.slug === program || p.id === program);
    return match ? match.name : 'General Foundation Fund';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const numericAmount = Number(activeAmount);
    if (!numericAmount || numericAmount < 100) {
      setErrorMessage(`Please select or enter a donation amount of at least ${currencySymbol}100.`);
      return;
    }

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address for your payment receipt.');
      return;
    }

    setIsLoading(true);

    try {
      await initializePaystackPayment({
        email: email.trim(),
        amount: numericAmount,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        program: getSelectedProgramName(),
        onSuccess: (transaction) => {
          setIsLoading(false);
          setPaymentSuccess({
            reference: transaction.reference || transaction.trxref || `ISQDF-${Date.now()}`,
            amount: numericAmount,
            donorName: `${firstName} ${lastName}`.trim() || 'Generous Donor',
            email: email.trim(),
            program: getSelectedProgramName(),
            date: new Date().toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }),
          });
        },
        onClose: () => {
          setIsLoading(false);
        },
      });
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Unable to start payment. Please try again.');
    }
  };

  // If donation succeeded, show receipt / thank you view
  if (paymentSuccess) {
    return (
      <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-red-100 text-center animate-fadeIn">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 size={36} />
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full mb-2">
          <Sparkles size={13} /> Payment Successful
        </span>
        <h2 className="text-2xl font-bold text-gray-900">
          Thank you for your support, {paymentSuccess.donorName}!
        </h2>
        <p className="mt-2 text-sm text-gray-600 max-w-md mx-auto">
          Your donation of <strong className="text-gray-900">{currencySymbol}{paymentSuccess.amount.toLocaleString()}</strong> to the{' '}
          <strong className="text-red-700">{paymentSuccess.program}</strong> helps open doors for female footballers across Nigeria.
        </p>

        <div className="mt-6 rounded-xl bg-gray-50 p-4 text-left text-xs text-gray-600 space-y-2 border border-gray-100">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Payment Reference:</span>
            <span className="font-mono text-gray-900">{paymentSuccess.reference}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Receipt sent to:</span>
            <span className="text-gray-900">{paymentSuccess.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Date:</span>
            <span className="text-gray-900">{paymentSuccess.date}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              setPaymentSuccess(null);
              setFirstName('');
              setLastName('');
              setEmail('');
            }}
          >
            Make another donation
          </Button>
          <Button as="a" href="/founder" variant="secondary">
            Meet our founder
          </Button>
        </div>
      </div>
    );
  }

  const formattedDisplayAmount = activeAmount
    ? `${currencySymbol}${Number(activeAmount).toLocaleString()}`
    : 'Select amount above';

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm sm:p-8 border border-red-50"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Your details</h2>
        <span className="text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
          Paystack Secure
        </span>
      </div>

      {errorMessage && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-red-50 p-3.5 text-xs text-red-700 border border-red-200">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="donorFirstName" className="block text-xs font-semibold text-gray-700 mb-1">
            First name
          </label>
          <input
            id="donorFirstName"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            placeholder="e.g. Amaka"
          />
        </div>

        <div>
          <label htmlFor="donorLastName" className="block text-xs font-semibold text-gray-700 mb-1">
            Last name
          </label>
          <input
            id="donorLastName"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            placeholder="e.g. Eze"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="donorEmail" className="block text-xs font-semibold text-gray-700 mb-1">
            Email address <span className="text-red-600">*</span>
          </label>
          <input
            id="donorEmail"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            placeholder="name@example.com"
          />
          <p className="mt-1 text-[11px] text-gray-500">
            Paystack will send your official donation receipt to this email.
          </p>
        </div>

        {/* Target Program Selection Field */}
        <div className="sm:col-span-2">
          <label htmlFor="donorProgram" className="block text-xs font-semibold text-gray-700 mb-1">
            Program / Cause to support
          </label>
          <select
            id="donorProgram"
            value={program}
            onChange={handleProgramChange}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 cursor-pointer"
          >
            <option value="general">General Foundation Fund (Where needed most)</option>
            {programs.map((p) => (
              <option key={p.id || p.slug} value={p.slug || p.id}>
                {p.name || p.title}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Donation Amount (Naira) */}
        <div className="sm:col-span-2">
          <label htmlFor="donorAmountDisplay" className="block text-xs font-semibold text-gray-700 mb-1">
            Total donation amount
          </label>
          <div className="relative">
            <input
              id="donorAmountDisplay"
              readOnly
              value={formattedDisplayAmount}
              className="w-full rounded-lg border border-red-200 bg-red-50/60 px-4 py-3 text-base font-bold text-red-700 cursor-default select-none"
            />
          </div>
        </div>
      </div>

      <Button
        className="mt-6 w-full justify-center"
        type="submit"
        disabled={isLoading || !activeAmount}
        rightIcon={<LockKeyhole size={16} />}
      >
        {isLoading ? 'Connecting to Paystack...' : `Donate ${formattedDisplayAmount} Now`}
      </Button>

      <div className="mt-4 text-center">
        <p className="flex items-center justify-center gap-1.5 text-xs text-gray-600 font-medium">
          <LockKeyhole size={14} className="text-red-600" /> Secure online donation powered by Paystack
        </p>
        <p className="mt-1 text-[11px] text-gray-400">
          Supports Cards, Bank Transfer, USSD, and Apple Pay. 100% encrypted.
        </p>
      </div>
    </form>
  );
}
