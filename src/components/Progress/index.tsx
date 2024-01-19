import Box from '@mui/material/Box';
import CircularProgressMUI from '@mui/material/CircularProgress';

type CircularProgressProps = {
  boxClassName?: Object;
  color?: Pick<CircularProgressProps, 'color'>;
  className?: Object;
};
const CircularProgress = ({
  boxClassName,
  className,
  color = 'primary',
  ...props
}: CircularProgressProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100px',
        ...boxClassName,
      }}
    >
      <CircularProgressMUI
        color={color}
        className={{ ...className }}
        {...props}
      />
    </Box>
  );
};

export default CircularProgress;
