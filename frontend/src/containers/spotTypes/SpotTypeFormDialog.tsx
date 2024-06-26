import { Dialog } from "../../components/ui/Dialog";
import { Text } from "../../components/ui/Text";
import SpotTypeForm from "./SpotTypeForm";

interface Props {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  onSuccess: () => void;
}
export default function SpotTypeDialog({ open, onOpenChange, onSuccess }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content title="Criar tipo de vaga">
        <div className="space-y-4">
          <Text>
            Categorização de vagas no seu estacionamento
          </Text>
          {open && (
            <SpotTypeForm
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
