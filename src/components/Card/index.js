import CardMUI from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import styled from 'styled-components';
import media from '../../styledMedia';
import { TYPES, TYPES_COLORS } from './utils';

const CardStyled = styled(CardMUI)`
  ${media.lessThan('desktop')`
    width: 100%;
  `}
  color: ${({ styledtotal }) => styledtotal.color};
  background-color: ${({ styledtotal }) => styledtotal.backgroundColor};

  width: 300px;
  text-align: center;
`;

const Card = ({ type, value = 0 }) => (
  <CardStyled
    data-testid="card"
    styledtotal={type === TYPES.TOTAL ? TYPES_COLORS(Number(value)) : ''}
  >
    <CardActionArea>
      <CardContent
        sx={{
          '.title': {
            marginBottom: '4px',
          },
          '&::first-letter': {
            textTransform: 'uppercase',
          },
        }}
      >
        <h1 className="title">{type}</h1>
        <h2>R$ {value.toFixed(2)}</h2>
      </CardContent>
    </CardActionArea>
  </CardStyled>
);

export { TYPES };

export default Card;
