/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState, useContext } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import UsersListView from './ListView/UsersListView';
import UserDetailsView from './DetailsView/UserDetailsView';
import RoomDetailsView from './DetailsView/RoomDetailsView';
import RoomsListView from './ListView/RoomsListView';
import { Views } from 'consts';
import AuthContext from 'hooks/AuthProvider';
import { RoomCreateDialog } from 'components';
import { Room } from 'models/Room';
import { useForm } from 'react-hook-form';
import { createRoomPost } from 'api/services/services';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';

const defaultValue = {
  name: '',
  description: '',
  picture: ''
};

const Spaces = (): React.ReactElement => {
  const { auth } = useContext(AuthContext);
  const api = useAxiosPrivate();
  const { enqueueSnackbar } = useSnackbar();
  const { control, formState, handleSubmit, reset } = useForm<Room>({
    defaultValues: defaultValue
  });
  const [open, isOpen] = useState(false);
  const [shown, isShown] = useState(false);
  const [listType, setListType] = useState<string>(Views.USERS);
  // selected index wof the user array
  const [selectedDetail, setSelectedDetail] = useState<number | undefined>(undefined);
  const listTypeChange = (_: React.MouseEvent<HTMLElement>, type: string | null): void => {
    if (type === null) return;
    setListType(type);
  };

  const onClose = (): void => {
    isOpen(false);
    reset(defaultValue);
  };

  useEffect(() => {
    isShown(false);
  }, [listType]);

  const createRoom = async (data: Room): Promise<void> => {
    await createRoomPost(data, api)
      .then(() => {
        enqueueSnackbar(`${data.name} created successfully`, { variant: 'success' });
        isOpen(false);
      })
      .catch((error: AxiosError) => {
        enqueueSnackbar(JSON.stringify(error.response?.data), { variant: 'error' });
      });
  };

  return (
    <>
      <RoomCreateDialog
        open={open}
        createRoom={createRoom}
        handleSubmit={handleSubmit}
        onClose={onClose}
        formState={formState}
        control={control}
      />
      <Grid container direction="row" spacing={3} padding={3}>
        <Grid item xs={4}>
          <Grid container direction="row" alignContent="center" alignItems="center">
            {auth.access !== '' && (
              <Grid item xs={9}>
                <Button onClick={() => isOpen(true)} variant="outlined">
                  Create Room
                </Button>
              </Grid>
            )}
            {/* <RoomsView /> */}
            <Grid item xs>
              <ToggleButtonGroup
                exclusive
                value={listType}
                onChange={listTypeChange}
                sx={{ margin: '12px' }}
              >
                <ToggleButton value={Views.USERS}>{Views.USERS}</ToggleButton>
                <ToggleButton value={Views.ROOMS}>{Views.ROOMS}</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          {listType === Views.USERS && (
            <UsersListView
              isShown={isShown}
              setSelectedDetail={setSelectedDetail}
              selectedDetail={selectedDetail}
            />
          )}
          {listType === Views.ROOMS && (
            <RoomsListView isShown={isShown} setSelectedDetail={setSelectedDetail} />
          )}
        </Grid>
        <Grid item xs>
          {shown && selectedDetail !== undefined && listType === Views.USERS && (
            <UserDetailsView selectedDetail={selectedDetail} />
          )}
          {shown && selectedDetail !== undefined && listType === Views.ROOMS && (
            <RoomDetailsView selectedDetail={selectedDetail} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Spaces;
