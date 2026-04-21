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

/* ───────────────────────── Phone Frame ───────────────────────── */

function PhoneFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-dark rounded-[2.8rem] p-2 shadow-2xl ${className}`}>
      <div className="bg-white rounded-[2.3rem] overflow-hidden relative flex flex-col h-full">
        {/* Dynamic island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-[22px] bg-dark rounded-full z-30" />
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-2.5 pb-0 text-[10px] font-bold text-dark relative z-20">
          <span>10:06</span>
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            <svg className="w-5 h-3.5" fill="none" viewBox="0 0 24 16">
              <rect x="1" y="3" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <rect x="3" y="5" width="14" height="6" rx="0.5" fill="currentColor" />
              <rect x="20" y="6" width="2" height="4" rx="0.5" fill="currentColor" />
            </svg>
          </div>
        </div>
        {children}
        {/* Home indicator */}
        <div className="flex justify-center pb-1.5 bg-white">
          <div className="w-24 h-1 rounded-full bg-dark/80" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Screen: Home ─────────────────── */

function HomeScreen() {
  const m = useTranslations('mockup');
  return (
    <PhoneFrame className="w-[260px] h-[540px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-2 pb-1">
        <span className="text-base font-bold text-dark">{m('homeScreen.header')}</span>
        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      <div className="flex-1 overflow-hidden px-3 pb-1">
        {/* Date + count */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">{m('homeScreen.dateLabel')}</span>
          <span className="text-[10px] font-semibold text-emerald-600">{m('homeScreen.threeTasks')}</span>
        </div>

        {/* Shift card */}
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 px-0.5">{m('homeScreen.yourShift')}</p>
        <div className="rounded-xl border border-gray-200 p-3 mb-3">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold text-dark">{m('homeScreen.normal')}</span>
          </div>
          <div className="flex items-center gap-1 mb-0.5">
            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[10px] text-gray-500">08:00 - 16:00</span>
          </div>
          <div className="flex items-center gap-1 mb-2">
            <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[10px] text-gray-600">{m('homeScreen.clockedInAtPhone')}</span>
          </div>
          <button className="w-full bg-primary text-white text-[11px] font-bold py-2 rounded-lg">{m('homeScreen.clockOut')}</button>
        </div>

        {/* Tasks */}
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 px-0.5">{m('homeScreen.tasksToday')}</p>
        <div className="space-y-1.5">
          {[
            { name: m('tasks.mainWindows'), loc: 'Islands Brygge · Kalvebod Brygge 59', status: m('common.scheduled'), color: 'amber' },
            { name: m('tasks.stairwayWash'), loc: 'Brønshøj · Frode Jakobsens Plads 4', status: m('common.completed'), color: 'emerald' },
            { name: m('tasks.officeCleaning'), loc: 'Vesterbro · Istedgade 100', status: m('common.completed'), color: 'emerald' },
          ].map((t, i) => (
            <div key={i} className={`rounded-xl border p-2.5 ${t.color === 'emerald' ? 'border-emerald-200 bg-emerald-50/50' : 'border-gray-200'}`}>
              <div className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${t.color === 'emerald' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                    <span className="text-[10px] font-bold text-dark truncate">{t.name}</span>
                  </div>
                  <p className="text-[8px] text-gray-500 truncate ml-3.5">{t.loc}</p>
                </div>
                {t.color === 'emerald' ? (
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Tab bar */}
      <div className="border-t border-gray-100 px-2 pt-1.5 pb-3 flex items-center justify-around bg-white">
        {[
          { label: m('common.home'), active: true, d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
          { label: m('common.messages'), active: false, d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
          { label: m('common.calendar'), active: false, d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
          { label: m('common.reports'), active: false, d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
        ].map((tab) => (
          <div key={tab.label} className="flex flex-col items-center gap-0.5">
            <svg className={`w-4 h-4 ${tab.active ? 'text-primary' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={tab.active ? 2.5 : 1.5} d={tab.d} />
            </svg>
            <span className={`text-[8px] font-semibold ${tab.active ? 'text-primary' : 'text-gray-400'}`}>{tab.label}</span>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

/* ─────────────────── Screen: Task Detail ─────────────────── */

function TaskScreen() {
  const m = useTranslations('mockup');
  return (
    <PhoneFrame className="w-[260px] h-[540px]">
      {/* Header */}
      <div className="flex items-center px-4 pt-2 pb-1 gap-2">
        <div className="flex items-center gap-0.5 text-primary">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-[10px] font-semibold">{m('taskScreen.back')}</span>
        </div>
        <span className="text-[13px] font-bold text-dark truncate">Kalvebod Brygge 59</span>
      </div>
      <div className="flex-1 overflow-hidden px-3 pb-1 bg-gray-50 space-y-2">
        {/* IDs */}
        <div className="bg-white rounded-xl p-3 border border-gray-100 mt-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-[7px] font-bold text-gray-400 uppercase tracking-wider">{m('common.taskId')}</p>
              <p className="text-sm font-bold text-dark mt-0.5">T-1111</p>
            </div>
            <div className="border-l border-gray-100 pl-2">
              <p className="text-[7px] font-bold text-gray-400 uppercase tracking-wider">{m('common.customerId')}</p>
              <p className="text-sm font-bold text-dark mt-0.5">C-1010</p>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="bg-white rounded-xl p-3 border border-gray-100">
          <p className="text-[10px] font-bold text-dark mb-0.5">{m('common.description')}</p>
          <p className="text-[9px] text-gray-500">{m('tasks.mainWindows')}</p>
        </div>
        {/* Address */}
        <div className="bg-white rounded-xl p-3 border border-gray-100">
          <div className="flex items-center justify-between mb-0.5">
            <p className="text-[10px] font-bold text-dark">{m('common.address')}</p>
            <div className="flex items-center gap-0.5 text-primary">
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span className="text-[8px] font-semibold">{m('common.open')}</span>
            </div>
          </div>
          <p className="text-[9px] text-gray-500">Kalvebod Brygge 59, Copenhagen 1560</p>
        </div>
        {/* Worker input */}
        <div className="bg-white rounded-xl p-3 border border-gray-100">
          <p className="text-[10px] font-bold text-dark mb-1">{m('common.workerInput')}</p>
          <p className="text-[7px] font-bold text-gray-400 uppercase tracking-wider mb-1">{m('common.notes')}</p>
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 mb-2">
            <span className="text-[9px] text-dark">{m('taskScreen.notes')}</span>
          </div>
          <p className="text-[7px] font-bold text-gray-400 uppercase tracking-wider mb-1">{m('common.photos')}</p>
          <div className="flex items-center gap-1.5">
            {[
              { src: '/quality-reports/entrance-hall.jpeg', alt: 'Entrance hall' },
              { src: '/quality-reports/staircase.jpeg', alt: 'Staircase' },
              { src: '/quality-reports/bin-shelter.jpeg', alt: 'Bin shelter' },
            ].map((photo) => (
              <div key={photo.alt} className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 relative">
                <Image src={photo.src} alt={photo.alt} fill sizes="40px" className="object-cover" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-lg border-2 border-dashed border-primary/30 flex items-center justify-center flex-shrink-0">
              <span className="text-primary/50 text-sm">+</span>
            </div>
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="bg-white border-t border-gray-100 px-3 py-2 grid grid-cols-2 gap-2">
        <button className="bg-primary text-white text-[10px] font-bold py-2 rounded-xl flex items-center justify-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          {m('taskScreen.startTask')}
        </button>
        <button className="bg-gray-100 text-gray-400 text-[10px] font-bold py-2 rounded-xl flex items-center justify-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          {m('taskScreen.finalize')}
        </button>
      </div>
    </PhoneFrame>
  );
}

/* ─────────────────── Screen: Salary ─────────────────── */

function SalaryScreen() {
  const m = useTranslations('mockup');
  return (
    <PhoneFrame className="w-[260px] h-[540px]">
      {/* Header */}
      <div className="px-4 pt-2 pb-1">
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-dark">{m('salaryScreen.header')}</span>
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <div className="flex items-center justify-between mt-1">
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <div className="text-center">
            <p className="text-[9px] font-semibold text-dark">{m('salaryScreen.period')}</p>
            <p className="text-[7px] text-gray-400">{m('salaryScreen.currentPeriod')}</p>
          </div>
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      <div className="flex-1 overflow-hidden px-3 pb-1 bg-gray-50 space-y-2 pt-2">
        {/* Shift overview */}
        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider px-0.5">{m('salaryScreen.shiftOverview')}</p>
        <div className="bg-white rounded-xl p-3 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div>
                <p className="text-[10px] font-bold text-dark">{m('salaryScreen.normal')}</p>
                <p className="text-[8px] text-gray-400">{m('salaryScreen.threeShifts')}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[8px] text-gray-400">{m('salaryScreen.totalH')}</p>
              <p className="text-[10px] font-bold text-dark">{m('salaryScreen.netH')}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 bg-gray-100 rounded-xl p-0.5">
          <div className="text-center py-1.5 text-[9px] font-medium text-gray-400">{m('salaryScreen.shifts')}</div>
          <div className="text-center py-1.5 text-[9px] font-semibold text-dark bg-white rounded-lg shadow-sm">{m('salaryScreen.accords')}</div>
        </div>

        {/* Approved / Pending */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white rounded-xl p-3 border border-gray-100 border-l-2 border-l-emerald-500">
            <p className="text-[7px] font-bold text-emerald-600 uppercase tracking-wider">{m('salaryScreen.approved')}</p>
            <p className="text-lg font-bold text-dark">333,3</p>
            <p className="text-[8px] text-gray-400">DKK</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-100 border-l-2 border-l-amber-400">
            <p className="text-[7px] font-bold text-amber-500 uppercase tracking-wider">{m('salaryScreen.pending')}</p>
            <p className="text-lg font-bold text-dark">333,3</p>
            <p className="text-[8px] text-gray-400">DKK</p>
          </div>
        </div>

        {/* Accord rows */}
        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider px-0.5">{m('salaryScreen.accordsThisPeriod')}</p>
        <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
          {[
            { date: '10 Apr', task: 'Task-1110', addr: 'Frode Jakobsens Plads 4', amount: '333,3', status: m('salaryScreen.pending'), sColor: 'amber' },
            { date: '10 Apr', task: 'Task-1109', addr: 'Frode Jakobsens Plads 4', amount: '333,3', status: m('salaryScreen.approved'), sColor: 'emerald' },
          ].map((row, i) => (
            <div key={i} className="p-2.5 flex items-start gap-2">
              <div className="text-center flex-shrink-0" style={{ minWidth: '28px' }}>
                <p className="text-[9px] font-semibold text-dark">{row.date}</p>
                <p className="text-[7px] text-gray-400">{m('salaryScreen.fri')}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold text-dark">{row.task}</p>
                <p className="text-[7px] text-gray-400 truncate">{row.addr}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[9px] font-bold text-dark">{row.amount} DKK</p>
                <span className={`text-[7px] font-semibold px-1.5 py-0.5 rounded border ${
                  row.sColor === 'amber'
                    ? 'text-amber-500 border-amber-300 bg-amber-50'
                    : 'text-emerald-600 border-emerald-300 bg-emerald-50'
                }`}>{row.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Tab bar */}
      <div className="border-t border-gray-100 px-2 pt-1.5 pb-3 flex items-center justify-around bg-white">
        {[
          { label: m('common.home'), d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
          { label: m('common.messages'), d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
          { label: m('common.calendar'), d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
          { label: m('common.reports'), d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
        ].map((tab) => (
          <div key={tab.label} className="flex flex-col items-center gap-0.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tab.d} />
            </svg>
            <span className="text-[8px] font-semibold text-gray-400">{tab.label}</span>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

/* ─────────────────── Feature Row ─────────────────── */

function FeatureRow({ icon, title, description, reverse, children }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reverse ? '' : ''}`}>
      <div className={reverse ? 'order-1 lg:order-2' : ''}>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 text-teal-600 mb-4">
          {icon}
        </div>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">{title}</h3>
        <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
      </div>
      <div className={`flex justify-center ${reverse ? 'order-2 lg:order-1' : ''}`}>
        {children}
      </div>
    </div>
  );
}

/* ─────────────────── Main Component ─────────────────── */

export default function MobileAppFeature() {
  const ma = useTranslations('mockup.fp.mobileApp');
  const fp = useTranslations('featurePages.mobileApp');
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  const capabilities = [
    { titleKey: 'gpsTitle', descKey: 'gpsDesc', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
    { titleKey: 'photoTitle', descKey: 'photoDesc', icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' },
    { titleKey: 'taskListTitle', descKey: 'taskListDesc', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { titleKey: 'messagingTitle', descKey: 'messagingDesc', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
    { titleKey: 'sickLeaveTitle', descKey: 'sickLeaveDesc', icon: 'M19 14l-7 7m0 0l-7-7m7 7V3' },
    { titleKey: 'elearningTitle', descKey: 'elearningDesc', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  ] as const;

  const connections = [
    { fromKey: 'planningBoard', toKey: 'taskSchedulingLink', href: '/features/task-scheduling', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { fromKey: 'clockEvents', toKey: 'employeeManagementLink', href: '/features/employee-management', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { fromKey: 'taskPhotos', toKey: 'customerPortalLink', href: '/features/customer-portal', icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' },
    { fromKey: 'completedTasks', toKey: 'invoicingBillingLink', href: '/features/invoicing-billing', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  ] as const;

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white relative overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full mb-6">
                <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium text-teal-600">{fp('badge')}</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6 leading-tight">
                {fp('hero.titleStart')}{' '}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #0D9488, #5EEAD4)' }}>
                  {fp('hero.titleHighlight')}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
                {fp('hero.description')}
              </p>
              <Button withArrow onClick={openCalendly}>{fp('hero.cta')}</Button>
            </div>

            {/* Right - phone hero */}
            <div className="relative flex justify-center">
              <HomeScreen />
              {/* Decorative blurs */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-200/30 rounded-full blur-3xl" />
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-teal-200/20 rounded-full blur-3xl" />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Download bar ── */}
      <section className="py-8 bg-gray-50 border-y border-gray-100">
        <Container>
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            <a
              href="https://apps.apple.com/en/app/sabertask-employee-app/id6761916809"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/app-store-badge.png"
                alt="Download on the App Store"
                width={180}
                height={60}
                className="h-12 md:h-14 w-auto"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.sabertask.mobile&hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/google-play-badge.png"
                alt="Get it on Google Play"
                width={180}
                height={60}
                className="h-12 md:h-14 w-auto"
              />
            </a>
          </div>
        </Container>
      </section>

      {/* ── Feature: Task Detail ── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <FeatureRow
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
            title={ma('taskDetailTitle')}
            description={ma('taskDetailDesc')}
          >
            <TaskScreen />
          </FeatureRow>
        </Container>
      </section>

      {/* ── Feature: Salary ── */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <FeatureRow
            reverse
            icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            title={ma('salaryTitle')}
            description={ma('salaryDesc')}
          >
            <SalaryScreen />
          </FeatureRow>
        </Container>
      </section>

      {/* ── Capabilities Grid ── */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">
              {ma('capabilitiesTitle')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {ma('capabilitiesSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((feat) => (
              <div key={feat.titleKey} className="group bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-teal-200 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center mb-4 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feat.icon} />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-dark mb-2">{ma(feat.titleKey)}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{ma(feat.descKey)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── How it connects ── */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">
              {ma('connectedTitle')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {ma('connectedSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {connections.map((item) => (
              <div key={item.fromKey} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <p className="text-sm font-bold text-dark mb-1">{ma(item.fromKey)}</p>
                <svg className="w-4 h-4 text-gray-300 mx-auto my-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 text-sm text-teal-600 font-semibold hover:text-teal-700 transition-colors"
                >
                  {ma(item.toKey)}
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
