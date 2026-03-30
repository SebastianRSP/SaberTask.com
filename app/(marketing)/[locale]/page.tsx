import { getTranslations } from 'next-intl/server';
import Hero from '@/components/sections/Hero';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'hero' });
  const title = 'SnowManager - ' + t('titleStart') + ' ' + t('titleHighlight1');
  const description = t('metaDescription');

  return {
    title,
    description,
    openGraph: { title, description },
  };
}
import Features from '@/components/sections/Features';
import MobileApp from '@/components/sections/MobileApp';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import CTA from '@/components/sections/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <MobileApp />
      <Testimonials />
      <FAQ />
      <Contact />
      <CTA />
    </>
  );
}
