import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'privacyPolicy' });
  const title = t('title') + ' - SnowManager';
  const description = t('metaDescription');

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function PrivacyPolicyPage() {
  const t = useTranslations('privacyPolicy');

  const sections = [
    'dataCollection',
    'dataUsage',
    'dataSharing',
    'cookies',
    'security',
    'rights',
    'contact',
  ] as const;

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white">
      <Container size="narrow">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-dark mb-6">
            {t('title')}
          </h1>
          <p className="text-gray-600 mb-8">{t('lastUpdated')}</p>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {t('intro')}
            </p>

            {sections.map((section) => (
              <div key={section} className="mb-8">
                <h2 className="font-heading text-2xl font-bold text-dark mb-4">
                  {t(`${section}.title`)}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {section === 'contact'
                    ? t.rich(`${section}.content`, {
                        email: (chunks) => (
                          <a href="mailto:sebastian@snowmanager.com" className="text-primary hover:underline">
                            {chunks}
                          </a>
                        ),
                      })
                    : t(`${section}.content`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
