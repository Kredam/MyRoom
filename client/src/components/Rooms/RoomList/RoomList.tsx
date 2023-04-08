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
  isShown: React.Dispatch<React.SetStateAction<boolean>>;
  getRoomUsers: (name: string) => void;
  setSelectedDetail: React.Dispatch<React.SetStateAction<number | undefined>>;
  handleScroll: (event: UIEvent<HTMLUListElement>) => void;
}

const RoomList = ({
  rooms,
  auth,
  getRoomUsers,
  handleScroll,
  setSelectedDetail,
  isShown
}: Props): React.ReactElement => {
  const handleClick = (name: string, index: number): void => {
    setSelectedDetail(index);
    getRoomUsers(name);
    isShown(true);
  };

  return (
    <Paper sx={styles.list}>
      <List sx={styles.basicGrid} onScroll={handleScroll}>
        {rooms?.map((room: Room, id) => {
          return (
            <ListItem
              sx={styles.item}
              key={room.name}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => handleClick(room.name, id)}
                >
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
