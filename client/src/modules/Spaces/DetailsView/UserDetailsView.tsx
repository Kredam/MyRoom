import React from 'react';
import { UserDetails } from 'components';
import { useQueryClient } from '@tanstack/react-query';
import { UsersQuery } from 'models/User';
import { postFollowUser } from 'api/services/services';
import { useSnackbar } from 'notistack';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

interface props {
  selectedDetail: number;
}
const UserDetailsView = ({ selectedDetail }: props): React.ReactElement => {
  const queryClient = useQueryClient();
  const api = useAxiosPrivate();
  const { enqueueSnackbar } = useSnackbar();
  const user = queryClient.getQueryData<UsersQuery>(['users'])?.users[selectedDetail];

  const followUser = (userId: number): void => {
    postFollowUser(userId, api)
      .then(() => enqueueSnackbar(`un/followed`, { variant: 'success' }))
      // .catch(() => enqueueSnackbar(`Something went wrong`, { variant: 'error' }));
      .catch(console.log);
  };

  if (user !== undefined) {
    return <UserDetails user={user} followUser={followUser} />;
  }
  return <div>Opps something went wrong</div>;
};

export default UserDetailsView;
