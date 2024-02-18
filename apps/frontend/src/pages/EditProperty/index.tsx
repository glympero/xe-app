import Typography from '@mui/material/Typography';
import React from 'react';
import PropertyForm from '../NewProperty/components/PropertyForm';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { RouterPaths } from '../../interfaces';
import { Property } from '../NewProperty/schema';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const EditProperty: React.FC = () => {
  const { id } = useParams();
  const { data } = useSWR<Property>(
    id ? RouterPaths.EDIT_PROPERTY.replace(':id', id.toString()) : null,
    { revalidateIfStale: false }
  );

  console.log('data', data);

  if (!data)
    return (
      <Alert
        severity='error'
        action={
          <Button color='inherit' size='small' href={RouterPaths.HOME}>
            Go back to homepage
          </Button>
        }
      >{`Cannot find property with id: ${id}`}</Alert>
    );
  return (
    <>
      <Typography variant='h1'>Edit Listing</Typography>
      <PropertyForm property={data} />
    </>
  );
};

export default EditProperty;
