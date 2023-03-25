import React, { useEffect, useState } from 'react';
import { UserDetails, UsersTable, RoomsTable } from 'components';
import { useQueryClient } from '@tanstack/react-query';
import { UsersQuery } from 'models/User';
import {
  fetchFollowedRoomsQuery,
  fetchFollowedUsersQuery,
  postFollowUser
} from 'api/services/services';
import { useSnackbar } from 'notistack';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { Grid } from '@mui/material';
import { Utils } from 'consts';
interface props {
  selectedDetail: number;
}

const UserDetailsView = ({ selectedDetail }: props): React.ReactElement => {
  const queryClient = useQueryClient();
  const customApi = useAxiosPrivate();
  const [tableType, setTableType] = useState<string>(Utils.TABLE_TYPE.USERS);
  const [tableOffset, setTableOffset] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();
  const { data: followedUsers } = fetchFollowedUsersQuery(-1, tableOffset, false);
  const { data: followedRooms } = fetchFollowedRoomsQuery(-1, tableOffset, false);
  const user = queryClient.getQueryData<UsersQuery>(['users'])?.users[selectedDetail];
  const followUser = (userId: number): void => {
    postFollowUser(userId, customApi)
      .then(() => enqueueSnackbar(`un/followed`, { variant: 'success' }))
      .catch(console.log);
  };

  useEffect(() => {
    setTableOffset(0);
  }, [tableType]);

  useEffect(() => {
    console.log(tableOffset);
    setTableOffset(0);
    queryClient.setQueryData(['followed-users'], null);
    queryClient.setQueryData(['followed-rooms'], null);
  }, [selectedDetail]);

  if (user !== undefined) {
    return (
      <Grid container justifyContent="center">
        <Grid item xs>
          <UserDetails
            user={user}
            nrOfRoomsFollowed={followedRooms?.nrOfObjects}
            nrOfUsersFollowed={followedUsers?.nrOfUsers}
            setTableType={setTableType}
            followUser={followUser}
          />
          ;
        </Grid>
        <Grid item xs>
          {tableType === Utils.TABLE_TYPE.USERS && <UsersTable followedUsers={followedUsers} />}
          {tableType === Utils.TABLE_TYPE.ROOMS && <RoomsTable followedRooms={followedRooms} />}
        </Grid>
      </Grid>
    );
  }
  return <div>Opps something went wrong</div>;
};

export default UserDetailsView;
