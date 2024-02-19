import Grid from '@mui/material/Grid';
import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SubmitForm from './SubmitForm';
import PropertyInformation from './PropertyInformation';
import { useNavigate } from 'react-router-dom';
import usePropertiesServices from '../../hooks/usePropertiesServices';
import { Property, PropertyData, RouterPaths } from '../../interfaces';
import { propertySchema } from '../../schemas/property';
import { prepareInitialValueData } from '../../utils';
import { ApiError } from '../../hooks/useFetch';
import Notifications from '../Errors/Notifications';

type Props = {
  property?: Property;
};

const PropertyForm: React.FC<Props> = ({ property }) => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<ApiError | undefined>(undefined);
  const { handleAsyncSubmit, handleAsyncEdit, isValidating } =
    usePropertiesServices();
  const defaultValues = useMemo(
    () => prepareInitialValueData(property),
    [property]
  );

  const isEditMode = useMemo(() => !!property, [property]);

  const formMethods = useForm<PropertyData>({
    resolver: zodResolver(propertySchema),
    defaultValues,
    reValidateMode: 'onChange',
  });

  const handleResetForm = () => {
    formMethods.reset(defaultValues);
  };

  const handleFormSubmit = async (dataValues: PropertyData) => {
    const response = await handleAsyncSubmit(dataValues);
    if (response.res) {
      navigate(RouterPaths.HOME);
    } else {
      setError(response.error);
    }
  };

  const handleFormEdit = async (dataValues: PropertyData) => {
    if (property) {
      const response = await handleAsyncEdit(dataValues, property.id);
      if (response.res) {
        navigate(RouterPaths.HOME);
      } else {
        setError(response.error);
      }
    }
  };

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          noValidate
          onSubmit={formMethods.handleSubmit(
            isEditMode ? handleFormEdit : handleFormSubmit
          )}
          style={{ width: '100%' }}
        >
          <Grid spacing={2} container mt={2} item xs={12} md={6}>
            <PropertyInformation />
            <SubmitForm
              reset={handleResetForm}
              isValidating={isValidating}
              isEditMode={isEditMode}
            />
          </Grid>
        </form>
      </FormProvider>
      <Notifications error={error} />
    </>
  );
};

export default PropertyForm;
