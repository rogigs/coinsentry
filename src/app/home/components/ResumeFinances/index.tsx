import { isAxiosError } from 'axios';
import { useEffect } from 'react';

import Card, { CardTypes } from '../../../../components/Card';
import ErrorComponent from '../../../../components/Error';
import { useFinances } from '../../hooks/useFinances';
import * as S from './styles';

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
    return (
      <S.WrapperError>
        {/* TODO: review this component */}
        <ErrorComponent
          onClick={fetchFinancesDetails}
          setState={fetchFinancesDetails}
        />
      </S.WrapperError>
    );
  }

  return (
    <S.WrapperCard>
      <Card type={CardTypes.entrada} value={state.details?.entrada_total} />
      <Card type={CardTypes.saida} value={state.details?.saida_total} />
      <Card type={CardTypes.total} value={state.details?.total} />
    </S.WrapperCard>
  );
};

export default ResumeFinances;
