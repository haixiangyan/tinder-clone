import { AppleAuthenticationCredential } from 'expo-apple-authentication';
import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user?: AppleAuthenticationCredential | null;
  setUser?: (user: AppleAuthenticationCredential | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AppleAuthenticationCredential | null>(null);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default function useAuth() {
  return useContext(AuthContext);
}
