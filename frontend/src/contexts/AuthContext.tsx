import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "../services/api";
import { authService } from "../services/authService";
import { ILoginForm } from "../models/ILoginForm";
import axios, { AxiosError } from "axios";
import { IApiErrorResponse } from "../models/IApiResponse";

interface AuthProviderProps {
  authenticated: boolean;
  token: string;
  setToken: (token: string) => void;
  handleLogout: () => void;
  handleLogin: (data: ILoginForm) => Promise<void>;
}

const AuthContext = createContext<AuthProviderProps>({
  authenticated: false,
  token: "",
  setToken: () => {},
  handleLogout: () => {},
  handleLogin: () => Promise.resolve(),
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken_] = useState(localStorage.getItem("token") || "");

  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  const handleLogin = async (data: ILoginForm) => {
    await authService
      .login(data)
      .then((res) => {
        if (res.data.token) {
          setToken(res.data.token);
        }
      })
      .catch((err: AxiosError<IApiErrorResponse>) => {
        if (axios.isAxiosError(err) && err.response) {
          // TO DO: show error somewhere
          console.log(JSON.parse(err.response.data.data.message));
        } else {
          console.error(err);
        }
      });
  };

  const handleLogout = () => {
    setToken("");
    delete api.defaults.headers.Authorization;
    localStorage.clear();
    setAuthenticated(false);
  };

  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = "Bearer " + token;

      authService
        .validateToken()
        .then((response) => {
          if (response.data === "ok") {
            localStorage.setItem("token", token);
            setAuthenticated(true);
          } else {
            handleLogout();
          }
        })
        .catch(() => {
          // TO DO: Refresh token
          handleLogout();
        });
    } else {
      handleLogout();
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      authenticated,
      handleLogin,
      handleLogout,
    }),
    [token, authenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
