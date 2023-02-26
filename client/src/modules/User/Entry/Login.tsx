import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { Entry } from 'components';
import { privateApi } from 'api/http-common';
import AuthContext from 'hooks/AuthProvider';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import routes from 'routes/routes';
import styles from './Entry.styles';

const Login = (): React.ReactElement => {
  const { setAuth } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const submit = (pendingChanges: Object): void => {
    privateApi
      .post('token/', pendingChanges)
      .then((res) => {
        enqueueSnackbar('Successful log in', { variant: 'success' });
        setAuth(res.data);
        navigate(routes.Home);
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
      sx={styles.formDiv}
    >
      <Entry submit={(pendingChanges) => submit(pendingChanges)} type="Log in" />
    </Grid>
  );
};

export default Login;
