import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { AuthProvider } from 'hooks/AuthProvider';
import theme from 'utils/theme';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <AuthProvider>
          <SnackbarProvider
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={5000}
            maxSnack={5}
            preventDuplicate={true}
          >
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SnackbarProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
