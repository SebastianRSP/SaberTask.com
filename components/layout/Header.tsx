'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import LanguageSwitcher from './LanguageSwitcher';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CALENDLY_URL = 'https://calendly.com/sebastiansoepedersen/30min';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Check if we're on the homepage
  const isHomepage = pathname === '/' || pathname === '';

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  const navItems = [
    { href: '/#hero', sectionId: 'hero', label: t('home') },
    { href: '/#features', sectionId: 'features', label: t('features') },
    { href: '/#mobile-app', sectionId: 'mobile-app', label: 'App' },
    { href: '/#faq', sectionId: 'faq', label: t('faq') },
    { href: '/#contact', sectionId: 'contact', label: t('contact') },
  ];

  // Update indicator position when active index changes
  useEffect(() => {
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
  }, [activeIndex]);

  // Determine active section based on scroll position (only on homepage)
  useEffect(() => {
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
  }, [pathname, navItems, isHomepage]);

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
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative h-8 md:h-10" style={{ aspectRatio: '180/40' }}>
              <Image
                src="/logo.png"
                alt="SnowManager"
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
            {/* Sliding indicator */}
            <div
              className="absolute top-0 bottom-0 bg-primary rounded-lg transition-all duration-300 ease-out"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
              }}
            />

            {/* Nav items */}
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                ref={(el) => { itemRefs.current[index] = el; }}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(index, item.href);
                }}
                className={`relative z-10 flex items-center px-5 text-sm font-semibold transition-colors duration-300 ${
                  activeIndex === index ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <Button size="sm" withArrow onClick={openCalendly}>{t('demo')}</Button>
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
              {navItems.map((item, index) => (
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
              ))}
              <div className="flex items-center gap-4 pt-4 mt-2 border-t border-gray-100">
                <LanguageSwitcher />
              </div>
              <Button className="mt-2" withArrow onClick={openCalendly}>{t('demo')}</Button>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
