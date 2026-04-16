'use client';

import Image from 'next/image';
import Link from 'next/link';
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

export default function LandscapingIndustry() {
  const t = useTranslations('industryPages.landscaping');
  const m = useTranslations('mockup.common');
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  const stats = t.raw('stats.items') as Array<{ value: string; label: string }>;
  const problems = t.raw('problems.items') as Array<{ problem: string; solution: string }>;
  const scheduleStops = t.raw('features.crewScheduling.mockupStops') as Array<{ n: string; t: string; svc: string; done: boolean }>;
  const costRows = t.raw('features.jobCosting.mockupRows') as Array<{ label: string; est: string; act: string }>;
  const costPct = [88, 100, 117];
  const costColor = ['emerald', 'emerald', 'amber'];
  const seasonalServices = t.raw('features.seasonal.mockupServices') as Array<{ name: string; freqKey: string; season: string; color: string }>;
  const invoiceLines = t.raw('features.invoicing.mockupLines') as Array<{ d: string; p: string }>;
  const moreItems = t.raw('moreCapabilities.items') as Array<{ title: string; description: string }>;
  const moreHrefs = ['/app', '/features/live-dashboard', '/features/quality-controls', '/features/customer-portal', '/features/employee-management', '/features/customer-management'];
  const moreIcons = [
    'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z',
    'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    'M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm-8 0c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white relative overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 5.879a3 3 0 015.657 0c.79 1.367.302 3.13-1.092 3.86l-3.232 1.69a1 1 0 01-1.394-.408L12.39 7.74a1 1 0 01.408-1.394l1.323-.467zM12 14a3 3 0 100-6 3 3 0 000 6zm0 0v6m-6-6h12" />
                </svg>
                <span className="text-sm font-medium text-primary">{t('badge')}</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6 leading-tight">
                {t('hero.titleStart')}{' '}
                <span className="text-primary">{t('hero.titleHighlight')}</span>{' '}
                {t('hero.titleEnd')}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                {t('hero.description')}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button withArrow onClick={openCalendly}>{t('hero.cta')}</Button>
                <p className="text-sm text-gray-500">{t('hero.trial')}</p>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/industries/landscaping-hero.jpg"
                  alt={t('hero.imageAlt')}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-dark">{t('hero.floatingBadge.title')}</p>
                    <p className="text-[10px] text-gray-500">{t('hero.floatingBadge.subtitle')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Stats bar ── */}
      <section className="py-8 bg-gray-50 border-y border-gray-100">
        <Container>
          <div className="flex items-center justify-center gap-10 md:gap-20 flex-wrap text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-dark">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Pain points ── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">
              {t('problems.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('problems.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {problems.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <p className="text-sm font-semibold text-dark">{item.problem}</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-gray-600">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Feature 1: Crew scheduling & routes ── */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-pink-100 text-pink-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.crewScheduling.title')}</h3>
              <p className="text-gray-600 text-lg mb-6">{t('features.crewScheduling.description')}</p>
              <Link href="/features/task-scheduling" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
                {t('features.crewScheduling.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="font-heading text-sm font-bold text-dark">{t('features.crewScheduling.mockupTitle')}</p>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{t('features.crewScheduling.mockupBadge')}</span>
              </div>
              <div className="space-y-1.5">
                {scheduleStops.map((stop, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl border ${stop.done ? 'bg-emerald-50/50 border-emerald-100' : 'bg-white border-gray-100'}`}>
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold flex-shrink-0">{i + 1}</div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[11px] font-semibold ${stop.done ? 'text-gray-400 line-through' : 'text-dark'}`}>{stop.n}</p>
                      <p className="text-[9px] text-gray-400">{stop.svc}</p>
                    </div>
                    <span className={`text-[10px] ${stop.done ? 'text-gray-400' : 'text-dark font-medium'}`}>{stop.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Feature 2: Job costing ── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-emerald-50 px-5 py-3 border-b border-emerald-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-dark">{t('features.jobCosting.mockupJobTitle')}</p>
                    <p className="text-[10px] text-gray-500">{t('features.jobCosting.mockupJobSubtitle')}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">{m('onTrack')}</span>
                </div>
                <div className="p-5 space-y-3">
                  {costRows.map((row, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[11px] font-semibold text-dark">{row.label}</p>
                        <p className="text-[10px] text-gray-500">{row.act} / {row.est}</p>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${costColor[i] === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${Math.min(costPct[i], 100)}%` }} />
                      </div>
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">{t('features.jobCosting.mockupQuoted')}</p>
                      <p className="text-base font-bold text-dark">$8,400</p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-2.5 border border-emerald-100">
                      <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">{t('features.jobCosting.mockupMargin')}</p>
                      <p className="text-base font-bold text-emerald-700">22%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.jobCosting.title')}</h3>
              <p className="text-gray-600 text-lg mb-6">{t('features.jobCosting.description')}</p>
              <Link href="/features/live-dashboard" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
                {t('features.jobCosting.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Feature 3: Seasonal services ── */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 text-amber-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.seasonal.title')}</h3>
              <p className="text-gray-600 text-lg mb-6">{t('features.seasonal.description')}</p>
              <Link href="/features/task-scheduling" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
                {t('features.seasonal.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
                <p className="text-sm font-bold text-dark">{t('features.seasonal.mockupTitle')}</p>
                <p className="text-[10px] text-gray-500">{t('features.seasonal.mockupSubtitle')}</p>
              </div>
              <div className="p-4 space-y-2">
                {seasonalServices.map((svc, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      svc.color === 'emerald' ? 'bg-emerald-100' : svc.color === 'amber' ? 'bg-amber-100' : 'bg-cyan-100'
                    }`}>
                      <svg className={`w-4 h-4 ${
                        svc.color === 'emerald' ? 'text-emerald-600' : svc.color === 'amber' ? 'text-amber-600' : 'text-cyan-600'
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-dark truncate">{svc.name}</p>
                      <p className="text-[9px] text-gray-500">{m(svc.freqKey)}</p>
                    </div>
                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                      svc.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : svc.color === 'amber' ? 'bg-amber-100 text-amber-700' : 'bg-cyan-100 text-cyan-700'
                    }`}>{svc.season}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Feature 4: Invoicing ── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-heading text-sm font-bold text-dark">Invoice #2026-0612</p>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">{m('draft')}</span>
                </div>
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                  <div>
                    <p className="text-[11px] font-semibold text-dark">{t('features.invoicing.mockupCustomer')}</p>
                    <p className="text-[9px] text-gray-400">{t('features.invoicing.mockupPeriod')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-gray-400">{t('features.invoicing.mockupTerms')}</p>
                  </div>
                </div>
                {invoiceLines.map((l, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-[10px] text-gray-600">{l.d}</span>
                    <span className="text-[11px] font-bold text-dark">{l.p}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100">
                  <span className="text-[10px] font-semibold text-gray-500">{m('totalLabel')}</span>
                  <span className="text-lg font-bold text-dark">$1,140</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.invoicing.title')}</h3>
              <p className="text-gray-600 text-lg mb-6">{t('features.invoicing.description')}</p>
              <Link href="/features/invoicing-billing" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline mb-6">
                {t('features.invoicing.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
              <p className="text-sm text-gray-400 mb-3">{t('features.invoicing.integratesWith')}</p>
              <div className="flex items-center gap-6 flex-wrap">
                {[
                  { src: '/integrations/quickbooks.png', alt: 'QuickBooks' },
                  { src: '/integrations/dynamics-nav.png', alt: 'Dynamics NAV' },
                  { src: '/integrations/economic.png', alt: 'e-conomic' },
                  { src: '/integrations/dinero.png', alt: 'Dinero' },
                ].map((logo) => (
                  <Image key={logo.alt} src={logo.src} alt={logo.alt} width={100} height={32} className="h-7 w-auto object-contain opacity-70" />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── More capabilities ── */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">{t('moreCapabilities.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('moreCapabilities.description')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {moreItems.map((feat, i) => (
              <Link key={feat.title} href={moreHrefs[i]} className="group bg-white hover:shadow-lg rounded-2xl p-6 border border-gray-100 hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center mb-4 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={moreIcons[i]} />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-dark mb-2">{feat.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feat.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
