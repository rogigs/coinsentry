import { useEffect, useState } from "react";
import Card, { TYPES } from "../../../../components/Card";
import { historicFinancesDetails } from "../../../../api/routes/finances";
import * as S from "./styles";

const ResumeFinances = () => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoricFinancesDetails = async () => {
      const response = await historicFinancesDetails();
      setDetails(response);
    };

    fetchHistoricFinancesDetails();

    setLoading(false);
  }, []);

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
      <Card type={TYPES.ENTRADA} value={details?.total_entrada} />
      <Card type={TYPES.SAIDA} value={details?.total_saida} />
      <Card type={TYPES.TOTAL} value={details?.total} />
    </S.WrapperCard>
  );
};

export default ResumeFinances;
