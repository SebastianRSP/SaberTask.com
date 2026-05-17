import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import fs from 'fs';
import path from 'path';
import { getAllPosts } from '@/lib/blog';
import { getOutrankClient } from '@/lib/outrank';

export const revalidate = 3600;

const LOCALE_BY_HOST: Record<string, 'en' | 'da' | 'se'> = {
  'www.sabertask.com': 'en',
  'sabertask.com': 'en',
  'www.sabertask.dk': 'da',
  'sabertask.dk': 'da',
  'www.sabertask.se': 'se',
  'sabertask.se': 'se',
};

function collectStaticRoutes(): string[] {
  const root = path.join(process.cwd(), 'app/(marketing)/[locale]');
  const routes: string[] = [];

  function walk(dir: string, segments: string[]) {
    if (fs.existsSync(path.join(dir, 'page.tsx'))) {
      routes.push('/' + segments.join('/'));
    }
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith('[') || entry.name.startsWith('(')) continue;
      walk(path.join(dir, entry.name), [...segments, entry.name]);
    }
  }

  walk(root, []);
  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = headers().get('host') || 'www.sabertask.com';
  const locale = LOCALE_BY_HOST[host] ?? 'en';
  const baseUrl = `https://${host}`;
  const now = new Date();

  const staticRoutes = collectStaticRoutes().filter(
    (route) => locale === 'en' || !route.startsWith('/articles'),
  );

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route === '/' ? '' : route}`,
    lastModified: now,
  }));

  for (const post of getAllPosts(locale)) {
    entries.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : now,
    });
  }

  if (locale === 'en') {
    try {
      const articles = await getOutrankClient().getAllArticles();
      for (const article of articles) {
        entries.push({
          url: `${baseUrl}/articles/${article.slug}`,
          lastModified: new Date(article.updated_at || article.created_at),
        });
      }
    } catch (err) {
      console.error('[sitemap] Outrank fetch failed:', err);
    }
  }

  return entries;
}
