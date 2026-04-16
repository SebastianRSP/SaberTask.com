import type { FeatureTheme } from '@/components/features/FeaturePageLayout';

/**
 * Per-feature colour themes. Tailwind needs class names to appear in source,
 * so each theme spells its classes out as plain strings.
 *
 * Colours mirror the homepage Features tabs so each feature page matches the
 * card the user clicked from.
 */
export const featureThemes = {
  // Live Dashboard - PURPLE (homepage tab #1: liveDashboard)
  liveDashboard: {
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    hex: '#7C3AED',
    badge: 'bg-purple-50 text-purple-600',
    iconBg: 'text-purple-600 bg-purple-100',
    iconHover: 'group-hover:bg-purple-600 group-hover:text-white',
    afterCard: 'border border-purple-100 ring-purple-50',
    afterCheck: 'text-purple-500',
    capabilityHover: 'hover:border-purple-200',
  },
  // Task Scheduling - PINK (homepage tab #5: smartRouteBuilder)
  taskScheduling: {
    gradient: 'linear-gradient(135deg, #DB2777 0%, #F472B6 100%)',
    hex: '#DB2777',
    badge: 'bg-pink-50 text-pink-600',
    iconBg: 'text-pink-600 bg-pink-100',
    iconHover: 'group-hover:bg-pink-600 group-hover:text-white',
    afterCard: 'border border-pink-100 ring-pink-50',
    afterCheck: 'text-pink-500',
    capabilityHover: 'hover:border-pink-200',
  },
  // Employee Management - BLUE (homepage tab #2: subcontractorManagement)
  employeeManagement: {
    gradient: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)',
    hex: '#2563EB',
    badge: 'bg-blue-50 text-blue-600',
    iconBg: 'text-blue-600 bg-blue-100',
    iconHover: 'group-hover:bg-blue-600 group-hover:text-white',
    afterCard: 'border border-blue-100 ring-blue-50',
    afterCheck: 'text-blue-500',
    capabilityHover: 'hover:border-blue-200',
  },
  // Quality Controls - CYAN (homepage tab #6: drawingTool)
  qualityControls: {
    gradient: 'linear-gradient(135deg, #0891B2 0%, #67E8F9 100%)',
    hex: '#0891B2',
    badge: 'bg-cyan-50 text-cyan-600',
    iconBg: 'text-cyan-600 bg-cyan-100',
    iconHover: 'group-hover:bg-cyan-600 group-hover:text-white',
    afterCard: 'border border-cyan-100 ring-cyan-50',
    afterCheck: 'text-cyan-500',
    capabilityHover: 'hover:border-cyan-200',
  },
  // Customer Management - INDIGO (not on homepage, distinct slot)
  customerManagement: {
    gradient: 'linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)',
    hex: '#4F46E5',
    badge: 'bg-indigo-50 text-indigo-600',
    iconBg: 'text-indigo-600 bg-indigo-100',
    iconHover: 'group-hover:bg-indigo-600 group-hover:text-white',
    afterCard: 'border border-indigo-100 ring-indigo-50',
    afterCheck: 'text-indigo-500',
    capabilityHover: 'hover:border-indigo-200',
  },
  // Customer Portal - AMBER (homepage tab #4: customerDashboard)
  customerPortal: {
    gradient: 'linear-gradient(135deg, #D97706 0%, #FBBF24 100%)',
    hex: '#D97706',
    badge: 'bg-amber-50 text-amber-600',
    iconBg: 'text-amber-600 bg-amber-100',
    iconHover: 'group-hover:bg-amber-600 group-hover:text-white',
    afterCard: 'border border-amber-100 ring-amber-50',
    afterCheck: 'text-amber-500',
    capabilityHover: 'hover:border-amber-200',
  },
  // Invoicing & Billing - GREEN (homepage tab #3: automaticInvoicing)
  invoicingBilling: {
    gradient: 'linear-gradient(135deg, #059669 0%, #34D399 100%)',
    hex: '#059669',
    badge: 'bg-emerald-50 text-emerald-600',
    iconBg: 'text-emerald-600 bg-emerald-100',
    iconHover: 'group-hover:bg-emerald-600 group-hover:text-white',
    afterCard: 'border border-emerald-100 ring-emerald-50',
    afterCheck: 'text-emerald-500',
    capabilityHover: 'hover:border-emerald-200',
  },
  // Mobile App - TEAL (standalone feature page)
  mobileApp: {
    gradient: 'linear-gradient(135deg, #0D9488 0%, #5EEAD4 100%)',
    hex: '#0D9488',
    badge: 'bg-teal-50 text-teal-600',
    iconBg: 'text-teal-600 bg-teal-100',
    iconHover: 'group-hover:bg-teal-600 group-hover:text-white',
    afterCard: 'border border-teal-100 ring-teal-50',
    afterCheck: 'text-teal-500',
    capabilityHover: 'hover:border-teal-200',
  },
} satisfies Record<string, FeatureTheme>;

export type FeatureThemeKey = keyof typeof featureThemes;
