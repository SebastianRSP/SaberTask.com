import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import { BlogPostMeta } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPostMeta;
  locale: string;
  readMoreLabel: string;
}

export default function BlogCard({ post, locale, readMoreLabel }: BlogCardProps) {
  return (
    <Card variant="bordered" className="overflow-hidden p-0 flex flex-col">
      {post.image && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      )}
      <div className="p-6 flex flex-col flex-1">
        <time className="text-sm text-gray-500 mb-2">
          {new Date(post.date).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <h3 className="font-heading text-xl font-semibold text-dark mb-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-4 flex-1">{post.description}</p>
        <Link
          href={`/blog/${post.slug}`}
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
