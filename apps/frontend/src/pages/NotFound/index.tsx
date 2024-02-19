import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { RouterPaths } from '../../interfaces';

const NotFound: React.FC = () => {
  return (
    <Stack maxWidth={'md'}>
      <Typography variant='h1' gutterBottom>
        404: Not Found
      </Typography>
      <Typography variant='body1' gutterBottom>
        You might have the wrong address, or the page may have moved.
      </Typography>
      <Link to={RouterPaths.HOME}>
        <Button color='secondary'>Go back to homepage</Button>
      </Link>
    </Stack>
  );
};

export default NotFound;
