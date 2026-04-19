'use client';

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';
import OnboardingModal from './OnboardingModal';

type Ctx = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const OnboardingCtx = createContext<Ctx | null>(null);

export function useOnboarding() {
  const ctx = useContext(OnboardingCtx);
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
}

export default function OnboardingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<Ctx>(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <OnboardingCtx.Provider value={value}>
      {children}
      <OnboardingModal open={isOpen} onClose={close} />
    </OnboardingCtx.Provider>
  );
}
