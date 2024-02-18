import Grid from '@mui/material/Grid';
import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { propertySchema } from '@/App/schemas/property';
import { prepareInitialValueData } from '@/App/utils';
import SubmitForm from './SubmitForm';
import PropertyInformation from './PropertyInformation';
import usePropertiesServices from '@/App/hooks/usePropertiesServices';
import { useNavigate } from 'react-router-dom';
import { Property, PropertyData, RouterPaths } from '@/App/interfaces';

type Props = {
  property?: Property;
};

const PropertyForm: React.FC<Props> = ({ property }) => {
  const navigate = useNavigate();
  const { handleAsyncSubmit, handleAsyncEdit, isValidating } =
    usePropertiesServices();
  const defaultValues = useMemo(
    () => prepareInitialValueData(property),
    [property]
  );
  const formMethods = useForm<PropertyData>({
    resolver: zodResolver(propertySchema),
    defaultValues,
    reValidateMode: 'onChange',
  });

  const handleResetForm = () => {
    formMethods.reset(defaultValues);
  };

  const handleFormSubmit = async (dataValues: PropertyData) => {
    const values = await handleAsyncSubmit(dataValues);
    if (values) {
      navigate(RouterPaths.HOME);
    }
  };

  const handleFormEdit = async (dataValues: PropertyData) => {
    if (property) {
      const values = await handleAsyncEdit(dataValues, property.id);
      if (values) {
        navigate(RouterPaths.HOME);
      }
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form
        noValidate
        onSubmit={formMethods.handleSubmit(
          property ? handleFormEdit : handleFormSubmit
        )}
        style={{ width: '100%' }}
      >
        <Grid spacing={2} container mt={2} item xs={12} md={6}>
          <PropertyInformation />
          <SubmitForm reset={handleResetForm} isValidating={isValidating} />
        </Grid>
      </form>
    </FormProvider>
  );
};

export default PropertyForm;
