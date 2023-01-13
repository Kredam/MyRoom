import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { RoomList } from 'components';
import AuthContext from 'hooks/AuthProvider';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { Follows, Room } from 'models/Room';

import React, { useContext, useEffect, useState } from 'react';
import { api, privateApi } from 'api/http-common';
import { AxiosResponse } from 'axios';

const Rooms = (): React.ReactElement => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const [followedRooms, setFollowedRooms] = useState<Follows[]>([]);
  const fetchRooms = async (): Promise<Room[]> => {
    return await api.get('rooms/all/').then((response) => response.data);
  };

  const fetchFollows = async (): Promise<Follows[]> => {
    return await axiosPrivate
      .get<Follows[]>('rooms/followed-rooms/')
      .then((response: AxiosResponse<Follows[]>) => {
        setFollowedRooms(response.data);
        return response.data;
      });
  };

  const followsQuery = useQuery(['follows'], fetchFollows, {
    retry: 2,
    enabled: auth.access.length !== 0
  });

  const roomsQuery = useQuery(['rooms'], fetchRooms);

  const postFollow = (name: string): void => {
    privateApi
      .post('rooms/follow/', { name })
      .then((response: AxiosResponse<String>) => {
        if (response.data === 'Followed') {
          const newFollow: Follows = { room: name, isAdmin: false, user: undefined };
          setFollowedRooms((prev: Follows[]) => [...prev, newFollow]);
        }
        if (response.data === 'Unfollowed') {
          setFollowedRooms(followedRooms.filter((item) => item.room !== name));
        }
      })
      .catch(console.log);
  };

  useEffect(() => {
    if (!followsQuery.isSuccess) return;
    setFollowedRooms(followsQuery.data);
  }, []);

  return (
    <Grid container direction="row" spacing={3}>
      <Grid item xs={2} />
      <Grid item xs>
        {roomsQuery.isSuccess ? (
          <RoomList
            follows={followedRooms}
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
