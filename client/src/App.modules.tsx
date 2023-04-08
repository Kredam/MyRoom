import React from 'react';
import { MainMenu } from 'components';
import { Login, Register, Spaces, Settings, Profile, LandingPage, RoomView } from 'modules';
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
    id: 'spaces',
    path: routes.Spaces,
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
  },
  {
    id: 'room',
    path: protected_routes.Room,
    component: <RoomView />,
    authed: false
  }
];

export default modules;
