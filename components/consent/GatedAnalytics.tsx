'use client';

import { Analytics } from '@vercel/analytics/next';
import { useConsent } from './ConsentProvider';

export default function GatedAnalytics() {
  const { ready, categories } = useConsent();
  if (!ready || !categories.analytics) return null;
  return <Analytics />;
}
