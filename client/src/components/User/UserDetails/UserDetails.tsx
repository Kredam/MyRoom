import React from 'react';
import { Paper } from '@mui/material';

import styles from './UserDetails.styles';

const UserDetails = (): React.ReactElement => {
  return (
    <Paper elevation={1} sx={styles.paper}>
      Details
    </Paper>
  );
};

export default UserDetails;
