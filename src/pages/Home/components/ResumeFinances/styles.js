import styled from "styled-components";
import SkeletonMUI from "@mui/material/Skeleton";
import media from "../../../../styledMedia";

export const WrapperCard = styled.article`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 24px;
  margin-bottom: 24px;
`;

export const Skeleton = styled(SkeletonMUI)`
  ${media.lessThan("desktop")`
    width: 100% !important;
  `}

  width: 300px !important;
  height: 80px !important;
`;
