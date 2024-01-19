import { Alert, AlertTitle } from '@mui/material';

import Button from '../Button';

type ErrorComponent = {
  onClick: () => void;
};
const ErrorComponent = ({ onClick }: ErrorComponent) => {
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
        onClick={onClick}
        // loading={loading}
        sx={{ width: '200px' }}
      >
        Tentar novamente
      </Button>
    </Alert>
  );
};

export default ErrorComponent;
