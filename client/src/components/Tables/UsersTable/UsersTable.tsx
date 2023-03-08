import React from 'react';
import { UsersQuery } from 'models/User';
import { TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface props {
  followedUsers: UsersQuery;
}

const HEADERS: string[] = ['Username', 'First name', 'Last name', 'Followed'];
const UsersTable = ({ followedUsers }: props): React.ReactElement => {
  return (
    <TableContainer>
      <TableHead>
        <TableRow>
          {HEADERS.map((header) => (
            <TableCell key={header}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {followedUsers.users.map((user) => {
          return (
            <>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
            </>
          );
        })}
      </TableBody>
    </TableContainer>
  );
};

export default UsersTable;
