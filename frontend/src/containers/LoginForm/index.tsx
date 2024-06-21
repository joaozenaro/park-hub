import { useForm } from "../../hooks/useForm";
import { ILoginForm } from "../../models/ILoginForm";
import { isValidLogin } from "./validation";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/Button";
import { FormControl } from "../../components/form/FormControl";
import { TextInput } from "../../components/form/TextInput";
import { Loading } from "../../components/ui/Loading";

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
    <form onSubmit={handleSubmit}>
      <div className="p-8">
        <FormControl id="username" label="Username" errors={errors}>
          <TextInput.Root>
            <TextInput.Icon>
              {/* <AiOutlineUser /> */}
              <p>:0</p>
            </TextInput.Icon>
            <TextInput.Input
              value={data.username}
              onChange={(e) => handleChangeValue("username", e.target.value)}
              placeholder="Digite o username..."
              required
            />
          </TextInput.Root>
        </FormControl>
        <FormControl id="password" label="Senha" errors={errors}>
          <TextInput.Root>
            <TextInput.Icon>
              {/* <AiOutlineLock /> */}
              <p>:D</p>
            </TextInput.Icon>
            <TextInput.Input
              type="password"
              value={data.password}
              onChange={(e) => handleChangeValue("password", e.target.value)}
              placeholder="******"
              required
            />
          </TextInput.Root>
        </FormControl>
      </div>
      <Button>
        {loading && <Loading size="sm" />}
        Entrar
      </Button>
    </form>
  );
}
