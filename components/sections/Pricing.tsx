'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Pricing() {
  const t = useTranslations('pricing');
  const [isYearly, setIsYearly] = useState(false);

  const plans = ['starter', 'professional', 'enterprise'] as const;

  return (
    <section id="pricing" className="section-padding bg-background">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600">{t('subtitle')}</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`font-medium ${!isYearly ? 'text-dark' : 'text-gray-400'}`}>
            {t('monthly')}
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              isYearly ? 'bg-primary' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                isYearly ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`font-medium ${isYearly ? 'text-dark' : 'text-gray-400'}`}>
            {t('yearly')}
          </span>
          {isYearly && (
            <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
              {t('savePercent')}
            </span>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const isPopular = plan === 'professional';
            const isEnterprise = plan === 'enterprise';

            return (
              <Card
                key={plan}
                variant="elevated"
                className={`relative ${
                  isPopular ? 'border-2 border-primary ring-4 ring-primary-100' : ''
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-sm font-medium px-4 py-1 rounded-full">
                      {t(`${plan}.popular`)}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-heading text-xl font-semibold text-dark mb-2">
                    {t(`${plan}.name`)}
                  </h3>
                  <p className="text-gray-600 text-sm">{t(`${plan}.description`)}</p>
                </div>

                <div className="text-center mb-6">
                  {isEnterprise ? (
                    <span className="font-heading text-4xl font-bold text-dark">
                      {t(`${plan}.price`)}
                    </span>
                  ) : (
                    <>
                      <span className="font-heading text-4xl font-bold text-dark">
                        {isYearly
                          ? Math.round(parseInt(t(`${plan}.price`)) * 0.8)
                          : t(`${plan}.price`)}
                      </span>
                      <span className="text-gray-500 ml-1">
                        kr{isYearly ? t('perYear') : t('perMonth')}
                      </span>
                    </>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {(t.raw(`${plan}.features`) as string[]).map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={isPopular ? 'primary' : 'secondary'}
                  className="w-full"
                  withArrow
                >
                  {isEnterprise ? t('ctaEnterprise') : t('cta')}
                </Button>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
