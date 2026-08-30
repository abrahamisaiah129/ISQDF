import ReactGA from "react-ga4";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * Initializes Google Analytics 4 if measurement ID is provided.
 */
export function initAnalytics() {
  if (!GA_MEASUREMENT_ID) return;
  ReactGA.initialize(GA_MEASUREMENT_ID);
}

/**
 * Hook to automatically log page views on route transitions.
 * Must be invoked inside a component rendered within <BrowserRouter>.
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);
}

/**
 * Tracks custom user interactions and business events.
 *
 * @param {string} category - Event category (e.g. 'Donation', 'Navigation', 'Engagement')
 * @param {string} action - Action name (e.g. 'started', 'completed', 'click')
 * @param {string} [label] - Optional descriptive label
 * @param {number} [value] - Optional numeric value (e.g. donation amount)
 */
export function trackEvent(category, action, label, value) {
  if (!GA_MEASUREMENT_ID) return;
  const eventPayload = { category, action };
  if (label !== undefined) eventPayload.label = label;
  if (value !== undefined) eventPayload.value = value;
  ReactGA.event(eventPayload);
}
