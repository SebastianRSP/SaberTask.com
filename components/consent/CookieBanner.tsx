'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CONSENT_OPEN_EVENT } from '@/lib/consent';
import { useConsent } from './ConsentProvider';

export default function CookieBanner() {
  const t = useTranslations('cookieConsent');
  const { ready, hasDecided, categories, setCategories, acceptAll, rejectAll } = useConsent();
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(categories.analytics);
  const [marketing, setMarketing] = useState(categories.marketing);

  useEffect(() => {
    setAnalytics(categories.analytics);
    setMarketing(categories.marketing);
  }, [categories.analytics, categories.marketing]);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setShowDetails(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, handler);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, handler);
  }, []);

  useEffect(() => {
    if (ready && !hasDecided) setOpen(true);
  }, [ready, hasDecided]);

  if (!ready || !open) return null;

  const close = () => {
    setOpen(false);
    setShowDetails(false);
  };

  const handleAcceptAll = () => {
    acceptAll();
    close();
  };

  const handleRejectAll = () => {
    rejectAll();
    close();
  };

  const handleSave = () => {
    setCategories({ analytics, marketing });
    close();
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t('title')}
      className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 overflow-hidden">
        <div className="p-5 sm:p-6">
          <h2 className="font-heading text-lg font-semibold text-dark">{t('title')}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('description')}{' '}
            <Link href="/privacy-policy" className="text-primary underline underline-offset-2">
              {t('privacyLink')}
            </Link>
            .
          </p>

          {showDetails && (
            <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
              <CategoryRow
                title={t('categories.necessary.title')}
                description={t('categories.necessary.description')}
                checked
                disabled
                onChange={() => {}}
              />
              <CategoryRow
                title={t('categories.analytics.title')}
                description={t('categories.analytics.description')}
                checked={analytics}
                onChange={setAnalytics}
              />
              <CategoryRow
                title={t('categories.marketing.title')}
                description={t('categories.marketing.description')}
                checked={marketing}
                onChange={setMarketing}
              />
            </div>
          )}

          <div className="mt-5 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2">
            {!showDetails && (
              <button
                type="button"
                onClick={() => setShowDetails(true)}
                className="text-sm font-medium text-gray-600 hover:text-dark transition-colors px-3 py-2"
              >
                {t('customize')}
              </button>
            )}
            {showDetails ? (
              <>
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="text-sm font-medium px-4 py-2 rounded-btn border border-gray-300 text-dark hover:bg-gray-50 transition-colors"
                >
                  {t('rejectAll')}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="text-sm font-medium px-4 py-2 rounded-btn bg-dark text-white hover:bg-black transition-colors"
                >
                  {t('savePreferences')}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="text-sm font-medium px-4 py-2 rounded-btn bg-primary text-white hover:bg-primary-600 transition-colors"
                >
                  {t('acceptAll')}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="text-sm font-medium px-4 py-2 rounded-btn border border-gray-300 text-dark hover:bg-gray-50 transition-colors"
                >
                  {t('rejectAll')}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="text-sm font-medium px-4 py-2 rounded-btn bg-primary text-white hover:bg-primary-600 transition-colors"
                >
                  {t('acceptAll')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start justify-between gap-4 cursor-pointer">
      <div className="flex-1">
        <p className="text-sm font-semibold text-dark">{title}</p>
        <p className="text-xs text-gray-600 mt-0.5">{description}</p>
      </div>
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center mt-0.5">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span
          className={`absolute inset-0 rounded-full transition-colors ${
            disabled
              ? 'bg-gray-300'
              : checked
              ? 'bg-primary'
              : 'bg-gray-300'
          }`}
        />
        <span
          className={`absolute h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </span>
    </label>
  );
}
