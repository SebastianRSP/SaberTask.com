'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

const domainMap: Record<string, { label: string; domain: string }> = {
  en: { label: 'English', domain: 'sabertask.com' },
  da: { label: 'Dansk', domain: 'sabertask.dk' },
  se: { label: 'Svenska', domain: 'sabertask.se' },
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (newLocale: string) => {
    const { domain } = domainMap[newLocale];
    window.location.href = `https://${domain}${pathname}`;
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
        style={{ backgroundColor: 'rgba(241, 245, 249, 0.8)', borderRadius: '12px', minHeight: '44px' }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
        <span>{domainMap[locale]?.label ?? 'English'}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50"
          role="listbox"
        >
          {Object.entries(domainMap).map(([loc, { label }]) => (
            <button
              key={loc}
              onClick={() => handleChange(loc)}
              className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                locale === loc
                  ? 'bg-primary-50 text-primary font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              role="option"
              aria-selected={locale === loc}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
