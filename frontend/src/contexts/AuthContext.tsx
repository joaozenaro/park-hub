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
import { IUser } from "../models/IUser";

interface AuthProviderProps {
  authenticated: boolean;
  token: string;
  setToken: (token: string) => void;
  user: IUser | null;
  handleLogout: () => void;
  handleLogin: (data: ILoginForm) => Promise<void>;
}

const AuthContext = createContext<AuthProviderProps>({
  authenticated: false,
  token: "",
  user: null,
  setToken: () => {},
  handleLogout: () => {},
  handleLogin: () => Promise.resolve(),
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken_] = useState(localStorage.getItem("token") || '');
  const storedUser = localStorage.getItem("user");
  const [user, setUser_] = useState(
    storedUser ? JSON.parse(storedUser) as IUser : null
  );

  const setUser = (newUser: IUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser_(newUser);
  };

  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  const handleLogin = async (data: ILoginForm) => {
    await authService
      .login(data)
      .then((res) => {
        if (res.data.token) {
          setToken(res.data.token);
          setUser(res.data.user);
        }
      })
      .catch((err: AxiosError<any>) => {
        if (axios.isAxiosError(err) && err.response) {
          // TO DO: show error somewhere
          console.log(JSON.parse(err.response.data.message));
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
      user,
      handleLogout,
    }),
    [token, authenticated, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
