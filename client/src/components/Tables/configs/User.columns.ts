import { createColumnHelper } from '@tanstack/react-table';
import { User } from 'models/User';
import { elapsedTime } from 'utils';

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('first_name', {
    header: () => 'First name'
  }),
  columnHelper.accessor('last_name', {
    header: () => 'Last name'
  }),
  columnHelper.accessor('last_login', {
    cell: (info) => elapsedTime(info.getValue())
  }),
  columnHelper.accessor('is_followed', {
    header: 'Mutual'
  })
];

export default columns;
