'use client';

import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import Image from 'next/image';

export default function MobileApp() {
  const t = useTranslations('mobileApp');

  const features = [
    {
      key: 'gpsTracking',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      key: 'revenueOverview',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      key: 'photoCapture',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      key: 'taskManagement',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="mobile-app" className="section-padding bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Phone mockup */}
          <div className="relative flex justify-center order-2 lg:order-1">
            <div className="relative">
              {/* Phone frame */}
              <div className="relative w-[280px] h-[580px] bg-dark rounded-[3rem] p-3 shadow-2xl">
                {/* Phone screen */}
                <div className="w-full h-full bg-gray-100 rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-dark rounded-b-2xl z-10" />

                  {/* Screen content placeholder */}
                  <div className="w-full h-full bg-gradient-to-b from-primary/10 to-primary/5 flex flex-col items-center justify-center p-6">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4">
                      <Image src="/logo.png" alt="SnowManager" width={40} height={40} />
                    </div>
                    <div className="text-center">
                      <p className="font-heading font-bold text-dark text-lg">SnowManager</p>
                      <p className="text-gray-500 text-sm">{t('appTagline')}</p>
                    </div>

                    {/* Mock UI elements */}
                    <div className="mt-8 w-full space-y-3">
                      <div className="h-12 bg-white rounded-xl shadow-sm" />
                      <div className="h-12 bg-white rounded-xl shadow-sm" />
                      <div className="h-12 bg-white rounded-xl shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-primary">{t('badge')}</span>
            </div>

            {/* Title */}
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">
              {t('title')}
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8">
              {t('description')}
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature) => (
                <div
                  key={feature.key}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">
                      {t(`features.${feature.key}.title`)}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t(`features.${feature.key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* App store buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://apps.apple.com/dk/app/wintermanager/id6746579194"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/app-store-badge.png"
                  alt="Download on the App Store"
                  width={180}
                  height={60}
                  className="h-12 md:h-14 w-auto"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.sabertask.wintermanager&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/google-play-badge.png"
                  alt="Get it on Google Play"
                  width={180}
                  height={60}
                  className="h-12 md:h-14 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
