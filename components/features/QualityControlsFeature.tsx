'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import FeaturePageLayout, { Capability } from './FeaturePageLayout';
import { featureThemes } from '@/lib/featureThemes';

/**
 * Pixel-built mobile phone mockup for the spotlight section.
 * Mirrors the SaberTask mobile task screen with the "Recent Issues"
 * card highlighted as the focal point of this section.
 */
function MobilePhoneMockup() {
  const c = useTranslations('mockup.common');
  const m = useTranslations('mockup.fp.qualityMobile');

  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      {/* Phone outer frame */}
      <div className="bg-dark rounded-[3rem] p-2 shadow-2xl">
        {/* Inner screen */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-dark rounded-full z-30" />

          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-bold text-dark relative z-20">
            <span>19:07</span>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
              </svg>
              <svg className="w-4 h-3" fill="none" viewBox="0 0 24 16">
                <rect x="1" y="3" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <rect x="3" y="5" width="14" height="6" rx="0.5" fill="currentColor" />
                <rect x="20" y="6" width="2" height="4" rx="0.5" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* App header */}
          <div className="px-4 pt-4 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-1 text-primary">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-[11px] font-semibold">{c('home')}</span>
            </div>
            <span className="text-sm font-bold text-dark">Fortunvej 44</span>
            <div className="w-12" />
          </div>

          {/* Body */}
          <div className="px-3 pb-3 space-y-2.5 bg-gray-50">
            {/* Task ID + Customer ID */}
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">{c('taskId')}</p>
                  <p className="text-sm font-bold text-dark mt-0.5">SA-1</p>
                </div>
                <div>
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">{c('customerId')}</p>
                  <p className="text-sm font-bold text-dark mt-0.5">C-1001</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-bold text-dark">{c('address')}</p>
                <div className="flex items-center gap-0.5 text-primary">
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span className="text-[8px] font-semibold">{c('open')}</span>
                </div>
              </div>
              <p className="text-[9px] text-gray-600 mb-2">Fortunvej 44, Charlottenlund 2920</p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                <div>
                  <p className="text-[7px] font-bold text-gray-400 uppercase tracking-wider">{c('lastVisit')}</p>
                  <p className="text-[10px] font-bold text-dark mt-0.5">{m('lastVisitDate')}</p>
                </div>
                <div>
                  <p className="text-[7px] font-bold text-gray-400 uppercase tracking-wider">{c('nextVisit')}</p>
                  <p className="text-[10px] font-semibold text-gray-500 mt-0.5">{c('noScheduled')}</p>
                </div>
              </div>
            </div>

            {/* RECENT ISSUES - focal element */}
            <div className="relative bg-amber-50 border-2 border-amber-300 rounded-xl p-2.5 shadow-[0_0_0_4px_rgba(251,191,36,0.15)]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-amber-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-[10px] font-bold text-dark">{m('recentIssues')}</p>
                </div>
                <span className="text-[8px] font-bold text-amber-700 bg-amber-200 px-1.5 py-0.5 rounded-full">
                  {m('oneReport')}
                </span>
              </div>
              {[0].map((i) => (
                <div key={i} className="bg-white rounded-lg p-1.5 mb-1 last:mb-0 flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-dark leading-tight">{m('issueDate')}</p>
                    <p className="text-[7px] text-gray-500 mt-0.5">{m('byAdmin')}</p>
                  </div>
                  <span className="text-[7px] font-bold text-red-600 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">
                    {m('oneIssue')}
                  </span>
                  <svg className="w-2.5 h-2.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Worker Input */}
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <p className="text-[10px] font-bold text-dark mb-1.5">{c('workerInput')}</p>
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mb-1">{c('notes')}</p>
              <div className="h-10 rounded-md border border-gray-200 bg-gray-50 px-2 pt-1.5">
                <span className="text-[9px] text-gray-300">{c('notes')}</span>
              </div>
            </div>
          </div>

          {/* Bottom action buttons */}
          <div className="bg-white border-t border-gray-100 px-3 py-3 grid grid-cols-2 gap-2">
            <button className="bg-primary text-white text-[10px] font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              {c('startTask')}
            </button>
            <button className="bg-gray-100 text-gray-400 text-[10px] font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              {c('finalize')}
            </button>
          </div>

          {/* Home indicator (iPhone bar) */}
          <div className="flex justify-center pb-1.5 pt-0.5 bg-white">
            <div className="w-24 h-1 rounded-full bg-dark/80" />
          </div>
        </div>
      </div>
    </div>
  );
}

const capabilities: Capability[] = [
  {
    key: 'templates',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
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
    key: 'signatures',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    key: 'pdfExport',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    key: 'recentIssues',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    key: 'multilingual',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
  },
];


function HeroVisual() {
  const mq = useTranslations('mockup.fp.qualityCtrl');
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {/* App top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-dark leading-tight">{mq('title')}</p>
            <p className="text-[9px] text-gray-500">{mq('location')}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-semibold text-emerald-700">{mq('saving')}</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* KPI strip */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-gray-100 bg-white px-3 py-2.5">
            <p className="text-[10px] font-medium text-gray-500 mb-0.5">{mq('section')}</p>
            <p className="text-lg font-bold text-dark">2/4</p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white px-3 py-2.5">
            <p className="text-[10px] font-medium text-gray-500 mb-0.5">{mq('issues')}</p>
            <p className="text-lg font-bold text-dark">1</p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5">
            <p className="text-[10px] font-medium text-emerald-600 mb-0.5">{mq('score')}</p>
            <p className="text-lg font-bold text-emerald-600">95%</p>
          </div>
        </div>

        {/* Inspection items */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-semibold text-dark uppercase tracking-wide">{mq('kitchen')}</p>
            <span className="text-[10px] font-medium text-primary">{mq('of12')}</span>
          </div>
          <div className="space-y-1.5">
            {[
              { q: mq('q1'), a: 'happy' as const },
              { q: mq('q2'), a: 'happy' as const },
              { q: mq('q3'), a: 'unhappy' as const },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50">
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-dark truncate">{row.q}</p>
                </div>
                <div className="flex gap-1.5">
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center ${
                      row.a === 'happy' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-300'
                    }`}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center ${
                      row.a === 'unhappy' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-300'
                    }`}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo evidence */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-semibold text-dark uppercase tracking-wide">{mq('photoEvidence')}</p>
            <span className="text-[10px] font-medium text-gray-500">{mq('fivePhotos')}</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {[
              { src: '/quality-reports/baler-area.jpeg', alt: 'Baler area inspection photo' },
              { src: '/quality-reports/bin-shelter.jpeg', alt: 'Bin shelter inspection photo' },
              { src: '/quality-reports/entrance-hall.jpeg', alt: 'Entrance hall inspection photo' },
              { src: '/quality-reports/staircase.jpeg', alt: 'Staircase inspection photo' },
              { src: '/quality-reports/basement-landing.jpeg', alt: 'Basement landing inspection photo' },
            ].map((photo) => (
              <div key={photo.src} className="relative aspect-square rounded-md overflow-hidden bg-gray-100">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 20vw, 80px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingCard() {
  const mq = useTranslations('mockup.fp.qualityCtrl');
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
        <svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-dark">{mq('reportFinalised')}</p>
        <p className="text-xs text-gray-500">{mq('pdfReady')}</p>
      </div>
    </div>
  );
}

const badgeIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

function MobileSpotlight() {
  const t = useTranslations('featurePages.qualityControls.spotlight');

  const highlights = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      key: '0',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      key: '1',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      key: '2',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
          {/* Phone mockup (built with divs/SVG) */}
          <div className="relative flex justify-center order-2 lg:order-1 py-6">
            <MobilePhoneMockup />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-6">
              <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-amber-600">{t('badge')}</span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4 leading-tight">
              {t('titleStart')}{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #D97706, #FBBF24)' }}
              >
                {t('titleHighlight')}
              </span>
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              {t('description')}
            </p>

            <ul className="space-y-4">
              {highlights.map((h) => (
                <li key={h.key} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                    {h.icon}
                  </div>
                  <div>
                    <p className="font-heading text-base font-bold text-dark mb-1">
                      {t(`highlights.${h.key}.title`)}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t(`highlights.${h.key}.description`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function QualityControlsFeature() {
  return (
    <FeaturePageLayout
      namespace="featurePages.qualityControls"
      theme={featureThemes.qualityControls}
      badgeIcon={badgeIcon}
      heroVisual={<HeroVisual />}
      heroFloatingCard={<FloatingCard />}
      capabilities={capabilities}

      spotlight={<MobileSpotlight />}
    />
  );
}
