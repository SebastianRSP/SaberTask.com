'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';

const featureKeys = [
  'liveDashboard',
  'subcontractorManagement',
  'automaticInvoicing',
  'customerDashboard',
  'smartRouteBuilder',
  'drawingTool',
  'customerManagement',
] as const;

const featureLinks: Record<string, string | null> = {
  liveDashboard: '/features/live-dashboard',
  subcontractorManagement: '/features/employee-management',
  automaticInvoicing: '/features/invoicing-billing',
  customerDashboard: '/features/customer-portal',
  smartRouteBuilder: '/features/task-scheduling',
  drawingTool: '/features/quality-controls',
  customerManagement: '/features/customer-management',
};

const featureColors = [
  { gradient: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', bg: '#7C3AED' },  // purple
  { gradient: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)', bg: '#2563EB' },  // blue
  { gradient: 'linear-gradient(135deg, #059669 0%, #34D399 100%)', bg: '#059669' },  // green
  { gradient: 'linear-gradient(135deg, #D97706 0%, #FBBF24 100%)', bg: '#D97706' },  // amber
  { gradient: 'linear-gradient(135deg, #DB2777 0%, #F472B6 100%)', bg: '#DB2777' },  // pink
  { gradient: 'linear-gradient(135deg, #0891B2 0%, #67E8F9 100%)', bg: '#0891B2' },  // cyan
  { gradient: 'linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)', bg: '#4F46E5' },  // indigo
];

/* ── Mini visuals for each feature tab ── */
function FeatureMiniVisual({ featureKey }: { featureKey: string }) {
  const m = useTranslations('mockup');
  const cardClass = "bg-white rounded-lg shadow-sm p-3 border border-white/20";
  const labelClass = "text-[11px] font-semibold text-dark";
  const subClass = "text-[9px] text-gray-400";

  switch (featureKey) {
    case 'liveDashboard':
      return (
        <div className="w-full space-y-2">
          {/* Map area */}
          <div className={cardClass + " !p-0 overflow-hidden"}>
            <div className="flex items-center justify-between px-3 pt-2.5 pb-1.5">
              <p className={labelClass}>{m('liveDashboard.liveMap')}</p>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-semibold text-emerald-700">{m('liveDashboard.live')}</span>
              </div>
            </div>
            {/* Map with users and routes */}
            <div className="relative h-[240px] bg-[#e8ecf1] overflow-hidden">
              {/* Street grid */}
              <div className="absolute inset-0">
                {/* Horizontal roads */}
                <div className="absolute top-[35%] left-0 right-0 h-[3px] bg-white/80" />
                <div className="absolute top-[65%] left-0 right-0 h-[3px] bg-white/80" />
                <div className="absolute top-[85%] left-0 right-0 h-[2px] bg-white/60" />
                {/* Vertical roads */}
                <div className="absolute top-0 bottom-0 left-[25%] w-[3px] bg-white/80" />
                <div className="absolute top-0 bottom-0 left-[55%] w-[3px] bg-white/80" />
                <div className="absolute top-0 bottom-0 left-[80%] w-[2px] bg-white/60" />
                {/* Buildings */}
                <div className="absolute top-[8%] left-[8%] w-[14%] h-[22%] bg-[#d5dae2] rounded-sm" />
                <div className="absolute top-[8%] left-[32%] w-[18%] h-[22%] bg-[#d5dae2] rounded-sm" />
                <div className="absolute top-[42%] left-[8%] w-[14%] h-[18%] bg-[#d5dae2] rounded-sm" />
                <div className="absolute top-[42%] left-[60%] w-[16%] h-[18%] bg-[#d5dae2] rounded-sm" />
                <div className="absolute top-[72%] left-[32%] w-[18%] h-[10%] bg-[#d5dae2] rounded-sm" />
                <div className="absolute top-[42%] left-[32%] w-[10%] h-[18%] bg-[#cbd2dc] rounded-sm" />
              </div>

              {/* Animated route line - SVG path */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 180" fill="none" preserveAspectRatio="none">
                <path
                  d="M45 55 L75 55 L75 105 L165 105 L165 55 L240 55 L240 105"
                  stroke="#4462F8"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                  className="animate-[dash_3s_linear_infinite]"
                />
              </svg>

              {/* User 1 - Sebastian */}
              <div className="absolute" style={{ top: '22%', left: '12%' }}>
                <div className="relative">
                  <div className="w-8 h-8 rounded-full border-2 border-primary shadow-md overflow-hidden">
                    <Image src="/sebastian.png" alt="Sebastian" width={32} height={32} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border border-white" />
                </div>
              </div>

              {/* User 2 - Martin */}
              <div className="absolute" style={{ top: '48%', left: '52%' }}>
                <div className="relative">
                  <div className="w-8 h-8 rounded-full border-2 border-emerald-500 shadow-md overflow-hidden">
                    <Image src="/martin.png" alt="Martin" width={32} height={32} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border border-white" />
                </div>
              </div>

              {/* User 3 - Anna (initials) */}
              <div className="absolute" style={{ top: '20%', left: '76%' }}>
                <div className="relative">
                  <div className="w-8 h-8 rounded-full border-2 border-amber-400 shadow-md bg-amber-100 flex items-center justify-center text-amber-700 text-[9px] font-bold">
                    AM
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-amber-400 border border-white" />
                </div>
              </div>

              {/* Task location pins */}
              {[
                { x: '22%', y: '28%' },
                { x: '52%', y: '52%' },
                { x: '78%', y: '50%' },
              ].map((pin, i) => (
                <div key={i} className="absolute" style={{ top: pin.y, left: pin.x }}>
                  <svg className="w-3 h-4 text-primary/40" fill="currentColor" viewBox="0 0 24 32">
                    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" />
                  </svg>
                </div>
              ))}

              {/* Open task popup */}
              <div className="absolute bg-white rounded-lg shadow-lg border border-gray-200 p-2 w-[120px]" style={{ top: '55%', left: '58%' }}>
                <p className="text-[9px] font-bold text-dark mb-0.5">{m('liveDashboard.popupTask')}</p>
                <p className="text-[9px] text-gray-400 mb-1.5">{m('liveDashboard.popupAddress')}</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <svg className="w-2.5 h-2.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-[9px] text-gray-500">{m('liveDashboard.clockedIn')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-2.5 h-2.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-[9px] text-gray-500">{m('liveDashboard.photosTaken')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full border border-gray-300" />
                    <span className="text-[9px] text-gray-400">{m('liveDashboard.finalised')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team progress */}
          <div className={cardClass}>
            <p className={labelClass + " mb-2"}>{m('liveDashboard.teams')}</p>
            {[
              { name: m('liveDashboard.teamAlpha'), pct: 85, color: 'bg-primary' },
              { name: m('liveDashboard.teamBravo'), pct: 62, color: 'bg-emerald-500' },
              { name: m('liveDashboard.teamEcho'), pct: 40, color: 'bg-amber-500' },
            ].map(team => (
              <div key={team.name} className="flex items-center gap-2 mb-2 last:mb-0">
                <span className={subClass + " w-[70px] flex-shrink-0"}>{team.name}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${team.color}`} style={{ width: `${team.pct}%` }} />
                </div>
                <span className="text-[10px] font-bold text-dark w-[32px] text-right">{team.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'subcontractorManagement': {
      const days = [m('common.mon'), m('common.tue'), m('common.wed'), m('common.thu'), m('common.fri')];
      const employees = [
        { i: 'SP', n: 'Sebastian P.', photo: '/sebastian.png', hours: '24h', shifts: ['08-16', '08-16', '08-16', '08-16', null] },
        { i: 'MH', n: 'Martin H.', photo: '/martin.png', hours: '24h', shifts: ['08-16', '08-16', '08-16', null, null] },
        { i: 'AM', n: 'Anna M.', photo: null, hours: '16h', shifts: ['08-16', '08-12', '08-12', '08-12', null] },
      ];
      return (
        <div className="w-full space-y-2">
          <div className={cardClass + " !p-0 overflow-hidden"}>
            <div className="flex items-center justify-between px-3 pt-2.5 pb-1.5">
              <p className={labelClass}>{m('shiftPlannerHomepage.title')}</p>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 rounded-full">
                <span className="text-[9px] font-semibold text-blue-600">{m('shiftPlannerHomepage.weekN')}</span>
              </div>
            </div>
            <div className="px-2 pb-2 overflow-x-auto">
              {/* Day headers */}
              <div className="grid gap-px mb-1" style={{ gridTemplateColumns: '80px repeat(5, 1fr)' }}>
                <div />
                {days.map(d => (
                  <div key={d} className="text-center">
                    <p className={subClass}>{d}</p>
                  </div>
                ))}
              </div>
              {/* Rows */}
              {employees.map(emp => (
                <div key={emp.i} className="grid gap-px mb-1 items-center" style={{ gridTemplateColumns: '80px repeat(5, 1fr)' }}>
                  <div className="flex items-center gap-1.5 pr-1">
                    {emp.photo ? (
                      <Image src={emp.photo} alt={emp.n} width={20} height={20} className="w-5 h-5 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[9px] font-bold flex-shrink-0">{emp.i}</div>
                    )}
                    <div className="min-w-0">
                      <p className="text-[9px] font-semibold text-dark truncate">{emp.n}</p>
                      <p className="text-[9px] text-emerald-600">{emp.hours}</p>
                    </div>
                  </div>
                  {emp.shifts.map((shift, si) => (
                    <div key={si} className="px-0.5">
                      {shift ? (
                        <div className="bg-emerald-50 border border-emerald-200 rounded px-1 py-1 text-center">
                          <p className="text-[10px] font-bold text-dark leading-tight">{shift}</p>
                          <p className="text-[10px] text-emerald-600">{m('shiftPlannerHomepage.normal')}</p>
                        </div>
                      ) : (
                        <div className="border border-dashed border-gray-200 rounded px-1 py-1 text-center min-h-[24px] flex items-center justify-center">
                          <span className="text-[10px] text-gray-300">+</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* Sick leave card */}
          <div className={cardClass}>
            <div className="flex items-center justify-between mb-2">
              <p className={labelClass}>{m('shiftPlannerHomepage.sickLeave')}</p>
              <span className="text-[9px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">{m('shiftPlannerHomepage.aboveAvg')}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[9px] font-bold flex-shrink-0">SK</div>
              <span className={labelClass}>Sara K.</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <p className="text-sm font-bold text-dark">4.8%</p>
                <p className={subClass}>{m('shiftPlannerHomepage.sickRate')}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-dark">6</p>
                <p className={subClass}>{m('shiftPlannerHomepage.days')}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-red-500">+2.1%</p>
                <p className={subClass}>{m('shiftPlannerHomepage.vsAvg')}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'automaticInvoicing':
      return (
        <div className="w-full space-y-2">
          <div className={cardClass}>
            <div className="flex items-center justify-between mb-2">
              <p className={labelClass}>{m('invoice.title')} #2026-0428</p>
              <span className="text-[9px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">{m('invoice.draft')}</span>
            </div>
            {/* Customer info */}
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
              <div>
                <p className={labelClass}>{m('invoice.customer')}</p>
                <p className={subClass}>{m('invoice.customerAddress')}</p>
              </div>
              <div className="text-right">
                <p className={subClass}>{m('invoice.net14days')}</p>
                <p className={subClass}>{m('invoice.due')}</p>
              </div>
            </div>
            {[
              { d: m('invoice.lineCleaning'), p: '€420' },
              { d: m('invoice.lineWindow'), p: '€180' },
              { d: m('invoice.lineSnow'), p: '€720' },
            ].map((l, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                <span className={subClass}>{l.d}</span>
                <span className="text-[10px] font-bold text-dark">{l.p}</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 mt-1 border-t border-gray-100">
              <span className={subClass}>{m('invoice.totalLabel')}</span>
              <span className="text-sm font-bold text-dark">€1,320</span>
            </div>
          </div>
          {/* Flow: Task → Mobile → Invoice */}
          <div className="flex items-center justify-between gap-1">
            <div className={cardClass + " flex-1 text-center !p-2"}>
              <svg className="w-4 h-4 text-emerald-500 mx-auto mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              <p className="text-[10px] font-semibold text-dark">{m('invoice.task')}</p>
            </div>
            <svg className="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <div className={cardClass + " flex-1 text-center !p-2"}>
              <svg className="w-4 h-4 text-emerald-500 mx-auto mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              <p className="text-[10px] font-semibold text-dark">{m('invoice.finalised')}</p>
            </div>
            <svg className="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <div className={cardClass + " flex-1 text-center !p-2 border-amber-200 bg-amber-50"}>
              <svg className="w-4 h-4 text-amber-500 mx-auto mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <p className="text-[10px] font-semibold text-amber-700">{m('invoice.invoiceLabel')}</p>
            </div>
            <svg className="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <div className={cardClass + " flex-1 text-center !p-2"}>
              <svg className="w-4 h-4 text-primary mx-auto mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              <p className="text-[10px] font-semibold text-dark">{m('invoice.exportLabel')}</p>
            </div>
          </div>
        </div>
      );

    case 'customerDashboard':
      return (
        <div className="w-full space-y-2">
          {/* Portal header */}
          <div className={cardClass + " !p-0 overflow-hidden"}>
            <div className="bg-gray-100 px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary">NG</span>
                </div>
                <span className="text-[10px] font-bold text-dark">{m('customerPortal.name')}</span>
              </div>
              <span className="text-[10px] text-gray-500">{m('customerPortal.welcomeMichael')}</span>
            </div>
            <div className="px-3 py-2">
              <div className="flex gap-2 border-b border-gray-100 mb-2 -mx-1 px-1">
                <span className="text-[9px] font-semibold text-primary border-b-2 border-primary pb-1.5 px-1">{m('customerPortal.overview')}</span>
                <span className={subClass + " pb-1.5 px-1"}>{m('customerPortal.tasksTab')}</span>
                <span className={subClass + " pb-1.5 px-1"}>{m('customerPortal.photosTab')}</span>
                <span className={subClass + " pb-1.5 px-1"}>{m('customerPortal.reportsTab')}</span>
              </div>
              {/* Recent activity */}
              <p className={subClass + " uppercase tracking-wider mb-1.5"}>{m('customerPortal.recentActivity')}</p>
              {[
                { task: m('customerPortal.windowCleaning'), loc: m('customerPortal.hqTower'), time: m('customerPortal.today1432'), status: m('customerPortal.completed') },
                { task: m('customerPortal.stairwayWash'), loc: m('customerPortal.warehouseNorth'), time: m('customerPortal.today1115'), status: m('customerPortal.completed') },
                { task: m('customerPortal.qualityInspection'), loc: m('customerPortal.hqTower'), time: m('customerPortal.yesterday'), status: m('customerPortal.reportReady') },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={labelClass + " truncate"}>{a.task}</p>
                    <p className={subClass + " truncate"}>{a.loc} · {a.time}</p>
                  </div>
                  <span className="text-[10px] font-medium text-emerald-600 flex-shrink-0">{a.status}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Photo proof */}
          <div className={cardClass}>
            <div className="flex items-center justify-between mb-1.5">
              <p className={labelClass}>{m('customerPortal.latestPhotos')}</p>
              <span className={subClass}>{m('customerPortal.threeNew')}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {[
                '/quality-reports/entrance-hall.jpeg',
                '/quality-reports/staircase.jpeg',
                '/quality-reports/bin-shelter.jpeg',
              ].map((src, i) => (
                <div key={i} className="aspect-square rounded overflow-hidden relative">
                  <Image src={src} alt="Task photo" fill sizes="80px" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'smartRouteBuilder':
      return (
        <div className="w-full space-y-2">
          <div className={cardClass + " !p-0 overflow-hidden"}>
            <div className="flex items-center justify-between px-3 pt-2.5 pb-1.5">
              <p className={labelClass}>{m('taskScheduling.title')}</p>
              <span className={subClass}>{m('taskScheduling.teamAlphaWeek')}</span>
            </div>
            {/* Frequency filters */}
            <div className="flex gap-1 px-2.5 pb-2">
              {[
                { l: m('taskScheduling.all'), active: true },
                { l: m('taskScheduling.weekly'), active: false },
                { l: m('taskScheduling.even'), active: false },
                { l: m('taskScheduling.odd'), active: false },
                { l: m('taskScheduling.monthly'), active: false },
              ].map(f => (
                <span key={f.l} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${f.active ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{f.l}</span>
              ))}
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-100">
              {/* Monday */}
              <div className="px-2 pb-2">
                <p className="text-[9px] font-bold text-pink-600 mb-1.5 px-1">{m('taskScheduling.monday')}</p>
                {[
                  { n: m('taskScheduling.windowCleaning'), loc: m('taskScheduling.hqTower'), freq: m('taskScheduling.weeklyBadge'), done: true },
                  { n: m('taskScheduling.stairwayWash'), loc: m('taskScheduling.borupsAlle'), freq: m('taskScheduling.evenWk'), done: true },
                  { n: m('taskScheduling.officeCleaning'), loc: m('taskScheduling.vesterbro'), freq: m('taskScheduling.weeklyBadge'), done: false },
                  { n: m('taskScheduling.floorWaxing'), loc: m('taskScheduling.norrebro'), freq: m('taskScheduling.monthlyBadge'), done: false },
                ].map((t, i) => (
                  <div key={i} className={`flex items-center gap-1.5 px-1.5 py-1 rounded mb-1 ${t.done ? 'bg-emerald-50' : 'bg-gray-50'}`}>
                    <div className={`w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0 ${t.done ? 'bg-emerald-500' : 'border border-gray-300'}`}>
                      {t.done && <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[9px] font-semibold truncate ${t.done ? 'text-gray-400 line-through' : 'text-dark'}`}>{t.n}</p>
                      <p className="text-[9px] text-gray-400 truncate">{t.loc}</p>
                    </div>
                    <span className="text-[10px] font-medium text-pink-600 bg-pink-50 px-1 py-0.5 rounded flex-shrink-0">{t.freq}</span>
                  </div>
                ))}
              </div>
              {/* Tuesday */}
              <div className="px-2 pb-2">
                <p className="text-[9px] font-bold text-pink-600 mb-1.5 px-1">{m('taskScheduling.tuesday')}</p>
                {[
                  { n: m('taskScheduling.mainWindows'), loc: m('taskScheduling.kalvebodBrygge'), freq: m('taskScheduling.weeklyBadge') },
                  { n: m('taskScheduling.lobbyCleaning'), loc: m('taskScheduling.norrebro'), freq: m('taskScheduling.oddWk') },
                  { n: m('taskScheduling.facadeWash'), loc: m('taskScheduling.osterbro'), freq: m('taskScheduling.monthlyBadge') },
                  { n: m('taskScheduling.binArea'), loc: m('taskScheduling.amager'), freq: m('taskScheduling.evenWk') },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-1.5 py-1 rounded mb-1 bg-gray-50">
                    <div className="w-3 h-3 rounded-full border border-gray-300 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-semibold text-dark truncate">{t.n}</p>
                      <p className="text-[9px] text-gray-400 truncate">{t.loc}</p>
                    </div>
                    <span className="text-[10px] font-medium text-pink-600 bg-pink-50 px-1 py-0.5 rounded flex-shrink-0">{t.freq}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 'drawingTool':
      return (
        <div className="w-full space-y-2">
          <div className={cardClass + " !p-0 overflow-hidden"}>
            {/* Report header */}
            <div className="bg-cyan-50 px-3 py-2 flex items-center justify-between border-b border-cyan-100">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <div>
                  <p className={labelClass}>{m('qualityReport.title')}</p>
                  <p className={subClass}>{m('qualityReport.location')}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">95%</span>
            </div>

            <div className="px-3 py-2.5">
              {/* Section: Kitchen */}
              <p className={subClass + " uppercase tracking-wider mb-1.5"}>{m('qualityReport.section')}</p>
              {[
                { q: m('qualityReport.q1'), ok: true },
                { q: m('qualityReport.q2'), ok: true },
                { q: m('qualityReport.q3'), ok: false },
                { q: m('qualityReport.q4'), ok: true },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
                  <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${r.ok ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={r.ok ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} /></svg>
                  </div>
                  <span className={labelClass + " flex-1"}>{r.q}</span>
                  {!r.ok && <span className="text-[9px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded flex-shrink-0">{m('qualityReport.issue')}</span>}
                </div>
              ))}
            </div>
          </div>
          {/* Photo evidence row */}
          <div className={cardClass}>
            <div className="flex items-center justify-between mb-1.5">
              <p className={labelClass}>{m('qualityReport.photoEvidence')}</p>
              <span className={subClass}>{m('qualityReport.fivePhotos')}</span>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {[
                '/quality-reports/entrance-hall.jpeg',
                '/quality-reports/staircase.jpeg',
                '/quality-reports/bin-shelter.jpeg',
                '/quality-reports/baler-area.jpeg',
                '/quality-reports/basement-landing.jpeg',
              ].map((src, i) => (
                <div key={i} className="aspect-square rounded overflow-hidden relative">
                  <Image src={src} alt="Inspection photo" fill sizes="50px" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          {/* Sign-off */}
          <div className={cardClass}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className={subClass + " uppercase tracking-wider mb-0.5"}>{m('qualityReport.inspector')}</p>
                <p className={labelClass}>{m('qualityReport.inspectorName')}</p>
                <p className={subClass}>{m('qualityReport.inspectorDate')}</p>
              </div>
              <div className="text-right">
                <p className={subClass + " uppercase tracking-wider mb-0.5"}>{m('qualityReport.customer')}</p>
                <p className={labelClass}>{m('qualityReport.customerName')}</p>
                <p className="italic text-[11px] text-gray-400 font-[cursive]">M. Jensen</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 pt-2 border-t border-gray-100">
              <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              <p className={labelClass}>{m('qualityReport.satisfied')}</p>
            </div>
          </div>
        </div>
      );

    case 'customerManagement':
      return (
        <div className="w-full space-y-2">
          {/* Customer card */}
          <div className={cardClass + " !p-0 overflow-hidden"}>
            <div className="bg-indigo-50 px-3 py-2 flex items-center justify-between border-b border-indigo-100">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center text-white text-[9px] font-bold">NG</div>
                <div>
                  <p className={labelClass}>{m('customerCard.company')}</p>
                  <p className={subClass}>{m('customerCard.customerId')}</p>
                </div>
              </div>
              <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{m('customerCard.active')}</span>
            </div>
            <div className="px-3 py-2">
              <div className="flex gap-2 border-b border-gray-100 mb-2 -mx-1 px-1">
                <span className="text-[9px] font-semibold text-indigo-600 border-b-2 border-indigo-600 pb-1.5 px-1">{m('customerCard.locations')}</span>
                <span className={subClass + " pb-1.5 px-1"}>{m('customerCard.contacts')}</span>
                <span className={subClass + " pb-1.5 px-1"}>{m('customerCard.agreements')}</span>
                <span className={subClass + " pb-1.5 px-1"}>{m('customerCard.files')}</span>
              </div>
              {[
                { n: m('customerCard.loc1Name'), a: m('customerCard.loc1Addr'), tasks: 24 },
                { n: m('customerCard.loc2Name'), a: m('customerCard.loc2Addr'), tasks: 12 },
                { n: m('customerCard.loc3Name'), a: m('customerCard.loc3Addr'), tasks: 8 },
              ].map((l, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
                  <div className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={labelClass + " truncate"}>{l.n}</p>
                    <p className={subClass + " truncate"}>{l.a}</p>
                  </div>
                  <span className="text-[9px] font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-full flex-shrink-0">{l.tasks} {m('customerCard.tasksMo')}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Contact + agreement cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className={cardClass}>
              <p className={subClass + " uppercase tracking-wider mb-1"}>{m('customerCard.primaryContact')}</p>
              <p className={labelClass}>{m('customerCard.contactName')}</p>
              <p className={subClass}>{m('customerCard.contactEmail')}</p>
              <p className={subClass}>{m('customerCard.contactPhone')}</p>
            </div>
            <div className={cardClass}>
              <p className={subClass + " uppercase tracking-wider mb-1"}>{m('customerCard.activeAgreement')}</p>
              <p className={labelClass}>{m('customerCard.agreementName')}</p>
              <p className={subClass}>{m('customerCard.agreementDetails')}</p>
              <p className="text-[10px] font-bold text-dark mt-0.5">{m('customerCard.agreementPrice')}</p>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function Features() {
  const t = useTranslations('features');
  const [activeTab, setActiveTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const activeFeature = featureKeys[activeTab];

  // Mobile swipe handlers - swipe left/right on the content area to change feature
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = touchStartRef.current.x - e.changedTouches[0].clientX;
    const dy = touchStartRef.current.y - e.changedTouches[0].clientY;
    touchStartRef.current = null;

    // Only treat as a swipe if horizontal motion clearly dominates vertical
    // (so vertical page scrolling still works normally)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0 && activeTab < featureKeys.length - 1) {
        setActiveTab(activeTab + 1);
      } else if (dx < 0 && activeTab > 0) {
        setActiveTab(activeTab - 1);
      }
    }
  };

  useEffect(() => {
    const updateIndicator = () => {
      const activeButton = tabsRef.current[activeTab];
      const container = containerRef.current;
      if (activeButton && container) {
        // Use offset values so indicator position is correct even when the
        // container is horizontally scrolled.
        setIndicatorStyle({
          left: activeButton.offsetLeft,
          width: activeButton.offsetWidth,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab]);

  // Scroll the active tab into view (mobile/narrow screens)
  useEffect(() => {
    const activeButton = tabsRef.current[activeTab];
    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeTab]);


  return (
    <section id="features" className="section-padding bg-background">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 mb-6">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">{t('badge')}</span>
          </div>

          {/* Title */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">
            {t('titleStart')} <span className="text-primary">{t('titleHighlight')}</span> {t('titleEnd')}
          </h2>

          {/* Subtitle with decorative lines */}
          <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto">
            <div className="hidden md:block h-px bg-gray-300 flex-1" />
            <p className="text-lg text-gray-600">{t('subtitle')}</p>
            <div className="hidden md:block h-px bg-gray-300 flex-1" />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-10 -mx-4 sm:mx-0 sm:flex sm:justify-center">
          <div className="overflow-x-auto scrollbar-hide sm:overflow-visible px-4 sm:px-0">
            <div
              ref={containerRef}
              className="relative inline-flex items-stretch bg-white rounded-xl border border-gray-200"
              style={{ minHeight: '48px' }}
            >
              {/* Sliding indicator */}
              <div
                className="absolute top-0 bottom-0 rounded-lg transition-all duration-300 ease-out"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  backgroundColor: featureColors[activeTab].bg,
                }}
              />

              {/* Tab buttons */}
              {featureKeys.map((key, index) => (
                <button
                  key={key}
                  ref={(el) => { tabsRef.current[index] = el; }}
                  onClick={() => setActiveTab(index)}
                  className={`relative z-10 flex-shrink-0 whitespace-nowrap px-5 py-3 text-sm font-semibold transition-colors duration-300 ${
                    activeTab === index
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t(`${key}.tabName`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Feature Card - Left (2 columns) */}
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden min-h-[500px] transition-all duration-500" style={{ background: featureColors[activeTab].gradient }}>

            <div className="relative z-10 flex flex-col md:flex-row h-full">
              {/* Left Content - 50% */}
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
                {/* Feature Title */}
                <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                  {t(`${activeFeature}.title`)}
                </h3>

                {/* Feature Description */}
                <p className="text-white/90 text-lg mb-8">
                  {t(`${activeFeature}.description`)}
                </p>

                {/* Learn More Button */}
                {featureLinks[activeFeature] ? (
                  <Link
                    href={featureLinks[activeFeature]!}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white font-medium rounded-full hover:bg-gray-100 transition-colors self-start mt-auto"
                    style={{ color: featureColors[activeTab].bg }}
                  >
                    {t('learnMore')}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-white font-medium rounded-full hover:bg-gray-100 transition-colors self-start mt-auto" style={{ color: featureColors[activeTab].bg }}>
                    {t('learnMore')}
                  </button>
                )}
              </div>

              {/* Right Image Area - 50% */}
              <div className="w-full md:w-1/2 relative min-h-[200px] md:min-h-0 flex items-center justify-center p-3 md:p-4">
                <FeatureMiniVisual featureKey={activeFeature} />
              </div>
            </div>
          </div>

          {/* Right Column - Two Cards Stacked */}
          <div className="flex flex-col gap-6">
            {/* Pain Points Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-red-500 rounded-full" />
                <h4 className="font-heading text-lg font-semibold text-dark">{t('painPoints.title')}</h4>
              </div>
              <ul className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm text-gray-700">{t(`${activeFeature}.painPoints.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How We Help Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-green-500 rounded-full" />
                <h4 className="font-heading text-lg font-semibold text-dark">{t('howWeHelp.title')}</h4>
              </div>
              <ul className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">{t(`${activeFeature}.solutions.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile dot indicators (hidden on desktop) */}
        <div className="lg:hidden flex items-center justify-center gap-2 mt-6" aria-label="Feature pagination">
          {featureKeys.map((key, index) => (
            <button
              key={key}
              onClick={() => setActiveTab(index)}
              aria-label={`Go to ${t(`${key}.tabName`)}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: activeTab === index ? '24px' : '8px',
                backgroundColor: activeTab === index ? featureColors[index].bg : '#D1D5DB',
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
