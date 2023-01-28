import { Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useState } from 'react';

const VisibilityDetails = (): React.ReactElement => {
  const [alignment, setAlignment] = useState<string | null>();

  const handleAlignment = (_: React.MouseEvent<HTMLElement>, newAlignment: string | null): void => {
    setAlignment(newAlignment);
  };

  return (
    <Grid container alignItems="center" spacing={4}>
      <Grid item xs={4} sx={{ marginBottom: '12px', textAlign: 'center' }}>
        <Typography variant="subtitle1">Content Visibility</Typography>
      </Grid>
      <Grid item xs={8} sx={{ marginBottom: '12px', textAlign: 'center' }}>
        <ToggleButtonGroup exclusive onChange={handleAlignment} value={alignment}>
          <ToggleButton value="no NSFW" sx={{ width: '150px' }} aria-label="left aligned">
            no NSFW
          </ToggleButton>
          <ToggleButton value="NSFW" sx={{ width: '150px' }} aria-label="right">
            NSFW
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

export default VisibilityDetails;
