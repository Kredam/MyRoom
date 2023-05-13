import { Grid, TextField, Typography } from '@mui/material';
import React, { ChangeEvent } from 'react';

// const modifyableOptions: string[] = ['New Password', 'Old Password', 'Username'];

interface IPendingChanges {
  Username: string;
  Old_password: string;
  New_password: string;
}

interface props {
  pendingChanges: IPendingChanges;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UserOption = ({ pendingChanges, handleChange }: props): React.ReactElement => {
  return (
    <Grid container direction="column">
      {Object.keys(pendingChanges).map((option: string) => {
        return (
          <Grid
            container
            direction="row"
            key={option}
            alignContent="center"
            sx={{ padding: '14px' }}
          >
            <Grid item xs={2}>
              <Typography variant="body1">{option.replace('_', ' ')}</Typography>
            </Grid>
            <Grid item xs />
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                onChange={handleChange}
                // disabled={!modifyableOptions.includes(option)}
                name={option}
                value={pendingChanges[option as keyof IPendingChanges]}
              />
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default UserOption;
