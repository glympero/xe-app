import Typography from '@mui/material/Typography';
import React from 'react';
import PropertyForm from './components/PropertyForm';

const Form: React.FC = () => {
  return (
    <>
      <Typography variant='h1'>Add Listing Page</Typography>
      <PropertyForm />
    </>
  );
};

export default Form;
