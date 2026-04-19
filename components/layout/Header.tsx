'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import LanguageSwitcher from './LanguageSwitcher';
import { useOnboarding } from '@/components/onboarding/OnboardingProvider';

const FEATURES_INDEX = 1;
const INDUSTRIES_INDEX = 3;

const industryPages = [
  { slug: 'cleaning-company', labelKey: 'cleaningCompany', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', dotHover: 'group-hover/item:bg-primary', dotActive: 'bg-primary', textActive: 'text-primary', bgActive: 'bg-primary/5' },
  { slug: 'window-cleaning', labelKey: 'windowCleaning', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', dotHover: 'group-hover/item:bg-primary', dotActive: 'bg-primary', textActive: 'text-primary', bgActive: 'bg-primary/5' },
  { slug: 'landscaping', labelKey: 'landscaping', icon: 'M14.121 5.879a3 3 0 015.657 0c.79 1.367.302 3.13-1.092 3.86l-3.232 1.69a1 1 0 01-1.394-.408L12.39 7.74a1 1 0 01.408-1.394l1.323-.467zM12 14a3 3 0 100-6 3 3 0 000 6zm0 0v6m-6-6h12', dotHover: 'group-hover/item:bg-primary', dotActive: 'bg-primary', textActive: 'text-primary', bgActive: 'bg-primary/5' },
  { slug: 'facility-management', labelKey: 'facilityManagement', icon: 'M3 21h18M3 7v14m18-14v14M6 11h2m-2 4h2m4-4h2m-2 4h2M9 21V5a2 2 0 012-2h2a2 2 0 012 2v16', dotHover: 'group-hover/item:bg-primary', dotActive: 'bg-primary', textActive: 'text-primary', bgActive: 'bg-primary/5' },
  { slug: 'winter-services', labelKey: 'winterServices', icon: 'M20 12H4m16 0l-4-4m4 4l-4 4M4 12l4 4m-4-4l4-4M12 4v16m0-16l-4 4m4-4l4 4M12 20l-4-4m4 4l4-4', dotHover: 'group-hover/item:bg-primary', dotActive: 'bg-primary', textActive: 'text-primary', bgActive: 'bg-primary/5' },
] as const;

// Order matches the homepage Features section tab order, with Customer
// Management appended at the end since it has no homepage tab counterpart.
const featurePages = [
  { slug: 'live-dashboard', key: 'liveDashboard', dotHover: 'group-hover/item:bg-purple-600', dotActive: 'bg-purple-600', textActive: 'text-purple-600', bgActive: 'bg-purple-50' },
  { slug: 'employee-management', key: 'employeeManagement', dotHover: 'group-hover/item:bg-blue-600', dotActive: 'bg-blue-600', textActive: 'text-blue-600', bgActive: 'bg-blue-50' },
  { slug: 'invoicing-billing', key: 'invoicingBilling', dotHover: 'group-hover/item:bg-emerald-600', dotActive: 'bg-emerald-600', textActive: 'text-emerald-600', bgActive: 'bg-emerald-50' },
  { slug: 'customer-portal', key: 'customerPortal', dotHover: 'group-hover/item:bg-amber-600', dotActive: 'bg-amber-600', textActive: 'text-amber-600', bgActive: 'bg-amber-50' },
  { slug: 'task-scheduling', key: 'taskScheduling', dotHover: 'group-hover/item:bg-pink-600', dotActive: 'bg-pink-600', textActive: 'text-pink-600', bgActive: 'bg-pink-50' },
  { slug: 'quality-controls', key: 'qualityControls', dotHover: 'group-hover/item:bg-cyan-600', dotActive: 'bg-cyan-600', textActive: 'text-cyan-600', bgActive: 'bg-cyan-50' },
  { slug: 'customer-management', key: 'customerManagement', dotHover: 'group-hover/item:bg-indigo-600', dotActive: 'bg-indigo-600', textActive: 'text-indigo-600', bgActive: 'bg-indigo-50' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const tFeaturePages = useTranslations('featurePages');
  const tIndustries = useTranslations('nav.industriesPagesDropdown');
  const tOnboarding = useTranslations('onboarding');
  const pathname = usePathname();
  const router = useRouter();
  const { open: openOnboarding } = useOnboarding();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Check if we're on the homepage / feature page / app page
  const isHomepage = pathname === '/' || pathname === '';
  const isFeaturePage = pathname.startsWith('/features/');
  const isAppPage = pathname === '/app';
  const isIndustryPage = industryPages.some(p => pathname === `/${p.slug}`);

  const navItems = [
    { href: '/#hero', sectionId: 'hero', label: t('home') },
    { href: '/#features', sectionId: 'features', label: t('features') },
    { href: '/app', sectionId: '', label: 'App' },
    { href: '#', sectionId: '', label: t('industries') },
    { href: '/#faq', sectionId: 'faq', label: t('faq') },
    { href: '/#contact', sectionId: 'contact', label: t('contact') },
  ];

  // Update sliding indicator position when active index changes (homepage only)
  useEffect(() => {
    if (isFeaturePage || isAppPage || isIndustryPage) {
      setIndicatorStyle({ left: 0, width: 0, opacity: 0 });
      return;
    }

    const updateIndicator = () => {
      if (activeIndex === null) {
        setIndicatorStyle({ left: 0, width: 0, opacity: 0 });
        return;
      }
      const activeItem = itemRefs.current[activeIndex];
      const nav = navRef.current;
      if (activeItem && nav) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        setIndicatorStyle({
          left: itemRect.left - navRect.left,
          width: itemRect.width,
          opacity: 1,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeIndex, isFeaturePage, isAppPage, isIndustryPage]);

  // Determine active section based on scroll position (only on homepage)
  useEffect(() => {
    // If on a feature, app or industry page, no scroll-based highlight
    if (isFeaturePage || isAppPage || isIndustryPage) {
      setActiveIndex(null);
      return;
    }

    // If not on homepage, set activeIndex to null
    if (!isHomepage) {
      setActiveIndex(null);
      return;
    }

    const handleScroll = () => {
      const sections = navItems
        .map((item, index) => ({ id: item.sectionId, index }))
        .filter((item) => document.getElementById(item.id));

      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveIndex(sections[i].index);
          return;
        }
      }
      setActiveIndex(0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, navItems, isHomepage, isFeaturePage, isAppPage, isIndustryPage]);

  const handleNavClick = (index: number, href: string) => {
    // If on homepage, smooth scroll to section
    if (isHomepage && href.includes('#')) {
      setActiveIndex(index);
      const sectionId = href.split('#')[1];
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to homepage with hash
      router.push(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative h-10" style={{ aspectRatio: '1317/313' }}>
              <Image
                src="/logo.png"
                alt="SaberTask"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation - Pill Container with Sliding Indicator */}
          <nav
            ref={navRef}
            className="hidden lg:flex items-stretch relative"
            style={{ backgroundColor: 'rgba(241, 245, 249, 0.8)', borderRadius: '12px', minHeight: '44px' }}
          >
            {/* Sliding indicator (hidden on feature/app/industry pages) */}
            {!isFeaturePage && !isAppPage && !isIndustryPage && (
              <div
                className="absolute top-0 bottom-0 bg-primary rounded-lg transition-all duration-300 ease-out"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  opacity: indicatorStyle.opacity,
                }}
              />
            )}

            {/* Nav items */}
            {navItems.map((item, index) => {
              const isFeaturesItem = index === FEATURES_INDEX;

              if (isFeaturesItem) {
                // Features item with hover dropdown + static highlight on feature pages
                return (
                  <div key={item.label} className="relative group flex items-stretch">
                    <Link
                      ref={(el) => { itemRefs.current[index] = el; }}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(index, item.href);
                      }}
                      className={`relative z-10 flex items-center gap-1.5 px-5 text-sm font-semibold transition-colors duration-300 rounded-lg ${
                        isFeaturePage
                          ? 'bg-primary text-white'
                          : activeIndex === index
                          ? 'text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {item.label}
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>

                    {/* Hover dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 min-w-[280px]">
                        {featurePages.map((fp) => {
                          const isActive = pathname === `/features/${fp.slug}`;
                          return (
                            <Link
                              key={fp.slug}
                              href={`/features/${fp.slug}`}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group/item ${
                                isActive ? fp.bgActive : 'hover:bg-gray-50'
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${
                                  isActive ? fp.dotActive : `bg-gray-300 ${fp.dotHover}`
                                }`}
                              />
                              <span
                                className={`text-sm font-medium transition-colors ${
                                  isActive ? fp.textActive : 'text-gray-700 group-hover/item:text-dark'
                                }`}
                              >
                                {tFeaturePages(`${fp.key}.badge`)}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              const isAppItem = item.href === '/app';
              const isActiveApp = isAppItem && isAppPage;
              const isIndustriesItem = index === INDUSTRIES_INDEX;

              // Industries item with dropdown
              if (isIndustriesItem) {
                return (
                  <div key={item.label} className="relative group flex items-stretch">
                    <span
                      ref={(el) => { itemRefs.current[index] = el as HTMLAnchorElement | null; }}
                      className={`relative z-10 flex items-center gap-1.5 px-5 text-sm font-semibold transition-colors duration-300 rounded-lg cursor-pointer ${
                        isIndustryPage
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {item.label}
                      <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>

                    {/* Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 min-w-[220px]">
                        {industryPages.map((page) => {
                          const isActive = pathname === `/${page.slug}`;
                          return (
                            <Link
                              key={page.slug}
                              href={`/${page.slug}`}
                              className={`group/item flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150 ${
                                isActive ? page.bgActive : 'hover:bg-gray-50'
                              }`}
                            >
                              <svg className={`w-4 h-4 transition-colors duration-150 ${
                                isActive ? page.textActive : 'text-gray-400 group-hover/item:text-gray-600'
                              }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={page.icon} />
                              </svg>
                              <span className={`text-sm font-medium transition-colors duration-150 ${
                                isActive ? page.textActive : 'text-gray-700 group-hover/item:text-gray-900'
                              }`}>
                                {tIndustries(page.labelKey)}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  href={item.href}
                  onClick={(e) => {
                    if (!isAppItem) {
                      e.preventDefault();
                      handleNavClick(index, item.href);
                    }
                  }}
                  className={`relative z-10 flex items-center px-5 text-sm font-semibold transition-colors duration-300 rounded-lg ${
                    isActiveApp
                      ? 'bg-primary text-white'
                      : activeIndex === index
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <Button size="sm" withArrow onClick={openOnboarding}>{tOnboarding('trigger')}</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-2">
              {navItems.map((item, index) => {
                const isFeaturesItem = index === FEATURES_INDEX;
                const isIndustriesItem = index === INDUSTRIES_INDEX;

                if (isFeaturesItem) {
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => setMobileFeaturesOpen(!mobileFeaturesOpen)}
                        className={`w-full flex items-center justify-between px-2 py-2 font-medium transition-colors ${
                          isFeaturePage ? 'text-primary' : 'text-gray-600 hover:text-primary'
                        }`}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${mobileFeaturesOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {mobileFeaturesOpen && (
                        <div className="ml-4 mt-1 mb-1 flex flex-col gap-1 border-l-2 border-gray-100 pl-3">
                          {featurePages.map((fp) => {
                            const isActive = pathname === `/features/${fp.slug}`;
                            return (
                              <Link
                                key={fp.slug}
                                href={`/features/${fp.slug}`}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileFeaturesOpen(false);
                                }}
                                className={`block px-2 py-1.5 text-sm transition-colors ${
                                  isActive ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'
                                }`}
                              >
                                {tFeaturePages(`${fp.key}.badge`)}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                if (isIndustriesItem) {
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                        className={`w-full flex items-center justify-between px-2 py-2 font-medium transition-colors ${
                          isIndustryPage ? 'text-primary' : 'text-gray-600 hover:text-primary'
                        }`}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${mobileIndustriesOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {mobileIndustriesOpen && (
                        <div className="ml-4 mt-1 mb-1 flex flex-col gap-1 border-l-2 border-gray-100 pl-3">
                          {industryPages.map((ip) => {
                            const isActive = pathname === `/${ip.slug}`;
                            return (
                              <Link
                                key={ip.slug}
                                href={`/${ip.slug}`}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileIndustriesOpen(false);
                                }}
                                className={`flex items-center gap-2 px-2 py-1.5 text-sm transition-colors ${
                                  isActive ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'
                                }`}
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ip.icon} />
                                </svg>
                                {tIndustries(ip.labelKey)}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`block px-2 py-2 font-medium transition-colors ${
                      activeIndex === index
                        ? 'text-primary'
                        : 'text-gray-600 hover:text-primary'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(index, item.href);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="flex items-center gap-4 pt-4 mt-2 border-t border-gray-100">
                <LanguageSwitcher />
              </div>
              <Button
                className="mt-2"
                withArrow
                onClick={() => {
                  setMobileMenuOpen(false);
                  openOnboarding();
                }}
              >
                {tOnboarding('trigger')}
              </Button>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
