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

export default function WindowCleaningIndustry() {
  const t = useTranslations('industryPages.windowCleaning');
  const m = useTranslations('mockup.common');
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  const stats = t.raw('stats.items') as Array<{ value: string; label: string }>;
  const problems = t.raw('problems.items') as Array<{ problem: string; solution: string }>;
  const checklist = t.raw('features.workDescriptions.mockupChecklist') as string[];
  const invoiceLines = t.raw('features.invoicing.mockupLines') as Array<{ d: string; p: string }>;
  const accordItems = t.raw('features.accord.items') as Array<{ title: string; desc: string }>;
  const moreItems = t.raw('moreCapabilities.items') as Array<{ title: string; description: string }>;
  const moreHrefs = ['/app', '/features/employee-management', '/features/customer-portal', '/features/quality-controls', '/features/customer-management', '/features/live-dashboard'];
  const moreIcons = [
    'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
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
                  src="/industries/window-cleaning-hero.jpg"
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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

      {/* ── The problems ── */}
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

      {/* ── Feature 1: Route planning ── */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-pink-100 text-pink-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.routePlanning.title')}</h3>
              <p className="text-gray-600 text-lg mb-6">{t('features.routePlanning.description')}</p>
              <Link href="/features/task-scheduling" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
                {t('features.routePlanning.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="font-heading text-sm font-bold text-dark">{t('features.routePlanning.mockupTitle')}</p>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{t('features.routePlanning.mockupBadge')}</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { n: 'Strandvejen 12', t: '08:00', done: true },
                  { n: 'Ordrupvej 44', t: '08:45', done: true },
                  { n: 'Bernstorffsvej 8', t: '09:30', done: true },
                  { n: 'Jægersborg Allé 22', t: '10:15', done: false },
                  { n: 'Gentoftegade 5', t: '11:00', done: false },
                ].map((stop, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl border ${stop.done ? 'bg-emerald-50/50 border-emerald-100' : 'bg-white border-gray-100'}`}>
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold flex-shrink-0">{i + 1}</div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[11px] font-semibold ${stop.done ? 'text-gray-400 line-through' : 'text-dark'}`}>{stop.n}</p>
                    </div>
                    <span className={`text-[10px] ${stop.done ? 'text-gray-400' : 'text-dark font-medium'}`}>{stop.t}</span>
                    {stop.done && <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Feature 2: Work descriptions ── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-primary/5 px-5 py-3 border-b border-gray-100">
                  <p className="text-sm font-bold text-dark">{m('description')} · Borups Allé 233</p>
                  <p className="text-[10px] text-gray-500">{t('features.workDescriptions.mockupSubtitle')}</p>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{t('features.workDescriptions.mockupAreaLabel')}</p>
                    <p className="text-[11px] text-dark bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">{t('features.workDescriptions.mockupArea')}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{m('every4Weeks')}</span>
                    <span className="text-[10px] text-gray-500">{t('features.workDescriptions.mockupFrequency')}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{t('features.workDescriptions.mockupChecklistLabel')}</p>
                    {checklist.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 py-1 border-b border-gray-50 last:border-0">
                        <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                        <span className="text-[11px] text-dark">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.workDescriptions.title')}</h3>
              <p className="text-gray-600 text-lg mb-6">{t('features.workDescriptions.description')}</p>
              <Link href="/features/task-scheduling" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
                {t('features.workDescriptions.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Feature 3: Invoicing ── */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
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
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="font-heading text-sm font-bold text-dark">Invoice #2026-0512</p>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">{m('sent')}</span>
              </div>
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                <div>
                  <p className="text-[11px] font-semibold text-dark">{t('features.invoicing.mockupCustomer')}</p>
                  <p className="text-[9px] text-gray-400">{t('features.invoicing.mockupAddress')}</p>
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
                <span className="text-lg font-bold text-dark">1.050 kr</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Feature 4: Accord / Piece-rate payments ── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-blue-50 px-5 py-3 border-b border-blue-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-dark">{t('features.accord.mockupTitle')}</p>
                    <p className="text-[10px] text-gray-500">{t('features.accord.mockupPeriod')}</p>
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">{m('live')}</span>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                      <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">{m('approved')}</p>
                      <p className="text-xl font-bold text-dark">3.420 kr</p>
                      <p className="text-[10px] text-gray-500">9 {t('features.accord.mockupApprovedTasks')}</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                      <p className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">{m('pending')}</p>
                      <p className="text-xl font-bold text-dark">580 kr</p>
                      <p className="text-[10px] text-gray-500">2 {t('features.accord.mockupApprovedTasks')}</p>
                    </div>
                  </div>

                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{t('features.accord.mockupRecentLabel')}</p>
                  {[
                    { date: '14 Apr', task: 'Front facade · Strandvejen 12', mins: 18, rate: '380 kr', status: m('approved') },
                    { date: '14 Apr', task: 'Conservatory · Bernstorffsvej 8', mins: 24, rate: '425 kr', status: m('approved') },
                    { date: '13 Apr', task: 'Back windows · Ordrupvej 44', mins: 12, rate: '275 kr', status: m('pending') },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                      <div className="text-center flex-shrink-0" style={{ minWidth: '36px' }}>
                        <p className="text-[10px] font-semibold text-dark">{row.date}</p>
                        <p className="text-[8px] text-gray-400">{row.mins} min</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-dark truncate">{row.task}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[11px] font-bold text-dark">{row.rate}</p>
                        <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded ${row.status === m('approved') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'}`}>{row.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.accord.title')}</h3>
              <p className="text-gray-600 text-lg mb-4">
                {t('features.accord.description')}
              </p>
              <ul className="space-y-3 mb-6">
                {accordItems.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <p className="font-semibold text-dark">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href="/features/employee-management" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
                {t('features.accord.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
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
              <Link key={feat.title} href={moreHrefs[i]} className="group bg-gray-50 hover:bg-white hover:shadow-lg rounded-2xl p-6 border border-gray-100 hover:border-primary/20 transition-all duration-300">
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
