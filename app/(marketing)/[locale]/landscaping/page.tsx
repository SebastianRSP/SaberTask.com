import { getTranslations } from 'next-intl/server';
import LandscapingIndustry from '@/components/industries/LandscapingIndustry';
import CTA from '@/components/sections/CTA';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'industryPages.landscaping' });
  const title = t('meta.title');
  const description = t('meta.description');

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function LandscapingPage() {
  return (
    <>
      <LandscapingIndustry />
      <CTA />
    </>
  );
}
