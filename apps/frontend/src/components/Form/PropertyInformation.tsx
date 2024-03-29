import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { PropertyData, PropertyType } from '../../interfaces';
import Area from './Area';

const PropertyInformation: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<PropertyData>();

  return (
    <>
      <Grid item xs={12}>
        <Controller
          name={'title'}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              fullWidth
              variant='filled'
              label={'Title'}
              error={!!errors['title']}
              helperText={errors['title']?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth error={!!errors.type}>
          <InputLabel required id='type-select-label'>
            Type
          </InputLabel>
          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  labelId='type-select-label'
                  label='Type'
                  error={!!errors.type}
                >
                  {Object.keys(PropertyType).map((key) => (
                    <MenuItem
                      key={key}
                      value={PropertyType[key as keyof typeof PropertyType]}
                    >
                      {PropertyType[key as keyof typeof PropertyType]}
                    </MenuItem>
                  ))}
                </Select>
                {errors?.type && (
                  <FormHelperText color='error'>
                    {errors.type.message as string}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </FormControl>
      </Grid>
      <Area />
      <Grid item xs={12}>
        <Controller
          name={'price'}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              fullWidth
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value.replace(/[^0-9]/g, ''));
              }}
              inputProps={{
                pattern: '\\d*',
                onKeyDown: (e) => {
                  if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                    e.preventDefault();
                  }
                },
              }}
              variant='filled'
              label={'Price in Euros'}
              error={!!errors['price']?.message}
              helperText={errors['price']?.message}
              placeholder='Amount'
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name={'description'}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              rows={3}
              fullWidth
              variant='filled'
              label={'Description'}
              error={!!errors['description']}
            />
          )}
        />
      </Grid>
    </>
  );
};
export default PropertyInformation;
