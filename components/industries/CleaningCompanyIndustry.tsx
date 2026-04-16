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

export default function CleaningCompanyIndustry() {
  const t = useTranslations('industryPages.cleaningCompany');
  const m = useTranslations('mockup.common');
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  const stats = t.raw('stats.items') as Array<{ value: string; label: string }>;
  const problems = t.raw('problems.items') as Array<{ problem: string; solution: string }>;
  const scheduleDays = t.raw('features.scheduling.mockupDays') as Array<{ day: string; tasks: Array<{ n: string; l: string; fKey: string }> }>;
  const freqLabels = t.raw('features.scheduling.freqLabels') as Record<string, string>;
  const qualityItems = t.raw('features.qualityControl.mockupItems') as Array<{ q: string; ok: boolean }>;
  const invoiceLines = t.raw('features.invoicing.mockupLines') as Array<{ d: string; p: string }>;
  const moreItems = t.raw('moreCapabilities.items') as Array<{ title: string; description: string }>;
  const moreHrefs = ['/features/customer-portal', '/features/employee-management', '/app', '/features/task-scheduling', '/features/live-dashboard', '/features/employee-management'];
  const moreIcons = [
    'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    'M19 14l-7 7m0 0l-7-7m7 7V3',
    'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-sm font-medium text-primary">{t('badge')}</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6 leading-tight">
                {t('hero.titleStart')}{' '}
                <span className="text-primary">{t('hero.titleHighlight')}</span>
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
                  src="/industries/cleaning-company-hero.jpg"
                  alt={t('hero.imageAlt')}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
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

      {/* ── Feature 1: Scheduling ── */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-pink-100 text-pink-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.scheduling.title')}</h3>
              <p className="text-gray-600 text-lg mb-6">{t('features.scheduling.description')}</p>
              <Link href="/features/task-scheduling" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
                {t('features.scheduling.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="font-heading text-sm font-bold text-dark">{t('features.scheduling.mockupTitle')}</p>
                <span className="text-[10px] text-gray-500">{t('features.scheduling.mockupWeek')}</span>
              </div>
              <div className="space-y-2">
                {scheduleDays.map((day) => (
                  <div key={day.day}>
                    <p className="text-[10px] font-bold text-primary mb-1">{day.day}</p>
                    {day.tasks.map((task, i) => (
                      <div key={i} className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-gray-50 mb-1">
                        <div className="w-3 h-3 rounded-full border border-gray-300 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-semibold text-dark truncate">{task.n}</p>
                          <p className="text-[9px] text-gray-400 truncate">{task.l}</p>
                        </div>
                        <span className="text-[9px] font-medium text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded flex-shrink-0">{freqLabels[task.fKey]}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Feature 2: Quality control ── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-cyan-50 px-5 py-3 border-b border-cyan-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    <p className="text-sm font-bold text-dark">{t('features.qualityControl.mockupTitle')}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">95%</span>
                </div>
                <div className="p-4 space-y-2">
                  {qualityItems.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 py-1.5">
                      <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${r.ok ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={r.ok ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} /></svg>
                      </div>
                      <span className="text-[11px] font-semibold text-dark flex-1">{r.q}</span>
                      {!r.ok && <span className="text-[9px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">{m('issue')}</span>}
                    </div>
                  ))}
                  <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-gray-100">
                    {['/quality-reports/entrance-hall.jpeg', '/quality-reports/staircase.jpeg', '/quality-reports/bin-shelter.jpeg', '/quality-reports/baler-area.jpeg'].map((src, i) => (
                      <div key={i} className="aspect-square rounded-lg overflow-hidden relative">
                        <Image src={src} alt="Inspection" fill sizes="80px" className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.qualityControl.title')}</h3>
              <p className="text-gray-600 text-lg mb-6">{t('features.qualityControl.description')}</p>
              <Link href="/features/quality-controls" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
                {t('features.qualityControl.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Feature 3: Time tracking & payroll ── */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.timeTracking.title')}</h3>
              <p className="text-gray-600 text-lg mb-4">{t('features.timeTracking.descriptionP1')}</p>
              <p className="text-gray-600 text-lg mb-6">{t('features.timeTracking.descriptionP2')}</p>
              <Link href="/features/employee-management" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
                {t('features.timeTracking.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
              <p className="font-heading text-sm font-bold text-dark mb-3">{t('features.timeTracking.mockupTitle')}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                  <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">{m('approved')}</p>
                  <p className="text-xl font-bold text-dark">124{t('features.timeTracking.mockupApprovedLabel')}</p>
                  <p className="text-[10px] text-gray-500">6 {t('features.timeTracking.mockupEmployeesLabel')}</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                  <p className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">{m('pending')}</p>
                  <p className="text-xl font-bold text-dark">16{t('features.timeTracking.mockupApprovedLabel')}</p>
                  <p className="text-[10px] text-gray-500">2 {t('features.timeTracking.mockupEmployeesLabel')}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                {[
                  { n: 'Anna M.', h: '24h 0m', s: m('approved') },
                  { n: 'Jonas L.', h: '22h 30m', s: m('approved') },
                  { n: 'Sara K.', h: '16h 0m', s: m('pending') },
                ].map((e, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[9px] font-bold flex-shrink-0">{e.n.split(' ').map(w => w[0]).join('')}</div>
                    <span className="text-[11px] font-semibold text-dark flex-1">{e.n}</span>
                    <span className="text-[10px] text-gray-500">{e.h}</span>
                    <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${e.s === m('approved') ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-600'}`}>{e.s}</span>
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
                <div className="flex items-center justify-between mb-4">
                  <p className="font-heading text-sm font-bold text-dark">Invoice #2026-0428</p>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">{m('draft')}</span>
                </div>
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                  <div>
                    <p className="text-[11px] font-semibold text-dark">{t('features.invoicing.mockupCustomer')}</p>
                    <p className="text-[9px] text-gray-400">{t('features.invoicing.mockupAddress')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-gray-400">{t('features.invoicing.mockupTerms')}</p>
                    <p className="text-[9px] text-gray-400">{t('features.invoicing.mockupDueLabel')}</p>
                  </div>
                </div>
                {invoiceLines.map((l, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-[10px] text-gray-600">{l.d}</span>
                    <span className="text-[11px] font-bold text-dark">{l.p}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100">
                  <span className="text-[10px] font-semibold text-gray-500">{t('features.invoicing.mockupTotalLabel')}</span>
                  <span className="text-lg font-bold text-dark">€1,720</span>
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
                  { src: '/integrations/dinero.png', alt: 'Dinero' },
                  { src: '/integrations/economic.png', alt: 'e-conomic' },
                  { src: '/integrations/dynamics-nav.png', alt: 'Dynamics NAV' },
                  { src: '/integrations/quickbooks.png', alt: 'QuickBooks' },
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
