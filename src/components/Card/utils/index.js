export const TYPES = {
  TOTAL: "total",
  SAIDA: "saída",
  ENTRADA: "entrada",
};

export const TYPES_COLORS = (value) => {
  if (value > 0) {
    return {
      backgroundColor: "green !important",
      color: "white !important",
    };
  }

  if (value < 0) {
    return {
      backgroundColor: "red !important",
      color: "white !important",
    };
  }

  return {
    backgroundColor: "inherit",
    color: "inherit",
  };
};
