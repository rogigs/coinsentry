import { isAxiosError } from 'axios';
import Card, { CardTypes } from '../../../../components/Card';
import * as S from './styles';

import ErrorComponent from '../../../../components/Error';
import { historicFinancesDetails } from '@/services/coinSentry/finances';

type ResumeFinances = {
  details: any; // TODO: type component
  fetchDetails: () => Promise<void>;
};

const ResumeFinances = ({ details, fetchDetails }: ResumeFinances) => {
  if (isAxiosError(details)) {
    return (
      <S.WrapperError>
        <ErrorComponent
          onClick={historicFinancesDetails}
          setState={fetchDetails}
        />
      </S.WrapperError>
    );
  }

  return (
    <S.WrapperCard>
      <Card type={CardTypes.entrada} value={details?.entrada_total} />
      <Card type={CardTypes.saida} value={details?.saida_total} />
      <Card type={CardTypes.total} value={details?.total} />
    </S.WrapperCard>
  );
};

export default ResumeFinances;
