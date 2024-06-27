import { Dialog } from "../../components/ui/Dialog";
import { IReservationCheckinForm } from "../../models/IReservationCheckinForm";
import ReservationCheckinForm from "./ReservationCheckinForm";

interface Props {
  open: boolean;
  initialData?: IReservationCheckinForm;
  onClose: () => void;
  onSuccess: () => void;
  optionsByField: {
    [fieldId: string]: any[];
  };
}
export default function ReservationCheckinFormDialog({
  open,
  onClose,
  initialData,
  onSuccess,
  optionsByField,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content
        title="Registrar entrada de veículo"
        description="Registrar entrada de veículo no estacionamento"
      >
        <div className="space-y-4">
          {open && (
            <ReservationCheckinForm
              initialData={initialData}
              optionsByField={optionsByField}
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
