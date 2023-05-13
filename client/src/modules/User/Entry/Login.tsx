/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { CommonForm } from 'components';
import { User } from 'models/User';
import { api } from 'api/http-common';
import AuthContext from 'hooks/AuthProvider';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import routes from 'routes/routes';
import styles from './Entry.styles';
import { useForm } from 'react-hook-form';

const Login = (): React.ReactElement => {
  const { setAuth, setUser } = useContext(AuthContext);
  const { handleSubmit, control } = useForm<any>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = async (data: User): Promise<void> => {
    await api
      .post('token/', data)
      .then((res) => {
        enqueueSnackbar('Successful log in', { variant: 'success' });
        setAuth(res.data.tokens);
        setUser(res.data.user);
        navigate(routes.LandingPage);
      })
      .catch(() => enqueueSnackbar('Unsuccessful log in', { variant: 'error' }));
  };

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignContent="center"
      direction="column"
      sx={styles.paper}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CommonForm control={control} type="Log in" />
      </form>
    </Grid>
  );
};

export default Login;
