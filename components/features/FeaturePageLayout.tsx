'use client';

import { ReactNode } from 'react';
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

export interface FeatureTheme {
  /** CSS gradient string used on hero visual + accent bars */
  gradient: string;
  /** Solid hex of the primary feature colour */
  hex: string;
  /** Tailwind classes for the badge pill (background + text) */
  badge: string;
  /** Tailwind classes for the capability icon container */
  iconBg: string;
  /** Tailwind classes for capability icon hover transform */
  iconHover: string;
  /** Tailwind classes for the "after" card border + ring */
  afterCard: string;
  /** Text colour class for the after-card check icon */
  afterCheck: string;
  /** Hover border colour class for capability cards */
  capabilityHover: string;
}

export interface Capability {
  key: string;
  icon: ReactNode;
}

interface Props {
  /** i18n namespace, e.g. "featurePages.taskScheduling" */
  namespace: string;
  theme: FeatureTheme;
  /** Small icon shown inside the badge pill */
  badgeIcon: ReactNode;
  /** Unique hero visual graphic for this feature */
  heroVisual: ReactNode;
  /** Optional small floating card overlaid on the hero visual */
  heroFloatingCard?: ReactNode;
  capabilities: Capability[];
  /** Optional section rendered directly after the hero */
  heroFooter?: ReactNode;
  /** Number of "before"/"after" bullets for the problem section */
  problemPointCount?: number;
  /** Number of "how it works" steps */
  stepCount?: number;
  /** Optional custom section rendered between Capabilities and How It Works */
  spotlight?: ReactNode;
  /** Hide the How It Works section */
  hideHowItWorks?: boolean;
}

export default function FeaturePageLayout({
  namespace,
  theme,
  badgeIcon,
  heroVisual,
  heroFloatingCard,
  capabilities,
  heroFooter,
  problemPointCount = 4,
  stepCount = 3,
  spotlight,
  hideHowItWorks,
}: Props) {
  const t = useTranslations(namespace);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  const problemRange = Array.from({ length: problemPointCount }, (_, i) => i);
  const stepRange = Array.from({ length: stepCount }, (_, i) => i);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-white relative overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              {/* Breadcrumb badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${theme.badge}`}>
                {badgeIcon}
                <span className="text-sm font-medium">{t('badge')}</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6 leading-tight">
                {t('hero.titleStart')}{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: theme.gradient }}
                >
                  {t('hero.titleHighlight')}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
                {t('hero.description')}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button withArrow onClick={openCalendly}>{t('hero.cta')}</Button>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="relative">
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ background: theme.gradient }}
              >
                <div className="p-6 md:p-8">{heroVisual}</div>
              </div>

              {heroFloatingCard && (
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                  {heroFloatingCard}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Optional hero footer (e.g. integrations bar) */}
      {heroFooter}

      {/* Problem / Solution Section */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">
              {t('problem.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('problem.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Before */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-8 bg-red-500 rounded-full" />
                <h3 className="font-heading text-xl font-bold text-dark">{t('problem.beforeTitle')}</h3>
              </div>
              <ul className="space-y-4">
                {problemRange.map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-600">{t(`problem.before.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className={`bg-white rounded-2xl p-8 shadow-sm ring-1 ${theme.afterCard}`}>
              <div className="flex items-center gap-2 mb-6">
                <div
                  className="w-1.5 h-8 rounded-full"
                  style={{ background: theme.gradient }}
                />
                <h3 className="font-heading text-xl font-bold text-dark">{t('problem.afterTitle')}</h3>
              </div>
              <ul className="space-y-4">
                {problemRange.map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${theme.afterCheck}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{t(`problem.after.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Capabilities Grid */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">
              {t('capabilities.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('capabilities.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <div
                key={cap.key}
                className={`group bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 ${theme.capabilityHover}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${theme.iconBg} ${theme.iconHover}`}>
                  {cap.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-dark mb-2">
                  {t(`capabilities.items.${cap.key}.title`)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(`capabilities.items.${cap.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Optional custom spotlight section */}
      {spotlight}

      {/* How It Works */}
      {!hideHowItWorks && <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">
              {t('howItWorks.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stepRange.map((i) => (
              <div key={i} className="text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-heading text-xl font-bold"
                  style={{ background: theme.gradient }}
                >
                  {i + 1}
                </div>
                <h3 className="font-heading text-lg font-bold text-dark mb-2">
                  {t(`howItWorks.steps.${i}.title`)}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t(`howItWorks.steps.${i}.description`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>}

    </>
  );
}
