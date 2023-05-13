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
import { ROLES } from 'consts/index';

interface props {
  selectedDetail: number;
}

const RoomDetailView = ({ selectedDetail }: props): React.ReactElement => {
  const queryClient = useQueryClient();
  const customApi = useAxiosPrivate();
  const { enqueueSnackbar } = useSnackbar();
  const room = queryClient.getQueryData<RoomQuery>(['rooms'])?.rooms[selectedDetail];
  const { data: roomUsers } = fetchRoomRelatedUsersQuery();

  const followRoom = (name: string): void => {
    postFollowRoom(name, customApi)
      .then((res) => enqueueSnackbar(res, { variant: 'success' }))
      .catch(console.log);
  };

  const numberOfRoles = (role: string): number => {
    if (roomUsers !== undefined && roomUsers !== null) {
      console.log(roomUsers);
      return roomUsers.users.filter((user) => user.role === role).length;
    }
    return 0;
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs>
        {room !== undefined && (
          <RoomDetail
            numberMembers={numberOfRoles(ROLES.MEMBER)}
            numberAdmins={numberOfRoles(ROLES.ADMIN)}
            room={room}
            followRoom={followRoom}
          />
        )}
      </Grid>
      <Grid item xs>
        {roomUsers !== undefined && <UsersTable followedUsers={roomUsers} />}
      </Grid>
    </Grid>
  );
};

export default RoomDetailView;
