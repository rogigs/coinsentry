'use client';

import ResumeFinances from './components/ResumeFinances';
import { DialogProvider } from '@/context/dialogContext';
import dynamic from 'next/dynamic';
import FormHome from './components/FormHome';
import { FinancesProvider } from './context/financesContext';
import TableHome from './components/TableHome';

const DialogHome = dynamic(() => import('./DialogHome'));

export default function Home() {
  return (
    <FinancesProvider>
      <DialogProvider>
        <DialogHome />

        <FormHome />
      </DialogProvider>

      <ResumeFinances />
      <TableHome />
    </FinancesProvider>
  );
}
