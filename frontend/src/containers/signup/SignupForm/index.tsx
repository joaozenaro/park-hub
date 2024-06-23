import { useForm } from "../../../hooks/useForm";
import { isValidSignup } from "./validation";
import { Button } from "../../../components/ui/Button";
import { FormControl } from "../../../components/form/FormControl";
import { TextInput } from "../../../components/form/TextInput";
import { Loading } from "../../../components/ui/Loading";
import { MdOutlineEmail } from "react-icons/md";
import { ISignupForm } from "../../../models/ISignupForm";
import { ROLES_OPTIONS } from "../../../constants";
import { Select } from "../../../components/form/Select";
import { userService } from "../../../services/userService";
import { useToast } from "../../../hooks/useToast";
import axios, { AxiosError } from "axios";

interface Props {
  onSuccess: () => void
}

const defaultData = {
  email: "",
  role: "",
};
export default function SignupForm({ onSuccess }: Props) {
  const { launchToast } = useToast();
  const onSubmit = async (data: ISignupForm) => {
    await userService.signup(data).then((response) => {
      onSuccess();
      launchToast({
        title: "Convite enviado!",
        description: response.data.message,
        type: "success",
      });
    }).catch((err: AxiosError<any>) => {
      if (axios.isAxiosError(err) && err.response) {
        launchToast({
          title: "Erro ao criar usuário",
          description: err.response.data.message,
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
  const { data, loading, errors, handleChangeValue, handleSubmit } =
    useForm<ISignupForm>({
      defaultData,
      onSubmit,
      validator: isValidSignup,
    });
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormControl id="email" label="Email" errors={errors}>
        <TextInput.Root>
          <TextInput.Icon>
            <MdOutlineEmail />
          </TextInput.Icon>
          <TextInput.Input
            value={data.email}
            onChange={(e) => handleChangeValue("email", e.target.value)}
            placeholder="Digite o seu email"
            required
          />
        </TextInput.Root>
      </FormControl>
      <FormControl id="role" label="Função" errors={errors}>
        <Select.Root
          value={data.role}
          onChange={(value) => handleChangeValue("role", value)}
          placeholder="Selecione a função"
        >
          <Select.Item value={null}>Selecione a função</Select.Item>
          {ROLES_OPTIONS.map((item) => (
            <Select.Item value={item.value} key={item.value}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Root>
      </FormControl>
      <Button className="w-full justify-center mt-6">
        {loading && <Loading size="sm" />}
        Enviar convite
      </Button>
    </form>
  );
}
