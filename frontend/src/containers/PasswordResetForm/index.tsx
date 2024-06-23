import { useNavigate, useSearchParams } from "react-router-dom";
import { Loading } from "../../components/ui/Loading";
import { Button } from "../../components/ui/Button";
import axios, { AxiosError } from "axios";
import { useAuth } from "../../contexts/AuthContext";
import SmartFormFields from "../../components/form/SmartFormFields";
import { fields } from "./fields";
import { useForm } from "../../hooks/useForm";
import { IPasswordResetForm } from "../../models/IPasswordResetForm";
import { isValidForm } from "./validation";
import { useToast } from "../../hooks/useToast";

const defaultData = {
  password: "",
  passwordConfirm: "",
};
export default function PasswordResetForm() {
  const navigate = useNavigate();
  const { handlePasswordReset } = useAuth();
  const { launchToast } = useToast();
  const [searchParams] = useSearchParams();
  const disabled = !searchParams.get("id") || !searchParams.get("token");
  const onSubmit = async (data: IPasswordResetForm) => {
    if (!searchParams.get("id") || !searchParams.get("token")) {
      return;
    }
    await handlePasswordReset({
      id: Number(searchParams.get("id")),
      token: searchParams.get("token") || "",
      password: data.password,
    })
      .then((res) => {
        if (res.data) {
          navigate("/login");
        }
      })
      .catch((err: AxiosError<any>) => {
        if (axios.isAxiosError(err) && err.response) {
          launchToast({
            title: "Erro ao recuperar senha",
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
    useForm<IPasswordResetForm>({
      defaultData,
      onSubmit,
      validator: isValidForm,
    });

  return (
    <form onSubmit={handleSubmit}>
      <SmartFormFields
        fields={fields}
        data={data}
        errors={errors}
        onChangeValue={handleChangeValue}
        disabled={disabled}
      />
      <Button className="w-full justify-center mt-6" disabled={disabled}>
        {loading && <Loading size="sm" className="mr-2" />}
        Recuperar senha
      </Button>
    </form>
  );
}
