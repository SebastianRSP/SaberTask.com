import { getTranslations } from 'next-intl/server';
import WinterServicesIndustry from '@/components/industries/WinterServicesIndustry';
import CTA from '@/components/sections/CTA';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'industryPages.winterServices' });
  const title = t('meta.title');
  const description = t('meta.description');

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function WinterServicesPage() {
  return (
    <>
      <WinterServicesIndustry />
      <CTA />
    </>
  );
}
