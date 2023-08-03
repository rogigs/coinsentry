import styled from "styled-components";
import media from "../../styledMedia";

export const Wrappper = styled.section`
  padding: 24px 0;

  ${media.lessThan("tablet")`
  padding: 24px;
`}
`;
export const WrappperForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const WrappperCard = styled.article`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 24px;
  margin-bottom: 24px;
  margin-bottom: 24px;
`;
