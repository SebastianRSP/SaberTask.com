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
