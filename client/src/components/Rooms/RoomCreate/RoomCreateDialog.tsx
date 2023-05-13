/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { Dialog, Grid, TextField, Button } from '@mui/material';
import { Control, Controller, FormState, UseFormHandleSubmit } from 'react-hook-form';
import { Room } from 'models/Room';
import * as constraints from 'consts/constraints';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  control: Control<Room>;
  formState: FormState<Room>;
  createRoom: (room: Room) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<Room>;
}

const RoomCreateDialog = ({
  open,
  onClose,
  control,
  formState,
  createRoom,
  handleSubmit
}: DialogProps): React.ReactElement => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { borderRadius: '16px' } }}>
      <form onSubmit={handleSubmit(createRoom)}>
        <Grid container padding={3}>
          <Grid item xs={12} mb={4} mt={2}>
            <Controller
              control={control}
              name="name"
              rules={constraints.ROOM.NAME}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ style: { borderRadius: '16px' } }}
                    label="Name"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12} mb={4}>
            <Controller
              control={control}
              name="description"
              rules={constraints.ROOM.DESCRIPTION}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    variant="outlined"
                    multiline
                    minRows={5}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ style: { borderRadius: '16px' } }}
                    label="Description"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12} mb={4}>
            <Controller
              control={control}
              name="picture"
              rules={constraints.ROOM.DESCRIPTION}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    variant="outlined"
                    multiline
                    minRows={5}
                    InputLabelProps={{ shrink: true }}
                    type="url"
                    InputProps={{ style: { borderRadius: '16px' } }}
                    label="Picture"
                    fullWidth
                  />
                );
              }}
            />
          </Grid>
          <Button
            fullWidth
            variant="contained"
            disabled={!formState.isDirty}
            style={{ borderRadius: '16px' }}
            type="submit"
          >
            Create Room
          </Button>
        </Grid>
      </form>
    </Dialog>
  );
};

export default RoomCreateDialog;
