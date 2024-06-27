import { useForm } from "../../../hooks/useForm";
import { isValidReservationCheckout } from "./validation";
import { Button } from "../../../components/ui/Button";
import { Loading } from "../../../components/ui/Loading";
import { ROLES_OPTIONS } from "../../../constants";
import { useToast } from "../../../hooks/useToast";
import axios, { AxiosError } from "axios";
import SmartFormFields from "../../../components/form/SmartFormFields";
import { fields } from "./fields";
import { reservationService } from "../../../services/reservationService";
import { TOAST_MESSAGES } from "../../../constants/toastMessages";
import { IReservationCheckoutForm } from "../../../models/IReservationCheckoutForm";

interface Props {
  id: number;
  initialData?: IReservationCheckoutForm;
  onSuccess: () => void;
}

const defaultData = {
  was_paid: false,
  check_out: false,
  price: "",
};
const TOAST_MODULE = "ReservationCheckout";
export default function ReservationCheckoutForm({
  id,
  initialData,
  onSuccess,
}: Props) {
  const { launchToast } = useToast();

  const onSubmit = async (data: IReservationCheckoutForm) => {
    await reservationService
      .checkOut(id, data)
      .then(() => {
        onSuccess();
        launchToast({
          title: TOAST_MESSAGES[TOAST_MODULE]["UPDATED_TITLE"],
          description: TOAST_MESSAGES[TOAST_MODULE]["UPDATED_DESCRIPTION"],
          type: "success",
        });
      })
      .catch((err: AxiosError<any>) => {
        if (axios.isAxiosError(err) && err.response) {
          launchToast({
            title: TOAST_MESSAGES[TOAST_MODULE].UPDATED_ERROR_TITLE,
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
    useForm<IReservationCheckoutForm>({
      defaultData,
      initialData,
      onSubmit,
      validator: isValidReservationCheckout,
    });

  const optionsByField = {
    was_paid: [
      {
        value: true,
        label: "Sim",
      },
      {
        value: false,
        label: "Não",
      },
    ],
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
        Registrar saida
      </Button>
    </form>
  );
}
