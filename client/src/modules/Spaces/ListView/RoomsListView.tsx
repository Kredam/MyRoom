import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RoomList } from 'components';
import AuthContext from 'hooks/AuthProvider';

import React, { useContext, useEffect, useState, UIEvent } from 'react';
import { fetchRooms, roomsQuery } from 'api/services/services';
import Utils from 'utils';
import { RoomQuery } from 'models/Room';

const RoomsView = (): React.ReactElement => {
  const { auth } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [offset, setOffset] = useState<number>(0);
  const { data: roomsData, isSuccess } = roomsQuery(offset);

  const handleScroll = (event: UIEvent<HTMLUListElement>): void => {
    if (roomsData !== undefined && Utils.LIMIT + offset > roomsData.nrOfObjects) return;
    const scrollTop: number = event.currentTarget.scrollTop;
    const scrollHeight: number = event.currentTarget.scrollHeight;
    const clientHeight: number = event.currentTarget.clientHeight;
    if (clientHeight + scrollTop > scrollHeight - 100) setOffset(Utils.LIMIT + offset);
    // if ((scrollTop * Utils.ITEM_HEIGHT) / scrollHeight > 8.5) setOffset(limit + offset);
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

  // const mutateFollows = useMutation({
  //   mutationFn: async (name: string) => await postFollowRoom(name),
  //   onMutate: async (data: string) => {
  //     await queryClient.cancelQueries(['follows']);
  //     const prevFollows = queryClient.getQueryData<Follows[]>(['follows']);
  //     if (prevFollows != null && data === 'Unfollowed') {
  //       queryClient.setQueryData<Follows[]>(['follows'], {
  //         ...prevFollows.filter((follow) => follow.room !== data)
  //       });
  //     }
  //     if (data === 'Followed') {
  //       const optimisticFollow: Follows = { room: data, isAdmin: false, user: undefined };
  //       queryClient.setQueryData(['follows'], {
  //         ...prevFollows,
  //         optimisticFollow
  //       });
  //     }
  //     await queryClient.invalidateQueries({ queryKey: ['follows'] });
  //   }
  // });

  useEffect(() => {
    mutateRooms.mutate();
  }, [offset]);

  return (
    <>
      {isSuccess ? (
        <RoomList
          // setOffset={setOffset}
          // limit={limit}
          handleScroll={handleScroll}
          rooms={roomsData.rooms}
          auth={auth}
        />
      ) : null}
    </>
  );
};

export default RoomsView;
