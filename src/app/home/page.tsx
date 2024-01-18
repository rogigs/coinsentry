'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import BrandTheme from '@/assets/themes/brandTheme';
import { DialogProvider } from '@/context/dialogContext';
import { protectPage } from '@/helpers/protectPage';

import FormHome from './components/FormHome';
import ResumeFinances from './components/ResumeFinances';
import TableHome from './components/TableHome';
import { FinancesProvider } from './context/financesContext';

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    protectPage(push);
  }, []);

  return (
    <BrandTheme>
      <FinancesProvider>
        <DialogProvider>
          <FormHome />
          <ResumeFinances />
          <TableHome />
        </DialogProvider>
      </FinancesProvider>
    </BrandTheme>
  );
}
