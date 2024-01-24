import { IconsType } from '@/types';
import { fireEvent, render, screen } from '@testing-library/react';
import Dialog from '.';

jest.mock('../../hooks/useDialog', () => ({
  useDialog: () => ({
    showDialog: true,
    setShowDialog: jest.fn(),
  }),
}));

describe('<Dialog />', () => {
  describe('<Dialog.Dialog />', () => {
    it('should render component correctly', () => {
      const component = () =>
        render(
          <Dialog.Dialog>
            <p>Render a children</p>
          </Dialog.Dialog>,
        );

      expect(component).not.toThrow();
    });
  });

  describe('<Dialog.DialogTitle />', () => {
    it('should render component without icon', () => {
      render(<Dialog.DialogTitle title="New title" />);

      const elementTitle = screen.getByText('New title');
      const elementIcon = screen.queryByTestId(
        'CheckCircleOutlineOutlinedIcon',
      );

      expect(elementTitle).toBeInTheDocument();
      expect(elementIcon).not.toBeInTheDocument();
    });

    it('should render component with icon', () => {
      render(<Dialog.DialogTitle title="New title" icon={IconsType.success} />);

      const elementIcon = screen.getByTestId('CheckCircleOutlineOutlinedIcon');

      expect(elementIcon).toBeInTheDocument();
    });
  });

  describe('<Dialog.DialogContent />', () => {
    it('should render component correctly', () => {
      const component = () =>
        render(
          <Dialog.DialogContent>
            <p>Render a children</p>
          </Dialog.DialogContent>,
        );

      expect(component).not.toThrow();
    });
  });

  describe('<Dialog.DialogActions />', () => {
    it('should render component without secondary button', () => {
      const mockPrimaryButton = jest.fn();

      render(
        <Dialog.DialogActions
          primaryActionButton={mockPrimaryButton}
          primaryTxtButton="Primary button"
        />,
      );

      const elementPrimaryButton = screen.getByText('Primary button');
      const elementSecondaryButton = screen.queryByText('Secondary button');

      fireEvent.click(elementPrimaryButton);

      expect(elementPrimaryButton).toBeInTheDocument();
      expect(elementSecondaryButton).not.toBeInTheDocument();
      expect(mockPrimaryButton).toHaveBeenCalled();
    });

    it('should render component with secondary button', () => {
      const mockPrimaryButton = jest.fn();
      const mockSecondaryButton = jest.fn();

      render(
        <Dialog.DialogActions
          primaryTxtButton="Primary button"
          secondaryTxtButton="Secondary button"
          primaryActionButton={mockPrimaryButton}
          secondaryActionButton={mockSecondaryButton}
        />,
      );

      const elementPrimaryButton = screen.getByText('Primary button');
      const elementSecondaryButton = screen.getByText('Secondary button');

      fireEvent.click(elementPrimaryButton);
      fireEvent.click(elementSecondaryButton);

      expect(elementPrimaryButton).toBeInTheDocument();
      expect(elementSecondaryButton).toBeInTheDocument();
      expect(mockPrimaryButton).toHaveBeenCalled();
      expect(mockSecondaryButton).toHaveBeenCalled();
    });
  });
});
