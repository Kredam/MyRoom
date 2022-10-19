import { useContext } from 'react';
import { privateApi as api } from 'utils/http-common';
import AuthContext from './AuthProvider';

const useRefreshToken = (): any => {
  const { setAuth } = useContext(AuthContext);

  const refresh = async (): Promise<void> => {
    return await api.post('token/refresh').then((res) => {
      setAuth((prev) => ({
        ...prev,
        access: res.data.access
      }));
    });
  };

  return refresh;
};

export default useRefreshToken;
