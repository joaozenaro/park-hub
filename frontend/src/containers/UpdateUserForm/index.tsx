import { useForm } from "../../hooks/useForm";
import { isValidForm } from "./validation";
import { Button } from "../../components/ui/Button";
import { Loading } from "../../components/ui/Loading";
import SmartFormFields from "../../components/form/SmartFormFields";
import { fields } from "./fields";
import { IUpdateUserForm } from "../../models/IUpdateUserForm";
import axios, { AxiosError } from "axios";
import { userService } from "../../services/userService";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../contexts/AuthContext";
import { getChangedProps } from "../../utils/getChangedProps";

const defaultData = {
  name: "",
  avatar: "",
};
interface Props {
  initialData: IUpdateUserForm;
  userId: number;
  isProfile?: boolean;
  onSuccess?: () => void;
}
export default function UpdateUserForm({
  userId,
  initialData,
  isProfile = false,
  onSuccess = () => {},
}: Props) {
  const { user } = useAuth();
  const isUpdatingLoggedUser = user?.id === userId;
  const { launchToast } = useToast();
  const { handleProfileUpdate } = useAuth();
  const onSubmit = async (data: IUpdateUserForm) => {
    const payload = getChangedProps<IUpdateUserForm>(initialData, data);
    await userService
      .update(userId, payload)
      .then(() => {
        if (isUpdatingLoggedUser) {
          handleProfileUpdate(data);
          launchToast({
            title: "Perfil salvo!",
            description: "Seus dados foram atualizados com sucesso!",
            type: "success",
          });
        } else {
          launchToast({
            title: "Usuário atualizado!",
            description: "Usuário atualizado com sucesso!",
            type: "success",
          });
        }
        onSuccess();
      })
      .catch((err: AxiosError<any>) => {
        if (axios.isAxiosError(err) && err.response) {
          launchToast({
            title: "Erro ao salvar informações",
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

  const { data, setData, loading, errors, handleChangeValue, handleSubmit } =
    useForm<IUpdateUserForm>({
      defaultData,
      initialData,
      onSubmit,
      validator: isValidForm,
    });
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SmartFormFields
        fields={fields}
        data={data}
        errors={errors}
        onChangeValue={handleChangeValue}
      />
      <div className="flex mt-6 ">
        <Button className="flex-1 justify-center">
          {loading && <Loading size="sm" className="mr-2" />}
          Salvar
        </Button>
        {isProfile && (
          <Button
            className="ml-4"
            type="tertiary"
            behavior="button"
            onClick={() => setData(initialData)}
          >
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
