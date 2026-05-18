import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import ConsentProvider from '@/components/consent/ConsentProvider';
import GatedAnalytics from '@/components/consent/GatedAnalytics';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'SaberTask - All-in-One Field Service Management Platform',
  description: 'SaberTask is the all-in-one platform for field service management companies. Plan routes, track crews in real-time, and automate invoicing.',
  openGraph: {
    type: 'website',
    siteName: 'SaberTask',
    title: 'SaberTask - All-in-One Field Service Management Platform',
    description: 'SaberTask is the all-in-one platform for field service management companies. Plan routes, track crews in real-time, and automate invoicing.',
    images: [{ url: '/logo.png' }],
  },
  twitter: {
    card: 'summary',
    title: 'SaberTask - All-in-One Field Service Management Platform',
    description: 'SaberTask is the all-in-one platform for field service management companies. Plan routes, track crews in real-time, and automate invoicing.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased">
        <ConsentProvider>
          {children}
          <GatedAnalytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
