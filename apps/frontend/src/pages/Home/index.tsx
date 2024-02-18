import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Property } from '../NewProperty/schema';
import { PropertyType, RouterPaths } from '../../interfaces';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { mutate } from 'swr';
import { API_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const properties: Property[] = [
    {
      id: 1,
      title: 'Cozy Cottage',
      type: PropertyType.BUY,
      area: 'Athens',
      price: `${100} €`,
      description: 'A cozy cottage in the woods.',
    },
  ];

  const prefetchProperty = (property: Property) => {
    const path = RouterPaths.EDIT_PROPERTY.replace(
      ':id',
      property.id.toString()
    );
    console.log('path', `${API_URL}${path}`);
    mutate(`${API_URL}${path}`, property);
  };
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
