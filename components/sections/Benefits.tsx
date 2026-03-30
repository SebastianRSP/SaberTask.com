import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';

export default function Benefits() {
  const t = useTranslations('benefits');

  const benefits = [
    {
      key: 'efficiency',
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      key: 'satisfaction',
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      key: 'growth',
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {benefits.map((benefit) => (
            <div key={benefit.key} className="text-center">
              <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                {benefit.icon}
              </div>
              <h3 className="font-heading text-2xl font-semibold text-dark mb-3">
                {t(`${benefit.key}.title`)}
              </h3>
              <p className="text-gray-600">{t(`${benefit.key}.description`)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
