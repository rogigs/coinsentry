import Box from '@mui/material/Box';
import CircularProgressMUI, {
  CircularProgressProps as CircularProgressPropsMUI,
} from '@mui/material/CircularProgress';

type CircularProgressProps = CircularProgressPropsMUI & {
  boxClassName?: Pick<CircularProgressPropsMUI, 'className'>;
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
      <CircularProgressMUI color={color} className={className} {...props} />
    </Box>
  );
};

export default CircularProgress;
