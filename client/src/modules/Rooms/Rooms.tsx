import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { RoomList } from 'components';
import AuthContext from 'hooks/AuthProvider';
import { Follows, RoomQuery } from 'models/Room';

import React, { useContext, useEffect, useState, UIEvent } from 'react';
import { AxiosResponse } from 'axios';
import { fetchFollows, fetchRooms, postFollow } from 'api/services/services';

const Rooms = (): React.ReactElement => {
  const { auth } = useContext(AuthContext);
  const [limit] = useState<number>(15);
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const [offset, setOffset] = useState<number>(0);
  const [rooms, setRooms] = useState<RoomQuery>();
  const [followedRooms, setFollowedRooms] = useState<Follows[]>([]);

  const followPromise = async (): Promise<Follows[]> => {
    return await fetchFollows().then((response: AxiosResponse<Follows[]>) => {
      setFollowedRooms(response.data);
      return response.data;
    });
  };

  const handleScroll = (event: UIEvent): void => {
    if (limit + offset > rooms?.nrOfObjects) return;
    const scrollTop: number = event.currentTarget.scrollTop;
    const scrollHeight: number = event.currentTarget.scrollHeight;
    const clientHeight: number = event.currentTarget.clientHeight;
    if (clientHeight + scrollTop > scrollHeight - 100) setOffset(limit + offset);
    // if ((scrollTop * Utils.ITEM_HEIGHT) / scrollHeight > 8.5) setOffset(limit + offset);
  };

  const follow = (name: string): void => {
    postFollow(name)
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

  const followsQuery = useQuery(['follows'], followPromise, {
    retry: 2,
    enabled: auth.access.length !== 0
  });

  const roomsQuery = useQuery(['rooms'], fetchRooms(limit, offset));

  useEffect(() => {
    if (!followsQuery.isSuccess) return;
    setFollowedRooms(followsQuery.data);
  }, []);

  useEffect(() => {
    roomsQuery
      .refetch()
      .then((res) => setRooms(res.data))
      .catch(console.log);
  }, [offset]);

  return (
    <Grid container direction="row" spacing={3}>
      <Grid item xs={1} />
      <Grid item xs={5}>
        {roomsQuery.isSuccess ? (
          <RoomList
            // setOffset={setOffset}
            // limit={limit}
            handleScroll={handleScroll}
            follows={followedRooms}
            rooms={rooms?.rooms}
            postFollow={follow}
            auth={auth}
          />
        ) : null}
      </Grid>
      <Grid item xs={5}>
        {roomsQuery.isSuccess ? (
          <RoomList
            follows={followedRooms}
            handleScroll={handleScroll}
            rooms={rooms?.rooms}
            postFollow={follow}
            auth={auth}
          />
        ) : null}
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default Rooms;
