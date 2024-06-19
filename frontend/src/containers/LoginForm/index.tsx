import { useNavigate } from "react-router-dom";
import { FieldError } from "../../components/form/FieldError";
import { useForm } from "../../hooks/useForm";
import { ILoginForm } from "../../models/ILoginForm";
import { isValidLogin } from "./validation";
import { useAuth } from "../../contexts/AuthContext";
import { authService } from "../../services/authService";
import axios, { AxiosError } from "axios";
import { IApiErrorResponse } from "../../models/IApiResponse";

const defaultData = {
  username: "",
  password: ""
}
export default function LoginForm() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const onSubmit = async (data: ILoginForm) => {
    await authService.login(data)
      .then(res => {
        if (res.data.success) {
          setToken(res.data.data.access_token)
          navigate('/');
        }
      })
      .catch((err: AxiosError<IApiErrorResponse>) => {
        if (axios.isAxiosError(err) && err.response) {
          // TO DO: show error somewhere
          console.log(JSON.parse(err.response.data.data.message));
        } else {
          console.error(err);
        }
      })
  }

  const { data, loading, errors, handleChangeValue, handleSubmit } =
    useForm<ILoginForm>({
      defaultData,
      onSubmit,
      validator: isValidLogin,
    });
  return (
    <form onSubmit={handleSubmit}>
      {loading && <p>Loading...</p>}
      <div>
        <label>Username or Email</label>
        <input id="username" className="border p-3" type="text" value={data.username} onChange={e => handleChangeValue("username", e.target.value)} />
        <FieldError id="username" errors={errors} />
      </div>
      <div>
        <label>Password</label>
        <input id="password" className="border p-3" type="password" value={data.password} onChange={e => handleChangeValue("password", e.target.value)} />
        <FieldError id="password" errors={errors} />
      </div>
      <input type="submit" value="Entrar" />
    </form>
  )
}
