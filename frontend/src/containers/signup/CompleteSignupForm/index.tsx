import { useForm } from "../../../hooks/useForm";
import { isValidSignup } from "./validation";
import { Button } from "../../../components/ui/Button";
import { Loading } from "../../../components/ui/Loading";
import { ICompleteSignupForm } from "../../../models/ICompleteSignupForm";
import { userService } from "../../../services/userService";
import { useToast } from "../../../hooks/useToast";
import axios, { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import Alert from "../../../components/ui/Alert";
import SmartFormFields from "../../../components/form/SmartFormFields";
import { completeSignupFormFields } from "./completeSignupFormFields";

interface Props {
  onSuccess: () => void;
}

const defaultData = {
  name: "",
  username: "",
  password: "",
  passwordConfirm: "",
};
export default function CompleteSignupForm({ onSuccess }: Props) {
  const [searchParams] = useSearchParams();
  const { launchToast } = useToast();
  const disabled = !searchParams.get("id") || !searchParams.get("token");
  const onSubmit = async (data: ICompleteSignupForm) => {
    if (!searchParams.get("id") || !searchParams.get("token")) {
      return;
    }
    await userService
      .completeSignup({
        id: Number(searchParams.get("id")),
        token: searchParams.get("token") || "",
        name: data.name,
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        onSuccess();
        launchToast({
          title: "Cadastro completo!",
          description: response.data.message,
          type: "success",
        });
      })
      .catch((err: AxiosError<any>) => {
        if (axios.isAxiosError(err) && err.response) {
          launchToast({
            title: "Erro ao cadastrar informações",
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
    useForm<ICompleteSignupForm>({
      defaultData,
      onSubmit,
      validator: isValidSignup,
    });
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {disabled && (
        <Alert className="my-4" type="error">
          Você não pode cadastrar, pois os parâmetros requeridos na URL não
          foram encontrados.
        </Alert>
      )}
      <SmartFormFields
        fields={completeSignupFormFields}
        data={data}
        errors={errors}
        onChangeValue={handleChangeValue}
        disabled={disabled}
      />
      <Button className="w-full justify-center mt-6" disabled={disabled}>
        {loading && <Loading size="sm" className="mr-2" />}
        Concluir cadastro
      </Button>
    </form>
  );
}
