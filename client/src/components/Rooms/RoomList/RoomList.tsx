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
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Props {
  rooms: Room[];
  auth: any;
  handleScroll: (event: UIEvent<HTMLUListElement>) => void;
}

const RoomList = ({ rooms, auth, handleScroll }: Props): React.ReactElement => {
  return (
    <Paper sx={styles.list}>
      <List sx={styles.basicGrid} onScroll={handleScroll}>
        {rooms?.map((room: Room) => {
          return (
            <ListItem
              sx={styles.item}
              key={room.name}
              divider
              secondaryAction={
                <>
                  {auth.access.length > 0 && (
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      // onClick={() => postFollow(room.name)}
                    >
                      <MoreVertIcon />
                      {/* {follows.some((item) => item.room === room.name) ? ( */}
                      {/*  <CheckBoxIcon /> */}
                      {/* ) : ( */}
                      {/*  <AddBoxIcon /> */}
                      {/* )} */}
                    </IconButton>
                  )}
                </>
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
