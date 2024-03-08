import CardMUI from '@mui/material/Card';
import CardContentMUI from '@mui/material/CardContent';
import styled from 'styled-components';

import media from '../../styledMedia';

type CardStyledBackgroundColor = {
  istotalcard: boolean;
  value: number;
};

export const CardStyled = styled(CardMUI)`
  ${media.lessThan('desktop')`
    width: 100%;
  `}
  color: var(--primary-color-dark-high);
  background-color: ${({ istotalcard, value }: CardStyledBackgroundColor) => {
    if (istotalcard) {
      if (value > 0) {
        return 'var(--success-color)';
      }

      return 'var(--error-color)';
    }

    return 'rgba(242, 133, 184, 0.3)';
  }};
  width: 300px;
  text-align: center;
  border-radius: 1em;

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
