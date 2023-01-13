import { SettingsList } from 'components';
import * as React from 'react';
import { Grid } from '@mui/material';
import SettingsSwitch from './SettingsSwitch';
const Settings = (): React.ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [view, setView] = React.useState('User');

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={3}>
        <SettingsList />
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
