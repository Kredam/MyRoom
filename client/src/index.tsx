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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterMoment}>
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
    </LocalizationProvider>
  </React.StrictMode>
);
