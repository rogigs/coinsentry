import styled from 'styled-components';
import media from '../../styledMedia';
import CardMUI from '@mui/material/Card';
import CardContentMUI from '@mui/material/CardContent';

export const CardStyled = styled(CardMUI)`
  ${media.lessThan('desktop')`
    width: 100%;
  `}
  color: ${({ colorsToTotalCard }) => colorsToTotalCard?.color};
  background-color: ${({ colorsToTotalCard }) =>
    colorsToTotalCard?.backgroundColor};

  width: 300px;
  text-align: center;

  button {
    cursor: default;
  }
`;

export const CardContent = styled(CardContentMUI)`
  > * {
    .title {
      margin-bottom: var(--spacing-4);
    }
    &::first-letter {
      text-transform: uppercase;
    }
  }
`;
