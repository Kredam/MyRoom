import {
  Grid,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import SearchField from 'components/Search/SearchField/SearchField';
import routes from 'routes/routes';
import { RoomSearch } from 'models/Room';
import React from 'react';
import styles from './SearchModal.styles';
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
  const navigate = useNavigate();
  return (
    <Dialog
      BackdropProps={{ style: { backgroundColor: 'transparent' } }}
      PaperProps={{
        sx: styles.paperProps
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
                <Grid item xs={2}>
                  <Button variant="contained" onClick={() => navigate(`/room/${result.room_id}`)}>
                    Connect
                  </Button>
                </Grid>
              </Grid>
            </>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => navigate(routes.Spaces)}>
          Show More
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchModal;
