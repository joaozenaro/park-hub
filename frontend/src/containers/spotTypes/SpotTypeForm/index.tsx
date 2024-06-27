import { useForm } from "../../../hooks/useForm";
import { isValidSpotType } from "./validation";
import { Button } from "../../../components/ui/Button";
import { Loading } from "../../../components/ui/Loading";
import { ROLES_OPTIONS } from "../../../constants";
import { useToast } from "../../../hooks/useToast";
import axios, { AxiosError } from "axios";
import SmartFormFields from "../../../components/form/SmartFormFields";
import { fields } from "./fields";
import { spotTypeService } from "../../../services/spotTypeService";
import { TOAST_MESSAGES } from "../../../constants/toastMessages";
import { ISpotTypeForm } from "../../../models/ISpotTypeForm";

interface Props {
  id?: number;
  initialData?: ISpotTypeForm;
  onSuccess: () => void;
}

const defaultData = {
  name: "",
  default_price: "",
};
const TOAST_MODULE = "SpotType";
export default function SpotTypeForm({ id, initialData, onSuccess }: Props) {
  const { launchToast } = useToast();

  const onSubmit = async (data: ISpotTypeForm) => {
    const submitRequest = id
      ? spotTypeService.update(id, data)
      : spotTypeService.create(data);

    await submitRequest
      .then(() => {
        onSuccess();
        launchToast({
          title: TOAST_MESSAGES[TOAST_MODULE][id ? 'UPDATED_TITLE' : 'CREATED_TITLE'],
          description: TOAST_MESSAGES[TOAST_MODULE][id ? 'UPDATED_DESCRIPTION' : 'CREATED_DESCRIPTION'],
          type: "success",
        });
      })
      .catch((err: AxiosError<any>) => {
        if (axios.isAxiosError(err) && err.response) {
          launchToast({
            title: TOAST_MESSAGES[TOAST_MODULE].CREATED_ERROR_TITLE,
            description: err.response.data.message,
            type: "error",
          });
        } else {
          launchToast({
            title: TOAST_MESSAGES.COMMON.ERROR_TITLE,
            description: TOAST_MESSAGES.COMMON.ERROR_DESCRIPTION,
            type: "error",
          });
        }
      });
  };

  const { data, loading, errors, handleChangeValue, handleSubmit } =
    useForm<ISpotTypeForm>({
      defaultData,
      initialData,
      onSubmit,
      validator: isValidSpotType,
    });

  const optionsByField = {
    role: ROLES_OPTIONS,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SmartFormFields
        fields={fields}
        data={data}
        errors={errors}
        onChangeValue={handleChangeValue}
        optionsByField={optionsByField}
      />
      <Button className="w-full justify-center mt-6">
        {loading && <Loading size="sm" className="mr-2" />}
        Salvar tipo de vaga
      </Button>
    </form>
  );
}
