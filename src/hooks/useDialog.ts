import { useContext } from 'react';

import { DialogContext } from '@/context/dialogContext';

export const useDialog = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('useDialog must be used within an DialogProvider');
  }

  return context;
};
