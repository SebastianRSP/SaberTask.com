import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { getOutrankClient, addHeadingIds } from '@/lib/outrank';

export const revalidate = 86400;

type Props = {
  params: { locale: string; slug: string };
};

export async function generateMetadata({ params: { slug } }: Props) {
  const article = await getOutrankClient().getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.meta_description,
    openGraph: {
      title: article.title,
      description: article.meta_description,
      type: 'article',
      images: article.image_url ? [{ url: article.image_url }] : [],
    },
  };
}

export default async function ArticlePage({ params: { locale, slug } }: Props) {
  if (locale !== 'en') notFound();

  const article = await getOutrankClient().getArticle(slug);
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: 'articles' });

  return (
    <>
      <section className="pt-32 pb-8 md:pt-40 md:pb-12 bg-gradient-to-b from-white to-background">
        <Container size="narrow">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-8 hover:underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToArticles')}
          </Link>

          <h1 className="font-heading text-3xl md:text-5xl font-bold text-dark mb-4">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-500 text-sm mb-8">
            <time>
              {new Date(article.created_at).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {article.reading_time_minutes > 0 && (
              <>
                <span>&middot;</span>
                <span>{t('readingTime', { minutes: article.reading_time_minutes })}</span>
              </>
            )}
          </div>
        </Container>
      </section>

      {article.image_url && (
        <Container size="narrow">
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-12">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </Container>
      )}

      <section className="pb-16 md:pb-24">
        <Container size="narrow">
          <article
            className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-dark prose-headings:scroll-mt-24 prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: addHeadingIds(article.html) }}
          />

          {article.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/articles/tag/${encodeURIComponent(tag)}`}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
