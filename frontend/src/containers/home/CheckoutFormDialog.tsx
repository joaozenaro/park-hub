import { Dialog } from "../../components/ui/Dialog";
import { IReservationCheckoutForm } from "../../models/IReservationCheckoutForm";
import ReservationCheckoutForm from "./ReservationCheckoutForm";

interface Props {
  open: boolean;
  id: number;
  initialData?: IReservationCheckoutForm;
  onClose: () => void;
  onSuccess: () => void;
}
export default function ReservationCheckoutFormDialog({
  id,
  open,
  onClose,
  initialData,
  onSuccess,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content
        title="Registrar saída de veículo"
        description="Efetue o pagamento e registre a hora de saída."
      >
        <div className="space-y-4">
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
