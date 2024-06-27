import { Dialog } from "../../components/ui/Dialog";
import { IUser } from "../../models/IUser";
import UpdateUserForm from "./UpdateUserForm";

interface Props {
  user: IUser;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
export default function UpdateUserDialog({
  user,
  open,
  onClose,
  onSuccess,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={() => onClose()}>
      <Dialog.Content
        title="Atualizar usuário"
        description="Altere as informações básicas do usuário"
      >
        <div className="space-y-4">
          {open && (
            <UpdateUserForm
              id={user.id}
              initialData={{
                avatar: user.avatar,
                name: user.name,
                username: user.username,
              }}
              onSuccess={() => {
                onSuccess();
                onClose();
              }}
            />
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
