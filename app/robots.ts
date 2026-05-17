import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default function robots(): MetadataRoute.Robots {
  const host = headers().get('host') || 'www.sabertask.com';
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `https://${host}/sitemap.xml`,
    host: `https://${host}`,
  };
}
