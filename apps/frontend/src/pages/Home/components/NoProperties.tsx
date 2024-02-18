import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const NoProperties: React.FC = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant='h1'>No properties found</Typography>
      </Grid>
    </Grid>
  );
};

export default NoProperties;
