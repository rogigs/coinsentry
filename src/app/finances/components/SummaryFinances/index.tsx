import { Suspense, useEffect } from 'react';

import CircularProgress from '@/components/Progress';
import { isAxiosError } from 'axios';
import dynamic from 'next/dynamic';
import { CardTypes } from '../../../../components/Card';
import { useFinances } from '../../hooks/useFinances';
import * as S from './styles';

const Alert = dynamic(() => import('../../../../components/Alert'));
const Card = dynamic(() => import('../../../../components/Card'));

const ResumeFinances = () => {
  const { state, fetchFinancesDetails } = useFinances();

  useEffect(() => {
    fetchFinancesDetails();
  }, []);

  if (isAxiosError(state.details)) {
    return (
      <Alert
        onClick={fetchFinancesDetails}
        className={{ marginBottom: 'var(--spacing-24)' }}
      />
    );
  }

  return (
    <Suspense fallback={<CircularProgress />}>
      <S.WrapperCard>
        <Card type={CardTypes.entrada} value={state.details?.input} />
        <Card type={CardTypes.saida} value={state.details?.output} />
        <Card type={CardTypes.total} value={state.details?.total} />
      </S.WrapperCard>
    </Suspense>
  );
};

export default ResumeFinances;
