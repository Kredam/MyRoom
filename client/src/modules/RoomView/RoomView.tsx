/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { fetchMessageHistory, fetchRoomUsers } from 'api/services/services';
import { UserList } from 'components';
import { Utils } from 'consts';
import AuthContext from 'hooks/AuthProvider';
import { RoomChat } from 'models/Room';
import { UsersQuery } from 'models/User';
import React, { UIEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReadyState } from 'react-use-websocket';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import routes from 'routes/routes';

interface RoomUsers {
  user: number;
  online: boolean;
}

const RoomView = (): React.ReactElement => {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [roomUsers, setRoomUsers] = useState<UsersQuery>({ users: [], nrOfUsers: 0 });
  const [offset, setOffset] = useState<number>(0);
  const [messageHistory, setMessageHistory] = useState<RoomChat[]>([]);
  const chatUrl = `${process.env.REACT_APP_WEBSOCKET_URL as string}${id as string}/`;
  const groupUrl = `${process.env.REACT_APP_WEBSOCKET_URL as string}join/${id as string}/`;
  const chatSocket = useWebSocket(chatUrl, {
    queryParams: { token: auth.access }
  });
  const groupSocket = useWebSocket(groupUrl, {
    queryParams: { token: auth.access }
  });

  useEffect(() => {
    const message = chatSocket.lastMessage;
    if (message !== null) {
      setMessageHistory((prev) => [...prev, JSON.parse(message.data)]);
    }
  }, [chatSocket.lastMessage, setMessageHistory]);

  const handleUserStatuses = (message: RoomUsers): void => {
    if (message.online) {
      // you just have to iterate through users (find it by id) and change the online status
    } else {
      // you just have to iterate through users (find it by id) and change the online status
    }
  };

  useEffect(() => {
    const message = groupSocket.lastMessage;
    if (message !== null) {
      handleUserStatuses(message.data);
    }
  }, [groupSocket.lastMessage]);

  useEffect(() => {
    if (groupSocket.readyState === ReadyState.CLOSED) navigate(routes.LandingPage);
  }, [groupSocket.readyState]);

  useEffect(() => {
    fetchMessageHistory(id as string)
      .then((result) => setMessageHistory(result))
      .catch(console.log);
    fetchRoomUsers(id as string, offset)
      .then((result) => setRoomUsers(result))
      .catch(console.log);
  }, [id]);

  const handleScroll = (event: UIEvent<HTMLUListElement>): void => {
    if (roomUsers !== undefined && Utils.LIMIT + offset > roomUsers.nrOfUsers) return;
    const scrollTop: number = event.currentTarget.scrollTop;
    const scrollHeight: number = event.currentTarget.scrollHeight;
    const clientHeight: number = event.currentTarget.clientHeight;
    if (clientHeight + scrollTop > scrollHeight - 100) setOffset(Utils.LIMIT + offset);
    // if ((scrollTop * Utils.ITEM_HEIGHT) / scrollHeight > 8.5) setOffset(limit + offset);
  };

  return (
    <Grid container direction="row" padding={6}>
      <Grid item xs={2}>
        <Paper>
          <Typography>{id}</Typography>
        </Paper>
      </Grid>
      <Button onClick={() => chatSocket.sendMessage(message)}>Send</Button>
      <Grid item xs>
        {messageHistory.map((instance, index) => (
          <Typography key={index}>{instance.message}</Typography>
        ))}
        <TextField
          name="message"
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
        />
      </Grid>
      <Grid item>
        {roomUsers !== undefined && (
          <UserList users={roomUsers.users} handleScroll={handleScroll} />
        )}
      </Grid>
    </Grid>
  );
};

export default RoomView;
