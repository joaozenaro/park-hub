import { IFieldProps } from "../../../../components/form/SmartField";

export const fields: IFieldProps[] = [
  {
    id: "license_plate",
    label: "Placa do veículo",
    placeholder: "Digite a placa",
    type: "text",
  },
  {
    id: "spot_id",
    label: "Vaga",
    placeholder: "Selecione a vaga",
    type: "select",
  },
];
