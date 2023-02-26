import React from 'react';
import { MainMenu } from 'components';
import { Home, Login, Register, Spaces, Settings, Profile } from 'modules';
import routes from 'routes/routes';
import protected_routes from 'routes/protected.routes';

const modules = [
  {
    id: 'main-menu',
    path: routes.MainMenu,
    component: <MainMenu />,
    authed: false
  },
  {
    id: 'rooms',
    path: routes.List,
    component: <Spaces />,
    authed: false
  },
  {
    id: 'home',
    path: routes.Home,
    component: <Home />,
    authed: false
  },
  {
    id: 'settings',
    path: protected_routes.settings,
    component: <Settings />,
    authed: true
  },
  {
    id: 'login',
    path: routes.Login,
    component: <Login />,
    authed: false
  },
  {
    id: 'register',
    path: routes.Register,
    component: <Register />,
    authed: false
  },
  {
    id: 'profile',
    path: protected_routes.profile,
    component: <Profile />,
    authed: true
  }
];

export default modules;
