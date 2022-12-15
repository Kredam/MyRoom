import { useContext } from 'react';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import AuthContext from './AuthProvider';

const useRefreshToken = (): any => {
  const { setAuth } = useContext(AuthContext);
  const privateApi = useAxiosPrivate();

  const refresh = async (): Promise<void> => {
    await privateApi.post('token/refresh').then((res) => {
      setAuth((prev) => ({
        ...prev,
        access: res.data.access
      }));
    });
  };

  return refresh;
};

export default useRefreshToken;
