import { api } from 'api/http-common';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { RoomChat, RoomQuery } from 'models/Room';
import { User, UsersQuery } from 'models/User';
import { Utils } from 'consts';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosInstance, AxiosResponse } from 'axios';

const limit = Utils.LIMIT;

export const fetchUserInfo = async (): Promise<User> => {
  return await useAxiosPrivate()
    .get<User>('users/info')
    .then((response) => response.data);
};

export const postFollowRoom = async (name: string, customApi: AxiosInstance): Promise<String> => {
  const result = await customApi.post('rooms/follow/', { name, role: 'MEMBER' });
  return result.data;
};

export const fetchRoomUsers = async (
  name: string | undefined,
  offset: number,
  customApi: AxiosInstance = api
): Promise<UsersQuery> => {
  const result = await customApi.post<UsersQuery>('rooms/followed-rooms/', { name, limit, offset });
  return result.data;
};
export const fetchFollowedRooms = async (
  pk: number,
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

export const fetchMessageHistory = async (room: string): Promise<RoomChat[]> => {
  const result = await api.get<RoomChat[]>(`chat/${room}/history`);
  return result.data;
};

export const fetchFollowedUsers = async (
  pk: number,
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
  const result = await api.post<UsersQuery>('users/all', { limit, offset });
  return result.data;
};

export const fetchRooms = (offset: number) => async (): Promise<RoomQuery> => {
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

export const fetchRoomRelatedUsersQuery = (): UseQueryResult<UsersQuery> =>
  useQuery(['room-related-user'], async () => await fetchRoomUsers(undefined, 15, api));

export const fetchFollowedUsersQuery = (
  pk: number,
  offset: number,
  authed: boolean
): UseQueryResult<UsersQuery> => {
  const customApi = authed ? useAxiosPrivate() : api;
  return useQuery(['followed-users'], async () => await fetchFollowedUsers(pk, offset, customApi), {
    retry: false
  });
};

export const fetchFollowedRoomsQuery = (
  pk: number,
  offset: number,
  authed: boolean
): UseQueryResult<RoomQuery> => {
  const customApi = authed ? useAxiosPrivate() : api;
  return useQuery(['followed-rooms'], async () => await fetchFollowedRooms(pk, offset, customApi), {
    retry: false
  });
};

export const usersFetchQuery = (offset: number): UseQueryResult<UsersQuery> =>
  useQuery(['users'], fetchUsers(offset));
