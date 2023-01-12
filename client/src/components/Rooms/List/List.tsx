import React from 'react';
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

interface Props {
  rooms: Room[];
  follows: Follows[];
  auth: any;
  postFollow: CallableFunction;
}

const RoomList = ({ rooms, follows, auth, postFollow }: Props): React.ReactElement => {
  return (
    <>
      <List>
        {rooms.map((room: Room) => {
          return (
            <>
              <ListItem
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
                <ListItemText primary={room.name} secondary={room.description} />
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
