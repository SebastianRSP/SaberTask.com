'use client';

import { useTranslations } from 'next-intl';
import FeaturePageLayout, { Capability } from './FeaturePageLayout';
import { featureThemes } from '@/lib/featureThemes';

const capabilities: Capability[] = [
  {
    key: 'database',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    key: 'locations',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    key: 'workScope',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h10" />
      </svg>
    ),
  },
  {
    key: 'agreements',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    key: 'fileVault',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    key: 'audit',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];


function HeroVisual() {
  const m = useTranslations('mockup.fp.customerMgmt');
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {/* App top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white text-[10px] font-bold">
            NG
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-dark leading-tight">{m('company')}</p>
            <p className="text-[9px] text-gray-500">{m('customerNo')}</p>
          </div>
        </div>
        <div className="px-2 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
          <span className="text-[9px] font-semibold text-emerald-700">{m('active')}</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-100 -mx-1">
          <div className="px-3 py-1.5 text-[10px] font-semibold text-primary border-b-2 border-primary -mb-px">
            {m('locations')}
          </div>
          <div className="px-3 py-1.5 text-[10px] font-medium text-gray-500">{m('contacts')}</div>
          <div className="px-3 py-1.5 text-[10px] font-medium text-gray-500">{m('agreements')}</div>
          <div className="px-3 py-1.5 text-[10px] font-medium text-gray-500">{m('files')}</div>
        </div>

        {/* Locations list */}
        <div className="space-y-1.5">
          {[
            { name: m('hqTower'), address: m('addr1'), tasks: 24 },
            { name: m('warehouseNorth'), address: m('addr2'), tasks: 12 },
            { name: m('showroom'), address: m('addr3'), tasks: 8 },
          ].map((loc, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50">
              <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-dark truncate">{loc.name}</p>
                <p className="text-[9px] text-gray-500 truncate">{loc.address}</p>
              </div>
              <span className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {loc.tasks} {m('tasks')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FloatingCard() {
  const m = useTranslations('mockup.fp.customerMgmt');
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
        <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-dark">{m('aiSearch')}</p>
        <p className="text-xs text-gray-500">{m('found42')}</p>
      </div>
    </div>
  );
}

const badgeIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

export default function CustomerManagementFeature() {
  return (
    <FeaturePageLayout
      namespace="featurePages.customerManagement"
      theme={featureThemes.customerManagement}
      badgeIcon={badgeIcon}
      heroVisual={<HeroVisual />}
      heroFloatingCard={<FloatingCard />}
      capabilities={capabilities}
    />
  );
}
