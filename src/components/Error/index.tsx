import { Alert, AlertTitle } from '@mui/material';
import { useState } from 'react';

import Button from '../Button';

const ErrorComponent = ({ onClick, setState }) => {
  const [loading, setLoading] = useState(false);

  const tryAgain = async () => {
    setLoading(true);

    const response = await onClick();

    setState(response);
    setLoading(false);
  };

  return (
    <Alert
      severity="error"
      color="error"
      sx={{ bgcolor: 'rgba(232, 86, 71, 0.1)' }} // TODO: add light color
    >
      <AlertTitle>Erro ao buscar informações</AlertTitle>
      <p style={{ marginBottom: 'var(--spacing-12)' }}>
        Houve um erro ao buscar as informações. Por favor, tente novamente!
      </p>
      <Button
        color="error"
        onClick={tryAgain}
        loading={loading}
        sx={{ width: '185px' }}
      >
        Tentar novamente
      </Button>
    </Alert>
  );
};

export default ErrorComponent;
