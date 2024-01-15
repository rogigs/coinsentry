import { CardActionArea } from '@mui/material';

import { CardTypes, typeColors } from './utils';
import { CardStyled, CardContent } from './styles';

// TODO: Add correct types, it's necessary change in styles as welll

type Card = {
  type: CardTypes;
  value?: number;
};
const Card = ({ type, value = 0 }: Card) => (
  <CardStyled
    data-testid="card"
    colorsToTotalCard={
      type === CardTypes.total ? typeColors(Number(value)) : undefined
    }
  >
    <CardActionArea>
      <CardContent>
        <h1 className="title">{type}</h1>
        <h2>R$ {value.toFixed(2)}</h2>
      </CardContent>
    </CardActionArea>
  </CardStyled>
);

export { CardTypes };

export default Card;
