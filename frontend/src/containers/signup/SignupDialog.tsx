import { Dialog } from "../../components/ui/Dialog";
import SignupForm from "./SignupForm";

interface Props {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  onSuccess: () => void;
}
export default function SignupDialog({ open, onOpenChange, onSuccess }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        title="Criar usuário"
        description="Nós enviaremos um email com um convite para o usuário completar seu cadastro."
      >
        <div className="space-y-4">
          {open && <SignupForm onSuccess={onSuccess} />}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
