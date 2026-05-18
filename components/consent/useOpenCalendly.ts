'use client';

import { useCallback } from 'react';
import { openConsentBanner } from '@/lib/consent';
import { useConsent } from './ConsentProvider';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function useOpenCalendly(url: string) {
  const { categories } = useConsent();

  return useCallback(() => {
    if (!categories.marketing) {
      openConsentBanner();
      return;
    }
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
      return;
    }
    // Marketing consent was just granted but the script hasn't finished loading
    // yet. Poll briefly, then fall back to opening the booking URL directly.
    const start = Date.now();
    const tick = () => {
      if (window.Calendly) {
        window.Calendly.initPopupWidget({ url });
        return;
      }
      if (Date.now() - start > 4000) {
        window.open(url, '_blank', 'noopener,noreferrer');
        return;
      }
      setTimeout(tick, 100);
    };
    tick();
  }, [categories.marketing, url]);
}
