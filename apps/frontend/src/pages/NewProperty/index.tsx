import Typography from '@mui/material/Typography';
import React from 'react';
import PropertyForm from '../components/PropertyForm';

const NewProperty: React.FC = () => {
  return (
    <>
      <Typography variant='h1'>New Listing</Typography>
      <PropertyForm />
    </>
  );
};

export default NewProperty;
