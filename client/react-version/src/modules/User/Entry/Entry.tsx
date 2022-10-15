import React from 'react';
import { Grid } from '@mui/material';
import Login from './Login';
import Register from './Register';

const Entry = (): React.ReactElement => {
  return (
    <Grid container>
      <Login />
      <Register />
    </Grid>
  );
};

export default Entry;
