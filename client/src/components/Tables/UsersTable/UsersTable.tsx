import React, { useContext } from 'react';
import { UsersQuery } from 'models/User';
import styles from '../Table.styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AuthContext from 'hooks/AuthProvider';
import { elapsedTime } from 'utils';
interface props {
  followedUsers: UsersQuery;
}

const HEADERS = ['Username', 'First name', 'Last name', 'Last login'];
const UsersTable = ({ followedUsers }: props): React.ReactElement => {
  const { auth } = useContext(AuthContext);
  return (
    <TableContainer sx={styles.table}>
      <Table stickyHeader>
        <TableHead component={Paper} sx={styles.header}>
          <TableRow>
            {auth.access !== '' && <TableCell>Mutual</TableCell>}
            {HEADERS.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {followedUsers?.users.map((user) => {
            return (
              <TableRow sx={styles.row} component={Paper} key={user.id}>
                {auth.access !== '' && (
                  <TableCell>{user.is_followed === true && <CheckCircleOutlineIcon />}</TableCell>
                )}
                <TableCell>@{user.username}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{elapsedTime(user.last_login).toString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
