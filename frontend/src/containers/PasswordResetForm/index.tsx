import { useNavigate, useSearchParams } from "react-router-dom";
import { Loading } from "../../components/ui/Loading";
import { Button } from "../../components/ui/Button";
import { FormControl } from "../../components/form/FormControl";
import { TextInput } from "../../components/form/TextInput";
import { FormEvent, useState } from "react";
import { IPasswordResetPayload } from "../../models/IPasswordResetPayload";
import { authService } from "../../services/authService";
import axios, { AxiosError } from "axios";
import { IValidationError } from "../../models/IValidationReturn";
import { useAuth } from "../../contexts/AuthContext";

export default function PasswordResetForm() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<IValidationError[]>([]);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!searchParams.get("id") || !searchParams.get("token")) {
      console.error("Id ou token não podem estar vazios!")
      return;
    }

    const data: IPasswordResetPayload = {
      id: Number(searchParams.get("id")),
      token: searchParams.get("token") ?? "",
      password: password
    }

    if (password !== passwordConfirm) {
      setErrors([{
        field: "passwordConfirm",
        message: "As senhas são diferentes."
      }])

      return;
    }

    setLoading(true);

    await authService
      .resetPassword(data)
      .then((res) => {
        if (res) {
          handleLogout();

          navigate("/login");
        }
      })
      .catch((err: AxiosError<any>) => {
        if (axios.isAxiosError(err) && err.response) {
          setErrors([{
            field: "password",
            message: err.response?.data?.password
          }])
        } else {
          console.error(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return <>
    <form onSubmit={onSubmit}>
      <FormControl id="password" label="Senha" errors={errors}>
        <TextInput.Root>
          <TextInput.Icon>
            {/* <AiOutlineLock /> */}
            <p>:D</p>
          </TextInput.Icon>
          <TextInput.Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
            required
          />
        </TextInput.Root>
      </FormControl>
      <FormControl id="passwordConfirm" label="Confirmar senha" errors={errors}>
        <TextInput.Root>
          <TextInput.Icon>
            {/* <AiOutlineLock /> */}
            <p>:D</p>
          </TextInput.Icon>
          <TextInput.Input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="******"
            required
          />
        </TextInput.Root>
      </FormControl>
      <Button>
        {loading && <Loading size="sm" />}
        Enviar
      </Button>
    </form>
  </>

}
