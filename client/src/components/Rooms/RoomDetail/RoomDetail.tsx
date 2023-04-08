import { Avatar, Button, Chip, Divider, Grid, Paper, Typography } from '@mui/material';
import AuthContext from 'hooks/AuthProvider';
import { Room } from 'models/Room';
import React, { useContext } from 'react';
import AddOutlined from '@mui/icons-material/AddOutlined';
import DoneOutlined from '@mui/icons-material/Done';

import styles from './RoomDetails.styles';
import { useNavigate } from 'react-router-dom';

interface props {
  room: Room;
  followRoom: (name: string) => void;
  numberMembers: number;
  numberAdmins: number;
}

const RoomDetail = ({
  room,
  followRoom,
  numberMembers,
  numberAdmins
}: props): React.ReactElement => {
  const { auth, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Grid container direction="column">
      <Paper elevation={1} sx={styles.paper}>
        <Grid container p={2}>
          <Grid item xs={2}>
            <Avatar sx={styles.avatar} src={room.picture}>
              {room.name}
            </Avatar>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h6">{room.name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">@{room.name}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            {auth.access !== '' && (
              <Button variant="outlined" sx={styles.button} onClick={() => followRoom(room.name)}>
                {user?.is_followed === true && (
                  <>
                    Followed
                    <DoneOutlined />
                  </>
                )}
                {user?.is_followed === false && (
                  <>
                    Follow
                    <AddOutlined />
                  </>
                )}
              </Button>
            )}
          </Grid>
          <Grid item xs />
        </Grid>
        <Grid item mt={4} mb={4}>
          <Divider>
            <Chip label="Description" />
          </Divider>
        </Grid>
        <Grid item>
          <Typography variant="body1">{room.description}</Typography>
        </Grid>
        {auth.access !== '' && (
          <Grid item mt={4} mb={4}>
            <Button variant="contained" onClick={() => navigate(`/room/${room.name}`)}>
              Connect
            </Button>
          </Grid>
        )}
        <Grid item mt={4} mb={4}>
          <Typography variant="subtitle1" textAlign="center" fontWeight="bold">
            Members
          </Typography>
          <Typography variant="subtitle1" textAlign="center">
            {numberMembers}
          </Typography>
        </Grid>
        <Grid item mt={4} mb={4}>
          <Typography variant="subtitle1" textAlign="center" fontWeight="bold">
            Admins
          </Typography>
          <Typography variant="subtitle1" textAlign="center">
            {numberAdmins}
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default RoomDetail;
