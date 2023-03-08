import React, { UIEvent, useContext, useEffect, useState } from 'react';
import Utils from '../../../utils';
import {
  fetchFollowedUsers,
  fetchFollowedUsersQuery,
  usersFetchQuery
} from 'api/services/services';
import UserList from 'components/User/UserList/UserList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { UsersQuery } from 'models/User';
import AuthContext from 'hooks/AuthProvider';
import { Grid } from '@mui/material';
import { UsersTable } from 'components/Tables';
import { AxiosInstance } from 'axios';
import { privateApi } from '../../../api/http-common';

interface props {
  isShown: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDetail: React.Dispatch<React.SetStateAction<number>>;
  selectedDetail: number;
}

interface followedUsersParams {
  pk: number;
  offset: number;
  api: AxiosInstance;
}

const UsersView = ({ isShown, setSelectedDetail, selectedDetail }: props): React.ReactElement => {
  const { auth } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [tableOffset, setTableOffset] = useState<number>(0);
  const [offset, setOffset] = useState(0);
  const { data: usersData, isSuccess } = usersFetchQuery(offset);
  const { data: followedUsers, isSuccess: fetchFollowSuccess } = fetchFollowedUsersQuery(
    -1,
    Utils.LIMIT,
    tableOffset,
    auth.access !== ''
  );

  const handleScroll = (event: UIEvent<HTMLUListElement>): void => {
    if (usersData !== undefined && Utils.LIMIT + offset > usersData.nrOfUsers) return;
    const scrollTop: number = event.currentTarget.scrollTop;
    const scrollHeight: number = event.currentTarget.scrollHeight;
    const clientHeight: number = event.currentTarget.clientHeight;
    if (clientHeight + scrollTop > scrollHeight - 100) setOffset(Utils.LIMIT + offset);
    // if ((scrollTop * Utils.ITEM_HEIGHT) / scrollHeight > 8.5) setOffset(limit + offset);
  };

  // const usersListMutation = useMutation({
  //   mutationFn: async (offset: number) => fetchUsers(offset)
  // });

  const mutateFollowedUsers = useMutation({
    mutationFn: async ({ pk, offset, api }: followedUsersParams) =>
      await fetchFollowedUsers(pk, Utils.LIMIT, offset, api),
    onSuccess: async (result: UsersQuery) => {
      await queryClient.cancelQueries(['followed-users']);
      const prevFollows: UsersQuery | undefined = queryClient.getQueryData(['followed-users']);
      if (prevFollows !== undefined) {
        queryClient.setQueryData(['followed-users'], {
          nrOfUsers: result.nrOfUsers,
          users: [...prevFollows.users, result.users]
        });
      }
    }
  });

  useEffect(() => {
    const api = auth.access !== '' ? useAxiosPrivate() : privateApi;
    mutateFollowedUsers.mutate({ pk: selectedDetail, offset: tableOffset, api });
  }, [tableOffset]);

  useEffect(() => {
    if (selectedDetail === -1) return;
    setTableOffset(0);
    console.log(selectedDetail);
    const api = auth.access !== '' ? useAxiosPrivate() : privateApi;
    mutateFollowedUsers.mutate({ pk: selectedDetail, offset: tableOffset, api });
  }, [selectedDetail]);

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
          />
        </Grid>
        {fetchFollowSuccess && (
          <Grid item xs>
            <UsersTable followedUsers={followedUsers} />
          </Grid>
        )}
      </Grid>
    );
  }
  return <></>;
};

export default UsersView;
