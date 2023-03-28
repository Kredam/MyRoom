import React from 'react';
import { UsersQuery } from 'models/User';
// import columns from '../configs/User.columns';
// import styles from '../Table.styles';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import columns from '../configs/User.columns';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
interface props {
  followedUsers: UsersQuery;
}

const UsersTable = ({ followedUsers }: props): React.ReactElement => {
  const table = useReactTable({
    data: followedUsers.users,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <TableContainer sx={styles.table}>
        <Table>
          <TableHead component={Paper} sx={styles.header}>
            <TableRow>
              <TableCell>Mutual</TableCell>
              {HEADERS.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {followedUsers?.users.map((user) => {
              return (
                <TableRow sx={styles.row} component={Paper} key={user.id}>
                  <TableCell>{user.is_followed === true && <CheckCircleOutlineIcon />}</TableCell>
                  <TableCell>@{user.username}</TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
};

export default UsersTable;
