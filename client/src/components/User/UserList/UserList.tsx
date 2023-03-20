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
import VisibilityIcon from '@mui/icons-material/Visibility';
interface Props {
  users: User[];
  // follows: Follows[];
  setSelectedDetail: React.Dispatch<React.SetStateAction<number | undefined>>;
  postFollow: CallableFunction | undefined;
  handleScroll: (event: UIEvent<HTMLUListElement>) => void;
  isShown: React.Dispatch<React.SetStateAction<boolean>>;
  getFollowedUser: (selectedUser: number) => void;
}

const UserList = ({
  users,
  setSelectedDetail,
  handleScroll,
  getFollowedUser,
  isShown
}: Props): React.ReactElement => {
  const handleDetailSelection = (pk: number): void => {
    setSelectedDetail(pk);
    getFollowedUser(pk);
    isShown(true);
  };

  return (
    <Paper sx={styles.list}>
      <List onScroll={(e) => handleScroll(e)}>
        {users?.map((user: User, index) => {
          return (
            <>
              <ListItem
                divider
                sx={styles.item}
                key={user.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => handleDetailSelection(index)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={styles.avatar}>
                    {user?.first_name[0]}
                    {user?.last_name[0]}
                  </Avatar>
                </ListItemAvatar>
                {/* <CardMedia component="img" height="140" image={room.picture} alt={room.name} /> */}
                <ListItemText
                  primary={`${user.first_name} ${user.last_name}`}
                  sx={styles.itemText}
                  secondary={'@' + user.username}
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
