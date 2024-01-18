import SkeletonMUI from '@mui/material/Skeleton';
import styled from 'styled-components';

import media from '../../../../styledMedia';

export const WrapperCard = styled.section`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: var(--spacing-24);
  margin: var(--spacing-24) 0;
`;

export const WrapperError = styled.section`
  margin: var(--spacing-24) 0;
`;

export const Skeleton = styled(SkeletonMUI)`
  ${media.lessThan('desktop')`
    width: 100% !important;
  `}

  width: 300px !important;
  height: 80px !important;
`;
