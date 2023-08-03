import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { historicFinancesDetails } from "../../../../api/routes/finances";
import ResumeFinances from ".";

jest.mock("../../../../api/routes/finances");

describe("<ResumeFinances />", () => {
  test("should renders loading skeleton when data is loading", async () => {
    historicFinancesDetails.mockResolvedValueOnce({});
    render(<ResumeFinances />);

    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId("loading-skeleton")).not.toBeInTheDocument()
    );
  });

  test("should render card components with correct values when data is loaded", async () => {
    const mockedFinanceDetails = {
      total_entrada: 100,
      total_saida: 50,
      total: 50,
    };
    historicFinancesDetails.mockResolvedValueOnce(mockedFinanceDetails);
    render(<ResumeFinances />);

    expect(
      screen.getByText(`R$ ${mockedFinanceDetails.total_entrada}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`R$ ${mockedFinanceDetails.total_saida}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`R$ ${mockedFinanceDetails.total}`)
    ).toBeInTheDocument();
  });
});
