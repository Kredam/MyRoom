import React, { UIEvent, useContext, useEffect, useState } from 'react';
import Utils from '../../../utils';
import {
  fetchFollowedRoomsQuery,
  fetchFollowedUsers,
  usersFetchQuery
} from 'api/services/services';
import UserList from 'components/User/UserList/UserList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { UsersQuery } from 'models/User';
import AuthContext from 'hooks/AuthProvider';
import { Grid } from '@mui/material';
import { UsersTable } from 'components/Tables';

interface props {
  isShown: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDetail: React.Dispatch<React.SetStateAction<number>>;
  selectedDetail: number;
}

interface followedUsersParams {
  pk: number;
  offset: number;
  tableOffset: number;
}

const UsersView = ({ isShown, setSelectedDetail, selectedDetail }: props): React.ReactElement => {
  const { auth } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [tableOffset, setTableOffset] = useState<number>(0);
  const [offset, setOffset] = useState(0);
  const { data: usersData, isSuccess } = usersFetchQuery(offset);
  const { data: followedUsers } = fetchFollowedRoomsQuery(
    -1,
    Utils.LIMIT,
    tableOffet,
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
    mutationFn: async ({ pk, offset }: followedUsersParams) =>
      await fetchFollowedUsers(pk, Utils.LIMIT, offset, useAxiosPrivate()),
    onSuccess: async (result: UsersQuery) => {
      const prevFollows: UsersQuery | undefined = queryClient.getQueryData(['followed-users']);
      if (prevFollows !== undefined) {
        queryClient.setQueryData(['followed-rooms'], {
          nrOfUsers: result.nrOfUsers,
          users: [...prevFollows.users, result.users]
        });
      }
    }
  });

  useEffect(() => {
    if (selectedDetail === -1) return;
    setTableOffset(0);
  }, [selectedDetail]);

  useEffect(() => {
    mutateFollowedUsers.mutate({ pk: selectedDetail, offset: tableOffset });
  }, [tableOffset]);

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
        <Grid item xs>
          <UsersTable />
        </Grid>
      </Grid>
    );
  }
  return <></>;
};

export default UsersView;
