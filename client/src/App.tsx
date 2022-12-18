import React from 'react';
import modules from 'App.modules';
import { Grid } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from 'layouts';

const App = (): React.ReactElement => {
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
