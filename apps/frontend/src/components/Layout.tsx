import React, { PropsWithChildren } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const currentYear = new Date().getFullYear();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' style={{ flexGrow: 1 }}>
            XE Lympe Property App
          </Typography>
          <Button color='inherit' component={Link} to='/'>
            Home
          </Button>
          <Button color='inherit' component={Link} to='/create-property'>
            Add Property
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ my: { xs: 2, sm: 3, md: 4 } }}>{children}</Container>
      <Box
        component='footer'
        sx={{ p: 3, mt: 'auto', backgroundColor: 'background.paper' }}
      >
        <Typography
          textAlign='center'
          variant='overline'
          display='block'
          gutterBottom
        >
          © {currentYear} XE Lympe Property App
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
