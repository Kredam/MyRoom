/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import {
  fetchMessageHistory,
  fetchRoomInfo,
  fetchRoomUsers,
  updateRoom
} from 'api/services/services';
import { RoomChat, UserList } from 'components';
import { ROLES, Utils } from 'consts';
import AuthContext from 'hooks/AuthProvider';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { MessageHistory, Room } from 'models/Room';
import { User, UsersQuery } from 'models/User';
import React, { UIEvent, useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
interface RoomUsers {
  user: number;
  online: boolean;
}

const RoomView = (): React.ReactElement => {
  const { auth, lastStatusMessage } = useContext(AuthContext);
  const api = useAxiosPrivate();
  const { control, formState, handleSubmit, reset } = useForm<Room>();
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomUsers, setRoomUsers] = useState<UsersQuery>({ users: [], nrOfUsers: 0 });
  const [offset, setOffset] = useState<number>(0);
  const [messageHistory, setMessageHistory] = useState<MessageHistory[]>([]);
  const chatUrl = `${process.env.REACT_APP_WEBSOCKET_URL as string}${id as string}/chat/`;
  const chatSocket = useWebSocket(chatUrl, {
    queryParams: { token: auth.access }
  });

  useEffect(() => {
    const message = chatSocket.lastMessage;
    if (message !== null) {
      setMessageHistory((prev) => [...prev, JSON.parse(message.data)]);
    }
  }, [chatSocket.lastMessage, setMessageHistory]);

  useEffect(() => {
    if (id === undefined) return;
    fetchRoomInfo(id)
      .then((res) => reset(res))
      .catch(console.log);
    reset();
  }, [id]);

  useEffect(() => {
    fetchMessageHistory(id as string)
      .then((result) => setMessageHistory(result))
      .catch(console.log);
    fetchRoomUsers(id as string)
      .then((result) => setRoomUsers(result))
      .catch(console.log);
  }, [id]);

  useEffect(() => {
    if (lastStatusMessage !== null) {
      const message = JSON.parse(lastStatusMessage.data);
      roomUsers?.users.map((user: User) => {
        if (user.id === message.user) {
          user.online = message.online;
          return user;
        }
        return user;
      });
    }
  }, [lastStatusMessage]);

  const handleScroll = (event: UIEvent<HTMLUListElement>): void => {
    if (roomUsers !== undefined && Utils.LIMIT + offset > roomUsers.nrOfUsers) return;
    const scrollTop: number = event.currentTarget.scrollTop;
    const scrollHeight: number = event.currentTarget.scrollHeight;
    const clientHeight: number = event.currentTarget.clientHeight;
    if (clientHeight + scrollTop > scrollHeight - 100) setOffset(Utils.LIMIT + offset);
    // if ((scrollTop * Utils.ITEM_HEIGHT) / scrollHeight > 8.5) setOffset(limit + offset);
  };

  const submit = async (data: Room): Promise<void> => {
    await updateRoom(id as string, data, api)
      .then((res) => reset(res))
      .catch(console.log);
  };

  return (
    <Grid container direction="row" sx={{ height: '100%' }}>
      <Grid item xs={3}>
        <Paper sx={{ height: '100%' }}>
          <form onSubmit={handleSubmit(submit)}>
            <Grid container padding={3}>
              <Grid item xs={12} mb={4} mt={2}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        variant="outlined"
                        disabled
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ style: { borderRadius: '16px' } }}
                        label="Name"
                        fullWidth
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} mb={4}>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        variant="outlined"
                        multiline
                        minRows={5}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ style: { borderRadius: '16px' } }}
                        label="Description"
                        fullWidth
                      />
                    );
                  }}
                />
              </Grid>
              <Button
                fullWidth
                variant="contained"
                disabled={!formState.isDirty}
                style={{ borderRadius: '16px' }}
                type="submit"
              >
                Update Room
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Grid item xs m={3} mt={3}>
        <RoomChat messageHistory={messageHistory} socket={chatSocket} roomUsers={roomUsers.users} />
      </Grid>
      <Grid item xs={3} m={3}>
        <Divider sx={{ marginBottom: '12px', marginTop: '12px' }}>{ROLES.ADMIN}</Divider>
        {roomUsers !== undefined &&
          roomUsers.users.filter((user) => user.role === ROLES.ADMIN).length > 0 && (
            <UserList
              users={roomUsers.users.filter((user) => user.role === ROLES.ADMIN)}
              handleScroll={handleScroll}
            />
          )}
        <Divider sx={{ marginBottom: '12px', marginTop: '12px' }}>{ROLES.MEMBER}</Divider>
        {roomUsers !== undefined &&
          roomUsers.users.filter((user) => user.role === ROLES.MEMBER).length > 0 && (
            <UserList
              users={roomUsers.users.filter((user) => user.role === ROLES.MEMBER)}
              handleScroll={handleScroll}
            />
          )}
      </Grid>
    </Grid>
  );
};

export default RoomView;
