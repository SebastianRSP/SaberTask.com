'use client';

import { useTranslations } from 'next-intl';
import FeaturePageLayout, { Capability } from './FeaturePageLayout';
import { featureThemes } from '@/lib/featureThemes';

const capabilities: Capability[] = [
  {
    key: 'secureLogin',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    key: 'calendarView',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: 'proofOfWork',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    key: 'qualityAccess',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    key: 'branding',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    key: 'privacy',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];


function HeroVisual() {
  const m = useTranslations('mockup.customerPortal');
  const week1 = [
    { label: '9 Apr', today: true, tasks: 2 },
    { label: '10 Apr', today: false, tasks: 0 },
    { label: '11 Apr', today: false, tasks: 3 },
    { label: '12 Apr', today: false, tasks: 0 },
    { label: '13 Apr', today: false, tasks: 1 },
    { label: '14 Apr', today: false, tasks: 0 },
    { label: '15 Apr', today: false, tasks: 0 },
  ];
  const week2 = [
    { label: '16 Apr', today: false, tasks: 2 },
    { label: '17 Apr', today: false, tasks: 0 },
    { label: '18 Apr', today: false, tasks: 3 },
    { label: '19 Apr', today: false, tasks: 0 },
    { label: '20 Apr', today: false, tasks: 1 },
    { label: '21 Apr', today: false, tasks: 0 },
    { label: '22 Apr', today: false, tasks: 0 },
  ];
  const dayHeaders = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {/* App top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-dark leading-tight">{m('servicePortal')}</p>
            <p className="text-[9px] text-gray-500">facility@nordic.dk</p>
          </div>
        </div>
        <button className="text-[10px] font-medium text-gray-500 hover:text-dark">{m('signOut')}</button>
      </div>

      <div className="p-5 space-y-4">
        {/* KPI strip */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-gray-100 bg-white px-3 py-2.5">
            <p className="text-[10px] font-medium text-gray-500 mb-0.5">{m('thisWeek')}</p>
            <p className="text-lg font-bold text-dark">5</p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white px-3 py-2.5">
            <p className="text-[10px] font-medium text-gray-500 mb-0.5">{m('last30d')}</p>
            <p className="text-lg font-bold text-dark">24</p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5">
            <p className="text-[10px] font-medium text-emerald-600 mb-0.5">{m('qualityScore')}</p>
            <p className="text-lg font-bold text-emerald-600">95%</p>
          </div>
        </div>

        {/* Calendar - mirrors real platform layout */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-semibold text-dark uppercase tracking-wide">{m('next14days')}</p>
            <div className="flex gap-1">
              <div className="w-5 h-5 rounded bg-gray-50 border border-gray-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </div>
              <div className="w-5 h-5 rounded bg-gray-50 border border-gray-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </div>

          {/* Day column headers */}
          <div className="grid grid-cols-[auto_repeat(7,minmax(0,1fr))] gap-x-1 mb-1">
            <div className="w-6 text-[7px] font-semibold text-gray-300 uppercase text-center pt-0.5">{m('weekShort')}</div>
            {dayHeaders.map((d) => (
              <div key={d} className="text-[7px] font-bold text-gray-400 uppercase text-center tracking-wider pt-0.5">{d}</div>
            ))}
          </div>

          {/* Week rows */}
          {[{ wk: 15, days: week1 }, { wk: 16, days: week2 }].map(({ wk, days }) => (
            <div key={wk} className="grid grid-cols-[auto_repeat(7,minmax(0,1fr))] gap-x-1 mb-1">
              <div className="w-6 flex items-start justify-center pt-1.5">
                <span className="text-[8px] font-semibold text-gray-300">{wk}</span>
              </div>
              {days.map((day) => (
                <div
                  key={day.label}
                  className={`rounded-lg p-1.5 min-h-[38px] border flex flex-col ${
                    day.today
                      ? 'bg-primary/5 border-primary/40'
                      : 'bg-gray-50/80 border-gray-100'
                  }`}
                >
                  <span className={`text-[8px] font-semibold leading-none ${
                    day.today ? 'text-primary' : 'text-gray-500'
                  }`}>
                    {day.label}
                  </span>
                  {day.tasks > 0 && (
                    <div className="mt-auto pt-1">
                      <div className="flex items-center gap-0.5">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        <span className="text-[7px] font-semibold text-primary">{day.tasks}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Today summary */}
        <div className="bg-primary/5 border border-primary/15 rounded-lg p-2.5">
          <p className="text-[10px] font-medium text-primary mb-0.5">{m('wednesday')}</p>
          <p className="text-[11px] font-semibold text-dark">{m('twoCleaning')}</p>
        </div>
      </div>
    </div>
  );
}

function FloatingCard() {
  const m = useTranslations('mockup.customerPortal');
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
        <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-dark">{m('liveUpdates')}</p>
        <p className="text-xs text-gray-500">{m('noSupportCall')}</p>
      </div>
    </div>
  );
}

const badgeIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export default function CustomerPortalFeature() {
  return (
    <FeaturePageLayout
      namespace="featurePages.customerPortal"
      theme={featureThemes.customerPortal}
      badgeIcon={badgeIcon}
      heroVisual={<HeroVisual />}
      heroFloatingCard={<FloatingCard />}
      capabilities={capabilities}
    />
  );
}
