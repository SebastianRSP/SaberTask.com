import { getTranslations } from 'next-intl/server';
import WindowCleaningIndustry from '@/components/industries/WindowCleaningIndustry';
import CTA from '@/components/sections/CTA';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'industryPages.windowCleaning' });
  const title = t('meta.title');
  const description = t('meta.description');

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function WindowCleaningPage() {
  return (
    <>
      <WindowCleaningIndustry />
      <CTA />
    </>
  );
}
