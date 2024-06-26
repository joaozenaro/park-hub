import { Dialog } from "../../components/ui/Dialog";
import { Text } from "../../components/ui/Text";
import { ISpotTypeForm } from "../../models/ISpotTypeForm";
import SpotTypeForm from "./SpotTypeForm";

interface Props {
  open: boolean;
  id?: number;
  initialData?: ISpotTypeForm;
  onOpenChange: (state: boolean) => void;
  onSuccess: () => void;
}
export default function SpotTypeDialog({ open, onOpenChange, id, initialData, onSuccess }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content title="Criar tipo de vaga">
        <div className="space-y-4">
          <Text>
            Categorização de vagas no seu estacionamento
          </Text>
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
