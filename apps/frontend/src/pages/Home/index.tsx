import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Property } from '../NewProperty/schema';
import { RouterPaths } from '../../interfaces';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { mutate } from 'swr';
import { PROPERTIES_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: properties,
    isValidating,
    error,
  } = useFetch<Property[]>({
    url: PROPERTIES_URL,
  });

  const prefetchProperty = (property: Property) => {
    mutate(`${PROPERTIES_URL}/${property.id}`, property);
  };

  if (isValidating) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!properties) {
    return null;
  }

  return (
    <Grid container spacing={4}>
      {properties.map((property) => (
        <Grid item xs={12} sm={6} md={4} key={property.id}>
          <Card>
            <CardMedia
              component='img'
              height='140'
              image={'https://via.placeholder.com/150'}
              alt={property.title}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {property.title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {property.description}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {property.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => {
                  prefetchProperty(property);
                  navigate(
                    RouterPaths.EDIT_PROPERTY.replace(
                      ':id',
                      property.id.toString()
                    )
                  );
                }}
                size='small'
              >
                Edit Property
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
