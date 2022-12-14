import React, { useEffect } from 'react';
import modules from 'App.modules';
import { Grid } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from 'layouts';
import useRefreshToken from 'hooks/useRefreshToken';

const App = (): React.ReactElement => {
  const refresh = useRefreshToken();

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Grid>
      <Navbar />
      <Routes>
        {modules.map((module) => {
          return <Route key={module.id} path={module.path} element={module.component} />;
        })}
      </Routes>
    </Grid>
  );
};

export default App;
