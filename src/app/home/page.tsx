'use client';

import ResumeFinances from './components/ResumeFinances';
import { DialogProvider } from '@/context/dialogContext';
import FormHome from './components/FormHome';
import { FinancesProvider } from './context/financesContext';
import TableHome from './components/TableHome';
import BrandTheme from '@/assets/themes/brandTheme';
import { useEffect } from 'react';
import { protectPage } from '@/helpers/protectPage';
import { useRouter } from 'next/navigation';

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
        </DialogProvider>

        <ResumeFinances />
        <TableHome />
      </FinancesProvider>
    </BrandTheme>
  );
}
