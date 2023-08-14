import { Alert, AlertTitle } from "@mui/material";
import Button from "../Button";
import { useState } from "react";

const ErrorComponent = ({ onClick, setState }) => {
  const [loading, setLoading] = useState(false);

  const tryAgain = async () => {
    setLoading(true);

    const response = await onClick();

    setState(response);
    setLoading(false);
  };

  return (
    <Alert severity="error">
      <AlertTitle>Erro ao buscar informações</AlertTitle>
      <p style={{ marginBottom: "12px" }}>
        Houve um erro ao buscar as informações. Por favor, tente novamente!
      </p>
      <Button
        sx={{ width: "185px" }}
        color="error"
        onClick={tryAgain}
        loading={loading}
      >
        Tentar novamente
      </Button>
    </Alert>
  );
};

export default ErrorComponent;
