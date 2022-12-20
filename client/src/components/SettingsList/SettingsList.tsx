import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import React from 'react';

import { ISettingsMenu, SettingMenu } from 'utils/settings';

const SettingsList = (): React.ReactElement => {
  return (
    <List>
      {SettingMenu.map((setting: ISettingsMenu) => {
        return (
          <Paper elevation={4} sx={{ borderRadius: 8, marginBottom: '12px' }} key={setting.name}>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>{<setting.icon />}</ListItemIcon>
                <ListItemText primary={setting.name} />
              </ListItemButton>
            </ListItem>
          </Paper>
        );
      })}
    </List>
  );
};

export default SettingsList;
