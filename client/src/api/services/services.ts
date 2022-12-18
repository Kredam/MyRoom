import { AxiosResponse } from 'axios';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

export const fetchThread = async (limit: number, offset: number): Promise<AxiosResponse> => {
  return await useAxiosPrivate().post('article/thread', { limit, offset });
};
