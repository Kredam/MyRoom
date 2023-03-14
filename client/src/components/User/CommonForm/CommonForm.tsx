import Grid from '@mui/material/Grid';
import React from 'react';
import { TextField, Button } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { User } from 'models/User';

interface Props {
  type: String;
  control: Control<User>;
}

const CommonForm = ({ type, control }: Props): React.ReactElement => {
  return (
    <>
      <Grid item xs={12}>
        <Controller
          control={control}
          name="username"
          render={({ ...field }) => {
            return <TextField {...field} label="Username" fullWidth />;
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          control={control}
          name="username"
          render={({ ...field }) => {
            return <TextField label="Password" fullWidth type="password" {...field} />;
          }}
        />
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
