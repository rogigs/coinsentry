export const mockGetFinances = {
  status: 200,
  length: 1,
  data: [
    {
      id: '347f9bba-ee73-4160-8a55-1ec881092a1d',
      title: 'Camiseta',
      operation: 'saida',
      category: 'moda',
      value_item: 100.0,
      date_input: '10-10-2021',
    },
  ],
};

export const mockGetFinancesDetails = {
  status: 200,
  data: {
    input: 1000,
    output: 0,
    total: 1000,
  },
};
