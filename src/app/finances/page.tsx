'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import BrandTheme from '@/assets/themes/brandTheme';
import { DialogProvider } from '@/context/dialogContext';
import { protectPage } from '@/helpers/protectPage';

import FormFinances from './components/FormFinances';
import ResumeFinances from './components/SummaryFinances';
import TableFinances from './components/TableFinances';
import { FinancesProvider } from './context/financesContext';

export default function Finances() {
  const { push } = useRouter();

  useEffect(() => {
    protectPage(push);
  }, []);

  return (
    <BrandTheme>
      <FinancesProvider>
        <DialogProvider>
          <FormFinances />
        </DialogProvider>

        <ResumeFinances />
        <DialogProvider>
          <TableFinances />
        </DialogProvider>
      </FinancesProvider>
    </BrandTheme>
  );
}
