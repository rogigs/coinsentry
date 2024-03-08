import { fireEvent, render, screen } from '@testing-library/react';

import { IconsType } from '@/types';
import Alert from '.';

describe('<Alert />', () => {
  it('should render component correctly', () => {
    const component = () =>
      render(
        <Alert
          type={IconsType.success}
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
    render(<Alert title="New title" message="New message" />);

    const elementTitle = screen.queryByText('New title');
    const elementMessage = screen.queryByText('New message');
    const elementButton = screen.queryByText('Button message');

    expect(elementTitle).toBeInTheDocument();
    expect(elementMessage).toBeInTheDocument();
    expect(elementButton).not.toBeInTheDocument();
  });

  it('should render component with button and call props onClick', () => {
    const mock = jest.fn();

    render(<Alert onClick={mock} txtButton="Button message" />);

    const element = screen.getByText('Button message');

    fireEvent.click(element);

    expect(element).toBeInTheDocument();
    expect(mock).toHaveBeenCalled();
  });

  it.todo('Should render loading button');
});
