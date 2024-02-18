import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

type Props = {
  reset: () => void;
  isValidating: boolean;
};
const SubmitForm: React.FC<Props> = ({ reset, isValidating }) => {
  return (
    <Grid item xs={12} display={'flex'} justifyContent={'start'} gap={1}>
      <Button
        variant='contained'
        type='submit'
        disabled={isValidating}
        startIcon={
          isValidating ? (
            <CircularProgress size={12} style={{ color: 'black' }} />
          ) : null
        }
      >
        Save
      </Button>
      <Button
        onClick={() => {
          reset();
        }}
        disabled={isValidating}
        variant='outlined'
      >
        Clear
      </Button>
    </Grid>
  );
};

export default SubmitForm;
