import { Controller, useFormContext } from 'react-hook-form';
import { AutocompleteData, PropertyData } from '../../interfaces';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useDebounce } from 'use-debounce';
import { useUserSearch } from '../../hooks/useAreaSearch';
import CircularProgress from '@mui/material/CircularProgress';
import Notifications from '../Errors/Notifications';

const Area: React.FC = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<PropertyData>();
  const [search, setSearch] = useState<string>('');

  const [value] = useDebounce(search, 1000);

  const { areas, isValidating, error } = useUserSearch(value);

  return (
    <>
      <Grid item xs={12}>
        <Controller
          name='area'
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              freeSolo
              options={
                areas
                  ? areas.map(
                      (area: AutocompleteData) =>
                        `${area.mainText} - ${area.secondaryText ?? 'N/A'}`
                    )
                  : []
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
      <Notifications error={error} />
    </>
  );
};

export default Area;
