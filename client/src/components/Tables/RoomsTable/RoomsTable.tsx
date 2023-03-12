import React from 'react';
import { RoomQuery } from 'models/Room';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import styles from '../Table.styles';
interface props {
  followedRooms: RoomQuery | undefined;
}

const HEADERS: string[] = ['Name', 'Description'];
const RoomsTable = ({ followedRooms }: props): React.ReactElement => {
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
          {followedRooms?.rooms.map((room) => {
            return (
              <TableRow sx={styles.row} component={Paper} key={room.name}>
                <TableCell>@{room.name}</TableCell>
                <TableCell>{room.description}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoomsTable;
