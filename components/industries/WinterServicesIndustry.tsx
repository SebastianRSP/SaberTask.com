'use client';

import Image from 'next/image';
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

export default function WinterServicesIndustry() {
  const t = useTranslations('industryPages.winterServices');
  const m = useTranslations('mockup.common');
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  const stats = t.raw('stats.items') as Array<{ value: string; label: string }>;
  const problems = t.raw('problems.items') as Array<{ problem: string; solution: string }>;
  const trucks = t.raw('features.liveDispatch.mockupTrucks') as Array<{ name: string; area: string; stops: string; color: string }>;
  const dispatchStats = t.raw('features.liveDispatch.mockupStats') as string[];
  const activities = t.raw('features.customerDashboard.mockupActivities') as Array<{ date: string; event: string; truck: string }>;
  const subcontractors = t.raw('features.subcontractors.mockupSubcontractors') as Array<{ team: string; area: string; visits: number; statusKey: string }>;
  const smStats = t.raw('snowmanager.stats') as Array<{ v: string; l: string }>;
  const moreItems = t.raw('moreCapabilities.items') as Array<{ title: string; description: string }>;
  const moreIcons = [
    'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z',
    'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white relative overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 rounded-full mb-6">
                <svg className="w-4 h-4 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4m16 0l-4-4m4 4l-4 4M4 12l4 4m-4-4l4-4M12 4v16m0-16l-4 4m4-4l4 4M12 20l-4-4m4 4l4-4" />
                </svg>
                <span className="text-sm font-medium text-cyan-700">{t('badge')}</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6 leading-tight">
                {t('hero.titleStart')}{' '}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #0891B2, #67E8F9)' }}>
                  {t('hero.titleHighlight')}
                </span>{' '}
                {t('hero.titleEnd')}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                {t.rich('hero.description', {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button withArrow onClick={openCalendly}>{t('hero.cta')}</Button>
                <a
                  href="https://www.snowmanager.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-cyan-700 font-semibold hover:underline"
                >
                  {t('hero.visitSnowmanager')}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div
                className="rounded-2xl overflow-hidden shadow-2xl p-8 md:p-12 flex items-center justify-center min-h-[400px]"
                style={{ background: 'linear-gradient(135deg, #0891B2 0%, #67E8F9 100%)' }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-xl text-center max-w-sm">
                  <div className="mb-4">
                    <Image
                      src="/industries/snowmanager-logo.png"
                      alt="SnowManager"
                      width={300}
                      height={53}
                      className="h-10 w-auto mx-auto"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">{t('hero.heroCardTagline')}</p>
                  <p className="text-base text-dark mb-6">{t('hero.heroCardDescription')}</p>
                  <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-700">{t('hero.heroCardLive')}</span>
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

      {/* ── The problem ── */}
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
                  <svg className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-gray-600">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Feature 1: Live dispatch ── */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.liveDispatch.title')}</h3>
              <p className="text-gray-600 text-lg mb-6">{t('features.liveDispatch.description')}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-cyan-50 px-5 py-3 border-b border-cyan-100 flex items-center justify-between">
                <p className="text-sm font-bold text-dark">{t('features.liveDispatch.mockupTitle')}</p>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-semibold text-emerald-700">{m('live')}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { l: dispatchStats[0], v: '12' },
                    { l: dispatchStats[1], v: '186' },
                    { l: m('pending'), v: '43' },
                  ].map((s) => (
                    <div key={s.l} className="text-center bg-gray-50 rounded-lg p-2">
                      <p className="text-base font-bold text-dark">{s.v}</p>
                      <p className="text-[10px] text-gray-500">{s.l}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{m('active')}</p>
                {trucks.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${r.color === 'amber' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-dark truncate">{r.name}</p>
                      <p className="text-[9px] text-gray-500">{r.area}</p>
                    </div>
                    <span className="text-[10px] font-bold text-dark">{r.stops}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Feature 2: Smart routes ── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-pink-50 px-5 py-3 border-b border-pink-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-dark">{t('features.smartRoutes.mockupTitle')}</p>
                    <p className="text-[10px] text-gray-500">{t('features.smartRoutes.mockupSubtitle')}</p>
                  </div>
                  <span className="text-[10px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">{m('auto')}</span>
                </div>
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src="/industries/winter-route-optimization.jpg"
                    alt={t('features.smartRoutes.mockupImageAlt')}
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-pink-100 text-pink-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.smartRoutes.title')}</h3>
              <p className="text-gray-600 text-lg mb-6">{t('features.smartRoutes.description')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Feature 3: Drawing tool & service areas ── */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.drawingTool.title')}</h3>
              <p className="text-gray-600 text-lg mb-6">{t('features.drawingTool.description')}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-purple-50 px-5 py-3 border-b border-purple-100">
                <p className="text-sm font-bold text-dark">{t('features.drawingTool.mockupTitle')}</p>
                <p className="text-[10px] text-gray-500">{t('features.drawingTool.mockupSubtitle')}</p>
              </div>
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="/industries/winter-drawing-tool.jpg"
                  alt={t('features.drawingTool.mockupImageAlt')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Feature 4: Customer dashboard ── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gray-100 px-5 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-cyan-100 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-cyan-700">OP</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dark">{t('features.customerDashboard.mockupTitle')}</p>
                      <p className="text-[10px] text-gray-500">{t('features.customerDashboard.mockupSubtitle')}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-cyan-50 rounded-lg p-2 border border-cyan-100">
                      <p className="text-[8px] font-bold text-cyan-700 uppercase tracking-wider">{t('features.customerDashboard.mockupVisitsThisSeason')}</p>
                      <p className="text-base font-bold text-dark">14</p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-100">
                      <p className="text-[8px] font-bold text-emerald-600 uppercase tracking-wider">{t('features.customerDashboard.mockupLastService')}</p>
                      <p className="text-base font-bold text-dark">04:42</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-2 border border-amber-100">
                      <p className="text-[8px] font-bold text-amber-500 uppercase tracking-wider">{t('features.customerDashboard.mockupNextForecast')}</p>
                      <p className="text-base font-bold text-dark">{t('features.customerDashboard.mockupForecastValue')}</p>
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{t('features.customerDashboard.mockupRecentLabel')}</p>
                  {activities.map((row, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-dark truncate">{row.event}</p>
                        <p className="text-[9px] text-gray-500">{row.date} · {row.truck}</p>
                      </div>
                      <span className="text-[9px] font-medium text-emerald-600">{m('completed')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 text-amber-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.customerDashboard.title')}</h3>
              <p className="text-gray-600 text-lg mb-6">{t('features.customerDashboard.description')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Feature 5: Subcontractors & invoicing ── */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.subcontractors.title')}</h3>
              <p className="text-gray-600 text-lg mb-6">{t('features.subcontractors.description')}</p>
              <p className="text-sm text-gray-400 mb-3">{t('features.subcontractors.integratesWith')}</p>
              <div className="flex items-center gap-6 flex-wrap">
                {[
                  { src: '/integrations/dinero.png', alt: 'Dinero' },
                  { src: '/integrations/economic.png', alt: 'e-conomic' },
                  { src: '/integrations/dynamics-nav.png', alt: 'Dynamics NAV' },
                  { src: '/integrations/quickbooks.png', alt: 'QuickBooks' },
                ].map((logo) => (
                  <Image key={logo.alt} src={logo.src} alt={logo.alt} width={100} height={32} className="h-7 w-auto object-contain opacity-70" />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
              <p className="font-heading text-sm font-bold text-dark mb-3">{t('features.subcontractors.mockupTitle')}</p>
              <div className="space-y-2">
                {subcontractors.map((row, i) => {
                  const status = m(row.statusKey);
                  return (
                    <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50">
                      <div className="w-7 h-7 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17h6m-6 4h6m-3-4v4m-7-4h2a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2zm12 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v9a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-dark truncate">{row.team}</p>
                        <p className="text-[9px] text-gray-500">{row.area} · {row.visits} {t('features.subcontractors.mockupStopsLabel')}</p>
                      </div>
                      <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${
                        row.statusKey === 'done' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                      }`}>{status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── SnowManager dedicated section ── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div
            className="rounded-3xl overflow-hidden p-8 md:p-12 lg:p-16 relative"
            style={{ background: 'linear-gradient(135deg, #0891B2 0%, #67E8F9 100%)' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="bg-white inline-flex p-4 rounded-2xl mb-6 shadow-lg">
                  <Image
                    src="/industries/snowmanager-logo.png"
                    alt="SnowManager"
                    width={300}
                    height={53}
                    className="h-10 w-auto"
                  />
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {t('snowmanager.title')}
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  {t('snowmanager.description')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.snowmanager.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-cyan-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {t('snowmanager.visitLink')}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <button onClick={openCalendly} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-colors border border-white/30">
                    {t('snowmanager.bookDemo')}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {smStats.map((s) => (
                  <div key={s.l} className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20 text-center">
                    <p className="text-2xl font-bold text-white">{s.v}</p>
                    <p className="text-xs text-white/70">{s.l}</p>
                  </div>
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
              <div key={feat.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={moreIcons[i]} />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-dark mb-2">{feat.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
