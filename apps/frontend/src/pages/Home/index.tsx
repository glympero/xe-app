import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Home: React.FC = () => {
  const properties = [
    {
      id: 1,
      title: 'Cozy Cottage',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'A cozy cottage in the woods.',
    },
  ];
  return (
    <Grid container spacing={4}>
      {properties.map((property) => (
        <Grid item xs={12} sm={6} md={4} key={property.id}>
          <Card>
            <CardMedia
              component='img'
              height='140'
              image={property.imageUrl}
              alt={property.title}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {property.title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {property.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
