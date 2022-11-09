import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { RoomList } from 'components';
import AuthContext from 'hooks/AuthProvider';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { Follows, Room } from 'models/Room';
import React, { useContext } from 'react';
import { api, privateApi } from 'api/http-common';

const Rooms = (): React.ReactElement => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const fetchRooms = async (): Promise<Room[]> => {
    return await api.get('rooms/all/').then((response) => response.data);
  };

  const fetchFollows = async (): Promise<Follows[]> => {
    return await axiosPrivate.get('rooms/followed-rooms/').then((response) => response.data);
  };

  const followsQuery = useQuery(['follows'], fetchFollows, {
    enabled: auth.access.length !== 0
  });

  const roomsQuery = useQuery(['rooms'], fetchRooms);

  const postFollow = (name: string): void => {
    privateApi.post('rooms/follow/', { name }).then(console.log).catch(console.log);
  };

  return (
    <Grid container direction="row" spacing={3}>
      <Grid item xs={2} />
      <Grid item xs>
        {roomsQuery.isSuccess ? (
          <RoomList
            follows={followsQuery.isSuccess ? followsQuery.data : []}
            rooms={roomsQuery.data}
            postFollow={postFollow}
            auth={auth}
          />
        ) : null}
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );
};

export default Rooms;
