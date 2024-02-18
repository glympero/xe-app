import Grid from '@mui/material/Grid';
import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropertyData, propertySchema } from '../schema';
import { prepareInitialValueData } from '../../../utils/formUtils';
import SubmitForm from './SubmitForm';
import PropertyInformation from './PropertyInformation';
type Props = {
  property?: PropertyData;
};

const PropertyForm: React.FC<Props> = ({ property }) => {
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

  const handleFormSubmit = (dataValues: PropertyData) => {
    console.log(dataValues);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        noValidate
        onSubmit={formMethods.handleSubmit(handleFormSubmit)}
        style={{ width: '100%' }}
      >
        <Grid spacing={2} container mt={2} item xs={12} md={6}>
          <PropertyInformation />
          <SubmitForm
            reset={handleResetForm}
            isValidating={formMethods.formState.isSubmitting}
          />
        </Grid>
      </form>
    </FormProvider>
  );
};

export default PropertyForm;
