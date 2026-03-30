import { getTranslations } from 'next-intl/server';
import Container from '@/components/ui/Container';
import BlogCard from '@/components/blog/BlogCard';
import { getAllPosts } from '@/lib/blog';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'blog' });

  const title = t('pageTitle');
  const description = t('metaDescription');

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function BlogPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = getAllPosts(locale);

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-white to-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-dark mb-6">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600">{t('subtitle')}</p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-background">
        <Container>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  locale={locale}
                  readMoreLabel={t('readMore')}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">{t('noPosts')}</p>
          )}
        </Container>
      </section>
    </>
  );
}
