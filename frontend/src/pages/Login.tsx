import { useForm } from "../hooks/useForm"
import { ILoginForm } from "../models/ILoginForm";
import { authService } from "../services/authService";

import {
  IValidationError,
  IValidationReturn,
} from "../models/IValidationReturn";

export function isValidLogin(payload: ILoginForm): IValidationReturn {
  const errors: IValidationError[] = [];
  if (!payload.username.trim()) {
    errors.push({ field: "username", message: "Digite o username" });
  }
  if (!payload.password) {
    errors.push({ field: "password", message: "Digite a sua senha" });
  }

  return {
    isValid: !errors.length,
    errors,
  };
}

export default function Login() {
  const { data, handleChangeValue, handleSubmit } = useForm<ILoginForm>({
    defaultData: {
      username: "", 
      password: ""
    },
    onSubmit: async (data) => {
      authService.login(data)
        .then(res => console.log(res))
        .catch(err => console.error(err));

      return data;
    },
    validator: isValidLogin
  });

  return (
    <div>
      <h1>Park hub login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input id="username" className="border" type="text" value={data.username} onChange={e => handleChangeValue("username", e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input id="password" className="border" type="password" value={data.password} onChange={e => handleChangeValue("password", e.target.value)} />
        </div>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  )
}