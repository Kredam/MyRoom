import { AxiosResponse } from 'axios';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const axiosPrivate = useAxiosPrivate();

export const fetchThread = async (limit: number, offset: number): Promise<AxiosResponse> => {
  return await axiosPrivate.post('article/thread', { limit, offset });
};
