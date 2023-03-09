import React, { useEffect, useState } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import UsersView from './ListView/UsersView';
import UserDetails from './DetailsView/UserDetailsView';
import RoomsView from './ListView/RoomsView';

const Spaces = (): React.ReactElement => {
  const [shown, isShown] = useState(false);
  const [listType, setListType] = useState<string>('User');
  // selected index wof the user array
  const [selectedDetail, setSelectedDetail] = useState<number | null>(null);
  const listTypeChange = (event: React.MouseEvent<HTMLElement>, type: string | null): void => {
    if (type === null) return;
    setListType(type);
  };

  useEffect(() => {
    isShown(false);
  }, [listType]);

  return (
    <Grid container direction="row" spacing={3} padding={3}>
      <Grid item xs={4}>
        {/* <RoomsView /> */}
        <ToggleButtonGroup
          exclusive
          value={listType}
          onChange={listTypeChange}
          sx={{ margin: '12px' }}
        >
          <ToggleButton value="User">User</ToggleButton>
          <ToggleButton value="Rooms">Rooms</ToggleButton>
        </ToggleButtonGroup>
        {listType === 'User' && (
          <UsersView
            isShown={isShown}
            setSelectedDetail={setSelectedDetail}
            selectedDetail={selectedDetail}
          />
        )}
        {listType === 'Rooms' && <RoomsView />}
      </Grid>
      <Grid item xs>
        {shown && selectedDetail !== null ? <UserDetails selectedDetail={selectedDetail} /> : null}
      </Grid>
      <Grid item xs />
    </Grid>
  );
};

export default Spaces;
