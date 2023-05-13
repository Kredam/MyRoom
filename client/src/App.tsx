import React, { useContext } from 'react';
import modules from 'App.modules';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from 'layouts';
import routes from 'routes/routes';
import AuthContext from './hooks/AuthProvider';

interface Props {
  isAuthed: boolean;
  component: React.ReactElement;
}
const ProtectRoute = ({ isAuthed, component }: Props): React.ReactElement => {
  if (!isAuthed) return <Navigate to={routes.Login} replace={true} />;
  return component;
};

const App = (): React.ReactElement => {
  const { auth } = useContext(AuthContext);
  return (
    <div style={{ backgroundColor: 'rgba(162, 162, 162, 0.10)' }}>
      <Navbar />
      <Routes>
        {modules.map((module) => {
          if (module.authed) {
            return (
              <Route
                key={module.id}
                path={module.path}
                element={
                  <ProtectRoute isAuthed={auth.access !== ''} component={module.component} />
                }
              />
            );
          }
          return <Route key={module.id} path={module.path} element={module.component} />;
        })}
      </Routes>
    </div>
  );
};

export default App;
