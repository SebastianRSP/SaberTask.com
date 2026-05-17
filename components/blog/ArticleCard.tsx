import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import type { Article } from 'outrank-next-js-blog';

interface ArticleCardProps {
  article: Article;
  locale: string;
  readMoreLabel: string;
}

export default function ArticleCard({ article, locale, readMoreLabel }: ArticleCardProps) {
  return (
    <Card variant="bordered" className="overflow-hidden p-0 flex flex-col">
      {article.image_url && (
        <Link href={`/articles/${article.slug}`}>
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      )}
      <div className="p-6 flex flex-col flex-1">
        <time className="text-sm text-gray-500 mb-2">
          {new Date(article.created_at).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <h3 className="font-heading text-xl font-semibold text-dark mb-2">
          <Link href={`/articles/${article.slug}`} className="hover:text-primary transition-colors">
            {article.title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-4 flex-1">{article.meta_description}</p>
        {article.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/articles/tag/${encodeURIComponent(tag)}`}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        <Link
          href={`/articles/${article.slug}`}
          className="text-primary font-semibold text-sm hover:underline inline-flex items-center gap-1"
        >
          {readMoreLabel}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </Card>
  );
}
