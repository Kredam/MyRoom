import { User } from 'models/User';
import React, { createContext, useState } from 'react';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
export interface IAuth {
  access: string;
  refresh: string;
}

export interface AuthContextType {
  auth: IAuth;
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>;
  lastStatusMessage: MessageEvent | null;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// interface IStatus {
//   user: number;
//   online: boolean;
// }

const defaultAuth = { access: '', refresh: '' };

const AuthContext = createContext<AuthContextType>({
  auth: defaultAuth,
  setAuth: () => defaultAuth,
  lastStatusMessage: null,
  user: null,
  setUser: () => {}
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, react/prop-types
export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState(defaultAuth);
  const [user, setUser] = useState<User | null>(null);
  const statusUrl = `${process.env.REACT_APP_WEBSOCKET_URL as string}join/`;
  const statusSocket = useWebSocket(statusUrl, {
    queryParams: { token: auth.access }
  });

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, lastStatusMessage: statusSocket.lastMessage, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
