import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './router.tsx';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { SWRProvider } from './contexts/swr';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SWRProvider
          value={{ provider: () => new Map() }}
          swrConfig={{
            revalidateOnFocus: false,
            shouldRetryOnError: false,
          }}
        >
          <Router />
        </SWRProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
