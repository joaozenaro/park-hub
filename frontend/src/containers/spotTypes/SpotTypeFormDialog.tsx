import { Dialog } from "../../components/ui/Dialog";
import { ISpotTypeForm } from "../../models/ISpotTypeForm";
import SpotTypeForm from "./SpotTypeForm";

interface Props {
  open: boolean;
  id?: number;
  initialData?: ISpotTypeForm;
  onOpenChange: (state: boolean) => void;
  onSuccess: () => void;
}
export default function SpotTypeFormDialog({ open, onOpenChange, id, initialData, onSuccess }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content title="Criar tipo de vaga" description="Categorização de vagas no seu estacionamento.">
        <div className="space-y-4">
          {open && (
            <SpotTypeForm
              id={id}
              initialData={initialData}
              onSuccess={() => {
                onOpenChange(false);
                onSuccess();
              }}
            />
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
