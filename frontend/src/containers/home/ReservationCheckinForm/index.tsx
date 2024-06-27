import { useForm } from "../../../hooks/useForm";
import { isValidReservationCheckin } from "./validation";
import { Button } from "../../../components/ui/Button";
import { Loading } from "../../../components/ui/Loading";
import { useToast } from "../../../hooks/useToast";
import axios, { AxiosError } from "axios";
import SmartFormFields from "../../../components/form/SmartFormFields";
import { fields } from "./fields";
import { reservationService } from "../../../services/reservationService";
import { TOAST_MESSAGES } from "../../../constants/toastMessages";
import { IReservationCheckinForm } from "../../../models/IReservationCheckinForm";

interface Props {
  initialData?: IReservationCheckinForm;
  onSuccess: () => void;
  optionsByField: {
    [fieldId: string]: any[];
  };
}

const defaultData = {
  license_plate: "",
  spot_id: "",
};
const TOAST_MODULE = "ReservationCheckin";
export default function ReservationCheckinForm({
  initialData,
  onSuccess,
  optionsByField,
}: Props) {
  const { launchToast } = useToast();

  const onSubmit = async (data: IReservationCheckinForm) => {
    await reservationService
      .checkIn(data)
      .then(() => {
        onSuccess();
        launchToast({
          title: TOAST_MESSAGES[TOAST_MODULE]["CREATED_TITLE"],
          description: TOAST_MESSAGES[TOAST_MODULE]["CREATED_DESCRIPTION"],
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
    useForm<IReservationCheckinForm>({
      defaultData,
      initialData,
      onSubmit,
      validator: isValidReservationCheckin,
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
        Criar reserva
      </Button>
    </form>
  );
}
