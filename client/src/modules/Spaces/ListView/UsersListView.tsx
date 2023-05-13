import React, { UIEvent, useContext, useEffect, useState } from 'react';
import { Utils } from 'consts';
import { fetchFollowedRooms, fetchFollowedUsers, usersFetchQuery } from 'api/services/services';
import UserList from 'components/User/UserList/UserList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { UsersQuery } from 'models/User';
import AuthContext from 'hooks/AuthProvider';
import { Grid } from '@mui/material';
import { AxiosInstance } from 'axios';
import { RoomQuery } from 'models/Room';

interface props {
  isShown: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDetail: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedDetail: number | undefined;
}

interface followedUsersParams {
  pk: number;
  customApi: AxiosInstance;
}

interface IStatus {
  user: number;
  online: boolean;
}

const UsersListView = ({
  isShown,
  setSelectedDetail,
  selectedDetail
}: props): React.ReactElement => {
  const queryClient = useQueryClient();
  const { auth, lastStatusMessage } = useContext(AuthContext);
  const [offset, setOffset] = useState(0);
  const { data: usersData, isSuccess } = usersFetchQuery(offset, auth.access !== '');
  const customApi = useAxiosPrivate();

  const handleScroll = (event: UIEvent<HTMLUListElement>): void => {
    if (usersData !== undefined && Utils.LIMIT + offset > usersData.nrOfUsers) return;
    const scrollTop: number = event.currentTarget.scrollTop;
    const scrollHeight: number = event.currentTarget.scrollHeight;
    const clientHeight: number = event.currentTarget.clientHeight;
    if (clientHeight + scrollTop > scrollHeight - 100) setOffset(Utils.LIMIT + offset);
  };

  const mutateFollowedUsers = useMutation({
    mutationFn: async ({ pk, customApi }: followedUsersParams) =>
      await fetchFollowedUsers(pk, customApi),
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
    mutationFn: async ({ pk, customApi }: followedUsersParams) =>
      await fetchFollowedRooms(pk, customApi),
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

  const mutateUserStatus = useMutation({
    onMutate: (variables: IStatus) => {
      const users = queryClient.getQueryData<UsersQuery>(['users']);
      users?.users.map((user) => {
        if (user.id === variables.user) {
          user.online = variables.online;
          return user;
        }
        return user;
      });
    }
  });

  useEffect(() => {
    if (lastStatusMessage !== null) {
      const message = JSON.parse(lastStatusMessage.data);
      mutateUserStatus.mutate(message);
    }
  }, [lastStatusMessage]);

  const getFollowedUsers = (selectedUser: number): void => {
    if (selectedDetail === selectedUser) return;
    const pk = queryClient.getQueryData<UsersQuery>(['users'])?.users[selectedUser].id as number;
    mutateFollowedUsers.mutate({ pk, customApi });
    mutateFollowedRooms.mutate({ pk, customApi });
  };

  const handleDetailSelection = (pk: number): void => {
    setSelectedDetail(pk);
    getFollowedUsers(pk);
    isShown(true);
  };

  if (isSuccess) {
    return (
      <Grid container>
        <Grid item xs>
          <UserList
            users={usersData?.users}
            handleScroll={handleScroll}
            handleDetailSelection={handleDetailSelection}
          />
        </Grid>
      </Grid>
    );
  }
  return <></>;
};

export default UsersListView;
