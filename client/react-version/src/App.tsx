import './App.css';
import modules from 'App.modules'
import {Grid} from '@mui/material'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Grid>
      <Routes>
        {modules.map((module) => {
          return <Route key={module.id} path={module.path} element={module.component} />
        })}
      </Routes>
    </Grid>
  );
}

export default App;
