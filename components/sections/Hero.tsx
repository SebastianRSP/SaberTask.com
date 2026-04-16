'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
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

export default function Hero() {
  const t = useTranslations('hero');

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  return (
    <section id="hero">
      {/* Top Section - White background */}
      <div className="pt-32 pb-8 md:pt-40 md:pb-10 bg-white relative z-20">
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-3 items-center">
            {/* Left Column: Headline + CTA - 4 cols */}
            <div className="text-center lg:text-left lg:col-span-4">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold text-dark mb-6 leading-tight">
                {t('titleStart')}{' '}
                <span className="text-primary">{t('titleHighlight1')}</span>{' '}
                {t('titleMiddle')}{' '}
                <span className="text-primary">{t('titleHighlight2')}</span>
              </h1>
              <Button withArrow onClick={openCalendly}>{t('cta')}</Button>
              {/* Decorative Chevrons */}
            </div>

            {/* Center Column: Laptop Mockup - 6 cols */}
            <div className="relative z-20 order-first lg:order-none lg:col-span-6">
              <div className="relative mx-auto max-w-lg lg:max-w-none lg:scale-[1.15] mb-4 lg:mb-[-50px] lg:ml-[-20px]">
                {/* Laptop Image */}
                <Image
                  src="/laptop-mockup.png"
                  alt="Platform preview"
                  width={900}
                  height={675}
                  className="w-full h-auto"
                  priority
                />
                {/* Screenshot Placeholder - positioned over the laptop screen */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="overflow-hidden"
                    style={{
                      width: '76.5%',
                      height: '82.8%',
                      marginTop: '-2.2%',
                    }}
                  >
                    <Image
                      src="/dashboard-screenshot.jpg"
                      alt="SaberTask Dashboard"
                      width={1400}
                      height={870}
                      className="w-full h-full object-cover object-left-top"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Stats - 2 cols */}
            <div className="text-center lg:text-left lg:col-span-2 grid gap-1">
              {/* Quote Icon */}
              <svg
                className="w-8 h-8 text-primary mb-4 mx-auto lg:mx-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-sm font-medium text-dark">
                {t('tagline')}
              </p>
              {/* Avatar Stack */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-200 to-primary-400 border-2 border-white flex items-center justify-center text-white text-sm font-medium"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-lg font-bold text-dark">{t('userCount')}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{t('trustedBy')}</p>

            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Section - Blue Banner */}
      <Container className="mb-16 md:mb-24">
        <div className="py-12 md:py-16 relative z-10 overflow-hidden rounded-3xl" style={{ background: 'linear-gradient(to bottom, #4462F8, #5a7aff)' }}>
          {/* Scrolling Text with Fade */}
          <div className="relative mb-8"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
          >

            {/* Scrolling text */}
            <div className="overflow-hidden">
              <div className="animate-marquee inline-flex">
                <span className="text-4xl md:text-6xl lg:text-7xl font-thin text-white/[0.55] mx-8 whitespace-nowrap" style={{ lineHeight: 1.2 }}>
                  {t('bannerTitle')}
                </span>
                <span className="text-4xl md:text-6xl lg:text-7xl font-thin text-white/[0.55] mx-8 whitespace-nowrap" style={{ lineHeight: 1.2 }}>
                  {t('bannerTitle')}
                </span>
                <span className="text-4xl md:text-6xl lg:text-7xl font-thin text-white/[0.55] mx-8 whitespace-nowrap" style={{ lineHeight: 1.2 }}>
                  {t('bannerTitle')}
                </span>
                <span className="text-4xl md:text-6xl lg:text-7xl font-thin text-white/[0.55] mx-8 whitespace-nowrap" style={{ lineHeight: 1.2 }}>
                  {t('bannerTitle')}
                </span>
              </div>
            </div>
          </div>

          {/* Fading line */}
          <div className="flex justify-center mb-8">
            <div
              className="h-px w-full max-w-md"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)'
              }}
            />
          </div>

          <div className="text-center relative z-10 px-4">
            {/* Partner Logos */}
            <div className="flex justify-center items-center gap-8 md:gap-14 flex-wrap">
              <Image
                src="/partner-logo-1.png"
                alt="Partner"
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto object-contain"
              />
              <Image
                src="/partner-logo-2.png"
                alt="Partner"
                width={160}
                height={40}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
