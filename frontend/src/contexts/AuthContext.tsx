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
import axios, { AxiosError, AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { IPasswordResetPayload } from "../models/IPasswordResetPayload";
import { useToast } from "../hooks/useToast";
import SplashScreen from "../components/layout/SplashScreen";
import { IUpdateUserForm } from "../models/IUpdateUserForm";

interface AuthProviderProps {
  authenticated: boolean;
  token: string;
  setToken: (token: string) => void;
  user: IUser | null;
  handleLogout: () => void;
  handleLogin: (data: ILoginForm) => Promise<void>;
  handleProfileUpdate: (data: IUpdateUserForm) => void;
  handlePasswordReset: (
    data: IPasswordResetPayload
  ) => Promise<AxiosResponse<any>>;
}

const AuthContext = createContext<AuthProviderProps>({
  authenticated: false,
  token: "",
  user: null,
  setToken: () => { },
  handleLogout: () => { },
  handleProfileUpdate: () => { },
  handlePasswordReset: () => Promise.resolve() as any,
  handleLogin: () => Promise.resolve(),
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { launchToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken_] = useState(localStorage.getItem("token") || "");
  const storedUser = localStorage.getItem("user");
  const [user, setUser_] = useState(
    storedUser ? (JSON.parse(storedUser) as IUser) : null
  );

  const setUser = (newUser: IUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser_(newUser);
  };

  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  const handleProfileUpdate = (data: IUpdateUserForm) => {
    setUser({ ...user, ...data } as IUser)
  }
  const handleLogin = async (data: ILoginForm) => {
    await authService
      .login(data)
      .then((res) => {
        if (res.data.token) {
          setToken(res.data.token);
          const user = { ...res.data.user, role: res.data.role };
          setUser(user);
        }
      })
      .catch((err: AxiosError<any>) => {
        if (axios.isAxiosError(err) && err.response) {
          launchToast({
            title: "Erro ao fazer login",
            description: err.response.data.password,
            type: "error",
          });
        } else {
          launchToast({
            title: "Erro inesperado",
            description: "Verifique sua conexão ou tente novamente mais tarde",
            type: "error",
          });
        }
      });
  };

  const handleLogout = () => {
    setToken("");
    delete api.defaults.headers.Authorization;
    localStorage.clear();
    setAuthenticated(false);
  };

  const handlePasswordReset = (data: IPasswordResetPayload) => {
    handleLogout();
    return authService.resetPassword(data);
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
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
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
      handlePasswordReset,
      handleProfileUpdate,
    }),
    [token, authenticated, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? <SplashScreen /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
