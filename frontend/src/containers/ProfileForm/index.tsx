import { useForm } from "../../hooks/useForm";
import { isValidForm } from "./validation";
import { Button } from "../../components/ui/Button";
import { Loading } from "../../components/ui/Loading";
import SmartFormFields from "../../components/form/SmartFormFields";
import { fields } from "./fields";
import { IProfileForm } from "../../models/IProfileForm";
import axios, { AxiosError } from "axios";
import { userService } from "../../services/userService";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../contexts/AuthContext";


const defaultData = {
  name: "",
  avatar: "",
};
interface Props {
  initialData: IProfileForm;
  userId: number;
}
export default function ProfileForm({ userId, initialData }: Props) {
  const { launchToast } = useToast();
  const {handleProfileUpdate } = useAuth();
  const onSubmit = async (data: IProfileForm) => {
    await userService
      .update(userId,{
        name: data.name,
        username: data.username,
        avatar: data.avatar,
      })
      .then(() => {
        handleProfileUpdate(data);
        launchToast({
          title: "Perfil salvo!",
          description: "Seus dados foram atualizados com sucesso!",
          type: "success",
        });
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
    useForm<IProfileForm>({
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
          {loading && <Loading size="sm" />}
          Salvar
        </Button>
        <Button className="ml-4" type="tertiary" behavior="button" onClick={() => setData(initialData)} >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
