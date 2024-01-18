import { render, screen } from '@testing-library/react';

import Card, { TYPES } from '.';
import { TYPES_COLORS } from './utils';

describe('<Card />', () => {
  it('should render props texts correctly', () => {
    const props = { type: TYPES.ENTRADA, value: 20 };
    render(<Card {...props} />);

    expect(screen.getByText(props.type)).toBeInTheDocument();
    expect(screen.getByText(`R$ ${props.value}`)).toBeInTheDocument();
  });

  it.todo(
    'should render card of type TOTAL bigger than 0 with the correct colors',
  );

  it.todo(
    'should render card of type TOTAL less than 0 with the correct colors',
  );

  it.todo(
    'should render card of type TOTAL is equal 0 with the correct colors',
  );
});
