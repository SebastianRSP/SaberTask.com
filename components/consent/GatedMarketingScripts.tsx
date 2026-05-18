'use client';

import Script from 'next/script';
import { useConsent } from './ConsentProvider';

export default function GatedMarketingScripts() {
  const { ready, categories } = useConsent();
  if (!ready || !categories.marketing) return null;
  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
    </>
  );
}
