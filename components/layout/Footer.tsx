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
                alt="SaberTask"
                width={420}
                height={100}
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
              <li>
                <a
                  href="https://apps.apple.com/en/app/sabertask-employee-app/id6761916809"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('product.iPhoneApp')}
                </a>
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
                  href={`/#contact`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('company.contact')}
                </Link>
              </li>
              <li>
                <a
                  href="mailto:sebastian@sabertask.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  sebastian@sabertask.com
                </a>
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

        {/* Company info + Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-xs leading-relaxed text-center md:text-left">
            <p className="font-semibold text-gray-400">SaberTask LDA</p>
            <p>NIF: 518467546 · Rua das Violetas, N.º 145, 2750-275 Cascais, Lisboa</p>
          </div>
          <p className="text-gray-400 text-sm">{t('copyright')}</p>
        </div>
      </Container>
    </footer>
  );
}
