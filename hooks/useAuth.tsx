import { AppleAuthenticationCredential } from 'expo-apple-authentication';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user?: AppleAuthenticationCredential | null;
  setUser?: (user: AppleAuthenticationCredential | null) => void;
  logout?: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AppleAuthenticationCredential | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync('credential')
      .then(async (credential) => {
        console.log('cache credential', credential);

        if (!credential) {
          return { status: 2 as const, credential: null as AppleAuthenticationCredential | null };
        }

        const value = JSON.parse(credential);

        const status = await AppleAuthentication.getCredentialStateAsync(value.user as string);

        return {
          status,
          credential: value,
        };
      })
      .then(({ status, credential }) => {
        console.log('cache status', status);

        // 处理 iOS18+ 以及模拟器的问题
        if (!Device.isDevice && parseInt((Device.osVersion || '').split('.')[0], 10) >= 18) {
          if (credential?.user) {
            setUser(credential);
          }
        } else {
          if (status === AppleAuthentication.AppleAuthenticationCredentialState.AUTHORIZED) {
            setUser(credential);
          }
        }
      });
  }, []);

  const logout = async () => {
    const cache = await SecureStore.getItemAsync('credential');

    console.log('logout cache', cache); // nul

    if (!cache) {
      return;
    }

    setUser(null);
    SecureStore.deleteItemAsync('credential');
  };

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
};

export default function useAuth() {
  return useContext(AuthContext);
}
