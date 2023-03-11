import React from 'react';
import { UsersQuery } from 'models/User';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import styles from './UsersTable.styles';
interface props {
  followedUsers: UsersQuery | undefined;
}

const HEADERS: string[] = ['Username', 'First name', 'Last name'];
const UsersTable = ({ followedUsers }: props): React.ReactElement => {
  return (
    <TableContainer sx={styles.table}>
      <Table>
        <TableHead component={Paper} sx={styles.header}>
          <TableRow>
            {HEADERS.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {followedUsers?.users.map((user) => {
            return (
              <TableRow component={Paper} key={user.id}>
                <TableCell>@{user.username}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
