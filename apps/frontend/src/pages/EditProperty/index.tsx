import Typography from '@mui/material/Typography';
import React from 'react';
import PropertyForm from '../components/PropertyForm';
import { useParams } from 'react-router-dom';
import { Property, RouterPaths } from '@/App/interfaces';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useFetch } from '@/App/hooks/useFetch';
import { PROPERTIES_URL } from '@/App/constants';

const EditProperty: React.FC = () => {
  const { id } = useParams();
  const { data: property } = useFetch<Property>({
    url: `${PROPERTIES_URL}/${id}`,
    revalidateIfStale: false,
  });

  if (!property)
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
      <PropertyForm property={property} />
    </>
  );
};

export default EditProperty;
