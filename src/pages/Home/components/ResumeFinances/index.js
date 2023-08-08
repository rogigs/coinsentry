import Card, { TYPES } from "../../../../components/Card";
import * as S from "./styles";

const ResumeFinances = ({ details, loading }) => {
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
