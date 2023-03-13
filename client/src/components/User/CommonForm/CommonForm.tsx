import Grid from '@mui/material/Grid';
import React from 'react';
import { TextField, Button } from '@mui/material';
import { Control } from 'react-hook-form';

interface Props {
  type: String;
  control: Control;
}

const CommonForm = ({ type, control }: Props): React.ReactElement => {
  return (
    <>
      <Grid item xs={12}>
        <TextField label="Username" fullWidth name="username" />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Password" fullWidth type="password" name="password" />
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" type="submit">
          {type}
        </Button>
      </Grid>
    </>
  );
};

export default CommonForm;
