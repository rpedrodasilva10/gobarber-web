import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthData {
  token: string;
  user: object;
}

interface AuthContextData {
  user: object;
  signIn({ email, password }: SignInCredentials): Promise<void>;
  signOut(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>(() => {
    const token = localStorage.getItem('@Gobarber:token');
    const user = localStorage.getItem('@Gobarber:user');

    return token && user ? { token, user: JSON.parse(user) } : ({} as AuthData);
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    localStorage.setItem('@Gobarber:token', response.data.token);
    localStorage.setItem('@Gobarber:user', JSON.stringify(response.data.user));
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Gobarber:token');
    localStorage.removeItem('@Gobarber:user');

    setAuthData({} as AuthData);
  }, []);

  return <AuthContext.Provider value={{ user: authData.user, signIn, signOut }}>{children}</AuthContext.Provider>;
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('Context must be used within an  AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
