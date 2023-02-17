import React, { UIEvent } from 'react';
import { Follows, Room } from 'models/Room';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText,
  IconButton
} from '@mui/material';

import styles from './List.styles';

interface Props {
  rooms: Room[] | undefined;
  follows: Follows[];
  auth: any;
  handleScroll: (event: UIEvent) => void;
  postFollow: CallableFunction;
}

const RoomList = ({
  rooms,
  follows,
  auth,
  postFollow,
  handleScroll
}: Props): React.ReactElement => {
  return (
    <>
      <List sx={styles.basicGrid} onScroll={handleScroll}>
        {rooms?.map((room: Room) => {
          return (
            <>
              <ListItem
                sx={styles.itemHeight}
                key={room.name}
                secondaryAction={
                  <>
                    {auth.access.length > 0 && (
                      <IconButton
                        edge="end"
                        aria-label="comments"
                        onClick={() => postFollow(room.name)}
                      >
                        {follows.some((item) => item.room === room.name) ? (
                          <CheckBoxIcon />
                        ) : (
                          <AddBoxIcon />
                        )}
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
                  secondary={room.description}
                />
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
    </>
  );
};

export default RoomList;
