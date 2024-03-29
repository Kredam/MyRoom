import { api } from 'api/http-common';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { MessageHistory, Room, RoomQuery } from 'models/Room';
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

export const fetchRoomInfo = async (name: string): Promise<Room> => {
  const result = await api.get(`rooms/retrieve/${name}`);
  return result.data;
};

export const updateRoom = async (
  name: string,
  data: Room,
  customApi: AxiosInstance
): Promise<Room> => {
  const result = await customApi.post(`rooms/update/${name}`, data);
  return result.data;
};

export const fetchRoomUsers = async (
  name: string | undefined,
  customApiInstance: AxiosInstance | null = api
): Promise<UsersQuery> => {
  let customApi = api;
  if (customApiInstance != null) customApi = customApiInstance;
  const result = await customApi.get<UsersQuery>('rooms/followed-rooms', { params: { name } });
  return result.data;
};
export const fetchFollowedRooms = async (
  pk: number,
  customApiInstance: AxiosInstance | null = api
): Promise<RoomQuery> => {
  let customApi = api;
  if (customApiInstance != null) customApi = customApiInstance;
  const result = await customApi.get<RoomQuery>('users/room-follows', {
    params: { user_pk: pk }
  });
  return result.data;
};

export const fetchMessageHistory = async (room: string): Promise<MessageHistory[]> => {
  const result = await api.get<MessageHistory[]>(`chat/${room}/history`);
  return result.data;
};

export const fetchFollowedUsers = async (
  pk: number,
  customApiInstance: AxiosInstance | null
): Promise<UsersQuery> => {
  let customApi = api;
  if (customApiInstance != null) customApi = customApiInstance;
  const result = await customApi.get<UsersQuery>('users/user-follows', {
    params: { pk }
  });
  return result.data;
};

export const fetchUsers =
  (offset: number, customApi: AxiosInstance) => async (): Promise<UsersQuery> => {
    const result = await customApi.get<UsersQuery>('users/all', { params: { limit, offset } });
    return result.data;
  };

export const fetchRooms = (offset: number) => async (): Promise<RoomQuery> => {
  const result = await api.get<RoomQuery>('rooms/all', { params: { limit, offset } });
  return result.data;
};

export const createRoomPost = async (data: Room, api: AxiosInstance): Promise<Room> => {
  const result = await api.post<Room>('rooms/create', data);
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
  useQuery(['room-related-users'], async () => await fetchRoomUsers(undefined, api), {
    enabled: false
  });

export const fetchFollowedUsersQuery = (
  pk: number,
  authed: boolean
): UseQueryResult<UsersQuery> => {
  const customApi = authed ? useAxiosPrivate() : api;
  return useQuery(['followed-users'], async () => await fetchFollowedUsers(pk, customApi), {
    enabled: false
  });
};

export const fetchFollowedRoomsQuery = (pk: number, authed: boolean): UseQueryResult<RoomQuery> => {
  const customApi = authed ? useAxiosPrivate() : api;
  return useQuery(['followed-rooms'], async () => await fetchFollowedRooms(pk, customApi), {
    enabled: false
  });
};

export const usersFetchQuery = (offset: number, authed: boolean): UseQueryResult<UsersQuery> => {
  const customApi = authed ? useAxiosPrivate() : api;
  return useQuery(['users'], fetchUsers(offset, customApi));
};
