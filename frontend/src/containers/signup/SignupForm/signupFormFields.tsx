import { MdOutlineEmail } from "react-icons/md";
import { IFieldProps } from "../../../components/form/SmartField";

export const signupFormFields: IFieldProps[] = [
  {
    id: "email",
    label: "Email",
    placeholder: "Digite o seu email",
    type: "text",
    Icon: MdOutlineEmail,
  },
  {
    id: "role",
    label: "Função",
    placeholder: "Selecione a função",
    type: "select",
  },
];