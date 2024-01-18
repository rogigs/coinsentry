'use client';

import ResumeFinances from './components/ResumeFinances';
import { DialogProvider } from '@/context/dialogContext';
import dynamic from 'next/dynamic';
import FormHome from './components/FormHome';
import { FinancesProvider } from './context/financesContext';
import TableHome from './components/TableHome';
import BrandTheme from '@/assets/themes/brandTheme';
import { useEffect } from 'react';
import { protectPage } from '@/helpers/protectPage';
import { useRouter } from 'next/navigation';

const DialogHome = dynamic(() => import('./DialogHome'));

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    protectPage(push);
  }, []);

  return (
    <BrandTheme>
      <FinancesProvider>
        <DialogProvider>
          <DialogHome />

          <FormHome />
        </DialogProvider>

        <ResumeFinances />
        <TableHome />
      </FinancesProvider>
    </BrandTheme>
  );
}
