import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

interface Props {
  submit: (pendingChanges: Object) => void;
  type: String;
}

const CommonForm = ({ submit, type }: Props): React.ReactElement => {
  const [pendingChanges, setPendingChanges] = useState({ username: '', password: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    setPendingChanges((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Grid item xs={12}>
        <TextField
          onChange={handleChange}
          label="Username"
          fullWidth
          name="username"
          value={pendingChanges.username}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          onChange={handleChange}
          label="Password"
          fullWidth
          type="password"
          name="password"
          value={pendingChanges.password}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" onClick={() => submit(pendingChanges)}>
          {type}
        </Button>
      </Grid>
    </>
  );
};

export default CommonForm;
