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

export default function FacilityManagementIndustry() {
  const t = useTranslations('industryPages.facilityManagement');
  const m = useTranslations('mockup.common');
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  const stats = t.raw('stats.items') as Array<{ value: string; label: string }>;
  const problems = t.raw('problems.items') as Array<{ problem: string; solution: string }>;
  const buildings = t.raw('features.buildingDatabase.mockupBuildings') as Array<{ n: string; units: string; tasks: number }>;
  const agreements = t.raw('features.serviceAgreements.mockupServices') as Array<{ name: string; freqKey: string; next: string; color: string }>;
  const inspectionItems = t.raw('features.photoProof.mockupItems') as Array<{ q: string; ok: boolean }>;
  const activities = t.raw('features.customerDashboard.mockupActivities') as Array<{ task: string; loc: string; timeKey: string; timeSuffix: string; statusKey: string }>;
  const dashboardBullets = t.raw('features.customerDashboard.bullets') as string[];
  const suppliers = t.raw('features.suppliers.mockupSuppliers') as Array<{ team: string; task: string; color: string; statusKey?: string; statusText?: string }>;
  const moreItems = t.raw('moreCapabilities.items') as Array<{ title: string; description: string }>;
  const moreHrefs = ['/app', '/features/live-dashboard', '/features/invoicing-billing', '/features/task-scheduling', '/features/employee-management', '/features/customer-management'];
  const moreIcons = [
    'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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
                  src="/industries/facility-management-hero.jpg"
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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

      {/* ── Feature 1: Building database ── */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.buildingDatabase.title')}</h3>
              <p className="text-gray-600 text-lg mb-6">{t('features.buildingDatabase.description')}</p>
              <Link href="/features/customer-management" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
                {t('features.buildingDatabase.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-indigo-50 px-5 py-3 border-b border-indigo-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">NP</div>
                  <div>
                    <p className="text-sm font-bold text-dark">{t('features.buildingDatabase.mockupOwner')}</p>
                    <p className="text-[10px] text-gray-500">{t('features.buildingDatabase.mockupRole')}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{m('active')}</span>
              </div>
              <div className="p-4">
                <div className="flex gap-3 border-b border-gray-100 mb-3">
                  <span className="text-[10px] font-semibold text-indigo-600 border-b-2 border-indigo-600 pb-2">{m('buildings')}</span>
                  <span className="text-[10px] text-gray-400 pb-2">{m('contacts')}</span>
                  <span className="text-[10px] text-gray-400 pb-2">{m('agreements')}</span>
                  <span className="text-[10px] text-gray-400 pb-2">{m('files')}</span>
                </div>
                {buildings.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-dark truncate">{p.n}</p>
                      <p className="text-[9px] text-gray-500 truncate">{p.units}</p>
                    </div>
                    <span className="text-[9px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{p.tasks} {t('features.buildingDatabase.mockupTasksPerMonth')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Feature 2: Service agreements & maintenance ── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-pink-50 px-5 py-3 border-b border-pink-100">
                  <p className="text-sm font-bold text-dark">{t('features.serviceAgreements.mockupTitle')}</p>
                  <p className="text-[10px] text-gray-500">{t('features.serviceAgreements.mockupSubtitle')}</p>
                </div>
                <div className="p-4 space-y-2">
                  {agreements.map((svc, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        svc.color === 'pink' ? 'bg-pink-100' : 'bg-amber-100'
                      }`}>
                        <svg className={`w-4 h-4 ${
                          svc.color === 'pink' ? 'text-pink-600' : 'text-amber-600'
                        }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-dark truncate">{svc.name}</p>
                        <p className="text-[9px] text-gray-500">{m(svc.freqKey)}</p>
                      </div>
                      <span className="text-[9px] font-medium text-gray-600 bg-white border border-gray-200 px-2 py-0.5 rounded-full">{t('features.serviceAgreements.mockupNextLabel')}: {svc.next}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-pink-100 text-pink-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.serviceAgreements.title')}</h3>
              <p className="text-gray-600 text-lg mb-6">{t('features.serviceAgreements.description')}</p>
              <Link href="/features/task-scheduling" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
                {t('features.serviceAgreements.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Feature 3: Photo proof & quality ── */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.photoProof.title')}</h3>
              <p className="text-gray-600 text-lg mb-6">{t('features.photoProof.description')}</p>
              <Link href="/features/quality-controls" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
                {t('features.photoProof.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-cyan-50 px-5 py-3 border-b border-cyan-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-dark">{t('features.photoProof.mockupTitle')}</p>
                  <p className="text-[10px] text-gray-500">{t('features.photoProof.mockupSubtitle')}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">95%</span>
              </div>
              <div className="p-4">
                {inspectionItems.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
                    <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${r.ok ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={r.ok ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} /></svg>
                    </div>
                    <span className="text-[11px] font-semibold text-dark flex-1">{r.q}</span>
                    {!r.ok && <span className="text-[9px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">{m('issue')}</span>}
                  </div>
                ))}
                <div className="grid grid-cols-4 gap-1.5 mt-3 pt-3 border-t border-gray-100">
                  {['/quality-reports/entrance-hall.jpeg', '/quality-reports/staircase.jpeg', '/quality-reports/basement-landing.jpeg', '/quality-reports/bin-shelter.jpeg'].map((src, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden relative">
                      <Image src={src} alt="Inspection" fill sizes="80px" className="object-cover" />
                    </div>
                  ))}
                </div>
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
                    <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-primary">NP</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dark">{t('features.customerDashboard.mockupTitle')}</p>
                      <p className="text-[10px] text-gray-500">{t('features.customerDashboard.mockupWelcome')}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex gap-3 border-b border-gray-100 mb-3">
                    <span className="text-[10px] font-semibold text-primary border-b-2 border-primary pb-2">{m('activity')}</span>
                    <span className="text-[10px] text-gray-400 pb-2">{m('properties')}</span>
                    <span className="text-[10px] text-gray-400 pb-2">{m('reports')}</span>
                    <span className="text-[10px] text-gray-400 pb-2">{m('documents')}</span>
                  </div>

                  {/* KPI strip */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-100">
                      <p className="text-[8px] font-bold text-emerald-600 uppercase tracking-wider">{t('features.customerDashboard.mockupDoneThisWeek')}</p>
                      <p className="text-base font-bold text-dark">42</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-2 border border-amber-100">
                      <p className="text-[8px] font-bold text-amber-500 uppercase tracking-wider">{t('features.customerDashboard.mockupOpenIssues')}</p>
                      <p className="text-base font-bold text-dark">3</p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-2 border border-primary/20">
                      <p className="text-[8px] font-bold text-primary uppercase tracking-wider">{t('features.customerDashboard.mockupScore')}</p>
                      <p className="text-base font-bold text-dark">94%</p>
                    </div>
                  </div>

                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{t('features.customerDashboard.mockupRecentLabel')}</p>
                  {activities.map((a, i) => {
                    const status = m(a.statusKey);
                    const isDone = a.statusKey === 'completed' || a.statusKey === 'reportReady';
                    const timePrefix = m(a.timeKey);
                    return (
                      <div key={i} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${isDone ? 'bg-emerald-500' : 'bg-blue-500'}`}>
                          {isDone ? (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-semibold text-dark truncate">{a.task}</p>
                          <p className="text-[9px] text-gray-500 truncate">{a.loc} · {a.timeSuffix ? `${timePrefix} ${a.timeSuffix}` : timePrefix}</p>
                        </div>
                        <span className={`text-[9px] font-medium flex-shrink-0 ${!isDone ? 'text-blue-600' : 'text-emerald-600'}`}>{status}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 text-amber-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.customerDashboard.title')}</h3>
              <p className="text-gray-600 text-lg mb-4">{t('features.customerDashboard.description')}</p>
              <ul className="space-y-2 mb-6">
                {dashboardBullets.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{point}</span>
                  </li>
                ))}
              </ul>
              <Link href="/features/customer-portal" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
                {t('features.customerDashboard.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Feature 5: Suppliers / subcontractors ── */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{t('features.suppliers.title')}</h3>
              <p className="text-gray-600 text-lg mb-6">{t('features.suppliers.description')}</p>
              <Link href="/features/employee-management" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
                {t('features.suppliers.learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
              <p className="font-heading text-sm font-bold text-dark mb-3">{t('features.suppliers.mockupTitle')}</p>
              <div className="space-y-2">
                {suppliers.map((row, i) => {
                  const status = row.statusKey ? m(row.statusKey) : row.statusText ?? '';
                  return (
                    <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        row.color === 'blue' ? 'bg-blue-500' : row.color === 'emerald' ? 'bg-emerald-500' : row.color === 'cyan' ? 'bg-cyan-500' : 'bg-amber-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-dark truncate">{row.task}</p>
                        <p className="text-[9px] text-gray-500 truncate">{row.team}</p>
                      </div>
                      <span className="text-[10px] font-medium text-gray-600">{status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── More capabilities ── */}
      <section className="py-16 md:py-24 bg-white">
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
