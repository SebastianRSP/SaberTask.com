import { getTranslations } from 'next-intl/server';
import FAQ from '@/components/sections/FAQ';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'faq' });
  const title = t('metaTitle');
  const description = t('metaDescription');

  return {
    title,
    description,
    openGraph: { title, description },
  };
}
import CTA from '@/components/sections/CTA';

export default function FAQPage() {
  return (
    <>
      <div className="pt-24">
        <FAQ />
      </div>
      <CTA />
    </>
  );
}
