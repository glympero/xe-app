import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

type Props = {
  reset: () => void;
  isValidating: boolean;
  isEditMode: boolean;
};
const SubmitForm: React.FC<Props> = ({ reset, isValidating, isEditMode }) => {
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
        {isEditMode ? 'Edit' : 'Submit'}
      </Button>
      <Button
        onClick={() => {
          reset();
        }}
        disabled={isValidating}
        variant='outlined'
      >
        {isEditMode ? 'Reset' : 'Clear'}
      </Button>
    </Grid>
  );
};

export default SubmitForm;
