'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CALENDLY_URL = 'https://calendly.com/sebastiansoepedersen/30min';

const industries = [
  {
    key: 'cleaning',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
    href: '/cleaning-company',
  },
  {
    key: 'facility',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=400&fit=crop',
    href: '/facility-management',
  },
  {
    key: 'window',
    image: 'https://plus.unsplash.com/premium_photo-1676810459656-ce0b050e9ccd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    href: '/window-cleaning',
  },
  {
    key: 'winter',
    image: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=600&h=400&fit=crop',
    href: '/winter-services',
  },
  {
    key: 'landscaping',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&h=400&fit=crop',
    href: '/landscaping',
  },
];

const stats = [
  { value: '75%', label: 'Reduction in admin overhead', direction: 'down' as const },
  { value: '200k', label: 'Annual savings in cost', direction: 'up' as const },
  { value: '92%', label: 'Increase in proofs and results', direction: 'up' as const },
];

export default function Industries() {
  const t = useTranslations('industries');

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  return (
    <section className="section-padding bg-background">
      <Container>
        {/* Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-sm font-medium text-primary">{t('badge')}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
          <span className="text-primary">{t('titleHighlight')}</span>{' '}
          {t('titleEnd')}
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-8">
          {t('subtitle')}
        </p>

        {/* Book a demo button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={openCalendly}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
          >
            {t('cta')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>

        {/* Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {industries.slice(0, 3).map((industry) => (
            <Link
              key={industry.key}
              href={industry.href}
              className="relative rounded-2xl overflow-hidden min-h-[320px] group block"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${industry.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* Content Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-5 bg-primary rounded-full" />
                  <h3 className="font-heading font-bold text-primary text-lg">
                    {t(`${industry.key}.title`)}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {t(`${industry.key}.description`)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {industries.slice(3).map((industry) => (
            <Link
              key={industry.key}
              href={industry.href}
              className="relative rounded-2xl overflow-hidden min-h-[320px] group block"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${industry.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* Content Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-5 bg-primary rounded-full" />
                  <h3 className="font-heading font-bold text-primary text-lg">
                    {t(`${industry.key}.title`)}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {t(`${industry.key}.description`)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats - hidden until ready
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="flex items-center gap-4 p-6 bg-primary/[0.04] rounded-2xl border border-primary/10"
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full text-primary`}>
                {stat.direction === 'up' ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
              </div>
              <div>
                <span className="font-heading text-3xl md:text-4xl font-bold text-primary">{stat.value}</span>
              </div>
              <p className="text-sm font-medium text-gray-600 leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
        */}
      </Container>
    </section>
  );
}
