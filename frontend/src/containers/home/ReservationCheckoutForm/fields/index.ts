import { IFieldProps } from "../../../../components/form/SmartField";

export const fields: IFieldProps[] = [
  // {
  //   id: "was_paid",
  //   label: "Pago",
  //   placeholder: "Reserva foi paga?",
  //   type: "select",
  // },
  // {
  //   id: "check_out",
  //   label: "Confirmar saída",
  //   placeholder: "Cliente saiu do estacionamento?",
  //   type: "text",
  // },
  {
    id: "price",
    label: "Preço",
    placeholder: "0",
    type: "currency",
  },
];
