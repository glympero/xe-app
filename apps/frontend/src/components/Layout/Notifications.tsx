import { useEffect, useState } from 'react';
import { ApiError } from '../../hooks/useFetch';
import Snackbar from '@mui/material/Snackbar';

type Props = {
  error?: ApiError;
};

const Notifications: React.FC<Props> = ({ error }) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (error !== undefined) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = (_e: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      message={error?.message}
      autoHideDuration={3000}
      onClose={handleClose}
    />
  );
};

export default Notifications;
