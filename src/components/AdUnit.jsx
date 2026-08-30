import { useEffect, useRef } from "react";

/**
 * Reusable Google AdSense ad slot component.
 * Includes a guard against double-push in React StrictMode.
 *
 * @param {Object} props
 * @param {string} props.slot - AdSense ad unit slot ID
 * @param {string} [props.client] - AdSense publisher ID (ca-pub-...)
 * @param {string} [props.format="auto"] - Ad format (e.g. 'auto', 'fluid', 'rectangle')
 * @param {string} [props.className=""] - Additional Tailwind or CSS class names
 * @param {Object} [props.style] - Inline style override
 */
export default function AdUnit({
  slot,
  client = import.meta.env.VITE_ADSENSE_CLIENT_ID || "ca-pub-5510270511475270",
  format = "auto",
  className = "",
  style = { display: "block" },
}) {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return; // avoid double-push on re-render/StrictMode
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle block ${className}`}
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
