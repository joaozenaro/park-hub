import CarFront from "../../components/ui/CarFront";
import { Dialog } from "../../components/ui/Dialog";
import SimpleDataView from "../../components/ui/SimpleDataView";
import Tag from "../../components/ui/Tag";
import { IReservationCheckoutForm } from "../../models/IReservationCheckoutForm";
import { ISpotWithReservation } from "../../services/spotService";
import ReservationCheckoutForm from "./ReservationCheckoutForm";

interface Props {
  open: boolean;
  id: number;
  spot: ISpotWithReservation;
  initialData?: IReservationCheckoutForm;
  onClose: () => void;
  onSuccess: () => void;
}
export default function ReservationCheckoutFormDialog({
  id,
  open,
  spot,
  onClose,
  initialData,
  onSuccess,
}: Props) {
  const tableData = [
    {
      label: "Andar",
      value: <strong>{spot.floor}</strong>,
    },
    {
      label: "Código da vaga",
      value: spot.code,
    },
    {
      label: "Placa do veículo",
      value: <Tag>{spot.reservation!.license_plate}</Tag>,
    },
  ];
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content
        title="Registrar saída de veículo"
        description="Efetue o pagamento e registre a hora de saída."
      >
        <div className="space-y-4">
          <div className="flex">
            <SimpleDataView data={tableData} />
            <CarFront className="max-w-24 h-auto ml-4" />
          </div>
          {open && (
            <ReservationCheckoutForm
              id={id}
              initialData={initialData}
              onSuccess={() => {
                onClose();
                onSuccess();
              }}
            />
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
