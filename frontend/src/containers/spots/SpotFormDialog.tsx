import { useEffect, useState } from "react";
import { Dialog } from "../../components/ui/Dialog";
import { ISpotForm } from "../../models/ISpotForm";
import { ISpotType } from "../../models/ISpotType";
import { spotTypeService } from "../../services/spotTypeService";
import SpotForm from "./SpotForm";
import { TOAST_MESSAGES } from "../../constants/toastMessages";
import { useToast } from "../../hooks/useToast";

interface Props {
  open: boolean;
  id?: number;
  initialData?: ISpotForm;
  onOpenChange: (state: boolean) => void;
  onSuccess: () => void;
}
export default function SpotFormDialog({
  open,
  onOpenChange,
  id,
  initialData,
  onSuccess,
}: Props) {
  const { launchToast } = useToast();
  const [spotTypes, setSpotTypes] = useState<ISpotType[]>([]);

  useEffect(() => {
    if (open) {
      spotTypeService
        .getAll()
        .then((res) => {
          setSpotTypes(res.data);
        })
        .catch(() => {
          launchToast({
            title: TOAST_MESSAGES.COMMON.LIST_ERROR_TITLE,
            description: TOAST_MESSAGES.COMMON.ERROR_DESCRIPTION,
            type: "error",
          });
        });
    }
  }, [open]);

  const optionsByField = {
    spot_type_name: spotTypes.map((st) => ({ value: st.name, label: st.name })),
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content title="Criar vaga" description="Cadastro de vagas do seu estacionamento.">
        <div className="space-y-4">
          {open && (
            <SpotForm
              id={id}
              initialData={initialData}
              optionsByField={optionsByField}
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
