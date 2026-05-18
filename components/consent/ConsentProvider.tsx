'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  CONSENT_EVENT,
  ConsentCategories,
  ConsentState,
  DEFAULT_CONSENT,
  readConsent,
  writeConsent,
} from '@/lib/consent';

type ConsentContextValue = {
  ready: boolean;
  hasDecided: boolean;
  categories: ConsentCategories;
  setCategories: (next: Partial<ConsentCategories>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    return {
      ready: false,
      hasDecided: false,
      categories: DEFAULT_CONSENT,
      setCategories: () => {},
      acceptAll: () => {},
      rejectAll: () => {},
    } satisfies ConsentContextValue;
  }
  return ctx;
}

export default function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ConsentState | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(readConsent());
    setReady(true);

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ConsentState>).detail;
      setState(detail);
    };
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);

  const setCategories = useCallback((next: Partial<ConsentCategories>) => {
    const updated = writeConsent({
      analytics: next.analytics ?? state?.categories.analytics ?? false,
      marketing: next.marketing ?? state?.categories.marketing ?? false,
    });
    setState(updated);
  }, [state]);

  const acceptAll = useCallback(() => {
    setState(writeConsent({ analytics: true, marketing: true }));
  }, []);

  const rejectAll = useCallback(() => {
    setState(writeConsent({ analytics: false, marketing: false }));
  }, []);

  const value: ConsentContextValue = {
    ready,
    hasDecided: !!state,
    categories: state?.categories ?? DEFAULT_CONSENT,
    setCategories,
    acceptAll,
    rejectAll,
  };

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}
