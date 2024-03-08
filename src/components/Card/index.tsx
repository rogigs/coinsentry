import { CardActionArea } from '@mui/material';

import { CardContent, CardStyled } from './styles';

enum CardTypes {
  total = 'total',
  saida = 'saída',
  entrada = 'entrada',
}

type Card = {
  type: CardTypes;
  value?: number;
};

const Card = ({ type, value = 0 }: Card) => (
  <CardStyled
    data-testid="card"
    istotalcard={type === CardTypes.total}
    value={Number(value)}
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
