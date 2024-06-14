import { ILoginForm } from "../models/ILoginForm";
import { authService } from "../services/authService";

import LoginForm from "../containers/LoginForm";

export default function Login() {
  const onSubmit = async (data: ILoginForm) => {
    await authService.login(data)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }
  return (
    <div>
      <h1>Park hub login</h1>
      <LoginForm onSubmit={onSubmit} submitText="Entrar" />
    </div>
  )
}