import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SnowManager — Platform Presentation',
  description: 'Discover how SnowManager streamlines your winter operations with live dashboards, route building, subcontractor management, and more.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'SnowManager — Platform Presentation',
    description: 'Discover how SnowManager streamlines your winter operations with live dashboards, route building, subcontractor management, and more.',
  },
};

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-hidden bg-white text-dark max-w-[100vw]">
      {children}
    </div>
  );
}
