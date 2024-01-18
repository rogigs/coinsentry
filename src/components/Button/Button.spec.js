import { render, screen } from '@testing-library/react';

import Button from '.';

describe('<Button />', () => {
  it('should render component with props correctly', () => {
    render(
      <Button variant="text" label="teste">
        <div data-testid="test" />
      </Button>,
    );

    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});
