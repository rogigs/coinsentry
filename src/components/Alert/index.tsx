import AlertMUI from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { IconsOptions } from '@/types';
import { Suspense } from 'react';
import Button from '../Button';

type AlertProps = {
  type?: IconsOptions;
  txtButton?: string;
  message?: string;
  onClick?: () => void;
  className?: Object;
};

const Alert = ({
  type = 'error',
  txtButton = 'Tentar novamente',
  message = 'Houve um erro ao buscar as informações. Por favor, tente novamente!',
  onClick,
  className = {},
  ...props
}: AlertProps) => {
  return (
    <AlertMUI
      severity={type}
      color={type}
      sx={{ bgcolor: 'rgba(232, 86, 71, 0.1)', ...className }} // TODO: add light color
      {...props}
    >
      <AlertTitle>Erro ao buscar informações</AlertTitle>
      <p style={{ marginBottom: 'var(--spacing-12)' }}>{message}</p>
      {onClick && (
        <Suspense
          fallback={
            <Button color={type} loading={true} sx={{ width: '200px' }} />
          }
        >
          <Button color={type} onClick={onClick} sx={{ width: '200px' }}>
            {txtButton}
          </Button>
        </Suspense>
      )}
    </AlertMUI>
  );
};

export default Alert;
