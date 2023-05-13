import React, { UIEvent } from 'react';
import { User } from 'models/User';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Paper,
  Grid
} from '@mui/material';
import styles from './List.styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
interface Props {
  users: User[];
  activeUsers?: number[];
  handleDetailSelection?: (pk: number) => void;
  handleScroll: (event: UIEvent<HTMLUListElement>) => void;
}

const UserList = ({ users, handleDetailSelection, handleScroll }: Props): React.ReactElement => {
  return (
    <Paper sx={styles.list}>
      <List onScroll={(e) => handleScroll(e)}>
        {users?.map((user: User, index) => {
          return (
            <>
              <ListItem
                sx={styles.item}
                key={user.id}
                secondaryAction={
                  handleDetailSelection != null && (
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      onClick={() => handleDetailSelection(index)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  )
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
                  secondary={
                    user.online ? (
                      <Grid container>
                        <FiberManualRecordIcon sx={{ color: 'green' }} />
                        online
                      </Grid>
                    ) : (
                      <Grid container>
                        <Grid item>
                          <FiberManualRecordIcon sx={{ color: 'gray' }} />
                        </Grid>
                        <Grid item>offline</Grid>
                      </Grid>
                    )
                  }
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
