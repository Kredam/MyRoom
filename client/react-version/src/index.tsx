import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import { ThemeProvider } from '@emotion/react';
import theme from 'utils/theme'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <ToastContainer />
          <BrowserRouter>
            <App />
          </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
