'use client';

import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CALENDLY_URL = 'https://calendly.com/sebastiansoepedersen/30min';

export default function CTA() {
  const t = useTranslations('cta');

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-primary">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-primary-100 mb-8">{t('subtitle')}</p>
          <Button
            variant="secondary"
            size="lg"
            withArrow
            className="bg-white text-primary border-white hover:bg-primary-50"
            onClick={openCalendly}
          >
            {t('button')}
          </Button>
        </div>
      </Container>
    </section>
  );
}
