import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'terms' });
  const title = t('title') + ' - SnowManager';
  const description = t('metaDescription');

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function TermsPage() {
  const t = useTranslations('terms');

  const sections = [
    'service',
    'acceptance',
    'thirdParties',
    'customerResponsibilities',
    'pricing',
    'dataAndSecurity',
    'changes',
    'intellectualProperty',
    'liability',
    'operations',
    'termination',
    'disputes',
  ] as const;

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white">
      <Container size="narrow">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-dark mb-6">
            {t('title')}
          </h1>
          <p className="text-gray-600 mb-4">{t('lastUpdated')}</p>
          <p className="text-gray-600 mb-8">{t('intro')}</p>

          <div className="prose prose-lg max-w-none">
            {sections.map((section, index) => (
              <div key={section} className="mb-8">
                <h2 className="font-heading text-2xl font-bold text-dark mb-4">
                  {index + 1}. {t(`${section}.title`)}
                </h2>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {t(`${section}.content`)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">{t('companyInfo')}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
