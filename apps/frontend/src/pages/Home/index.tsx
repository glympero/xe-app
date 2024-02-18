import Grid from '@mui/material/Grid';
import { PROPERTIES_URL } from '@/App/constants';
import { useFetch } from '@/App/hooks/useFetch';
import NoProperties from './components/NoProperties';
import PropertyDetails from './components/PropertyDetails';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { Property } from '@/App/interfaces';

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
    return <div>Loading...</div>;
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
