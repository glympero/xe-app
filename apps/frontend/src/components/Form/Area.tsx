import { Controller, useFormContext } from 'react-hook-form';
import { AutocompleteData, PropertyData } from '../../interfaces';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useDebounce } from 'use-debounce';
import { useUserSearch } from '../../hooks/useAreaSearch';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';

const Area: React.FC = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<PropertyData>();
  const [search, setSearch] = useState<string>('');

  const [value] = useDebounce(search, 1000);

  const { areas, isValidating, isError } = useUserSearch(value);

  useEffect(() => {
    if (isError) {
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isError}
        message='Error fetching data'
      />;
    }
  }, [isError]);
  return (
    <Grid item xs={12}>
      <Controller
        name='area'
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            freeSolo
            options={
              areas ? areas.map((user: AutocompleteData) => user.mainText) : []
            }
            onInputChange={(_, value) => setSearch(value)}
            onChange={(_, data) => setValue('area', data ?? '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Area'
                variant='filled'
                placeholder="Type in the property's area"
                error={!!errors['area']?.message}
                helperText={errors['area']?.message}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isValidating ? (
                        <CircularProgress color='inherit' size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        )}
      />
    </Grid>
  );
};

export default Area;
