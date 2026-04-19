import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'privacyPolicy' });
  const title = t('metaTitle');
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
    'location',
    'dataUsage',
    'dataSharing',
    'cookies',
    'security',
    'rights',
    'dataDeletion',
    'contact',
  ] as const;

  const emailLink = (chunks: React.ReactNode) => (
    <a href="mailto:contact@sabertask.com" className="text-primary hover:underline">
      {chunks}
    </a>
  );

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

            {sections.map((section) => {
              if (section === 'dataDeletion') {
                return (
                  <div key={section} id="data-deletion" className="mb-8 scroll-mt-32 rounded-lg border border-gray-200 bg-gray-50 p-6">
                    <h2 className="font-heading text-2xl font-bold text-dark mb-4">
                      {t('dataDeletion.title')}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {t('dataDeletion.appInfo')}
                    </p>
                    <h3 className="font-heading text-lg font-semibold text-dark mb-2">
                      {t('dataDeletion.stepsTitle')}
                    </h3>
                    <ol className="list-decimal list-outside ml-5 space-y-2 text-gray-600 leading-relaxed mb-4">
                      <li>{t('dataDeletion.step1')}</li>
                      <li>{t.rich('dataDeletion.step2', { email: emailLink })}</li>
                    </ol>
                    <h3 className="font-heading text-lg font-semibold text-dark mb-2">
                      {t('dataDeletion.deletedTitle')}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {t('dataDeletion.deletedContent')}
                    </p>
                    <h3 className="font-heading text-lg font-semibold text-dark mb-2">
                      {t('dataDeletion.retainedTitle')}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('dataDeletion.retainedContent')}
                    </p>
                  </div>
                );
              }

              return (
                <div key={section} className="mb-8">
                  <h2 className="font-heading text-2xl font-bold text-dark mb-4">
                    {t(`${section}.title`)}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {section === 'contact'
                      ? t.rich(`${section}.content`, { email: emailLink })
                      : t(`${section}.content`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
