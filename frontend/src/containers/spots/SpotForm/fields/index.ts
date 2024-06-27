import { IFieldProps } from "../../../../components/form/SmartField";

export const fields: IFieldProps[] = [
  {
    id: "code",
    label: "Código",
    placeholder: "Digite o código",
    type: "text",
  },
  {
    id: "floor",
    label: "Andar",
    placeholder: "Digite o andar da vaga",
    type: "text",
  },
  {
    id: "spot_type_name",
    label: "Tipo da vaga",
    placeholder: "Selecione o tipo da vaga",
    type: "select",
  },
];