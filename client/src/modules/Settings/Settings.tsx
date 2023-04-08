import { SettingsList } from 'components';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import SettingsSwitch from './SettingsSwitch';
const Settings = (): React.ReactElement => {
  const [view, setView] = useState<string>('User');

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={3}>
        <SettingsList setView={setView} />
      </Grid>
      <Grid item xs={1} />
      <Grid item xs>
        <SettingsSwitch view={view} />
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default Settings;
