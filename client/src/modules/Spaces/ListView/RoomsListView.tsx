/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RoomList } from 'components';
import AuthContext from 'hooks/AuthProvider';

import React, { useContext, useEffect, useState, UIEvent } from 'react';
import { fetchRooms, fetchRoomUsers, roomsQuery } from 'api/services/services';
import { Utils } from 'consts';
import { RoomQuery } from 'models/Room';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { UsersQuery } from 'models/User';

interface props {
  setSelectedDetail: React.Dispatch<React.SetStateAction<number | undefined>>;
  isShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoomsListView = ({ setSelectedDetail, isShown }: props): React.ReactElement => {
  const queryClient = useQueryClient();
  const { auth } = useContext(AuthContext);
  const [offset, setOffset] = useState<number>(0);
  const { data: roomsData, isSuccess } = roomsQuery(offset);
  const customApi = useAxiosPrivate();

  const handleScroll = (event: UIEvent<HTMLUListElement>): void => {
    if (roomsData !== undefined && offset >= roomsData.nrOfObjects) return;
    const scrollTop: number = event.currentTarget.scrollTop;
    const scrollHeight: number = event.currentTarget.scrollHeight;
    const clientHeight: number = event.currentTarget.clientHeight;
    console.log(`${clientHeight} + ${scrollTop} > ${scrollHeight} - 100`);
    if (clientHeight + scrollTop > scrollHeight - 100) setOffset(Utils.LIMIT + offset);
  };

  const mutateRooms = useMutation({
    mutationFn: fetchRooms(offset),
    onSuccess: async (result: RoomQuery) => {
      const prevRooms = queryClient.getQueryData<RoomQuery>(['rooms']);
      if (prevRooms != null) {
        queryClient.setQueryData(['rooms'], {
          nrOfObjects: result.nrOfObjects,
          rooms: [...prevRooms.rooms, ...result.rooms]
        });
      }
    }
  });

  const mutateRoomUsers = useMutation({
    mutationFn: async ({ name, customApi }: any) => await fetchRoomUsers(name, customApi),
    onSuccess: async (result: UsersQuery) => {
      const prevFollows = queryClient.getQueryData<UsersQuery>(['room-related-users']);
      if (prevFollows != null) {
        queryClient.setQueryData(['room-related-users'], {
          nrOfUsers: result.nrOfUsers,
          users: [...prevFollows.users, ...result.users]
        });
      } else {
        queryClient.setQueryData(['room-related-users'], {
          ...result
        });
      }
    }
  });
  useEffect(() => {
    if (offset === 0) return;
    mutateRooms.mutate();
  }, [offset]);

  const getRoomUsers = (name: string): void => {
    queryClient.setQueryData(['room-related-users'], null);
    mutateRoomUsers.mutate({ name, customApi });
  };

  return (
    <>
      {isSuccess ? (
        <RoomList
          // setOffset={setOffset}
          // limit={limit}
          isShown={isShown}
          getRoomUsers={getRoomUsers}
          setSelectedDetail={setSelectedDetail}
          handleScroll={handleScroll}
          rooms={roomsData.rooms}
          auth={auth}
        />
      ) : null}
    </>
  );
};

export default RoomsListView;
