'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CALENDLY_URL = 'https://calendly.com/sebastiansoepedersen/30min';

export default function Footer() {
  const t = useTranslations('footer');

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  return (
    <footer className="bg-dark text-white py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="SnowManager"
                width={180}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 text-sm">{t('description')}</p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">
              {t('product.title')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/#features`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('product.features')}
                </Link>
              </li>
              <li>
                <button
                  onClick={openCalendly}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('product.demo')}
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">
              {t('company.title')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/#about`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('company.about')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/blog`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('company.blog')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/#contact`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('company.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">
              {t('legal.title')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/privacy-policy`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('legal.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/terms`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('legal.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">{t('copyright')}</p>
        </div>
      </Container>
    </footer>
  );
}
