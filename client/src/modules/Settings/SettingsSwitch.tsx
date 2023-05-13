import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { SETTINGOPTIONS } from 'utils/settings';
import UserSettings from './UserSettings';
import VisibilitySettings from './VisibilitySettings';
import { User } from 'models/User';
import { fetchUserInfo } from 'api/services/services';
import { useQuery } from '@tanstack/react-query';

interface props {
  view: string;
}

export const SettingsSwitch = ({ view }: props): React.ReactElement => {
  const [userInfo, setUserInfo] = useState<User>();

  const userInfoQuery = useQuery(['userInfo'], fetchUserInfo, {
    retry: 2
  });

  useEffect(() => {
    if (!userInfoQuery.isSuccess) return;
    setUserInfo(userInfoQuery.data);
  }, []);

  console.log(userInfo);

  return (
    <>
      {view === SETTINGOPTIONS.USER && (
        <Paper elevation={4}>
          <UserSettings />
        </Paper>
      )}
      {view === SETTINGOPTIONS.VISIBILITY && (
        <Paper elevation={4}>
          <VisibilitySettings />
        </Paper>
      )}
    </>
  );
};

export default SettingsSwitch;
