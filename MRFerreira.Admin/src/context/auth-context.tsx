import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  login: (newToken: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("token")
  );

  const login = (newToken: string) => {
    setToken(newToken);
    sessionStorage.setItem("token", newToken);
  };

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
