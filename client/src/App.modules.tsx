import React from 'react';
import { MainMenu } from 'components';
import { Login, Register, Spaces, Settings, Profile, LandingPage } from 'modules';
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
    id: 'landing-page',
    path: routes.LandingPage,
    component: <LandingPage />,
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
