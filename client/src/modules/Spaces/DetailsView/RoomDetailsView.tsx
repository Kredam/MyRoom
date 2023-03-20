import { Grid } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { UsersTable } from 'components';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import React, { useState } from 'react';

interface props {
  selectedDetail: number;
}

const RoomDetailView = ({ selectedDetail }: props): React.ReactElement => {
  const queryClient = useQueryClient();
  const customApi = useAxiosPrivate();
  const [tableOffset, setTableOffset] = useState<number>(0);
  const user = queryClient.getQueryData<UsersQuery>(['users'])?.users[selectedDetail];

  return (
    <Grid container justifyContent="center">
      <Grid item xs>
        <RoomDetails />
      </Grid>
      <Grid item xs>
        <UsersTable followedUsers={followedUsers} />
      </Grid>
    </Grid>
  );
};

export default RoomDetailView;
