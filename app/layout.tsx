import type { Metadata } from 'next';
import './globals.css';

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
