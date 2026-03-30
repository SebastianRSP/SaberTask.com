import { getTranslations } from 'next-intl/server';
import Pricing from '@/components/sections/Pricing';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'pricing' });
  const title = t('title') + ' - SnowManager';
  const description = t('metaDescription');

  return {
    title,
    description,
    openGraph: { title, description },
  };
}
import CTA from '@/components/sections/CTA';
import FAQ from '@/components/sections/FAQ';

export default function PricingPage() {
  return (
    <>
      <div className="pt-24">
        <Pricing />
      </div>
      <FAQ />
      <CTA />
    </>
  );
}
