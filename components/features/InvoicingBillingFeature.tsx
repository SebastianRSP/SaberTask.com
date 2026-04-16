'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import FeaturePageLayout, { Capability } from './FeaturePageLayout';
import { featureThemes } from '@/lib/featureThemes';

const capabilities: Capability[] = [
  {
    key: 'invoiceList',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    key: 'autoInvoice',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    key: 'lineItems',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    key: 'statusFlow',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    key: 'csvExport',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
  {
    key: 'auditTrail',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];


function HeroVisual() {
  const m = useTranslations('mockup.fp.invoicing');
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {/* App top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-dark leading-tight">{m('title')}</p>
            <p className="text-[9px] text-gray-500">{m('customer')}</p>
          </div>
        </div>
        <div className="px-2 py-1 bg-amber-50 border border-amber-100 rounded-full">
          <span className="text-[9px] font-semibold text-amber-700">{m('draft')}</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Lines */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-semibold text-dark uppercase tracking-wide">{m('lineItems')}</p>
            <span className="text-[10px] font-medium text-primary">{m('addLine')}</span>
          </div>
          <div className="space-y-1.5">
            {[
              { d: m('cleaning'), q: '4', p: '€420' },
              { d: m('windowCleaning'), q: '1', p: '€180' },
              { d: m('snowRemoval'), q: '6', p: '€720' },
              { d: m('qualityInspection'), q: '1', p: '€95' },
            ].map((line, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50">
                <svg className="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <p className="text-[11px] font-semibold text-dark flex-1 truncate">{line.d}</p>
                <span className="text-[9px] text-gray-500">×{line.q}</span>
                <span className="text-[11px] font-bold text-dark w-12 text-right">{line.p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total + actions */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">{m('totalLabel')}</span>
            <span className="text-xl font-bold text-dark">€1,415.00</span>
          </div>
          <div className="flex justify-end">
            <button className="rounded-lg bg-primary text-white px-4 py-1.5 text-[10px] font-semibold hover:bg-primary-600">
              {m('sendInvoice')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingCard() {
  const m = useTranslations('mockup.fp.invoicing');
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-dark">{m('autoBilled')}</p>
        <p className="text-xs text-gray-500">{m('fromCompleted')}</p>
      </div>
    </div>
  );
}

function IntegrationsBar() {
  const m = useTranslations('mockup.common');
  const integrations = [
    { name: 'Dinero', src: '/integrations/dinero.png', width: 120, height: 40 },
    { name: 'e-conomic', src: '/integrations/economic.png', width: 140, height: 40 },
    { name: 'Microsoft Dynamics NAV', src: '/integrations/dynamics-nav.png', width: 160, height: 40 },
    { name: 'QuickBooks', src: '/integrations/quickbooks.png', width: 140, height: 40 },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50 border-y border-gray-100">
      <Container>
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">{m('integratesWith')}</p>
        <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap">
          {integrations.map((i) => (
            <Image
              key={i.name}
              src={i.src}
              alt={i.name}
              width={i.width}
              height={i.height}
              className="h-8 md:h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FlowArrow() {
  return (
    <div className="hidden md:flex items-center justify-center flex-shrink-0 mx-2">
      <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}

function FlowArrowDown() {
  return (
    <div className="md:hidden flex items-center justify-center py-2">
      <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  );
}

function InvoiceFlowSpotlight() {
  const f = useTranslations('mockup.fp.invoiceFlow');
  const logos = [
    { src: '/integrations/dinero.png', alt: 'Dinero' },
    { src: '/integrations/economic.png', alt: 'e-conomic' },
    { src: '/integrations/dynamics-nav.png', alt: 'Dynamics NAV' },
    { src: '/integrations/quickbooks.png', alt: 'QuickBooks' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">
            {f('titleStart')}<span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #059669, #34D399)' }}>{f('titleHighlight')}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {f('description')}
          </p>
        </div>

        {/* Visual flow */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 max-w-6xl mx-auto">

          {/* Step 1 - Service Agreement */}
          <div className="w-full md:w-auto md:flex-1 max-w-[260px] flex flex-col">
            <p className="text-base font-bold text-dark text-center mb-3">{f('step1')}</p>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-primary">{f('serviceAgreement')}</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-gray-100">
                  <span className="text-[10px] text-gray-600">{f('windowCleaning')}</span>
                  <span className="text-[10px] font-semibold text-dark">{f('weekly')}</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-gray-100">
                  <span className="text-[10px] text-gray-600">{f('stairwayWash')}</span>
                  <span className="text-[10px] font-semibold text-dark">{f('biweekly')}</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-gray-100">
                  <span className="text-[10px] text-gray-600">{f('snowRemoval')}</span>
                  <span className="text-[10px] font-semibold text-dark">{f('seasonal')}</span>
                </div>
              </div>
            </div>
          </div>

          <FlowArrow />
          <FlowArrowDown />

          {/* Step 2 - Mobile task complete */}
          <div className="w-full md:w-auto flex-shrink-0 flex flex-col" style={{ width: '140px' }}>
            <p className="text-base font-bold text-dark text-center mb-3">{f('step2')}</p>
            <div className="bg-dark rounded-[1.6rem] p-1 shadow-xl mx-auto" style={{ width: '130px', aspectRatio: '9/16' }}>
              <div className="bg-white rounded-[1.3rem] overflow-hidden h-full flex flex-col">
                {/* Dynamic island */}
                <div className="flex justify-center pt-1">
                  <div className="w-12 h-2.5 bg-dark rounded-full" />
                </div>
                <div className="px-2.5 pt-2 space-y-1.5">
                  <p className="text-[9px] font-bold text-dark">{f('stairwayWash')}</p>
                  <p className="text-[7px] text-gray-400">Borups Allé 233</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[7px] font-semibold text-emerald-600">{f('completed')}</span>
                  </div>
                </div>
                <div className="flex-1" />
                <div className="px-2.5 pb-1.5">
                  <div className="bg-emerald-500 rounded-lg py-1.5 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[8px] font-bold text-white">{f('finalised')}</span>
                  </div>
                </div>
                {/* Home bar */}
                <div className="flex justify-center pb-1">
                  <div className="w-10 h-0.5 rounded-full bg-dark/60" />
                </div>
              </div>
            </div>
          </div>

          <FlowArrow />
          <FlowArrowDown />

          {/* Step 3 - Invoice draft */}
          <div className="w-full md:w-auto md:flex-1 max-w-[260px] flex flex-col">
            <p className="text-base font-bold text-dark text-center mb-3">{f('step3')}</p>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-amber-800">#2026-0428</span>
                </div>
                <span className="text-[9px] font-bold text-amber-600 bg-amber-200 px-2 py-0.5 rounded-full">{f('draft')}</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-gray-100">
                  <span className="text-[10px] text-gray-600">{f('windowCleaningX4')}</span>
                  <span className="text-[10px] font-bold text-dark">€420</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-gray-100">
                  <span className="text-[10px] text-gray-600">{f('stairwayWashX2')}</span>
                  <span className="text-[10px] font-bold text-dark">€180</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-amber-200">
                <span className="text-[10px] font-semibold text-gray-500">{f('totalLabel')}</span>
                <span className="text-sm font-bold text-dark">€600.00</span>
              </div>
            </div>
          </div>

          <FlowArrow />
          <FlowArrowDown />

          {/* Step 4 - Accounting software */}
          <div className="w-full md:w-auto md:flex-1 max-w-[200px] flex flex-col">
            <p className="text-base font-bold text-dark text-center mb-3">{f('step4')}</p>
            <div className="w-[150px] h-[150px] rounded-full bg-gray-50 border-2 border-gray-200 mx-auto flex items-center justify-center shadow-sm">
              <div className="grid grid-cols-2 gap-2 p-3">
                {logos.map((logo) => (
                  <Image
                    key={logo.alt}
                    src={logo.src}
                    alt={logo.alt}
                    width={56}
                    height={24}
                    className="h-5 w-auto object-contain"
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

const badgeIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export default function InvoicingBillingFeature() {
  return (
    <FeaturePageLayout
      namespace="featurePages.invoicingBilling"
      theme={featureThemes.invoicingBilling}
      badgeIcon={badgeIcon}
      heroVisual={<HeroVisual />}
      heroFloatingCard={<FloatingCard />}
      capabilities={capabilities}
      heroFooter={<IntegrationsBar />}
      spotlight={<InvoiceFlowSpotlight />}
      hideHowItWorks
    />
  );
}
