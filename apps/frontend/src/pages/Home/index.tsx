import Grid from '@mui/material/Grid';
import NoProperties from '../../components/Property/NoProperties';
import PropertyDetails from '../../components/Property/PropertyDetails';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { PROPERTIES_URL } from '../../constants';
import { useFetch } from '../../hooks/useFetch';
import { Property } from '../../interfaces';
import { Box, CircularProgress } from '@mui/material';

const Home: React.FC = () => {
  const {
    data: properties,
    isValidating,
    mutate,
    error,
  } = useFetch<Property[]>({
    url: PROPERTIES_URL,
  });

  if (isValidating) {
    return (
      <Box display={'flex'} justifyContent={'center'}>
        <CircularProgress color='inherit' size={30} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity='error'
        action={
          <Button color='inherit' size='small' onClick={() => mutate()}>
            Refresh
          </Button>
        }
      >{`Cannot load properties`}</Alert>
    );
  }

  if (!properties || properties.length === 0) {
    return <NoProperties />;
  }

  return (
    <Grid container spacing={4}>
      {properties.map((property) => (
        <PropertyDetails key={property.id} property={property} />
      ))}
    </Grid>
  );
};

export default Home;
