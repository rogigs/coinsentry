import { Suspense, useEffect } from 'react';

import CircularProgress from '@/components/Progress';
import { isAxiosError } from 'axios';
import dynamic from 'next/dynamic';
import Card, { CardTypes } from '../../../../components/Card';
import { useFinances } from '../../hooks/useFinances';
import * as S from './styles';

const Alert = dynamic(() => import('../../../../components/Alert'));

type ResumeFinances = {
  details: any; // TODO: type component
  fetchDetails: () => Promise<void>;
};

const ResumeFinances = () => {
  const { state, fetchFinancesDetails } = useFinances();

  useEffect(() => {
    fetchFinancesDetails();
  }, []);

  if (isAxiosError(state.details)) {
    return <Alert onClick={fetchFinancesDetails} />;
  }

  return (
    <Suspense fallback={<CircularProgress />}>
      <S.WrapperCard>
        <Card type={CardTypes.entrada} value={state.details?.entrada_total} />
        <Card type={CardTypes.saida} value={state.details?.saida_total} />
        <Card type={CardTypes.total} value={state.details?.total} />
      </S.WrapperCard>
    </Suspense>
  );
};

export default ResumeFinances;
