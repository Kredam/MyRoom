import { api, privateApi } from 'api/http-common';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { Follows, RoomQuery } from 'models/Room';
import { User, UsersQuery } from 'models/User';
import Utils from 'utils';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosInstance, AxiosResponse } from 'axios';

export const fetchUserInfo = async (): Promise<User> => {
  return await useAxiosPrivate()
    .get<User>('users/info')
    .then((response) => response.data);
};

export const postFollowRoom = async (name: string): Promise<String> => {
  return await useAxiosPrivate()
    .post('rooms/follow/', { name })
    .then((response) => response.data);
};

export const fetchFollowedRooms = (privateAxios: AxiosInstance) => async (): Promise<Follows[]> => {
  const result = await privateAxios.get<Follows[]>('rooms/followed-rooms/');
  return result.data;
};

export const fetchFollowedUsers = async (
  pk: number,
  limit: number,
  offset: number,
  api: AxiosInstance
): Promise<UsersQuery> => {
  const result = await api.post<UsersQuery>('users/user-follows', { pk, limit, offset });
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

export const fetchFollowedUsersQuery = (
  pk: number,
  limit: number,
  offset: number,
  authed: boolean
): UseQueryResult<UsersQuery> => {
  const api = authed ? useAxiosPrivate() : privateApi;
  return useQuery(['followed-users'], async () => await fetchFollowedUsers(pk, limit, offset, api));
};

export const followsQuery = (enabled: boolean): UseQueryResult<Follows[]> =>
  useQuery(['followed-rooms'], fetchFollowedRooms(useAxiosPrivate()), {
    retry: 2,
    enabled
  });

export const usersFetchQuery = (offset: number): UseQueryResult<UsersQuery> =>
  useQuery(['users'], fetchUsers(offset));
