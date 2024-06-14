import { FieldError } from "../../components/form/FieldError";
import { useForm } from "../../hooks/useForm";
import { ILoginForm } from "../../models/ILoginForm";
import { isValidLogin } from "./validation";

interface Props {
  submitText: string;
  onSubmit: (data: ILoginForm) => Promise<void>;
}

const defaultData = {
  username: "",
  password: ""
}
export default function LoginForm({ submitText, onSubmit }: Props) {
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
        <label>Username</label>
        <input id="username" className="border p-3" type="text" value={data.username} onChange={e => handleChangeValue("username", e.target.value)} />
        <FieldError id="username" errors={errors} />
      </div>
      <div>
        <label>Password</label>
        <input id="password" className="border p-3" type="password" value={data.password} onChange={e => handleChangeValue("password", e.target.value)} />
        <FieldError id="password" errors={errors} />
      </div>
      <input type="submit" value={submitText} />
    </form>
  )
}
