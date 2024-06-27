import { IFieldProps } from "../../../../components/form/SmartField";

export const fields: IFieldProps[] = [
  {
    id: "name",
    label: "Nome",
    placeholder: "Categoria para vaga",
    type: "text",
  },
  {
    id: "default_price",
    label: "Preço padrão",
    placeholder: "0",
    type: "currency",
  },
];
