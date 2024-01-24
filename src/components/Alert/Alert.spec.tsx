import { render, screen } from '@testing-library/react';

import Alert from '.';

describe('<Alert />', () => {
  it('should render component correctly', () => {
    const component = () =>
      render(
        <Alert
          type="success"
          txtButton="Button message"
          onClick={jest.fn}
          message="New Message"
          title="New title"
          className={{ padding: '14px' }}
        />,
      );

    expect(component).not.toThrow();
  });

  it('should render component without button', () => {
    render(
      <Alert
        title="New title"
        message="New message"
        txtButton="Button message"
      />,
    );

    const elementTitle = screen.queryByText('New title');
    const elementMessage = screen.queryByText('New message');
    const elementButton = screen.queryByText('Button message');

    screen.debug();

    expect(elementTitle).toBeInTheDocument();
    expect(elementMessage).toBeInTheDocument();
    expect(elementButton).not.toBeInTheDocument();
  });

  it('should render component with button', () => {
    render(<Alert onClick={jest.fn} txtButton="Button message" />);

    const element = screen.queryByText('Button message');

    expect(element).toBeInTheDocument();
  });
});
