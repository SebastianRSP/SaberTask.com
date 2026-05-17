import { BlogClient } from 'outrank-next-js-blog';

let cachedClient: BlogClient | null = null;

export function getOutrankClient(): BlogClient {
  if (cachedClient) return cachedClient;

  const apiKey = process.env.OUTRANK_BLOG_API_KEY;
  if (!apiKey) {
    throw new Error('OUTRANK_BLOG_API_KEY is not set');
  }

  cachedClient = new BlogClient(apiKey);
  return cachedClient;
}

export const ARTICLES_PER_PAGE = 12;

function slugifyHeading(text: string): string {
  return text
    .replace(/<[^>]+>/g, '')
    .toLowerCase()
    .replace(/['‘’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function addHeadingIds(html: string): string {
  return html.replace(
    /<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/g,
    (match, level, attrs, inner) => {
      if (/\bid\s*=/.test(attrs)) return match;
      const id = slugifyHeading(inner);
      if (!id) return match;
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    },
  );
}
