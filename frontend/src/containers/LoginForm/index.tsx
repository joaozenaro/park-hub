import { useForm } from "../../hooks/useForm";
import { ILoginForm } from "../../models/ILoginForm";
import { isValidLogin } from "./validation";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/Button";
import { FormControl } from "../../components/form/FormControl";
import { TextInput } from "../../components/form/TextInput";
import { Loading } from "../../components/ui/Loading";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import { Link } from "react-router-dom";
import Logo from "../../components/ui/Logo";

const defaultData = {
  username: "",
  password: "",
};
export default function LoginForm() {
  const { handleLogin } = useAuth();

  const { data, loading, errors, handleChangeValue, handleSubmit } =
    useForm<ILoginForm>({
      defaultData,
      onSubmit: handleLogin,
      validator: isValidLogin,
    });
  return (
    <div>
      <h1 className="text-4xl font-medium flex items-center justify-center mb-2 mt-8">Login</h1>
      <form onSubmit={handleSubmit}>
        <FormControl id="username" label="Username" errors={errors}>
          <TextInput.Root>
            <TextInput.Icon>
              <MdOutlineEmail />
            </TextInput.Icon>
            <TextInput.Input
              value={data.username}
              onChange={(e) => handleChangeValue("username", e.target.value)}
              placeholder="Digite o seu email"
              required
            />
          </TextInput.Root>
        </FormControl>
        <FormControl id="password" label="Senha" errors={errors}>
          <TextInput.Root>
            <TextInput.Icon>
              <AiOutlineLock />

            </TextInput.Icon>
            <TextInput.Input
              type="password"
              value={data.password}
              onChange={(e) => handleChangeValue("password", e.target.value)}
              placeholder="*******"
              required
            />
          </TextInput.Root>
        </FormControl>
        <Button type="brand" className="w-full justify-center mt-6">
          {loading && <Loading size="sm" />}
          Entrar
        </Button>
      </form>
      <Link to="/esqueceu-sua-senha" className="group flex justify-center text-slate-500 hover:underline outline-none pt-5">Esqueceu a senha?</Link>
      <div className="flex justify-center mt-10">
        <Logo />
      </div>
    </div>
  );
}
