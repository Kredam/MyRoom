import { api } from 'api/http-common';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { RoomQuery } from 'models/Room';
import { User, UsersQuery } from 'models/User';
import { Utils } from 'consts';
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

export const fetchFollowedRooms = async (
  pk: number,
  limit: number,
  offset: number,
  customApi: AxiosInstance
): Promise<RoomQuery> => {
  const result = await customApi.post<RoomQuery>('users/room-follows', {
    user_pk: pk,
    limit,
    offset
  });
  return result.data;
};

export const fetchFollowedUsers = async (
  pk: number,
  limit: number,
  offset: number,
  customApi: AxiosInstance
): Promise<UsersQuery> => {
  const result = await customApi.post<UsersQuery>('users/user-follows', {
    pk,
    limit,
    offset
  });
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
  customApi: AxiosInstance
): Promise<AxiosResponse<string>> => {
  return await customApi.post<string>('users/follow', { id: userId });
};

export const roomsQuery = (offset: number): UseQueryResult<RoomQuery> =>
  useQuery(['rooms'], fetchRooms(offset));

export const fetchFollowedUsersQuery = (
  pk: number,
  limit: number,
  offset: number,
  authed: boolean
): UseQueryResult<UsersQuery> => {
  const customApi = authed ? useAxiosPrivate() : api;
  return useQuery(
    ['followed-users'],
    async () => await fetchFollowedUsers(pk, limit, offset, customApi),
    { retry: false }
  );
};

export const fetchFollowedRoomsQuery = (
  pk: number,
  limit: number,
  offset: number,
  authed: boolean
): UseQueryResult<RoomQuery> => {
  const customApi = authed ? useAxiosPrivate() : api;
  return useQuery(
    ['followed-rooms'],
    async () => await fetchFollowedRooms(pk, limit, offset, customApi),
    { retry: false }
  );
};

export const usersFetchQuery = (offset: number): UseQueryResult<UsersQuery> =>
  useQuery(['users'], fetchUsers(offset));
