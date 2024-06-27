import { useForm } from "../../../hooks/useForm";
import { isValidSpot } from "./validation";
import { Button } from "../../../components/ui/Button";
import { Loading } from "../../../components/ui/Loading";
import { useToast } from "../../../hooks/useToast";
import axios, { AxiosError } from "axios";
import SmartFormFields from "../../../components/form/SmartFormFields";
import { fields } from "./fields";
import { spotService } from "../../../services/spotService";
import { TOAST_MESSAGES } from "../../../constants/toastMessages";
import { ISpotForm } from "../../../models/ISpotForm";

interface Props {
  id?: number;
  initialData?: ISpotForm;
  onSuccess: () => void;
  optionsByField: {
    [fieldId: string]: any[];
  };
}

const defaultData = {
  name: "",
  default_price: "",
  spot_type_name: "",
};
const TOAST_MODULE = "Spot";
export default function SpotForm({ id, initialData, optionsByField, onSuccess }: Props) {
  const { launchToast } = useToast();

  const onSubmit = async (data: ISpotForm) => {
    const submitRequest = id
      ? spotService.update(id, data)
      : spotService.create(data);

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
    useForm<ISpotForm>({
      defaultData,
      initialData,
      onSubmit,
      validator: isValidSpot,
    });

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
