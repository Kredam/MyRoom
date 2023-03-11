import React, { useEffect, useState } from 'react';
import { UserDetails, UsersTable } from 'components';
import { useQueryClient } from '@tanstack/react-query';
import { UsersQuery } from 'models/User';
import { postFollowUser } from 'api/services/services';
import { useSnackbar } from 'notistack';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Grid } from '@mui/material';
interface props {
  selectedDetail: number;
}

const UserDetailsView = ({ selectedDetail }: props): React.ReactElement => {
  const queryClient = useQueryClient();
  const api = useAxiosPrivate();
  const [tableOffset, setTableOffset] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();
  const user = queryClient.getQueryData<UsersQuery>(['users'])?.users[selectedDetail];
  const followedUsers = queryClient.getQueryData<UsersQuery>(['followed-users']);
  const followUser = (userId: number): void => {
    postFollowUser(userId, api)
      .then(() => enqueueSnackbar(`un/followed`, { variant: 'success' }))
      // .catch(() => enqueueSnackbar(`Something went wrong`, { variant: 'error' }));
      .catch(console.log);
  };

  useEffect(() => {
    console.log(tableOffset);
    setTableOffset(0);
    queryClient.setQueryData(['followed-users'], null);
    // mutateFollowedUsers.mutate({ pk: selectedDetail, offset: tableOffset, api });
  }, [selectedDetail]);

  if (user !== undefined) {
    return (
      <Grid container justifyContent="center">
        <Grid item xs>
          <UserDetails user={user} followUser={followUser} />;
        </Grid>
        <Grid item xs>
          <UsersTable followedUsers={followedUsers} />
        </Grid>
      </Grid>
    );
  }
  return <div>Opps something went wrong</div>;
};

export default UserDetailsView;
