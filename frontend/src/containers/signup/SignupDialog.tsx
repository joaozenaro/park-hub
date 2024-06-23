import { Dialog } from "../../components/ui/Dialog";
import { Text } from "../../components/ui/Text";
import SignupForm from "./SignupForm";

interface Props {
  open: boolean;
  onOpenChange: (state: boolean) => void;
}
export default function SignupDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content title="Criar usuário">
        <div className="space-y-4">
          <Text>
            Nós enviaremos um email com um convite para o usuário completar seu
            cadastro
          </Text>
          {open && <SignupForm onSuccess={() => onOpenChange(false)} />}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
