import React, { useEffect, useState } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import UsersListView from './ListView/UsersListView';
import UserDetailsView from './DetailsView/UserDetailsView';
import RoomDetailsView from './DetailsView/RoomDetailsView';
import RoomsListView from './ListView/RoomsListView';
import { Views } from 'consts';

const Spaces = (): React.ReactElement => {
  const [shown, isShown] = useState(false);
  const [listType, setListType] = useState<string>(Views.USERS);
  // selected index wof the user array
  const [selectedDetail, setSelectedDetail] = useState<number | undefined>(undefined);
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
          <ToggleButton value={Views.USERS}>{Views.USERS}</ToggleButton>
          <ToggleButton value={Views.ROOMS}>{Views.ROOMS}</ToggleButton>
        </ToggleButtonGroup>
        {listType === Views.USERS && (
          <UsersListView
            isShown={isShown}
            setSelectedDetail={setSelectedDetail}
            selectedDetail={selectedDetail}
          />
        )}
        {listType === Views.ROOMS && <RoomsListView setSelectedDetail={setSelectedDetail} />}
      </Grid>
      <Grid item xs>
        {shown && selectedDetail !== undefined && listType === Views.USERS ? (
          <UserDetailsView selectedDetail={selectedDetail} />
        ) : null}
        {shown && selectedDetail !== undefined && listType === Views.ROOMS ? (
          <RoomDetailsView selectedDetail={selectedDetail} />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default Spaces;
