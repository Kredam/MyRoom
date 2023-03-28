/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Grid } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { UsersTable, RoomDetail } from 'components';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { RoomQuery } from 'models/Room';
import { fetchRoomRelatedUsersQuery, postFollowRoom } from 'api/services/services';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

interface props {
  selectedDetail: number;
}

const RoomDetailView = ({ selectedDetail }: props): React.ReactElement => {
  const queryClient = useQueryClient();
  const customApi = useAxiosPrivate();
  const { enqueueSnackbar } = useSnackbar();
  const [tableOffset, setTableOffset] = useState<number>(0);
  const room = queryClient.getQueryData<RoomQuery>(['rooms'])?.rooms[selectedDetail];
  const { data: followedUsers } = fetchRoomRelatedUsersQuery();

  const followRoom = (name: string): void => {
    postFollowRoom(name, customApi)
      .then(() => enqueueSnackbar(`un/followed`, { variant: 'success' }))
      .catch(console.log);
  };

  console.log(room);

  return (
    <Grid container justifyContent="center">
      <Grid item xs>
        {room !== undefined && <RoomDetail room={room} followRoom={followRoom} />}
      </Grid>
      <Grid item xs>
        {followedUsers !== undefined && <UsersTable followedUsers={followedUsers} />}
      </Grid>
    </Grid>
  );
};

export default RoomDetailView;
