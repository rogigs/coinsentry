import { useContext } from 'react';

import { FinancesContext } from '../context/financesContext';

export const useFinances = () => {
  const context = useContext(FinancesContext);

  if (!context) {
    throw new Error('useFinances must be used within an FinancesProvider');
  }

  return context;
};
