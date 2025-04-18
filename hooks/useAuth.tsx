import { createContext, FC, ReactNode } from 'react';
import { View, Text } from 'react-native';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {}

const AuthContext = createContext<AuthContextType>({});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};
