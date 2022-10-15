import React, { useContext } from 'react';
import { privateApi as api } from 'utils/http-common';
import AuthContext from './AuthProvider';

const useRefreshToken = (): any => {
  const { auth, setAuth } = useContext(AuthContext);
  console.log(auth);

  const refresh = async (): Promise<void> => {
    return await api.post('token/refresh', { refresh: auth.refresh }).then((res) => {
      console.log(res);
      setAuth((prev) => ({
        ...prev,
        access: res.data.access
      }));
    });
  };

  return refresh;
};

export default useRefreshToken;
