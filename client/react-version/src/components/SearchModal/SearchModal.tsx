import {
  Grid,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import SearchField from 'components/SearchField/SearchField';
import { RoomSearch } from 'models/Room';
import React from 'react';
// import styles from './SearchModal.styles';
// import SearchIcon from '@mui/icons-material/Search';

interface Props {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: React.ComponentState;
  openModal: React.ComponentState;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  results: RoomSearch[];
  autoFocus: boolean;
}

const SearchModal = ({
  handleSearch,
  search,
  openModal,
  setOpenModal,
  results,
  autoFocus
}: Props): React.ReactElement => {
  return (
    <Dialog
      BackdropProps={{ style: { backgroundColor: 'transparent' } }}
      PaperProps={{
        sx: {
          position: 'fixed',
          top: 12,
          margin: 0,
          marginLeft: 9,
          borderRadius: 5,
          boxShadow: 'none',
          minWidth: '650px',
          maxWidth: '100%',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'
        }
      }}
      open={openModal}
      onClose={() => setOpenModal(false)}
    >
      <DialogTitle sx={{ padding: 0 }}>
        <SearchField autoFocus={autoFocus} onChange={handleSearch} name="search" value={search} />
      </DialogTitle>
      <DialogContent sx={{ minHeight: '350px', padding: '10px 12px' }}>
        {results?.map((result, index) => {
          return (
            <>
              <Divider sx={{ marginBottom: '10px', marginTop: '10px' }} />
              <Grid container key={index}>
                <Grid item xs={2}>
                  <Avatar sx={{ width: 30, height: 30, margin: 'auto', marginTop: '10px' }}>
                    H
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1"> {result.room_id}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption">{result.followers_nr} members</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined"> Show More</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchModal;
