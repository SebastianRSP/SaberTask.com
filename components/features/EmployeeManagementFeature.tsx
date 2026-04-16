'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import FeaturePageLayout, { Capability } from './FeaturePageLayout';
import { featureThemes } from '@/lib/featureThemes';

const capabilities: Capability[] = [
  {
    key: 'onboarding',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1a3 3 0 006 0v-1a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
      </svg>
    ),
  },
  {
    key: 'shifts',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'timeTracking',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    key: 'sickLeave',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
  },
  {
    key: 'salary',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'messaging',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];


function HeroVisual() {
  const mt = useTranslations('mockup.fp.empMgmt');
  const team = [
    { initials: 'AM', name: mt('annaName'), role: mt('annaRole'), status: mt('clockedIn'), tone: 'live' as const },
    { initials: 'JL', name: mt('jonasName'), role: mt('jonasRole'), status: mt('enRoute'), tone: 'pending' as const },
    { initials: 'SK', name: mt('saraName'), role: mt('saraRole'), status: mt('sickLeave'), tone: 'off' as const },
    { initials: 'MP', name: mt('madsName'), role: mt('madsRole'), status: mt('clockedIn'), tone: 'live' as const },
  ];

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {/* App top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="font-heading text-sm font-bold text-dark">{mt('teamRoster')}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-semibold text-emerald-700">{mt('live')}</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* KPI strip */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-gray-100 bg-white px-3 py-2.5">
            <p className="text-[10px] font-medium text-gray-500 mb-0.5">{mt('onShift')}</p>
            <p className="text-lg font-bold text-dark">10</p>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white px-3 py-2.5">
            <p className="text-[10px] font-medium text-gray-500 mb-0.5">{mt('sick')}</p>
            <p className="text-lg font-bold text-dark">2</p>
          </div>
          <div className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5">
            <p className="text-[10px] font-medium text-primary mb-0.5">{mt('attendance')}</p>
            <p className="text-lg font-bold text-primary">94%</p>
          </div>
        </div>

        {/* Team list */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-semibold text-dark uppercase tracking-wide">{mt('team')}</p>
            <span className="text-[10px] font-medium text-primary">{mt('viewAll')}</span>
          </div>
          <div className="space-y-1.5">
            {team.map((m, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold flex-shrink-0">
                  {m.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-dark truncate">{m.name}</p>
                  <p className="text-[9px] text-gray-500 truncate">{m.role}</p>
                </div>
                <span
                  className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${
                    m.tone === 'live'
                      ? 'bg-emerald-50 text-emerald-700'
                      : m.tone === 'pending'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingCard() {
  const mt = useTranslations('mockup.fp.empMgmt');
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-dark">{mt('floatTitle')}</p>
        <p className="text-xs text-gray-500">{mt('floatSub')}</p>
      </div>
    </div>
  );
}

function ShiftRosterMockup() {
  const r = useTranslations('mockup.fp.shiftRoster');

  const days = [
    { label: r('mon'), date: r('date1') },
    { label: r('tue'), date: r('date2') },
    { label: r('wed'), date: r('date3') },
    { label: r('today'), date: r('date4'), isToday: true },
    { label: r('fri'), date: r('date5') },
    { label: r('sat'), date: r('date6') },
    { label: r('sun'), date: r('date7') },
  ];

  const employees = [
    {
      initials: 'SP',
      name: 'Sebastian P.',
      photo: '/sebastian.png',
      approved: r('approved24'),
      shifts: [
        { time: '08.00 - 16.00', type: r('normal'), clock: '08.00 - 16.00' },
        { time: '08.00 - 16.00', type: r('normal'), clock: '08.00 - 16.00' },
        { time: '08.00 - 16.00', type: r('normal'), clock: '08.00 - 16.00' },
        { time: '08.00 - 16.00', type: r('normal'), clock: '10.00 - --:--' },
        null, null, null,
      ],
    },
    {
      initials: 'MH',
      name: 'Martin H.',
      photo: '/martin.png',
      approved: r('approved24'),
      shifts: [
        { time: '08.00 - 16.00', type: r('normal'), clock: '08.00 - 16.00' },
        { time: '08.00 - 16.00', type: r('normal'), clock: '08.00 - 16.00' },
        { time: '08.00 - 16.00', type: r('normal'), clock: '08.00 - 16.00' },
        { time: '08.00 - 16.00', type: r('normal'), clock: '08.00 - --:--' },
        null, null, null,
      ],
    },
    {
      initials: 'AM',
      name: 'Anna Møller',
      photo: null as string | null,
      approved: r('approved16'),
      shifts: [
        { time: '08.00 - 16.00', type: r('normal'), clock: '08.00 - 16.00' },
        { time: '08.00 - 12.00', type: r('normal'), clock: '08.00 - 12.00' },
        { time: '08.00 - 12.00', type: r('normal'), clock: '08.00 - 12.00' },
        { time: '08.00 - 12.00', type: r('normal') },
        null, null, null,
      ],
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-heading text-sm font-bold text-dark">{r('shiftPlanner')}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-semibold text-emerald-700">{r('live')}</span>
        </div>
      </div>

      <div className="p-3 overflow-x-auto">
        {/* Day headers */}
        <div className="grid gap-px" style={{ gridTemplateColumns: '120px repeat(7, 1fr)', minWidth: '600px' }}>
          <div className="px-2 py-2">
            <p className="text-[9px] font-medium text-gray-400">{r('employee')}</p>
          </div>
          {days.map((d) => (
            <div key={d.label} className={`text-center px-1 py-2 ${d.isToday ? 'text-primary' : 'text-gray-600'}`}>
              <p className={`text-[10px] font-bold ${d.isToday ? 'text-primary' : ''}`}>{d.label}</p>
              <p className="text-[8px] text-gray-400">{d.date}</p>
            </div>
          ))}

          {/* Employee rows */}
          {employees.map((emp) => (
            <>
              {/* Name cell */}
              <div key={emp.initials} className="flex items-center gap-2 px-2 py-2">
                {emp.photo ? (
                  <Image
                    src={emp.photo}
                    alt={emp.name}
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[9px] font-bold flex-shrink-0">
                    {emp.initials}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-dark truncate">{emp.name}</p>
                  <p className="text-[8px] text-emerald-600 truncate">{emp.approved}</p>
                </div>
              </div>
              {/* Shift cells */}
              {emp.shifts.map((shift, si) => (
                <div key={`${emp.initials}-${si}`} className="px-0.5 py-1 flex items-center justify-center">
                  {shift ? (
                    <div className="w-full bg-emerald-50 border border-emerald-200 rounded-lg px-2 py-1.5">
                      <p className="text-[9px] font-bold text-dark leading-tight">{shift.time}</p>
                      <p className="text-[7px] text-emerald-600 mt-0.5">{shift.type}</p>
                      {shift.clock && (
                        <p className="text-[7px] text-gray-400 mt-0.5">{shift.clock}</p>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full min-h-[32px] border border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-[10px] text-gray-300">+</span>
                    </div>
                  )}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShiftSpotlight() {
  const t = useTranslations('featurePages.employeeManagement.spotlight');

  const highlights = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      key: '0',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      key: '1',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      key: '2',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
          {/* Roster mockup */}
          <div className="relative flex justify-center order-2 lg:order-1 py-6">
            <div className="w-full max-w-[540px]">
              <ShiftRosterMockup />
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-blue-600">{t('badge')}</span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4 leading-tight">
              {t('titleStart')}{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #2563EB, #60A5FA)' }}
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
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
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
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export default function EmployeeManagementFeature() {
  return (
    <FeaturePageLayout
      namespace="featurePages.employeeManagement"
      theme={featureThemes.employeeManagement}
      badgeIcon={badgeIcon}
      heroVisual={<HeroVisual />}
      heroFloatingCard={<FloatingCard />}
      capabilities={capabilities}

      spotlight={<ShiftSpotlight />}
    />
  );
}
