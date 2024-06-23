import { IFieldProps } from "../../../components/form/SmartField";
import { AiOutlineLock } from "react-icons/ai";

export const fields: IFieldProps[] = [
  {
    Icon: AiOutlineLock,
    id: "password",
    label: "Senha",
    placeholder: "*******",
    type: "password",
  },
  {
    Icon: AiOutlineLock,
    id: "passwordConfirm",
    label: "Confirmar senha",
    placeholder: "*******",
    type: "password",
  },
];
