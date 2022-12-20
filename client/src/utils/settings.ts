import UserIcon from '@mui/icons-material/AccountCircleOutlined';
import { SvgIconProps } from '@mui/material';

export const SETTINGOPTIONS = {
  USER: 'User'
};

export interface ISettingsMenu {
  name: string;
  icon: (props: SvgIconProps) => JSX.Element;
}

export const SettingMenu: ISettingsMenu[] = [
  {
    name: 'User',
    icon: UserIcon
  },
  {
    name: 'Valami',
    icon: UserIcon
  }
];
