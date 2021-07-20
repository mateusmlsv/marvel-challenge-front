import React, {
    createContext,
    useCallback,
    useState,
    useEffect,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import { api } from '../services/api'

interface UserAthenticated {
  id: number;
  email: string;
  name: string;
}

interface AuthState {
  token: string;
  user: object;
}

interface SignIncredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: UserAthenticated;
  token: string;
  loading: boolean;
  signIn(credentials: SignIncredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@Marvel:token',
        '@Marvel:user',
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('login', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@Marvel:token', token],
      ['@Marvel:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Marvel:token', '@Marvel:token']);

    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut, token: data.token }}>
      {children}
    </AuthContext.Provider>
  );
};