import { getTranslations } from 'next-intl/server';
import EmployeeManagementFeature from '@/components/features/EmployeeManagementFeature';
import CTA from '@/components/sections/CTA';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'featurePages.employeeManagement' });
  const title = t('meta.title');
  const description = t('meta.description');

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function EmployeeManagementPage() {
  return (
    <>
      <EmployeeManagementFeature />
      <CTA />
    </>
  );
}
