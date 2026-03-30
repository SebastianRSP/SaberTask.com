import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';
import { locales } from '@/i18n';

type Props = {
  params: { locale: string; slug: string };
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const slugs = getAllSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params: { locale, slug } }: Props) {
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function BlogPostPage({ params: { locale, slug } }: Props) {
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'blog' });

  const { content } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: false },
  });

  return (
    <>
      <section className="pt-32 pb-8 md:pt-40 md:pb-12 bg-gradient-to-b from-white to-background">
        <Container size="narrow">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-8 hover:underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToBlog')}
          </Link>

          <h1 className="font-heading text-3xl md:text-5xl font-bold text-dark mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-500 text-sm mb-8">
            <span>{post.author}</span>
            <span>&middot;</span>
            <time>
              {new Date(post.date).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </Container>
      </section>

      {post.image && (
        <Container size="narrow">
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-12">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </Container>
      )}

      <section className="pb-16 md:pb-24">
        <Container size="narrow">
          <article className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-dark prose-a:text-primary">
            {content}
          </article>
        </Container>
      </section>
    </>
  );
}
