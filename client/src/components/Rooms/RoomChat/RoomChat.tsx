import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { DateFormats } from 'consts';
import AuthContext from 'hooks/AuthProvider';
import { MessageHistory } from 'models/Room';
import { User } from 'models/User';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import styles from './RoomChat.styles';

interface props {
  messageHistory: MessageHistory[];
  socket: any;
  roomUsers: User[];
}

const RoomChat = ({ messageHistory, socket, roomUsers }: props): React.ReactElement => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState<string>('');

  return (
    <>
      <Paper sx={styles.paper}>
        {messageHistory.map((instance, index) => {
          const userData = roomUsers.find((user) => user.id === instance.user);
          return (
            <Grid container direction="row" mb={2} p={2} key={JSON.stringify(instance)}>
              {user?.id !== userData?.id && (
                <Grid item xs={1}>
                  <Avatar sx={styles.avatar}>
                    {userData?.first_name[0]}
                    {userData?.last_name[0]}
                  </Avatar>
                </Grid>
              )}
              <Grid item alignContent="end" pl={1} pr={1} container xs>
                <Grid item xs={12}>
                  <Typography
                    key={index}
                    variant="subtitle2"
                    textAlign={user?.id === userData?.id ? 'right' : 'left'}
                  >
                    {moment(instance.sent_time).format(DateFormats.DATETIME)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    textAlign={user?.id === userData?.id ? 'right' : 'left'}
                    key={index}
                    variant="subtitle1"
                  >
                    {instance.message}
                  </Typography>
                </Grid>
              </Grid>
              {user?.id === userData?.id && (
                <Grid item xs={1}>
                  <Avatar sx={styles.avatar}>
                    {user?.first_name[0]}
                    {user?.last_name[0]}
                  </Avatar>
                </Grid>
              )}
            </Grid>
          );
        })}
      </Paper>
      <Grid container>
        <Grid item xs={10}>
          <TextField
            name="message"
            placeholder="Message"
            value={message}
            style={styles.textField}
            fullWidth
            onChange={(event) => setMessage(event.currentTarget.value)}
          />
        </Grid>
        <Grid item xs>
          <Button
            fullWidth
            sx={styles.button}
            variant="outlined"
            onClick={() => socket.sendMessage(message)}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default RoomChat;
