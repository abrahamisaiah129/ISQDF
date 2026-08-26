import { PAYSTACK_PUBLIC_KEY, CURRENCY } from './constants';

/**
 * Ensures that the Paystack inline JS script is loaded on the page.
 */
export function loadPaystackScript() {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.PaystackPop) {
      resolve(window.PaystackPop);
      return;
    }

    const existingScript = document.getElementById('paystack-inline-js');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.PaystackPop));
      existingScript.addEventListener('error', (e) => reject(e));
      return;
    }

    const script = document.createElement('script');
    script.id = 'paystack-inline-js';
    script.src = 'https://js.paystack.co/v2/inline.js';
    script.async = true;
    script.onload = () => resolve(window.PaystackPop);
    script.onerror = (e) => reject(new Error('Failed to load Paystack inline script'));
    document.body.appendChild(script);
  });
}

/**
 * Initializes a Paystack inline payment transaction in the browser.
 *
 * @param {Object} params
 * @param {string} params.email - Donor's email address
 * @param {number} params.amount - Donation amount in NAIRA (e.g. 5000)
 * @param {string} [params.firstName] - Donor's first name
 * @param {string} [params.lastName] - Donor's last name
 * @param {string} [params.program] - Target program name/id (e.g. "scholarships", "Grassroots Training Academy")
 * @param {Function} params.onSuccess - Callback on successful transaction: ({ reference, status, ... }) => {}
 * @param {Function} [params.onClose] - Callback when user dismisses/cancels the payment popup
 * @param {string} [params.key] - Paystack public key override
 */
export async function initializePaystackPayment({
  email,
  amount,
  firstName = '',
  lastName = '',
  program = 'General Foundation Fund',
  onSuccess,
  onClose,
  key = PAYSTACK_PUBLIC_KEY,
}) {
  if (!email) {
    throw new Error('Donor email is required to initialize Paystack payment');
  }

  const numericAmount = Number(amount);
  if (!numericAmount || numericAmount <= 0) {
    throw new Error('Valid donation amount is required');
  }

  // Paystack expects amount in the lowest currency unit (Kobo for NGN -> 1 NGN = 100 Kobo)
  const amountInKobo = Math.round(numericAmount * 100);

  const fullName = `${firstName} ${lastName}`.trim() || 'Supporter';

  await loadPaystackScript();

  if (typeof window === 'undefined' || !window.PaystackPop) {
    throw new Error('Paystack inline SDK could not be loaded');
  }

  // Support Paystack v2 inline API (new PaystackPop().newTransaction) and v1 fallback
  try {
    const paystack = new window.PaystackPop();
    if (typeof paystack.newTransaction === 'function') {
      paystack.newTransaction({
        key,
        email,
        amount: amountInKobo,
        currency: CURRENCY.code,
        firstname: firstName,
        lastname: lastName,
        metadata: {
          custom_fields: [
            {
              display_name: 'Donor Name',
              variable_name: 'donor_name',
              value: fullName,
            },
            {
              display_name: 'Target Program',
              variable_name: 'target_program',
              value: program || 'General Foundation Fund',
            },
            {
              display_name: 'Organization',
              variable_name: 'organization',
              value: 'ISQDF (IMO Striker Queens Development Foundation)',
            },
          ],
        },
        onSuccess: (transaction) => {
          if (typeof onSuccess === 'function') {
            onSuccess(transaction);
          }
        },
        onCancel: () => {
          if (typeof onClose === 'function') {
            onClose();
          }
        },
      });
      return;
    }
  } catch {
    // If v2 class constructor style fails, try legacy setup handler
  }

  // Fallback for PaystackPop.setup
  if (typeof window.PaystackPop?.setup === 'function') {
    const handler = window.PaystackPop.setup({
      key,
      email,
      amount: amountInKobo,
      currency: CURRENCY.code,
      firstname: firstName,
      lastname: lastName,
      metadata: {
        custom_fields: [
          {
            display_name: 'Donor Name',
            variable_name: 'donor_name',
            value: fullName,
          },
          {
            display_name: 'Target Program',
            variable_name: 'target_program',
            value: program || 'General Foundation Fund',
          },
        ],
      },
      callback: (response) => {
        if (typeof onSuccess === 'function') {
          onSuccess(response);
        }
      },
      onClose: () => {
        if (typeof onClose === 'function') {
          onClose();
        }
      },
    });
    handler.openIframe();
  }
}
