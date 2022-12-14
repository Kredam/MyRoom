import React, { createContext, useState } from 'react';
export interface IAuth {
  access: string;
  refresh: string;
}

export interface AuthContextType {
  auth: IAuth;
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>;
}

const defaultAuth = { access: '', refresh: '' };

const AuthContext = createContext<AuthContextType>({
  auth: defaultAuth,
  setAuth: () => defaultAuth
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, react/prop-types
export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState(defaultAuth);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
