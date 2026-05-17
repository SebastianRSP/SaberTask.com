import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import ArticleCard from '@/components/blog/ArticleCard';
import { getOutrankClient, ARTICLES_PER_PAGE } from '@/lib/outrank';

export const revalidate = 86400;

type Props = {
  params: { locale: string; slug: string };
  searchParams: { page?: string };
};

export async function generateMetadata({ params: { locale, slug } }: Props) {
  const t = await getTranslations({ locale, namespace: 'articles' });
  const tag = decodeURIComponent(slug);
  const title = t('tagMetaTitle', { tag });
  const description = t('tagMetaDescription', { tag });
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function TagPage({ params: { locale, slug }, searchParams }: Props) {
  if (locale !== 'en') notFound();

  const t = await getTranslations({ locale, namespace: 'articles' });
  const tag = decodeURIComponent(slug);
  const page = Math.max(1, Number(searchParams.page) || 1);

  const { articles, total_pages } = await getOutrankClient().getTagArticles(
    tag,
    page,
    ARTICLES_PER_PAGE,
  );

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-white to-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-6 hover:underline"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('backToArticles')}
            </Link>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-dark mb-6">
              {t('tagTitle', { tag })}
            </h1>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-background">
        <Container>
          {articles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    locale={locale}
                    readMoreLabel={t('readMore')}
                  />
                ))}
              </div>

              {total_pages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  {page > 1 && (
                    <Link
                      href={`/articles/tag/${encodeURIComponent(tag)}${page - 1 > 1 ? `?page=${page - 1}` : ''}`}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm font-semibold"
                    >
                      {t('previous')}
                    </Link>
                  )}
                  <span className="text-sm text-gray-600 px-4">
                    {t('pageOf', { page, total: total_pages })}
                  </span>
                  {page < total_pages && (
                    <Link
                      href={`/articles/tag/${encodeURIComponent(tag)}?page=${page + 1}`}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm font-semibold"
                    >
                      {t('next')}
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500 text-lg">{t('noArticles')}</p>
          )}
        </Container>
      </section>
    </>
  );
}
