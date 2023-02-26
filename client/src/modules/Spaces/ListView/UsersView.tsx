import React, { UIEvent, useContext, useState } from 'react';
import AuthContext from 'hooks/AuthProvider';
import Utils from '../../../utils';
import { usersFetchQuery } from '../../../api/services/services';
import UserList from 'components/User/UserList/UserList';

interface props {
  isShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsersView = ({ isShown }: props): React.ReactElement => {
  const { auth } = useContext(AuthContext);
  // const queryClient = useQueryClient();
  const [offset, setOffset] = useState(0);
  const { data: usersData, isSuccess } = usersFetchQuery(offset);

  const handleScroll = (event: UIEvent<HTMLUListElement>): void => {
    if (usersData !== undefined && Utils.LIMIT + offset > usersData.nrOfUsers) return;
    const scrollTop: number = event.currentTarget.scrollTop;
    const scrollHeight: number = event.currentTarget.scrollHeight;
    const clientHeight: number = event.currentTarget.clientHeight;
    if (clientHeight + scrollTop > scrollHeight - 100) setOffset(Utils.LIMIT + offset);
    // if ((scrollTop * Utils.ITEM_HEIGHT) / scrollHeight > 8.5) setOffset(limit + offset);
  };

  // const usersListMutation = useMutation({
  //   mutationFn: async (offset: number) => fetchUsers(offset)
  // });

  if (isSuccess) {
    return (
      <UserList
        users={usersData?.users}
        auth={auth}
        isShown={isShown}
        handleScroll={handleScroll}
        postFollow={undefined}
      />
    );
  }
  return <></>;
};

export default UsersView;
