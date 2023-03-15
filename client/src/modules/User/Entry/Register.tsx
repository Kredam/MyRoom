/* eslint-disable @typescript-eslint/no-misused-promises */
import { TextField, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import routes from 'routes/routes';
import { api } from 'api/http-common';
import { useSnackbar } from 'notistack';
import { CommonForm } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { User } from 'models/User';
import { DateFormats } from 'consts';
import * as Constraints from 'consts/constraints';
import { DateField } from '@mui/x-date-pickers';
import bcryptjs from 'bcryptjs';
import style from './Entry.styles';

const defaultValues = {
  email: '',
  first_name: '',
  last_name: '',
  born: undefined
};

const SALT = process.env.REACT_APP_SALT;

const Register = (): React.ReactElement => {
  const { control, handleSubmit } = useForm<User>({ defaultValues });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const submit = async (data: User): Promise<void> => {
    console.log(bcryptjs.genSalt());
    const hashedPassword = await bcryptjs.hashSync(data.password, SALT);
    const body = { ...data, password: hashedPassword };
    api
      .post('users/register/', { body })
      .then(() => {
        enqueueSnackbar('Registration successful', { variant: 'success' });
        navigate(routes.Login);
      })
      .catch(() => enqueueSnackbar('Unsuccessful registration', { variant: 'error' }));
  };

  return (
    <form onSubmit={handleSubmit(submit)} style={style.paper}>
      <Grid container justifyContent="center" alignContent="center" spacing={3} direction="column">
        <Grid item xs={12}>
          <Controller
            control={control}
            rules={{ required: true }}
            name="first_name"
            render={({ field }) => <TextField {...field} label="First name" fullWidth />}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="last_name"
            rules={{ required: true }}
            render={({ field }) => <TextField {...field} label="Last name" fullWidth />}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="born"
            rules={Constraints.DATE}
            render={({ field }) => (
              <DateField {...field} format={DateFormats.DATE} label="Birthdate" fullWidth />
            )}
          />
        </Grid>
        <CommonForm control={control} type="Register" />
      </Grid>
    </form>
  );
};

export default Register;
