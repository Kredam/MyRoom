import * as React from 'react';
import { Paper } from '@mui/material';
import { SETTINGOPTIONS } from 'utils/settings';
import UserSettings from './UserSettings';

interface props {
  view: string;
}

export const SettingsSwitch = ({ view }: props): React.ReactElement => {
  return (
    <>
      {view === SETTINGOPTIONS.USER}
      <Paper elevation={4}>
        <UserSettings />
      </Paper>
    </>
  );
};

export default SettingsSwitch;
