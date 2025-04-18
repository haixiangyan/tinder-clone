import { createContext, FC, ReactNode, useContext } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: string;
}

const AuthContext = createContext<AuthContextType>({
  user: '',
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        user: '',
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
