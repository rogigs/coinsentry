import { render, screen } from '@testing-library/react';

import TextField from '.';

describe('<TextField />', () => {
  it('should render component with props correctly', () => {
    render(<TextField label="name" />);

    expect(screen.getByLabelText('name')).toBeInTheDocument();
  });
});
