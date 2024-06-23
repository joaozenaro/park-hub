import { useForm } from "../../../hooks/useForm";
import { isValidSignup } from "./validation";
import { Button } from "../../../components/ui/Button";
import { Loading } from "../../../components/ui/Loading";
import { ISignupForm } from "../../../models/ISignupForm";
import { ROLES_OPTIONS } from "../../../constants";
import { userService } from "../../../services/userService";
import { useToast } from "../../../hooks/useToast";
import axios, { AxiosError } from "axios";
import SmartFormFields from "../../../components/form/SmartFormFields";
import { signupFormFields } from "./signupFormFields";

interface Props {
  onSuccess: () => void;
}

const defaultData = {
  email: "",
  role: "",
};
export default function SignupForm({ onSuccess }: Props) {
  const { launchToast } = useToast();
  const onSubmit = async (data: ISignupForm) => {
    await userService
      .signup(data)
      .then((response) => {
        onSuccess();
        launchToast({
          title: "Convite enviado!",
          description: response.data.message,
          type: "success",
        });
      })
      .catch((err: AxiosError<any>) => {
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

  const optionsByField = {
    role: ROLES_OPTIONS,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SmartFormFields
        fields={signupFormFields}
        data={data}
        errors={errors}
        onChangeValue={handleChangeValue}
        optionsByField={optionsByField}
      />
      <Button className="w-full justify-center mt-6">
        {loading && <Loading size="sm" className="mr-2" />}
        Enviar convite
      </Button>
    </form>
  );
}
