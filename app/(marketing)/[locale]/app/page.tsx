import { getTranslations } from 'next-intl/server';
import MobileAppFeature from '@/components/features/MobileAppFeature';
import CTA from '@/components/sections/CTA';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'featurePages.mobileApp' });
  const title = t('meta.title');
  const description = t('meta.description');

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function MobileAppPage() {
  return (
    <>
      <MobileAppFeature />
      <CTA />
    </>
  );
}
