import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';
import { PROPERTIES_URL } from '../../constants';
import { Property, RouterPaths } from '../../interfaces';
import Box from '@mui/material/Box';

type Props = {
  property: Property;
};

const PropertyDetails: React.FC<Props> = ({ property }) => {
  const navigate = useNavigate();

  const prefetchProperty = (property: Property) => {
    mutate(`${PROPERTIES_URL}/${property.id}`, property);
  };

  return (
    <Grid item xs={12} sm={6} md={4} key={property.id}>
      <Card>
        <CardMedia
          component='img'
          height='140'
          image={'https://via.placeholder.com/150'}
          alt={property.title}
        />
        <CardContent>
          <Box display='flex' justifyContent='space-between'>
            <Typography gutterBottom variant='h5' component='div'>
              {property.title}
            </Typography>
            <Typography variant='h4' color='text.secondary'>
              {property.price} €
            </Typography>
          </Box>
          <Typography variant='body1' color='text.secondary'>
            {`${property.area.mainText} - ${property.area.secondaryText ?? 'N/A'}`}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {property.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              prefetchProperty(property);
              navigate(
                RouterPaths.EDIT_PROPERTY.replace(':id', property.id.toString())
              );
            }}
            size='small'
          >
            Edit Property
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PropertyDetails;
