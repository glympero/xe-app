import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FallbackProps } from 'react-error-boundary';
import Button from '@mui/material/Button';

const ErrorLog: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <Box role='alert' m={2}>
      <Typography variant='h1'>Something went wrong</Typography>
      <Typography component='pre' variant='body1'>
        {error.message}
      </Typography>
      <Box mt={2}>
        <Button variant='contained' onClick={resetErrorBoundary}>
          Reset
        </Button>
      </Box>
    </Box>
  );
};
export default ErrorLog;
