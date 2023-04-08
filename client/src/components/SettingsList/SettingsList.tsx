import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import React from 'react';

import { ISettingsMenu, SettingMenu } from 'utils/settings';

interface props {
  setView: React.Dispatch<React.SetStateAction<string>>;
}

const SettingsList = ({ setView }: props): React.ReactElement => {
  return (
    <List>
      {SettingMenu.map((setting: ISettingsMenu) => {
        return (
          <ListItem key={setting.name}>
            <Paper elevation={4} sx={{ borderRadius: 8, marginBottom: '12px', width: '100%' }}>
              <ListItemButton sx={{ borderRadius: 8 }} onClick={() => setView(setting.name)}>
                <ListItemIcon>{<setting.icon />}</ListItemIcon>
                <ListItemText primary={setting.name} />
              </ListItemButton>
            </Paper>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SettingsList;
