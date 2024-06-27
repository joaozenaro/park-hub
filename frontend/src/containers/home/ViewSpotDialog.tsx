import { Button } from "../../components/ui/Button";
import Car from "../../components/ui/Car";
import { Dialog } from "../../components/ui/Dialog";
import Heading from "../../components/ui/Heading";
import Tag from "../../components/ui/Tag";
import { Text } from "../../components/ui/Text";
import { ISpotWithReservation } from "../../services/spotService";
import { printTime } from "../../utils/date/printTime";
import { toCurrency } from "../../utils/toCurrency";

interface Props {
  data: ISpotWithReservation;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
export default function ViewSpotDialog({
  data,
  open,
  onClose,
  onSuccess,
}: Props) {
  const tableData = [
    {
      label: "Código",
      value: data.code,
    },
    { label: "Andar", value: data.floor },
    { label: "Tipo da vaga", value: data.spotType.name },
    { label: "Placa", value: <Tag>{data.reservation?.license_plate}</Tag> },
    { label: "Entrada", value: printTime(data.reservation!.check_in) },
    {
      label: "Horário de saída",
      value: data.reservation?.check_out
        ? printTime(data.reservation.check_out)
        : "Ainda em uso",
    },
    {
      label: "Preço da vaga",
      value: toCurrency(Number(data.reservation?.price) || 0),
    },
    {
      label: "Pagamento",
      value: data.reservation?.was_paid ? "Pago" : "Não pago",
    },
  ];
  return (
    <Dialog.Root open={open} onOpenChange={() => onClose()}>
      <Dialog.Content
        title="Visualização da vaga"
        size="md"
        description="Dados da vaga selecionada"
      >
        <div className="space-y-4">
          <div className="flex items-center">
            <Car className=" max-h-[190px] drop-shadow-[0px_6px_3px_rgba(0,0,0,0.4)] mr-8" />
            <div className="space-y-4 w-full">
              <Heading size="xs" asChild>
                <h3>Reserva</h3>
              </Heading>
              <Text>Confira os detalhes da reserva aberta</Text>
              <div className="bg-slate-100 p-4 rounded-md w-full">
                <table>
                  <tbody>
                    {tableData.map((item) => (
                      <tr key={item.label}>
                        <td className="text-right py-1">
                          <Text>{item.label}</Text>
                        </td>
                        <td className="pl-4 py-1">
                          <Text asChild>
                            <p className="text-zinc-900 ">{item.value}</p>
                          </Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* {open && (
            <UpdateUserForm
              id={data.id}
              initialData={{
                avatar: data.avatar,
                name: data.name,
                username: data.username,
              }}
              onSuccess={() => {
                onSuccess();
                onClose();
              }}
            />
          )} */}
          </div>
          <div className="flex justify-end">
            <Button>Registrar saída</Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
