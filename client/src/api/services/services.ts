import { api } from 'api/http-common';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { Follows, RoomQuery } from 'models/Room';
import { User, UsersQuery } from 'models/User';
import Utils from 'utils';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosInstance, AxiosResponse } from 'axios';

// export const fetchThread = async (limit: number, offset: number): Promise<AxiosResponse> => {
//   return await useAxiosPrivate().post('article/thread', { limit, offset });
// };

export const fetchUserInfo = async (): Promise<User> => {
  return await useAxiosPrivate()
    .get<User>('users/info')
    .then((response) => response.data);
};

export const postFollow = async (name: string): Promise<String> => {
  return await useAxiosPrivate()
    .post('rooms/follow/', { name })
    .then((response) => response.data);
};

export const fetchFollows = (privateAxios: AxiosInstance) => async (): Promise<Follows[]> => {
  const result = await privateAxios.get<Follows[]>('rooms/followed-rooms/');
  return result.data;
};

export const fetchUsers = (offset: number) => async (): Promise<UsersQuery> => {
  const limit = Utils.LIMIT;
  const result = await api.post<UsersQuery>('users/all', { limit, offset });
  return result.data;
};

export const fetchRooms = (offset: number) => async (): Promise<RoomQuery> => {
  const limit = Utils.LIMIT;
  const result = await api.post<RoomQuery>('rooms/', { limit, offset });
  return result.data;
};

export const postFollowUser = async (
  userId: number,
  api: AxiosInstance
): Promise<AxiosResponse<string>> => {
  return await api.post<string>('users/follow', { id: userId });
};

export const roomsQuery = (offset: number): UseQueryResult<RoomQuery> =>
  useQuery(['rooms'], fetchRooms(offset));

export const followsQuery = (enabled: boolean): UseQueryResult<Follows[]> =>
  useQuery(['follows'], fetchFollows(useAxiosPrivate()), {
    retry: 2,
    enabled
  });

export const usersFetchQuery = (offset: number): UseQueryResult<UsersQuery> =>
  useQuery(['users'], fetchUsers(offset));

// write on invalid hook call -> must be called inside functinonal component

// export const fetchUserInfo = async (): Promise<User> => {
//   return await useAxiosPrivate()
//     .get<User>('users/info')
//     .then((response) => response.data);
// };
