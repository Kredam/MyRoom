import { TextField, Grid } from '@mui/material';
import { Entry } from 'components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from 'routes/routes';
import { api } from 'utils/http-common';
import { useSnackbar } from 'notistack';

const Register = (): React.ReactElement => {
  const [data, setData] = useState({ email: '' });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const submit = (pendingChanges: Object): void => {
    console.log(pendingChanges);
    api
      .post('users/register/', { ...data, ...pendingChanges })
      .then(() => {
        enqueueSnackbar('Registration successful', { variant: 'success' });
        navigate(routes.Login);
      })
      .catch(() => enqueueSnackbar('Unsuccessful registration', { variant: 'error' }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Grid container justifyContent="center" alignContent="center" spacing={3} direction="column">
      <Grid item xs={12}>
        <TextField onChange={handleChange} label="E-mail" name="email" value={data.email} />
      </Grid>
      <Entry submit={(pendingChanges) => submit(pendingChanges)} type="Register" />
    </Grid>
  );
};

export default Register;
