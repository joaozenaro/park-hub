import axios from "axios";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

interface AuthProviderProps {
  token: string;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthProviderProps>({
  token: '',
  setToken: () => { }
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken_] = useState(localStorage.getItem("token") || '');

  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token', token);
      // TO DO: Validate token
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;