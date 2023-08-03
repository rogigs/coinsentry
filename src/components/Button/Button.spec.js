import Button from ".";
import { screen, render } from "@testing-library/react";

describe("<Button />", () => {
  it("should render component with props correctly", () => {
    render(
      <Button variant="text" label="teste">
        <div data-testid="test" />
      </Button>
    );

    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
