import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import RoomCards from 'components/Rooms/Cards/Cards';
import AuthContext from 'hooks/AuthProvider';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import Room from 'models/Room';
import React, { useContext } from 'react';
import { api } from 'utils/http-common';

const Rooms = (): React.ReactElement => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const fetchRooms = async (): Promise<Room[]> => {
    return await api.get('rooms/all/').then((response) => response.data);
  };

  const fetchFollows = async (): Promise<Object> => {
    return await axiosPrivate.get('rooms/followed-rooms/').then((response) => response.data);
  };

  const followsQuery = useQuery(['follows'], fetchFollows, {
    enabled: auth.access.length !== 0
  });
  const roomsQuery = useQuery(['rooms'], fetchRooms);

  return (
    <Grid container spacing={3}>
      {roomsQuery.isSuccess ? (
        <RoomCards follows={followsQuery.data} rooms={roomsQuery.data} />
      ) : null}
    </Grid>
  );
};

export default Rooms;
