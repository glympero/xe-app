import { useFormContext } from 'react-hook-form';
import { AutocompleteData, PropertyData } from '../../interfaces';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useDebounce } from 'use-debounce';
import { useUserSearch } from '../../hooks/useAreaSearch';
import CircularProgress from '@mui/material/CircularProgress';
import Notifications from '../Errors/Notifications';

const Area: React.FC = () => {
  const {
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<PropertyData>();
  const [search, setSearch] = useState<string>('');

  const [value] = useDebounce(search, 1000);

  const { areas, isValidating, error } = useUserSearch(value);

  const area = watch('area');

  return (
    <>
      <Grid item xs={12}>
        <Autocomplete
          freeSolo
          options={areas ?? []}
          value={area.placeId ? area : ''}
          onInputChange={(_, value) => {
            console.log('value', value);
            setSearch(value);
          }}
          getOptionLabel={(option) => {
            if (typeof option === 'string') {
              return option;
            }
            return option?.mainText
              ? `${option.mainText} - ${option.secondaryText ?? 'N/A'}`
              : '';
          }}
          onChange={(_, data) => {
            const dataValue = data as AutocompleteData;
            setValue('area', {
              placeId: dataValue?.placeId ?? '',
              mainText: dataValue?.mainText ?? '',
              secondaryText: dataValue?.secondaryText ?? '',
            });
          }}
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
      </Grid>
      <Notifications error={error} />
    </>
  );
};

export default Area;
