'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';

export default function MobileApp() {
  const t = useTranslations('mobileApp');
  const m = useTranslations('mockup');

  const features = [
    {
      key: 'gpsTracking',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      key: 'revenueOverview',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      key: 'photoCapture',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      key: 'taskManagement',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="mobile-app" className="section-padding bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Phone mockups */}
          <div className="relative flex justify-start lg:justify-center order-2 lg:order-1 overflow-hidden w-full -mr-4 sm:-mr-6 lg:mr-0">
            <div className="relative origin-top-left lg:origin-top scale-[0.78] sm:scale-90 md:scale-100 lg:scale-100 -mb-[140px] sm:-mb-[80px] md:-mb-0 lg:mb-0" style={{ width: '460px', height: '630px' }}>
              {/* Second phone (task detail) - beside, smaller and rotated slightly */}
              <div className="absolute top-8 left-[230px] w-[230px] h-[476px] bg-dark rounded-[2.4rem] p-1.5 shadow-xl z-0 ">
                <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative flex flex-col">
                  {/* Dynamic island */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-20 h-[18px] bg-dark rounded-full z-30" />

                  {/* Status bar */}
                  <div className="flex items-center justify-between px-5 pt-2 pb-0 text-[8px] font-bold text-dark relative z-20">
                    <span>10:06</span>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                      </svg>
                      <svg className="w-4 h-3" fill="none" viewBox="0 0 24 16">
                        <rect x="1" y="3" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="3" y="5" width="14" height="6" rx="0.5" fill="currentColor" />
                        <rect x="20" y="6" width="2" height="4" rx="0.5" fill="currentColor" />
                      </svg>
                    </div>
                  </div>

                  {/* App header */}
                  <div className="px-3 pt-1.5 pb-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-dark">{m('salaryScreen.header')}</span>
                      <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </div>
                    {/* Period selector */}
                    <div className="flex items-center justify-between mt-1">
                      <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <div className="text-center">
                        <p className="text-[8px] font-semibold text-dark">{m('salaryScreen.period')}</p>
                        <p className="text-[6px] text-gray-400">{m('salaryScreen.currentPeriod')}</p>
                      </div>
                      <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Scrollable content */}
                  <div className="flex-1 overflow-hidden px-2 pb-1 bg-gray-50 space-y-1.5 pt-1.5">
                    {/* SHIFT OVERVIEW */}
                    <p className="text-[6px] font-bold text-gray-400 uppercase tracking-wider px-0.5">{m('salaryScreen.shiftOverview')}</p>
                    <div className="bg-white rounded-lg p-2 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <div>
                            <p className="text-[8px] font-bold text-dark">{m('salaryScreen.normal')}</p>
                            <p className="text-[6px] text-gray-400">{m('salaryScreen.threeShifts')}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[6px] text-gray-400">{m('salaryScreen.totalH')}</p>
                          <p className="text-[6px] text-gray-400">{m('salaryScreen.breakH')}</p>
                          <p className="text-[8px] font-bold text-dark">{m('salaryScreen.netH')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tabs: Shifts / Accords */}
                    <div className="grid grid-cols-2 bg-gray-100 rounded-lg p-0.5">
                      <div className="text-center py-1 text-[7px] font-medium text-gray-400">{m('salaryScreen.shifts')}</div>
                      <div className="text-center py-1 text-[7px] font-semibold text-dark bg-white rounded-md shadow-sm">{m('salaryScreen.accords')}</div>
                    </div>

                    {/* Approved / Pending cards */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="bg-white rounded-lg p-2 border border-gray-100 border-l-2 border-l-emerald-500">
                        <p className="text-[6px] font-bold text-emerald-600 uppercase tracking-wider">{m('salaryScreen.approved')}</p>
                        <p className="text-[12px] font-bold text-dark">333,3</p>
                        <p className="text-[6px] text-gray-400">DKK</p>
                      </div>
                      <div className="bg-white rounded-lg p-2 border border-gray-100 border-l-2 border-l-amber-400">
                        <p className="text-[6px] font-bold text-amber-500 uppercase tracking-wider">{m('salaryScreen.pending')}</p>
                        <p className="text-[12px] font-bold text-dark">333,3</p>
                        <p className="text-[6px] text-gray-400">DKK</p>
                      </div>
                    </div>

                    {/* ACCORDS THIS PERIOD */}
                    <p className="text-[6px] font-bold text-gray-400 uppercase tracking-wider px-0.5">{m('salaryScreen.accordsThisPeriod')}</p>
                    <div className="bg-white rounded-lg border border-gray-100 divide-y divide-gray-100">
                      {/* Row 1 - Pending */}
                      <div className="p-2 flex items-start gap-1.5">
                        <div className="text-center flex-shrink-0" style={{ minWidth: '24px' }}>
                          <p className="text-[7px] font-semibold text-dark">10 Apr</p>
                          <p className="text-[6px] text-gray-400">{m('salaryScreen.fri')}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[7px] font-bold text-dark">Task-1110</p>
                          <p className="text-[6px] text-gray-400 truncate">Frode Jakobsens Plads 4, 2720 V...</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-[7px] font-bold text-dark">333,3 DKK</p>
                          <span className="text-[6px] font-semibold text-amber-500 border border-amber-300 bg-amber-50 px-1 py-0.5 rounded">{m('salaryScreen.pending')}</span>
                        </div>
                      </div>
                      {/* Row 2 - Approved */}
                      <div className="p-2 flex items-start gap-1.5">
                        <div className="text-center flex-shrink-0" style={{ minWidth: '24px' }}>
                          <p className="text-[7px] font-semibold text-dark">10 Apr</p>
                          <p className="text-[6px] text-gray-400">{m('salaryScreen.fri')}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[7px] font-bold text-dark">Task-1109</p>
                          <p className="text-[6px] text-gray-400 truncate">Frode Jakobsens Plads 4, 2720...</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-[7px] font-bold text-dark">333,3 DKK</p>
                          <span className="text-[6px] font-semibold text-emerald-600 border border-emerald-300 bg-emerald-50 px-1 py-0.5 rounded">{m('salaryScreen.approved')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom tab bar */}
                  <div className="border-t border-gray-100 px-1.5 pt-1 pb-3 flex items-center justify-around bg-white">
                    {[
                      { label: m('common.home'), icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                      { label: m('common.messages'), icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
                      { label: m('common.calendar'), icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                      { label: m('common.reports'), icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                    ].map((tab) => (
                      <div key={tab.label} className="flex flex-col items-center gap-0.5">
                        <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tab.icon} />
                        </svg>
                        <span className="text-[6px] font-semibold text-gray-400">{tab.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Home indicator */}
                  <div className="flex justify-center pb-0.5 bg-white">
                    <div className="w-16 h-0.5 rounded-full bg-dark/80" />
                  </div>
                </div>
              </div>

              {/* First phone (home screen) - in front */}
              <div className="relative w-[280px] h-[580px] bg-dark rounded-[3rem] p-2 shadow-2xl z-10">
                {/* Phone screen */}
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative flex flex-col">
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

                  {/* App header */}
                  <div className="flex items-center justify-between px-4 pt-2 pb-2">
                    <span className="text-lg font-bold text-dark">{m('homeScreen.header')}</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>

                  {/* Scrollable content */}
                  <div className="flex-1 overflow-hidden px-3 pb-1">
                    {/* Date + task count */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">{m('homeScreen.dateLabel')}</span>
                      <span className="text-[10px] font-semibold text-emerald-600">{m('homeScreen.twoTasks')}</span>
                    </div>

                    {/* YOUR SHIFTS */}
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 px-0.5">{m('homeScreen.yourShifts')}</p>
                    <div className="rounded-xl border border-gray-200 p-3 mb-4">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[12px] font-bold text-dark">{m('homeScreen.normal')}</span>
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
                        <span className="text-[10px] text-gray-600">{m('homeScreen.clockedInAt')}</span>
                      </div>
                      <button className="w-full bg-primary text-white text-[11px] font-bold py-2 rounded-lg">
                        {m('homeScreen.clockOut')}
                      </button>
                    </div>

                    {/* TASKS TODAY */}
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 px-0.5">{m('homeScreen.tasksToday')}</p>
                    <div className="space-y-2">
                      {/* Task 1 - Scheduled */}
                      <div className="rounded-xl border border-gray-200 p-2.5">
                        <div className="flex items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                              <span className="text-[11px] font-bold text-dark truncate">{m('tasks.mainWindows')}</span>
                            </div>
                            <p className="text-[9px] text-gray-500 truncate ml-3.5">Islands Brygge Facility · Kalvebod Brygge 59</p>
                            <div className="flex items-center gap-1.5 mt-1.5 ml-3.5">
                              <span className="text-[8px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded">Islands Brygge Facility</span>
                              <span className="text-[8px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{m('common.scheduled')}</span>
                            </div>
                          </div>
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5" />
                        </div>
                      </div>

                      {/* Task 2 - Completed */}
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-2.5">
                        <div className="flex items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                              <span className="text-[11px] font-bold text-dark truncate">{m('tasks.tagrenne')}</span>
                            </div>
                            <p className="text-[9px] text-gray-500 truncate ml-3.5">Brønshøj Service Center · Frode Jakobsens Plads 4</p>
                            <div className="flex items-center gap-1.5 mt-1.5 ml-3.5">
                              <span className="text-[8px] font-medium text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Brønshøj Service Center</span>
                              <span className="text-[8px] font-medium text-emerald-600">{m('common.completed')}</span>
                            </div>
                          </div>
                          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom tab bar */}
                  <div className="border-t border-gray-100 px-2 pt-1.5 pb-4 flex items-center justify-around bg-white">
                    {[
                      { label: m('common.home'), active: true, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                      { label: m('common.messages'), active: false, icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
                      { label: m('common.calendar'), active: false, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                      { label: m('common.reports'), active: false, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                    ].map((tab) => (
                      <div key={tab.label} className="flex flex-col items-center gap-0.5">
                        <svg className={`w-4 h-4 ${tab.active ? 'text-primary' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={tab.active ? 2.5 : 1.5} d={tab.icon} />
                        </svg>
                        <span className={`text-[8px] font-semibold ${tab.active ? 'text-primary' : 'text-gray-400'}`}>{tab.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Home indicator */}
                  <div className="flex justify-center pb-1 bg-white">
                    <div className="w-20 h-1 rounded-full bg-dark/80" />
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-primary">{t('badge')}</span>
            </div>

            {/* Title */}
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4">
              {t('title')}
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8">
              {t('description')}
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature) => (
                <div
                  key={feature.key}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">
                      {t(`features.${feature.key}.title`)}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t(`features.${feature.key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/app"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline transition-colors"
            >
              {t('learnMore')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* App store buttons - hidden until ready
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
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
                href="#"
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
            */}
          </div>
        </div>
      </Container>
    </section>
  );
}
