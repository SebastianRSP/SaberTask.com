import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WinterManager — Investormulighed',
  description: 'WinterManager digitaliserer glatførebekæmpelse i Danmark. Se vores investorpræsentation.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'WinterManager — Investormulighed',
    description: 'WinterManager digitaliserer glatførebekæmpelse i Danmark. Se vores investorpræsentation.',
  },
};

export default function InvestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white text-dark">
      {children}
    </div>
  );
}
