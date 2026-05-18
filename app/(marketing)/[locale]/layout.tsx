import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OnboardingProvider from '@/components/onboarding/OnboardingProvider';
import GatedMarketingScripts from '@/components/consent/GatedMarketingScripts';
import CookieBanner from '@/components/consent/CookieBanner';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <OnboardingProvider>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </OnboardingProvider>
      <GatedMarketingScripts />
      <CookieBanner />
    </NextIntlClientProvider>
  );
}
