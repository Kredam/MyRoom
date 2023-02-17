import { api } from 'api/http-common';
import { AxiosResponse } from 'axios';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { Follows, RoomQuery } from 'models/Room';
import { User } from 'models/User';

export const fetchThread = async (limit: number, offset: number): Promise<AxiosResponse> => {
  return await useAxiosPrivate().post('article/thread', { limit, offset });
};

export const fetchUserInfo = async (): Promise<User> => {
  return await useAxiosPrivate()
    .get<User>('users/info')
    .then((response) => response.data);
};

export const fetchAllUsers = async (): Promise<User[]> => {
  return await useAxiosPrivate()
    .get<User[]>('user/all')
    .then((response) => response.data);
};

export const postFollow = async (name: string): Promise<AxiosResponse> => {
  return await useAxiosPrivate().post('rooms/follow/', { name });
};

export const fetchFollows = async (): Promise<AxiosResponse> => {
  return await useAxiosPrivate().get<Follows[]>('rooms/followed-rooms/');
};

export const fetchRooms = (limit: number, offset: number) => async (): Promise<RoomQuery> => {
  return await api.post<RoomQuery>('rooms/', { limit, offset }).then((response) => response.data);
};
