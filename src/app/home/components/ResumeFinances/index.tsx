import { isAxiosError } from 'axios';
import Card, { TYPES } from '../../../../components/Card';
import * as S from './styles';

import ErrorComponent from '../../../../components/Error';
import { historicFinancesDetails } from '@/services/coinSentry';

// TODO: type component
const ResumeFinances = ({ details, loading, setHistoricDetails }) => {
  if (isAxiosError(details)) {
    return (
      <S.WrapperError>
        <ErrorComponent
          onClick={historicFinancesDetails}
          setState={setHistoricDetails}
        />
      </S.WrapperError>
    );
  }

  if (loading) {
    return (
      <S.WrapperCard data-testid="loading-skeleton">
        <S.Skeleton variant="rectangular" />
        <S.Skeleton variant="rectangular" />
        <S.Skeleton variant="rectangular" />
      </S.WrapperCard>
    );
  }

  return (
    <S.WrapperCard>
      <Card type={TYPES.ENTRADA} value={details?.entrada_total} />
      <Card type={TYPES.SAIDA} value={details?.saida_total} />
      <Card type={TYPES.TOTAL} value={details?.total} />
    </S.WrapperCard>
  );
};

export default ResumeFinances;
