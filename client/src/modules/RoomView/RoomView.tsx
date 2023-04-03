/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Button, Grid, TextField, Typography } from '@mui/material';
import AuthContext from 'hooks/AuthProvider';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReadyState } from 'react-use-websocket';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import routes from 'routes/routes';

const RoomView = (): React.ReactElement => {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [messageHistory, setMessageHistory] = useState<MessageEvent[]>([]);
  const url = `${process.env.REACT_APP_WEBSOCKET_URL as string}${id as string}/`;
  const { sendMessage, readyState, lastMessage } = useWebSocket(url, {
    queryParams: { token: auth.access }
  });

  console.log(readyState);

  useEffect(() => {
    console.log(lastMessage);
    if (lastMessage !== null) {
      setMessageHistory((prev) => [...prev, lastMessage]);
    }
  }, [lastMessage, setMessageHistory]);

  useLayoutEffect(() => {
    if (readyState === ReadyState.CLOSED) navigate(routes.LandingPage);
  }, [readyState]);

  return (
    <Grid container padding={6}>
      <div>{id}</div>
      <Button onClick={() => sendMessage(message)}>Send</Button>
      <Grid item>
        <TextField
          name="message"
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
        />
      </Grid>
      <Grid item>
        {messageHistory.map((message, index) => (
          <Typography key={index}>{message.data}</Typography>
        ))}
      </Grid>
    </Grid>
  );
};

export default RoomView;
