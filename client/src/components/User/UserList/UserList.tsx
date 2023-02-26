import React, { UIEvent } from 'react';
import { User } from 'models/User';
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
  users: User[];
  // follows: Follows[];
  auth: any;
  postFollow: CallableFunction | undefined;
  handleScroll: (event: UIEvent<HTMLUListElement>) => void;
  isShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserList = ({ users, auth, handleScroll, isShown }: Props): React.ReactElement => {
  return (
    <Paper sx={styles.list}>
      <List onScroll={(e) => handleScroll(e)}>
        {users?.map((user: User) => {
          return (
            <>
              <ListItem
                divider
                sx={styles.item}
                key={user.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments" onClick={() => isShown(true)}>
                    <MoreVertIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar alt={user.first_name} src="" />
                </ListItemAvatar>
                {/* <CardMedia component="img" height="140" image={room.picture} alt={room.name} /> */}
                <ListItemText
                  primary={user.username}
                  sx={styles.itemText}
                  secondary={user.username}
                />
              </ListItem>
            </>
          );
        })}
      </List>
    </Paper>
  );
};

export default UserList;
