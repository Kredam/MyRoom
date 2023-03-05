import React from 'react';
import { Avatar, Chip, Divider, Grid, Paper, Typography } from '@mui/material';
import styles from './UserDetails.styles';
import { User } from '../../../models/User';
import Button from '@mui/material/Button';
import AddOutlined from '@mui/icons-material/AddOutlined';
import moment from 'moment';
import { DateFormats } from '../../../consts';
interface props {
  user: User;
  followUser: (userId: number) => void;
}
const UserDetails = ({ user, followUser }: props): React.ReactElement => {
  return (
    <Paper elevation={1} sx={styles.paper}>
      <Grid container direction="column">
        <Grid container>
          <Grid item xs />
          <Grid item xs={2}>
            <Avatar sx={styles.avatar}>
              {user.first_name[0]}
              {user.last_name[0]}
            </Avatar>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h6">
                  {user.first_name} {user.last_name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">@{user.username}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined" sx={styles.button} onClick={() => followUser(user.id)}>
              Follow
              <AddOutlined />
            </Button>
          </Grid>
          <Grid item xs />
        </Grid>
        <Grid item mt={4} mb={4}>
          <Divider>
            <Chip label="Information" />
          </Divider>
        </Grid>
        <Grid container direction="row" alignContent="center">
          <Grid item mb={1} xs>
            <Typography variant="subtitle1" textAlign="center" fontWeight="bold">
              E-mail address
            </Typography>
            <Typography variant="subtitle1" textAlign="center">
              {user.email}
            </Typography>
          </Grid>
          <Grid item mr={1} xs>
            <Typography variant="subtitle1" textAlign="center" fontWeight="bold">
              Joined on:
            </Typography>
            <Typography variant="subtitle1" textAlign="center">
              {moment(user.date_joined).format(DateFormats.DATE)}
            </Typography>
          </Grid>
          <Grid container direction="column" mt={4}>
            <Grid item mr={1} xs>
              <Typography variant="subtitle1" textAlign="center" fontWeight="bold">
                Birthday:
              </Typography>
              <Typography variant="subtitle1" textAlign="center">
                {moment(user.born).format(DateFormats.DATE)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserDetails;
