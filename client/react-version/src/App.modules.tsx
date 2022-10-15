import React from 'react';
import { MainMenu } from 'components';
import { Home, Entry, Rooms } from 'modules';
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
    id: 'login',
    path: routes.Login,
    component: <Entry />
  },
  {
    id: 'register',
    path: routes.Register,
    component: <Entry />
  }
];

export default modules;
