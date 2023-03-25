import React, { UIEvent, useContext, useState } from 'react';
import { Utils } from 'consts';
import { fetchFollowedRooms, fetchFollowedUsers, usersFetchQuery } from 'api/services/services';
import UserList from 'components/User/UserList/UserList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { UsersQuery } from 'models/User';
import AuthContext from 'hooks/AuthProvider';
import { Grid } from '@mui/material';
import { AxiosInstance } from 'axios';
import { api } from 'api/http-common';
import { RoomQuery } from 'models/Room';

interface props {
  isShown: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDetail: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedDetail: number | undefined;
}

interface followedUsersParams {
  pk: number;
  offset: number;
  customApi: AxiosInstance;
}

const UsersListView = ({
  isShown,
  setSelectedDetail,
  selectedDetail
}: props): React.ReactElement => {
  const { auth } = useContext(AuthContext);
  const customApi = auth.access !== '' ? useAxiosPrivate() : api;
  const queryClient = useQueryClient();
  const [offset, setOffset] = useState(0);
  const { data: usersData, isSuccess } = usersFetchQuery(offset);

  const handleScroll = (event: UIEvent<HTMLUListElement>): void => {
    if (usersData !== undefined && Utils.LIMIT + offset > usersData.nrOfUsers) return;
    const scrollTop: number = event.currentTarget.scrollTop;
    const scrollHeight: number = event.currentTarget.scrollHeight;
    const clientHeight: number = event.currentTarget.clientHeight;
    if (clientHeight + scrollTop > scrollHeight - 100) setOffset(Utils.LIMIT + offset);
    // if ((scrollTop * Utils.ITEM_HEIGHT) / scrollHeight > 8.5) setOffset(limit + offset);
  };

  const mutateFollowedUsers = useMutation({
    mutationFn: async ({ pk, offset, customApi }: followedUsersParams) =>
      await fetchFollowedUsers(pk, offset, customApi),
    onSuccess: async (result: UsersQuery) => {
      const prevFollows = queryClient.getQueryData<UsersQuery>(['followed-users']);
      if (prevFollows != null) {
        queryClient.setQueryData(['followed-users'], {
          nrOfUsers: result.nrOfUsers,
          users: [...prevFollows.users, ...result.users]
        });
      } else {
        queryClient.setQueryData(['followed-users'], {
          ...result
        });
      }
    }
  });

  const mutateFollowedRooms = useMutation({
    mutationFn: async ({ pk, offset, customApi }: followedUsersParams) =>
      await fetchFollowedRooms(pk, offset, customApi),
    onSuccess: async (result: RoomQuery) => {
      const prevFollows = queryClient.getQueryData<RoomQuery>(['followed-rooms']);
      if (prevFollows != null) {
        queryClient.setQueryData(['followed-rooms'], {
          nrOfObjects: result.nrOfObjects,
          rooms: [...prevFollows.rooms, ...result.rooms]
        });
      } else {
        queryClient.setQueryData(['followed-rooms'], {
          ...result
        });
      }
    }
  });

  const getFollowedUsers = (selectedUser: number): void => {
    if (selectedDetail === selectedUser) return;
    const pk = queryClient.getQueryData<UsersQuery>(['users'])?.users[selectedUser].id as number;
    mutateFollowedUsers.mutate({ pk, offset: 0, customApi });
    mutateFollowedRooms.mutate({ pk, offset: 0, customApi });
  };

  if (isSuccess) {
    return (
      <Grid container>
        <Grid item xs>
          <UserList
            users={usersData?.users}
            isShown={isShown}
            setSelectedDetail={setSelectedDetail}
            handleScroll={handleScroll}
            postFollow={undefined}
            getFollowedUser={getFollowedUsers}
          />
        </Grid>
      </Grid>
    );
  }
  return <></>;
};

export default UsersListView;
