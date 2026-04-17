import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/:locale(en|da|se)/privacy',
        destination: '/:locale/privacy-policy',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
