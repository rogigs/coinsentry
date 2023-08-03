import TextField from ".";
import { screen, render } from "@testing-library/react";

describe("<Button />", () => {
  it("should render component with props correctly", () => {
    render(<TextField label="name" />);

    expect(screen.getByLabelText("name")).toBeInTheDocument();
  });
});
