import { render } from '@testing-library/react';

import Login from '.';

describe('<Login />', () => {
  it('should render component correctly', () => {
    const component = () =>
      render(
        <Login>
          <p>Render a children</p>
        </Login>,
      );

    expect(component).not.toThrow();
  });
});
