import { MdOutlineEmail } from "react-icons/md";
import { IFieldProps } from "../../../components/form/SmartField";
import { AiOutlineLock } from "react-icons/ai";

export const fields: IFieldProps[] = [
  {
    Icon: MdOutlineEmail,
    id: "username",
    label: "Email",
    placeholder: "Digite o seu email",
    type: "text",
  },
  {
    Icon: AiOutlineLock,
    id: "password",
    label: "Senha",
    placeholder: "*******",
    type: "password",
  },
];
