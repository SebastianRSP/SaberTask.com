'use client';

import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import FeaturePageLayout, { Capability } from './FeaturePageLayout';
import { featureThemes } from '@/lib/featureThemes';

const capabilities: Capability[] = [
  {
    key: 'workDescriptions',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    key: 'weeklyPlans',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: 'recurring',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    key: 'routeOptimisation',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    key: 'mobileNavigation',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
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
];


type TaskCard = { type: 'task'; count: number; name: string; id: string; address: string };
type RouteCard = { type: 'route'; name: string; waypoints: number; km: string; closed?: boolean };
type DrawRoute = { type: 'draw' };
type AddSlot = { type: 'add' };
type DayItem = TaskCard | RouteCard | DrawRoute | AddSlot;

interface DayColumn {
  label: string;
  items: DayItem[];
}

function HeroVisual() {
  const m = useTranslations('mockup.fp.taskScheduling');
  const columns: DayColumn[] = [
    {
      label: m('monday'),
      items: [
        { type: 'route', name: 'Amager', waypoints: 8, km: '11.2', closed: true },
        { type: 'task', count: 3, name: 'Sunrise Prop...', id: '#1001', address: 'Amagerbrog...' },
        { type: 'task', count: 1, name: 'Nordic Clean...', id: '#1009', address: 'Vesterbrog...' },
        { type: 'add' },
      ],
    },
    {
      label: m('tuesday'),
      items: [
        { type: 'route', name: 'Copenhagen', waypoints: 13, km: '14.0' },
        { type: 'task', count: 2, name: 'Amager Eje...', id: '#1005', address: 'Frederiksber...' },
        { type: 'task', count: 1, name: 'City Office ...', id: '#1012', address: 'Nørrebrog...' },
        { type: 'add' },
      ],
    },
    {
      label: m('wednesday'),
      items: [
        { type: 'route', name: 'Østerbro', waypoints: 5, km: '3.8' },
        { type: 'task', count: 2, name: 'Park Reside...', id: '#1003', address: 'Østerbrog...' },
        { type: 'add' },
      ],
    },
    {
      label: m('thursday'),
      items: [
        { type: 'task', count: 1, name: 'GreenCare ...', id: '#1007', address: 'Hellerup V...' },
        { type: 'draw' },
        { type: 'add' },
      ],
    },
    {
      label: m('friday'),
      items: [
        { type: 'draw' },
        { type: 'add' },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Team header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100">
        <div className="w-3 h-3 rounded-full bg-primary" />
        <span className="font-heading text-sm font-bold text-dark">Team Alpha</span>
        <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">12.4 h</span>
        <span className="text-[10px] text-gray-500 hidden sm:inline">Anna M., Jonas L., Sara K.</span>
      </div>

      {/* Day columns */}
      <div className="p-3 overflow-x-auto">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(110px, 1fr))`, minWidth: '550px' }}>
          {/* Day headers */}
          {columns.map((col) => (
            <div key={col.label} className="px-1 pb-1">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{col.label}</p>
            </div>
          ))}

          {/* Day contents */}
          {columns.map((col) => (
            <div key={`${col.label}-items`} className="space-y-1.5">
              {col.items.map((item, i) => {
                if (item.type === 'route') {
                  return (
                    <div
                      key={i}
                      className={`rounded-lg border p-2 flex items-center gap-2 ${
                        item.closed
                          ? 'bg-emerald-50 border-emerald-200'
                          : 'bg-primary/5 border-primary/20'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${
                        item.closed ? 'bg-emerald-500' : 'bg-primary'
                      }`}>
                        {item.closed ? (
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[10px] font-bold leading-tight ${item.closed ? 'text-emerald-700' : 'text-primary'}`}>
                          {item.name}
                        </p>
                        <p className={`text-[8px] ${item.closed ? 'text-emerald-600' : 'text-primary/70'}`}>
                          {item.waypoints} {m('waypoints')}
                        </p>
                      </div>
                      <span className={`text-[8px] font-semibold whitespace-nowrap ${item.closed ? 'text-emerald-600' : 'text-gray-400'}`}>
                        {item.km} km
                      </span>
                    </div>
                  );
                }

                if (item.type === 'task') {
                  return (
                    <div key={i} className="rounded-lg border border-gray-200 bg-white p-2">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-3.5 h-3.5 rounded border border-gray-300" />
                        <span className="text-[9px] font-bold text-gray-400">{item.count}</span>
                        <p className="text-[10px] font-semibold text-dark truncate flex-1">{item.name}</p>
                      </div>
                      <p className="text-[8px] text-gray-400 ml-5">{item.id}</p>
                      <p className="text-[8px] text-gray-400 ml-5 truncate">{item.address}</p>
                    </div>
                  );
                }

                if (item.type === 'draw') {
                  return (
                    <div key={i} className="rounded-lg border border-dashed border-primary/30 p-2 flex items-center justify-center gap-1.5">
                      <svg className="w-3 h-3 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span className="text-[9px] font-medium text-primary/50">{m('drawRoute')}</span>
                    </div>
                  );
                }

                return (
                  <div key={i} className="rounded-lg border border-dashed border-gray-200 p-2 flex items-center justify-center min-h-[28px]">
                    <span className="text-[9px] text-gray-300">{m('addLabel')}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FloatingCard() {
  const m = useTranslations('mockup.fp.taskScheduling');
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
        <svg className="w-5 h-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-dark">{m('routeOptimised')}</p>
        <p className="text-xs text-gray-500">{m('stopsKm')}</p>
      </div>
    </div>
  );
}

function WorkDescriptionMockup() {
  const m = useTranslations('mockup.fp.workDescription');

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-[420px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-dark leading-tight">Sunrise Property - Window Cleaning</p>
            <p className="text-[9px] text-gray-500">{m('subtitle')}</p>
          </div>
        </div>
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <div className="p-5 space-y-4">
        {/* Area card - expanded */}
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          {/* Area header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className="text-[12px] font-bold text-dark">Main Stairway (Borups Allé 233-249)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </div>

          <div className="px-4 py-3 space-y-3">
            {/* Area name */}
            <div>
              <p className="text-[8px] font-medium text-gray-400 mb-0.5">{m('areaNameLabel')}</p>
              <div className="text-[11px] text-dark bg-gray-50 rounded-md px-3 py-1.5 border border-gray-100">Main Stairway (Borups Allé 233-249)</div>
            </div>

            {/* Notes + Price row */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <p className="text-[8px] font-medium text-gray-400 mb-0.5">{m('notesLabel')}</p>
                <div className="text-[10px] text-dark bg-gray-50 rounded-md px-3 py-1.5 border border-gray-100 truncate">{m('notesValue')}</div>
              </div>
              <div>
                <p className="text-[8px] font-medium text-gray-400 mb-0.5">{m('priceLabel')}</p>
                <div className="text-[10px] text-dark bg-gray-50 rounded-md px-3 py-1.5 border border-gray-100" />
              </div>
            </div>

            {/* Frequency bar */}
            <div className="flex items-center gap-2 flex-wrap">
              <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className="text-[9px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{m('everyWeek')}</span>
              <span className="text-[9px] text-gray-500">{m('perPeriod')}</span>
              <span className="text-[9px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{m('seasonBadge')}</span>
            </div>

            {/* Frequency fields */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-[8px] font-medium text-gray-400 mb-0.5">{m('frequencyLabel')}</p>
                <div className="text-[10px] text-dark bg-gray-50 rounded-md px-2 py-1.5 border border-gray-100 flex items-center justify-between">
                  {m('everyWeek')}
                  <svg className="w-2.5 h-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-[8px] font-medium text-gray-400 mb-0.5">{m('timesPeriodLabel')}</p>
                <div className="text-[10px] text-dark bg-gray-50 rounded-md px-2 py-1.5 border border-gray-100">1</div>
              </div>
              <div>
                <p className="text-[8px] font-medium text-gray-400 mb-0.5">{m('hoursVisitLabel')}</p>
                <div className="text-[10px] text-dark bg-gray-50 rounded-md px-2 py-1.5 border border-gray-100" />
              </div>
            </div>

            {/* Seasonal toggle */}
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded bg-primary flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[10px] font-medium text-dark">{m('limitPeriodLabel')}</span>
              <span className="text-[9px] text-gray-400">{m('limitPeriodRange')}</span>
            </div>

            {/* Checklist items */}
            <div>
              <p className="text-[8px] font-medium text-gray-400 mb-1.5">{m('checklistLabel')}</p>
              <div className="space-y-1">
                {[0, 1].map((i) => (
                  <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-gray-50">
                    <svg className={`w-3 h-3 flex-shrink-0 ${i % 2 === 0 ? 'text-primary' : 'text-primary rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    <span className="text-[10px] text-dark flex-1">{m('checklistItem')}</span>
                    <svg className="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkDescriptionSpotlight() {
  const t = useTranslations('featurePages.taskScheduling.spotlight');

  const highlights = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      key: '0',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      key: '1',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      key: '2',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
          {/* Builder mockup */}
          <div className="relative flex justify-center order-2 lg:order-1 py-6">
            <WorkDescriptionMockup />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-full mb-6">
              <svg className="w-4 h-4 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium text-pink-600">{t('badge')}</span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4 leading-tight">
              {t('titleStart')}{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #DB2777, #F472B6)' }}
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
                  <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0">
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

const badgeIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export default function TaskSchedulingFeature() {
  return (
    <FeaturePageLayout
      namespace="featurePages.taskScheduling"
      theme={featureThemes.taskScheduling}
      badgeIcon={badgeIcon}
      heroVisual={<HeroVisual />}
      heroFloatingCard={<FloatingCard />}
      capabilities={capabilities}

      spotlight={<WorkDescriptionSpotlight />}
    />
  );
}
