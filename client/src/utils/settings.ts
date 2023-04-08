import UserIcon from '@mui/icons-material/AccountCircleOutlined';
import VisibiltyIcon from '@mui/icons-material/VisibilityOutlined';
import { SvgIconProps } from '@mui/material';

export const SETTINGOPTIONS = {
  USER: 'User',
  VISIBILITY: 'Visibilities'
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
    name: 'Visibilities',
    icon: VisibiltyIcon
  }
];
