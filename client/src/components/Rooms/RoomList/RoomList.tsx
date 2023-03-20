import React, { UIEvent } from 'react';
import { Room } from 'models/Room';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Paper
} from '@mui/material';

import styles from './List.styles';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Props {
  rooms: Room[];
  auth: any;
  setSelectedDetail: React.Dispatch<React.SetStateAction<number | undefined>>;
  handleScroll: (event: UIEvent<HTMLUListElement>) => void;
}

const RoomList = ({ rooms, auth, handleScroll, setSelectedDetail }: Props): React.ReactElement => {
  return (
    <Paper sx={styles.list}>
      <List sx={styles.basicGrid} onScroll={handleScroll}>
        {rooms?.map((room: Room, id) => {
          return (
            <ListItem
              sx={styles.item}
              key={room.name}
              divider
              secondaryAction={
                <IconButton edge="end" aria-label="comments" onClick={() => setSelectedDetail(id)}>
                  <VisibilityIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar alt={room.name} src={room.picture} />
              </ListItemAvatar>
              {/* <CardMedia component="img" height="140" image={room.picture} alt={room.name} /> */}
              <ListItemText
                primary={room.name}
                sx={styles.itemText}
                // secondary={room.description}
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default RoomList;
