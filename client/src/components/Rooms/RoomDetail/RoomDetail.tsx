import { Avatar, Button, Chip, Divider, Grid, Paper, Typography } from '@mui/material';
import AuthContext from 'hooks/AuthProvider';
import { Room } from 'models/Room';
import React, { useContext } from 'react';
import AddOutlined from '@mui/icons-material/AddOutlined';

import styles from './RoomDetails.styles';

interface props {
  room: Room;
  followRoom: (name: string) => void;
}

const RoomDetail = ({ room, followRoom }: props): React.ReactElement => {
  const { auth } = useContext(AuthContext);
  return (
    <Paper elevation={1} sx={styles.paper}>
      <Grid container direction="column">
        <Grid container>
          <Grid item xs />
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
                Follow
                <AddOutlined />
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
      </Grid>
    </Paper>
  );
};

export default RoomDetail;
