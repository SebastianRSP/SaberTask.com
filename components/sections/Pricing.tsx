'use client';

import { useLocale, useTranslations } from 'next-intl';
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

type PriceSet = { worker: string; planning: string; admin: string };

const PRICES: Record<string, PriceSet> = {
  da: { worker: '69,-', planning: '149,-', admin: '299,-' },
  se: { worker: '99,-', planning: '219,-', admin: '449,-' },
  en: { worker: '9.95', planning: '19.95', admin: '39.95' },
};

const CURRENCY_PREFIX: Record<string, string> = {
  da: '',
  se: '',
  en: '$',
};

const CURRENCY_SUFFIX: Record<string, string> = {
  da: ' kr',
  se: ' kr',
  en: '',
};

const PLAN_KEYS = ['worker', 'planning', 'admin'] as const;

export default function Pricing() {
  const locale = useLocale();
  const t = useTranslations('pricing');
  const prices = PRICES[locale] ?? PRICES.en;
  const prefix = CURRENCY_PREFIX[locale] ?? '$';
  const suffix = CURRENCY_SUFFIX[locale] ?? '';

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  return (
    <section id="pricing" className="section-padding bg-background">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 mb-6">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">{t('badge')}</span>
          </div>

          {/* Title */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">
            {t('title')}
          </h2>

          {/* Subtitle with decorative lines */}
          <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto mb-8">
            <div className="hidden md:block h-px bg-gray-300 flex-1" />
            <p className="text-lg text-gray-600">{t('subtitle')}</p>
            <div className="hidden md:block h-px bg-gray-300 flex-1" />
          </div>

          <Button withArrow onClick={openCalendly}>{t('cta')}</Button>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {PLAN_KEYS.map((planKey) => {
            const features = t.raw(`plans.${planKey}.features`) as string[];
            const extendsLabel = planKey === 'worker' ? null : t(`plans.${planKey}.extends`);
            return (
              <div
                key={planKey}
                className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="font-heading text-xl font-bold text-dark">{t(`plans.${planKey}.name`)}</h3>
                <p className="text-sm text-gray-500 mb-6">{t(`plans.${planKey}.description`)}</p>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-dark">{prefix}{prices[planKey]}{suffix}</span>
                  <span className="text-gray-500 ml-1">{t('perUser')}</span>
                </div>

                <ul className="space-y-3">
                  {extendsLabel && (
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14" />
                      </svg>
                      <span className="text-gray-700">{extendsLabel}</span>
                    </li>
                  )}
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Enterprise card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="md:flex md:items-start md:justify-between md:gap-12">
            <div className="mb-6 md:mb-0">
              <h3 className="font-heading text-xl font-bold text-dark">{t('enterprise.name')}</h3>
              <p className="text-sm text-gray-500 mb-6">{t('enterprise.description')}</p>

              <div>
                <span className="text-4xl font-bold text-dark">{t('custom')}</span>
                <span className="text-gray-500 ml-1">{t('perUser')}</span>
              </div>
            </div>

            <ul className="space-y-3 md:min-w-[400px]">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14" />
                </svg>
                <span className="text-gray-700">{t('enterprise.extends')}</span>
              </li>
              {(t.raw('enterprise.features') as string[]).map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">{t('vatNote')}</p>
      </Container>
    </section>
  );
}
