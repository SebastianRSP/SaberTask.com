'use client';

import { useTranslations } from 'next-intl';
import FeaturePageLayout, { Capability } from './FeaturePageLayout';
import { featureThemes } from '@/lib/featureThemes';

const capabilities: Capability[] = [
  {
    key: 'workerTracking',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    key: 'taskProgress',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    key: 'instantAlerts',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    key: 'kpiMetrics',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    key: 'teamUtilisation',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    key: 'redeployment',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
];


function HeroVisual() {
  const m = useTranslations('mockup.fp.liveDash');
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {/* App top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="font-heading text-sm font-bold text-dark">{m('title')}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-semibold text-emerald-700">{m('live')}</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* KPI strip */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-gray-100 bg-white px-3 py-2.5">
            <p className="text-[10px] font-medium text-gray-500 mb-0.5">{m('active')}</p>
            <p className="text-lg font-bold text-dark">24</p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white px-3 py-2.5">
            <p className="text-[10px] font-medium text-gray-500 mb-0.5">{m('done')}</p>
            <p className="text-lg font-bold text-dark">87</p>
          </div>
          <div className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5">
            <p className="text-[10px] font-medium text-primary mb-0.5">{m('onTime')}</p>
            <p className="text-lg font-bold text-primary">98%</p>
          </div>
        </div>

        {/* Today's tasks list */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-semibold text-dark uppercase tracking-wide">{m('todaysTasks')}</p>
            <span className="text-[10px] font-medium text-primary">{m('viewAll')}</span>
          </div>
          <div className="space-y-1.5">
            {[
              { c: 'Nordic Group · HQ Tower', t: m('office'), s: 'in_progress' as const },
              { c: 'Vesta Properties', t: m('window'), s: 'scheduled' as const },
              { c: 'Falck Building 4', t: m('floor'), s: 'done' as const },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50">
                <div
                  className={`w-1 h-7 rounded-full ${
                    row.s === 'done' ? 'bg-emerald-500' : row.s === 'in_progress' ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-dark truncate">{row.t}</p>
                  <p className="text-[9px] text-gray-500 truncate">{row.c}</p>
                </div>
                <span
                  className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${
                    row.s === 'done'
                      ? 'bg-emerald-50 text-emerald-700'
                      : row.s === 'in_progress'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {row.s === 'done' ? m('doneB') : row.s === 'in_progress' ? m('live') : m('soon')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Active teams progress */}
        <div>
          <p className="text-[11px] font-semibold text-dark uppercase tracking-wide mb-2">{m('activeTeams')}</p>
          <div className="space-y-2">
            {[
              { name: 'Team Alpha', pct: 75, color: 'bg-primary' },
              { name: 'Team Bravo', pct: 40, color: 'bg-emerald-500' },
            ].map((team, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold text-dark">{team.name}</span>
                  <span className="text-[10px] text-gray-500">{team.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className={`h-full rounded-full ${team.color}`} style={{ width: `${team.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingCard() {
  const m = useTranslations('mockup.fp.liveDash');
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
        <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-dark">{m('taskCompleted')}</p>
        <p className="text-xs text-gray-500">{m('twoMinAgo')}</p>
      </div>
    </div>
  );
}

const badgeIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default function LiveDashboardFeature() {
  return (
    <FeaturePageLayout
      namespace="featurePages.liveDashboard"
      theme={featureThemes.liveDashboard}
      badgeIcon={badgeIcon}
      heroVisual={<HeroVisual />}
      heroFloatingCard={<FloatingCard />}
      capabilities={capabilities}
    />
  );
}
