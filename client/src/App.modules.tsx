import React from 'react';
import { MainMenu } from 'components';
import { Home, Login, Register, Rooms, Settings } from 'modules';
import routes from 'routes/routes';

const modules = [
  {
    id: 'main-menu',
    path: routes.MainMenu,
    component: <MainMenu />
  },
  {
    id: 'rooms',
    path: routes.Rooms,
    component: <Rooms />
  },
  {
    id: 'home',
    path: routes.Home,
    component: <Home />
  },
  {
    id: 'settings',
    path: routes.Settings,
    component: <Settings />
  },
  {
    id: 'login',
    path: routes.Login,
    component: <Login />
  },
  {
    id: 'register',
    path: routes.Register,
    component: <Register />
  }
];

export default modules;
