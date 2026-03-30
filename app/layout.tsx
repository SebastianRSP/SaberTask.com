import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SnowManager - Smart Snow Management Made Simple',
  description: 'SnowManager is the all-in-one platform for snow removal companies. Plan routes, track crews in real-time, and automate invoicing.',
  openGraph: {
    type: 'website',
    siteName: 'SnowManager',
    title: 'SnowManager - Smart Snow Management Made Simple',
    description: 'SnowManager is the all-in-one platform for snow removal companies. Plan routes, track crews in real-time, and automate invoicing.',
    images: [{ url: '/logo.png' }],
  },
  twitter: {
    card: 'summary',
    title: 'SnowManager - Smart Snow Management Made Simple',
    description: 'SnowManager is the all-in-one platform for snow removal companies. Plan routes, track crews in real-time, and automate invoicing.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
